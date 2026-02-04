/**
 * Import Curriculum Data to Firestore
 * 
 * This script reads curriculum data from a CSV file and uploads it to Firestore.
 * 
 * Usage:
 *   node scripts/import-curriculum.cjs [path-to-csv]
 * 
 * Example:
 *   node scripts/import-curriculum.cjs curriculum-template.csv
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Initialize Firebase Admin
const serviceAccount = require('../.firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Parse CSV file and return array of curriculum objects
 */
function parseCurriculumCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath, { encoding: 'utf8' })
      .pipe(csv())
      .on('data', (row) => {
        // Build reflection questions array from single column
        const reflectionQuestions = [];
        if (row.questions && row.questions.trim()) {
          // Split by numbers like "1.", "2.", "3." at the beginning or after a space
          const questions = row.questions
            .split(/(?:^|\s)(\d+)\.\s+/)
            .filter(q => q && q.trim() && !/^\d+$/.test(q.trim()))
            .map(q => q.trim())
            .filter(q => q.length > 0);
          reflectionQuestions.push(...questions);
        }

        const week = parseInt(row.week);
        const dayValue = parseInt(row.day);
        
        // Calculate day within week (1-5) from absolute day number if needed
        // If day > 5, it's an absolute day number, convert to day within week
        const dayInWeek = dayValue > 5 ? ((dayValue - 1) % 5) + 1 : dayValue;
        
        const curriculumItem = {
          week: week,
          day: dayInWeek,
          title: row.title.trim(),
          reference: row.reference.trim(),
          summary: row.summary ? row.summary.trim() : null,
          studyNotes: row.studyNotes ? row.studyNotes.trim() : null,
          devotional: row.devotional ? row.devotional.trim() : null,
          reflectionQuestions: reflectionQuestions.length > 0 ? reflectionQuestions : null
        };

        results.push(curriculumItem);
      })
      .on('end', () => {
        console.log(`✓ Parsed ${results.length} curriculum items from CSV`);
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

/**
 * Upload curriculum data to Firestore
 */
async function uploadToFirestore(curriculumData) {
  const batch = db.batch();
  let count = 0;
  const BATCH_SIZE = 500; // Firestore batch limit

  console.log(`\nUploading ${curriculumData.length} items to Firestore...`);

  for (const item of curriculumData) {
    const docId = `week${item.week}-day${item.day}`;
    const docRef = db.collection('curriculum').doc(docId);
    
    batch.set(docRef, item);
    count++;

    // Commit batch every 500 items
    if (count % BATCH_SIZE === 0) {
      await batch.commit();
      console.log(`  Committed batch (${count} items so far)`);
    }
  }

  // Commit remaining items
  if (count % BATCH_SIZE !== 0) {
    await batch.commit();
  }

  console.log(`✓ Successfully uploaded ${count} curriculum items to Firestore\n`);
}

/**
 * Main function
 */
async function main() {
  try {
    // Get CSV file path from command line argument
    const csvPath = process.argv[2] || 'curriculum-template.csv';
    const fullPath = path.resolve(csvPath);

    console.log(`\n📚 Importing Curriculum Data to Firestore`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    console.log(`Reading from: ${fullPath}\n`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }

    // Parse CSV
    const curriculumData = await parseCurriculumCSV(fullPath);

    // Validate data
    if (curriculumData.length === 0) {
      throw new Error('No curriculum data found in CSV file');
    }

    // Upload to Firestore
    await uploadToFirestore(curriculumData);

    console.log(`✨ Import complete!`);
    console.log(`\nYou can now view the data in Firebase Console:`);
    console.log(`https://console.firebase.google.com/project/YOUR_PROJECT/firestore/data/curriculum\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during import:');
    console.error(error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();

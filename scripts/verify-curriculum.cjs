/**
 * Verify Curriculum Data in Firestore
 */

const admin = require('firebase-admin');
const serviceAccount = require('../.firebase-admin-key.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function verifyData() {
  console.log('\n🔍 Verifying Curriculum Data in Firestore\n');
  
  // Check a few sample days
  const testDays = [
    { week: 1, day: 1 },
    { week: 1, day: 5 },
    { week: 26, day: 3 },
    { week: 52, day: 5 }
  ];
  
  for (const { week, day } of testDays) {
    const docId = `week${week}-day${day}`;
    const docRef = db.collection('curriculum').doc(docId);
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
      const data = docSnap.data();
      console.log(`✓ ${docId}:`);
      console.log(`  - Title: ${data.title}`);
      console.log(`  - Has Summary: ${!!data.summary}`);
      console.log(`  - Has Study Notes: ${!!data.studyNotes}`);
      console.log(`  - Has Devotional: ${!!data.devotional}`);
      console.log(`  - Has Questions: ${!!data.reflectionQuestions} (${data.reflectionQuestions?.length || 0})`);
      console.log('');
    } else {
      console.log(`✗ ${docId}: NOT FOUND\n`);
    }
  }
  
  // Count total documents
  const snapshot = await db.collection('curriculum').get();
  console.log(`\n📊 Total documents in Firestore: ${snapshot.size}\n`);
  
  process.exit(0);
}

verifyData().catch(console.error);

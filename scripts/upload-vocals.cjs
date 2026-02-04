#!/usr/bin/env node

/**
 * Upload vocal performance MP3 files to Firebase Storage
 * and update hymnsData.ts with the URLs
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin (reuse existing initialization if already done)
if (!admin.apps.length) {
  const serviceAccount = require('../.firebase-admin-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'tune-my-heart.firebasestorage.app'
  });
}

const bucket = admin.storage().bucket();

// Load hymns data
const hymnsDataPath = path.join(__dirname, '../src/data/hymnsData.ts');
const vocalsDir = path.join(__dirname, '../vocal');

// Helper function to normalize titles for matching
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "'") // Normalize apostrophes
    .replace(/[^\w\s']/g, '') // Remove special chars except apostrophe
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

// Parse hymn titles from the data file
function parseHymnsFromFile() {
  const content = fs.readFileSync(hymnsDataPath, 'utf8');
  const hymns = [];
  
  // Match hymn objects in the array
  const hymnMatches = content.matchAll(/\{\s*week:\s*(\d+),\s*title:\s*"([^"]+)"/g);
  
  for (const match of hymnMatches) {
    const week = parseInt(match[1]);
    const title = match[2];
    hymns.push({ week, title, normalizedTitle: normalizeTitle(title) });
  }
  
  return hymns;
}

// Extract hymn title from filename
function extractTitleFromFilename(filename) {
  // Remove .mp3 extension
  let title = filename.replace('.mp3', '');
  
  // Remove leading numbers and whitespace (e.g., "01 " or "21 ")
  title = title.replace(/^\d+\s+/, '');
  
  // Remove common suffixes like "MIX 2 EDIT #240916"
  title = title.replace(/\s+(MIX|EDIT|#)[^.]*$/i, '');
  
  return title.trim();
}

// Find best matching hymn for a filename
function findMatchingHymn(filename, hymns) {
  const extractedTitle = extractTitleFromFilename(filename);
  const normalizedFilename = normalizeTitle(extractedTitle);
  
  // Try exact match first
  let match = hymns.find(h => h.normalizedTitle === normalizedFilename);
  if (match) return { hymn: match, extractedTitle, confidence: 'exact' };
  
  // Try partial match (filename contains hymn title or vice versa)
  match = hymns.find(h => 
    normalizedFilename.includes(h.normalizedTitle) || 
    h.normalizedTitle.includes(normalizedFilename)
  );
  if (match) return { hymn: match, extractedTitle, confidence: 'partial' };
  
  // Try word-by-word match (at least 3 words in common)
  const filenameWords = normalizedFilename.split(' ').filter(w => w.length > 2);
  for (const hymn of hymns) {
    const hymnWords = hymn.normalizedTitle.split(' ').filter(w => w.length > 2);
    const commonWords = filenameWords.filter(w => hymnWords.includes(w));
    if (commonWords.length >= Math.min(3, Math.min(filenameWords.length, hymnWords.length))) {
      return { hymn, extractedTitle, confidence: 'fuzzy' };
    }
  }
  
  return null;
}

async function uploadFile(filePath, filename) {
  const destination = `vocals/${filename}`;
  
  await bucket.upload(filePath, {
    destination,
    metadata: {
      contentType: 'audio/mpeg',
      cacheControl: 'public, max-age=31536000',
    },
  });
  
  // Generate the public URL
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media`;
  
  return url;
}

async function main() {
  console.log('🎤 Vocal Performance Upload Script\n');
  console.log('=====================================\n');
  
  // Parse hymns from data file
  console.log('📖 Parsing hymns data...');
  const hymns = parseHymnsFromFile();
  console.log(`   Found ${hymns.length} hymns in data file\n`);
  
  // Read vocal files
  console.log('📁 Reading vocal files...');
  const files = fs.readdirSync(vocalsDir)
    .filter(f => f.endsWith('.mp3'))
    .sort();
  console.log(`   Found ${files.length} MP3 files\n`);
  
  // Match files to hymns
  console.log('🔍 Matching files to hymns...\n');
  const matches = [];
  const unmatched = [];
  
  for (const filename of files) {
    const matchResult = findMatchingHymn(filename, hymns);
    
    if (matchResult) {
      matches.push({
        filename,
        week: matchResult.hymn.week,
        title: matchResult.hymn.title,
        extractedTitle: matchResult.extractedTitle,
        confidence: matchResult.confidence
      });
      const confidence = matchResult.confidence === 'exact' ? '✅' : 
                        matchResult.confidence === 'partial' ? '⚠️' : '🔄';
      console.log(`${confidence} Week ${matchResult.hymn.week.toString().padStart(2)}: ${matchResult.hymn.title}`);
      console.log(`   File: ${filename}`);
      if (matchResult.confidence !== 'exact') {
        console.log(`   Confidence: ${matchResult.confidence}`);
      }
      console.log('');
    } else {
      unmatched.push(filename);
      console.log(`❌ NO MATCH: ${filename}`);
      console.log(`   Extracted: ${extractTitleFromFilename(filename)}\n`);
    }
  }
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Matched: ${matches.length}`);
  console.log(`   Unmatched: ${unmatched.length}`);
  console.log(`   Total files: ${files.length}\n`);
  
  if (unmatched.length > 0) {
    console.log('⚠️  Unmatched files will be skipped.\n');
  }
  
  // Ask for confirmation
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const answer = await new Promise(resolve => {
    readline.question('Do you want to proceed with upload? (yes/no): ', resolve);
  });
  readline.close();
  
  if (answer.toLowerCase() !== 'yes') {
    console.log('\n❌ Upload cancelled.');
    process.exit(0);
  }
  
  // Upload files
  console.log('\n📤 Uploading files to Firebase Storage...\n');
  const uploadedMatches = [];
  
  for (const match of matches) {
    const filePath = path.join(vocalsDir, match.filename);
    console.log(`⬆️  Uploading: ${match.filename} (Week ${match.week})`);
    
    try {
      const url = await uploadFile(filePath, match.filename);
      uploadedMatches.push({ ...match, url });
      console.log(`   ✅ Success: ${url}\n`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
  }
  
  // Update hymnsData.ts
  console.log('📝 Updating hymnsData.ts...\n');
  
  let content = fs.readFileSync(hymnsDataPath, 'utf8');
  
  for (const match of uploadedMatches) {
    // Find the hymn entry for this week
    const weekPattern = new RegExp(`(\\{\\s*week:\\s*${match.week},[^}]+?)(pianoAudioUrl:[^,]+,)`, 's');
    const matchResult = content.match(weekPattern);
    
    if (matchResult) {
      const beforeVocal = matchResult[1];
      const pianoLine = matchResult[2];
      
      // Check if vocalAudioUrl already exists
      const hymnEntryRegex = new RegExp(`\\{\\s*week:\\s*${match.week},[^}]+\\}`, 's');
      const hymnMatch = content.match(hymnEntryRegex);
      
      if (hymnMatch && hymnMatch[0].includes('vocalAudioUrl')) {
        // Replace existing URL
        content = content.replace(
          new RegExp(`(week:\\s*${match.week},[^}]+?)vocalAudioUrl:\\s*\`[^\`]*\``, 's'),
          `$1vocalAudioUrl: \`${match.url}\``
        );
        console.log(`✅ Week ${match.week}: Updated existing vocal URL`);
      } else {
        // Add vocalAudioUrl after pianoAudioUrl
        const replacement = `${beforeVocal}${pianoLine}\n    vocalAudioUrl: \`${match.url}\`,`;
        content = content.replace(weekPattern, replacement);
        console.log(`✅ Week ${match.week}: Added vocal URL`);
      }
    } else {
      console.log(`⚠️  Week ${match.week}: Could not find hymn entry with pianoAudioUrl`);
    }
  }
  
  // Write updated content
  fs.writeFileSync(hymnsDataPath, content, 'utf8');
  
  console.log('\n✅ All done!');
  console.log(`   Uploaded: ${uploadedMatches.length} files`);
  console.log(`   Updated: hymnsData.ts\n`);
  
  process.exit(0);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});

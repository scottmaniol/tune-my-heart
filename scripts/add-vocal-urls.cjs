#!/usr/bin/env node

/**
 * Add vocal performance URLs to hymnsData.ts
 * This script adds the URLs for the uploaded vocal files
 */

const fs = require('fs');
const path = require('path');

// Mapping of week numbers to filenames based on the upload results
const weekToFilename = {
  1: '23 All Creatures of Our God and King.mp3',
  7: '04 God Moves in a Mysterious Way.mp3',
  10: '46 Be Thou My Vision.mp3',
  11: '19 How Firm a Foundation.mp3',
  13: 'He Who Would.mp3',
  16: '09 O Worship the King.mp3',
  19: '17 Praise To the Lord.mp3',
  22: '14 How Sad Our State.mp3',
  24: '28 Holy Holy Holy.mp3',
  25: '21 All Hail MIX 2 EDIT #240916.mp3',
  28: '05 God Be Merciful to Me.mp3',
  31: '02 O For a Thousand Tongues to Sing.mp3',
  36: '33 All People that on Earth Do Dwell.mp3',
  42: '01 Come, Christians, Join to Sing.mp3',
  48: '13 And Can It Be.mp3'
};

function generateUrl(filename) {
  const encodedFilename = encodeURIComponent(`vocals/${filename}`);
  return `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/${encodedFilename}?alt=media`;
}

const hymnsDataPath = path.join(__dirname, '../src/data/hymnsData.ts');
let content = fs.readFileSync(hymnsDataPath, 'utf8');

console.log('🎤 Adding Vocal Performance URLs to hymnsData.ts\n');

let updatedCount = 0;

for (let week = 1; week <= 52; week++) {
  const filename = weekToFilename[week];
  if (!filename) {
    continue; // Skip weeks without vocal recordings
  }
  
  const url = generateUrl(filename);
  
  // Find the pianoAudioUrl line for this week
  const weekRegex = new RegExp(`(week:\\s*${week},[\\s\\S]*?pianoAudioUrl:\\s*\`[^\`]+\`,)`, '');
  const match = content.match(weekRegex);
  
  if (match) {
    // Check if vocalAudioUrl already exists
    const hymnEntryRegex = new RegExp(`week:\\s*${week},[\\s\\S]*?vocalAudioUrl:`, '');
    if (hymnEntryRegex.test(content)) {
      console.log(`⏭️  Week ${week}: Already has vocalAudioUrl`);
      continue;
    }
    
    // Add vocalAudioUrl after pianoAudioUrl
    const pianoLine = match[1];
    const replacement = `${pianoLine}\n    vocalAudioUrl: \`${url}\`,`;
    content = content.replace(weekRegex, replacement);
    updatedCount++;
    console.log(`✅ Week ${week}: Added vocal URL`);
  } else {
    console.log(`❌ Week ${week}: Could not find hymn entry`);
  }
}

// Write the updated content
fs.writeFileSync(hymnsDataPath, content, 'utf8');

console.log(`\n✅ Done! Updated ${updatedCount} hymns with vocal performance URLs`);

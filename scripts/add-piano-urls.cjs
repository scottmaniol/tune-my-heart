#!/usr/bin/env node

/**
 * Add piano accompaniment URLs to hymnsData.ts
 * This script reads the uploaded files and adds the URLs to each hymn entry
 */

const fs = require('fs');
const path = require('path');

// Mapping of week numbers to filenames based on the upload results
const weekToFilename = {
  1: '159 All Creatures of Our God and King.mp3',
  2: '155 The God of Abraham Praise.mp3',
  3: '166 Sing Praise to God Who Reigns Above.mp3',
  4: '325 Not What These Hands Have Done.mp3',
  5: '346 Blessed Jesus, at Thy Word.mp3',
  6: '411 What God Ordains Is Always Good.mp3',
  7: '412 God Moves in a Mysterious Way.mp3',
  8: '369 Guide Me, O Thou Great Jehovah.mp3',
  9: '173 Immortal, Invisible, God Only Wise.mp3',
  10: '352 Be Thou My Vision.mp3',
  11: '349 How Firm a Foundation.mp3',
  12: "181 This Is My Father's World.mp3",
  13: '368 He Who Would Valiant Be.mp3',
  14: '408 Jesus, Lover of My Soul.mp3',
  15: 'Psalm 19A The Heavens Declare Thy Glory, Lord.mp3',
  16: '171 O Worship the King.mp3',
  17: '220 Jesus Shall Reign.mp3',
  18: '160 Holy Trinity, Thanks and Praise to Thee.mp3',
  19: '191 Praise to the Lord, the Almighty.mp3',
  20: '291 Rejoice, the Lord Is King.mp3',
  21: '287 Good Christians All, Rejoice and Sing.mp3',
  22: '200 How Sad Our State.mp3',
  23: '413 Sun of My Soul, Thou Savior Dear.mp3',
  24: '153 Holy, Holy, Holy!.mp3',
  25: "301 All Hail the Power of Jesus' Name (CORONATION).mp3",
  26: '281 Christ the Lord Is Risen Today.mp3',
  27: '371 My Faith Looks Up to Thee.mp3',
  28: 'Psalm 51 God, Be Merciful to Me.mp3',
  29: 'Psalm 32 How Blest Is He Whose Trespass.mp3',
  30: '332 Jesus, Thy Blood and Righteousness.mp3',
  31: '345 O for a Thousand Tongues to Sing.mp3',
  32: '211 O Come, O Come, Emmanuel.mp3',
  33: '416 Glorious Things of Thee Are Spoken.mp3',
  34: '420 Jerusalem, My Happy Home.mp3',
  35: '309 Spirit of God, Descend upon My Heart.mp3',
  36: 'Psalm 100 All People That on Earth Do Dwell.mp3',
  37: "252 Of the Father's Love Begotten.mp3",
  38: '197 When Morning Gilds the Skies.mp3',
  39: '334 Jesus! What a Friend of Sinners.mp3',
  40: '322 I Sought the Lord.mp3',
  41: "183 O Splendor of God's Glory Bright.mp3",
  42: '307 Come, Christians, Join to Sing.mp3',
  43: '260 My Song Is Love Unknown.mp3',
  44: '266 Stricken, Smitten, and Afflicted.mp3',
  45: '286 Jesus Lives, and So Shall I.mp3',
  46: "385 The Church's One Foundation.mp3",
  47: '312 How Sweet and Awful Is the Place.mp3',
  48: '318 And Can It Be.mp3',
  49: '293 Look, Ye Saints, the Sight Is Glorious.mp3',
  50: '228 Savior of the Nations, Come.mp3',
  51: '219 Joy to the World.mp3',
  52: '214 Lo! He Comes, with Clouds Descending.mp3'
};

function generateUrl(filename) {
  const encodedFilename = encodeURIComponent(`accompaniments/${filename}`);
  return `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/${encodedFilename}?alt=media`;
}

const hymnsDataPath = path.join(__dirname, '../src/data/hymnsData.ts');
let content = fs.readFileSync(hymnsDataPath, 'utf8');

console.log('🎵 Adding Piano Accompaniment URLs to hymnsData.ts\n');

let updatedCount = 0;

for (let week = 1; week <= 52; week++) {
  const filename = weekToFilename[week];
  if (!filename) {
    console.log(`⚠️  Week ${week}: No filename mapping found`);
    continue;
  }
  
  const url = generateUrl(filename);
  
  // Find the hymn entry for this week
  const weekRegex = new RegExp(`(\\{\\s*week:\\s*${week},\\s*title:[^}]+?pdfUrl:[^,]+,)`, 's');
  const match = content.match(weekRegex);
  
  if (match) {
    const beforePiano = match[1];
    
    // Check if pianoAudioUrl already exists
    const hymnEntryRegex = new RegExp(`\\{\\s*week:\\s*${week},[^}]+\\}`, 's');
    const hymnMatch = content.match(hymnEntryRegex);
    
    if (hymnMatch && hymnMatch[0].includes('pianoAudioUrl')) {
      console.log(`⏭️  Week ${week}: Already has pianoAudioUrl`);
      continue;
    }
    
    // Add pianoAudioUrl after pdfUrl
    const replacement = `${beforePiano}\n    pianoAudioUrl: \`${url}\`,`;
    content = content.replace(weekRegex, replacement);
    updatedCount++;
    console.log(`✅ Week ${week}: Added piano URL`);
  } else {
    console.log(`❌ Week ${week}: Could not find hymn entry`);
  }
}

// Write the updated content
fs.writeFileSync(hymnsDataPath, content, 'utf8');

console.log(`\n✅ Done! Updated ${updatedCount} hymns with piano accompaniment URLs`);

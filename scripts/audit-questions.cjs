/**
 * Audit Curriculum CSV - Check Reflection Question Alignment
 *
 * Parses curriculum-template.csv and reports on whether reflection questions
 * match their corresponding Bible readings.
 *
 * Usage:
 *   node scripts/audit-questions.cjs [path-to-csv]
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Biblical book groupings for heuristic matching
const BOOK_KEYWORDS = {
  genesis: ['genesis', 'gen', 'creation', 'adam', 'eve', 'noah', 'abraham', 'isaac', 'jacob', 'joseph', 'pharaoh'],
  exodus: ['exodus', 'ex', 'moses', 'red sea', 'plagues', 'passover', 'sinai', 'tabernacle'],
  leviticus: ['leviticus', 'lev', 'sacrifice', 'offering', 'priest', 'atonement', 'holy'],
  numbers: ['numbers', 'num', 'wilderness', 'spies', 'kadesh'],
  deuteronomy: ['deuteronomy', 'deut', 'covenant', 'law'],
  joshua: ['joshua', 'josh', 'jericho', 'canaan', 'conquest', 'rahab', 'jordan crossing'],
  judges: ['judges', 'judg', 'gideon', 'samson', 'deborah', 'barak'],
  ruth: ['ruth', 'boaz', 'naomi'],
  '1samuel': ['1 sam', '1sam', 'samuel', 'saul', 'hannah', 'eli', 'goliath'],
  '2samuel': ['2 sam', '2sam', 'david', 'absalom', 'amnon', 'bathsheba', 'uriah', 'joab', 'nathan'],
  '1kings': ['1 king', '1king', 'solomon', 'elijah', 'rehoboam', 'jeroboam', 'ahab'],
  '2kings': ['2 king', '2king', 'elisha', 'hezekiah', 'josiah', 'naaman'],
  '1chronicles': ['1 chron', '1chron'],
  '2chronicles': ['2 chron', '2chron'],
  ezra: ['ezra', 'rebuild', 'temple rebuild'],
  nehemiah: ['nehemiah', 'wall', 'rebuild wall'],
  esther: ['esther', 'mordecai', 'haman'],
  job: ['job'],
  psalms: ['psalm', 'psm'],
  proverbs: ['proverbs', 'prov'],
  ecclesiastes: ['ecclesiastes', 'eccl'],
  isaiah: ['isaiah', 'isa'],
  jeremiah: ['jeremiah', 'jer'],
  lamentations: ['lamentations', 'lam'],
  ezekiel: ['ezekiel', 'ezek'],
  daniel: ['daniel', 'dan', 'nebuchadnezzar', 'belshazzar', 'babylon', 'lion'],
  hosea: ['hosea'],
  joel: ['joel'],
  amos: ['amos'],
  obadiah: ['obadiah'],
  jonah: ['jonah', 'nineveh'],
  micah: ['micah'],
  nahum: ['nahum'],
  habakkuk: ['habakkuk'],
  zephaniah: ['zephaniah'],
  haggai: ['haggai'],
  zechariah: ['zechariah'],
  malachi: ['malachi'],
  matthew: ['matthew', 'matt', 'magi', 'wise men'],
  mark: ['mark'],
  luke: ['luke', 'lazarus', 'prodigal', 'good samaritan'],
  john: ['john', 'jn', 'lazarus'],
  acts: ['acts', 'pentecost', 'paul', 'barnabas', 'silas', 'antioch', 'missionary'],
  romans: ['romans', 'rom'],
  '1corinthians': ['1 cor', '1cor'],
  '2corinthians': ['2 cor', '2cor'],
  galatians: ['galatians', 'gal'],
  ephesians: ['ephesians', 'eph'],
  philippians: ['philippians', 'phil'],
  colossians: ['colossians', 'col'],
  '1thessalonians': ['1 thess', '1thess'],
  '2thessalonians': ['2 thess', '2thess'],
  '1timothy': ['1 tim', '1tim'],
  '2timothy': ['2 tim', '2tim'],
  titus: ['titus'],
  philemon: ['philemon'],
  hebrews: ['hebrews', 'heb'],
  james: ['james'],
  '1peter': ['1 pet', '1pet'],
  '2peter': ['2 pet', '2pet'],
  '1john': ['1 john', '1jn'],
  '2john': ['2 john', '2jn'],
  '3john': ['3 john', '3jn'],
  jude: ['jude'],
  revelation: ['revelation', 'rev', 'apocalypse'],
};

/**
 * Detect which biblical book a reference string points to
 */
function detectBook(reference) {
  const ref = reference.toLowerCase();
  // Match the book name from the reference (e.g., "Josh 5:13-6:27" -> "josh")
  const match = ref.match(/^(\d?\s*[a-z]+)/);
  return match ? match[1].trim() : ref;
}

/**
 * Check if questions text seems related to a given reference
 */
function questionsMatchReference(reference, questionsText) {
  if (!questionsText || !reference) return { match: 'unknown', reason: 'missing data' };

  const refLower = reference.toLowerCase();
  const qLower = questionsText.toLowerCase();
  const bookRef = detectBook(refLower);

  // Find which book group the reference belongs to
  let refGroup = null;
  for (const [group, keywords] of Object.entries(BOOK_KEYWORDS)) {
    for (const kw of keywords) {
      if (bookRef.includes(kw) || refLower.includes(kw)) {
        refGroup = group;
        break;
      }
    }
    if (refGroup) break;
  }

  // Check if questions mention characters/themes from a DIFFERENT book group
  const foreignMatches = [];
  for (const [group, keywords] of Object.entries(BOOK_KEYWORDS)) {
    if (group === refGroup) continue;
    for (const kw of keywords) {
      if (kw.length >= 4 && qLower.includes(kw)) {
        foreignMatches.push({ group, keyword: kw });
      }
    }
  }

  if (foreignMatches.length > 0) {
    const foreignGroups = [...new Set(foreignMatches.map(m => m.group))];
    return {
      match: 'mismatch',
      reason: `Questions mention ${foreignGroups.join(', ')} content but reference is ${refGroup || bookRef}`,
      foreignMatches
    };
  }

  return { match: 'likely_ok', reason: 'No obvious foreign content detected' };
}

function parseCurriculumCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath, { encoding: 'utf8' })
      .pipe(csv())
      .on('data', (row) => {
        const week = parseInt(row.week);
        const dayValue = parseInt(row.day);
        const dayInWeek = dayValue > 5 ? ((dayValue - 1) % 5) + 1 : dayValue;

        results.push({
          row: results.length + 1,
          week,
          day: dayInWeek,
          absoluteDay: dayValue,
          title: (row.title || '').trim(),
          reference: (row.reference || '').trim(),
          questions: (row.questions || '').trim(),
        });
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

async function main() {
  const csvPath = process.argv[2] || 'curriculum-template.csv';
  const fullPath = path.resolve(csvPath);

  console.log(`\n📋 Curriculum Questions Audit`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`File: ${fullPath}\n`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }

  const data = await parseCurriculumCSV(fullPath);
  console.log(`Total rows: ${data.length}\n`);

  let matchCount = 0;
  let mismatchCount = 0;
  let unknownCount = 0;
  let noQuestionsCount = 0;
  const mismatches = [];

  // Console report
  for (const row of data) {
    const qPreview = row.questions
      ? row.questions.substring(0, 100).replace(/\n/g, ' ') + (row.questions.length > 100 ? '...' : '')
      : '(no questions)';

    if (!row.questions) {
      noQuestionsCount++;
      continue;
    }

    const result = questionsMatchReference(row.reference, row.questions);

    if (result.match === 'mismatch') {
      mismatchCount++;
      mismatches.push({ ...row, reason: result.reason });
      console.log(`❌ Row ${String(row.row).padStart(3)} | W${String(row.week).padStart(2)}D${row.day} | ${row.reference.padEnd(25)} | ${qPreview}`);
      console.log(`   ↳ ${result.reason}`);
    } else if (result.match === 'likely_ok') {
      matchCount++;
    } else {
      unknownCount++;
    }
  }

  // Summary
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Likely correct:  ${matchCount}`);
  console.log(`  ❌ Mismatched:      ${mismatchCount}`);
  console.log(`  ❓ Unknown:         ${unknownCount}`);
  console.log(`  📭 No questions:    ${noQuestionsCount}`);
  console.log(`  📄 Total rows:      ${data.length}`);

  if (mismatches.length > 0) {
    console.log(`\n⚠️  First mismatch at row ${mismatches[0].row} (Week ${mismatches[0].week}, Day ${mismatches[0].day})`);
  }

  // Generate audit CSV
  const auditPath = path.resolve(path.dirname(fullPath), 'curriculum-audit.csv');
  const csvHeader = 'row,week,day,reference,title,questions_preview,status\n';
  const csvRows = data.map(row => {
    const result = row.questions
      ? questionsMatchReference(row.reference, row.questions)
      : { match: 'no_questions' };
    const qPreview = row.questions
      ? `"${row.questions.substring(0, 150).replace(/"/g, '""').replace(/\n/g, ' ')}"`
      : '';
    return `${row.row},${row.week},${row.day},"${row.reference}","${row.title}",${qPreview},${result.match}`;
  }).join('\n');

  fs.writeFileSync(auditPath, csvHeader + csvRows, 'utf8');
  console.log(`\n📄 Audit CSV saved to: ${auditPath}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

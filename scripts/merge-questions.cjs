/**
 * Merge Missing Questions into Fixed CSV
 *
 * Takes the filled-in missing-questions-template.csv and merges the questions
 * into curriculum-template-fixed.csv.
 *
 * Usage:
 *   node scripts/merge-questions.cjs [template-csv] [fixed-csv]
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const TEMPLATE_FILE = path.resolve(process.argv[2] || 'missing-questions-template.csv');
const FIXED_FILE = path.resolve(process.argv[3] || 'curriculum-template-fixed.csv');

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath, { encoding: 'utf8' })
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

function csvEscape(value) {
  if (!value) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function rowToCSV(row, columns) {
  return columns.map(col => csvEscape(row[col] || '')).join(',');
}

async function main() {
  console.log(`\n🔗 Merge Missing Questions`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`Template: ${TEMPLATE_FILE}`);
  console.log(`Fixed CSV: ${FIXED_FILE}\n`);

  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error(`Template not found: ${TEMPLATE_FILE}`);
    process.exit(1);
  }
  if (!fs.existsSync(FIXED_FILE)) {
    console.error(`Fixed CSV not found: ${FIXED_FILE}`);
    process.exit(1);
  }

  const templateRows = await parseCSV(TEMPLATE_FILE);
  const fixedRows = await parseCSV(FIXED_FILE);

  // Build a map of row number → questions from the template
  const questionsMap = new Map();
  let filledCount = 0;
  let emptyCount = 0;

  for (const tRow of templateRows) {
    const rowNum = parseInt(tRow.row);
    const questions = (tRow.questions || '').trim();
    if (questions) {
      questionsMap.set(rowNum, questions);
      filledCount++;
    } else {
      emptyCount++;
    }
  }

  console.log(`Template: ${filledCount} filled, ${emptyCount} still empty\n`);

  if (emptyCount > 0) {
    console.log(`⚠️  Warning: ${emptyCount} rows in the template still have no questions.`);
    console.log(`   These rows will remain without reflection questions.\n`);
  }

  // Merge questions into the fixed CSV rows
  let mergedCount = 0;
  for (let i = 0; i < fixedRows.length; i++) {
    const rowNum = i + 1;
    if (questionsMap.has(rowNum)) {
      fixedRows[i].questions = questionsMap.get(rowNum);
      mergedCount++;
    }
  }

  // Write the merged CSV
  const columns = Object.keys(fixedRows[0]);
  const csvContent = columns.join(',') + '\n' +
    fixedRows.map(r => rowToCSV(r, columns)).join('\n') + '\n';
  fs.writeFileSync(FIXED_FILE, csvContent, 'utf8');

  console.log(`✅ Merged ${mergedCount} questions into ${FIXED_FILE}`);

  // Count total questions coverage
  let withQuestions = 0;
  let withoutQuestions = 0;
  for (const row of fixedRows) {
    if ((row.questions || '').trim()) {
      withQuestions++;
    } else {
      withoutQuestions++;
    }
  }

  console.log(`\n📊 Coverage: ${withQuestions}/${fixedRows.length} rows have questions (${withoutQuestions} missing)\n`);

  if (withoutQuestions === 0) {
    console.log(`🎉 All rows now have reflection questions!`);
    console.log(`\n📋 Next steps:`);
    console.log(`  1. Run: node scripts/audit-questions.cjs curriculum-template-fixed.csv  (to verify)`);
    console.log(`  2. Run: node scripts/import-curriculum.cjs curriculum-template-fixed.csv  (to import to Firestore)\n`);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

/**
 * Fix Questions Alignment in Curriculum CSV
 *
 * The curriculum-template.csv has a systematic misalignment where the
 * `questions` column is shifted forward by 50 rows starting at row 51.
 * This script:
 *   1. Reads the original CSV
 *   2. Keeps rows 1-50 as-is (correctly aligned)
 *   3. Shifts questions from rows 51-210 → rows 101-260
 *   4. Leaves rows 51-100 with empty questions (generates a template for these)
 *   5. Saves orphaned questions from rows 211-260 for review
 *   6. Outputs the corrected CSV
 *
 * Usage:
 *   node scripts/fix-questions-alignment.cjs [shift-amount]
 *
 *   shift-amount: Number of rows to shift (default: 50)
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const SHIFT = parseInt(process.argv[2]) || 50;
const INPUT_FILE = path.resolve('curriculum-template.csv');
const OUTPUT_FILE = path.resolve('curriculum-template-fixed.csv');
const MISSING_TEMPLATE = path.resolve('missing-questions-template.csv');
const ORPHANED_FILE = path.resolve('orphaned-questions.csv');

/**
 * Parse CSV into array of raw row objects preserving all columns
 */
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath, { encoding: 'utf8' })
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

/**
 * Escape a field for CSV output (handles commas, quotes, newlines)
 */
function csvEscape(value) {
  if (!value) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Convert a row object to a CSV line
 */
function rowToCSV(row, columns) {
  return columns.map(col => csvEscape(row[col] || '')).join(',');
}

async function main() {
  console.log(`\n🔧 Fix Questions Alignment`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`Input:  ${INPUT_FILE}`);
  console.log(`Shift:  ${SHIFT} rows\n`);

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`File not found: ${INPUT_FILE}`);
    process.exit(1);
  }

  const rows = await parseCSV(INPUT_FILE);
  console.log(`Parsed ${rows.length} rows\n`);

  const columns = Object.keys(rows[0]);
  console.log(`Columns: ${columns.join(', ')}\n`);

  // Split threshold: row index 50 (0-indexed) = row 51 (1-indexed)
  // Rows 1-50 are correctly aligned; rows 51+ have questions shifted forward by 50
  const SPLIT_INDEX = 50;

  // Extract all questions
  const allQuestions = rows.map(r => (r.questions || '').trim());

  // Build the fixed questions array
  const fixedQuestions = new Array(rows.length).fill('');

  // Keep rows 0-49 (rows 1-50) as-is
  for (let i = 0; i < SPLIT_INDEX; i++) {
    fixedQuestions[i] = allQuestions[i];
  }

  // Shift questions from rows 50-209 → rows 100-259
  // (i.e., questions at index 50 go to index 50 + SHIFT = 100)
  const orphanedQuestions = [];
  for (let i = SPLIT_INDEX; i < rows.length; i++) {
    const targetIndex = i + SHIFT;
    if (targetIndex < rows.length) {
      fixedQuestions[targetIndex] = allQuestions[i];
    } else {
      // These questions have no valid target row - they're orphaned
      orphanedQuestions.push({
        originalRow: i + 1,
        week: rows[i].week,
        day: rows[i].day,
        reference: rows[i].reference,
        title: rows[i].title,
        questions: allQuestions[i],
      });
    }
  }

  // Apply fixed questions back to rows
  for (let i = 0; i < rows.length; i++) {
    rows[i].questions = fixedQuestions[i];
  }

  // Write the fixed CSV
  const csvContent = columns.join(',') + '\n' +
    rows.map(r => rowToCSV(r, columns)).join('\n') + '\n';
  fs.writeFileSync(OUTPUT_FILE, csvContent, 'utf8');
  console.log(`✅ Fixed CSV saved to: ${OUTPUT_FILE}`);

  // Identify rows with missing questions (rows 51-100)
  const missingRows = [];
  for (let i = SPLIT_INDEX; i < SPLIT_INDEX + SHIFT && i < rows.length; i++) {
    if (!fixedQuestions[i]) {
      missingRows.push({
        row: i + 1,
        week: rows[i].week,
        day: rows[i].day,
        reference: (rows[i].reference || '').trim(),
        title: (rows[i].title || '').trim(),
      });
    }
  }

  // Write missing questions template
  if (missingRows.length > 0) {
    const templateHeader = 'row,week,day,reference,title,questions\n';
    const templateRows = missingRows.map(r =>
      `${r.row},${r.week},${r.day},${csvEscape(r.reference)},${csvEscape(r.title)},`
    ).join('\n');
    fs.writeFileSync(MISSING_TEMPLATE, templateHeader + templateRows + '\n', 'utf8');
    console.log(`📝 Missing questions template: ${MISSING_TEMPLATE} (${missingRows.length} rows need questions)`);
  }

  // Write orphaned questions
  if (orphanedQuestions.length > 0) {
    const orphanHeader = 'original_row,week,day,reference,title,questions\n';
    const orphanRows = orphanedQuestions.map(r =>
      `${r.originalRow},${r.week},${r.day},${csvEscape(r.reference)},${csvEscape(r.title)},${csvEscape(r.questions)}`
    ).join('\n');
    fs.writeFileSync(ORPHANED_FILE, orphanHeader + orphanRows + '\n', 'utf8');
    console.log(`📦 Orphaned questions saved: ${ORPHANED_FILE} (${orphanedQuestions.length} questions with no target row)`);
  }

  // Summary
  console.log(`\n📊 Summary:`);
  console.log(`  Rows unchanged (1-${SPLIT_INDEX}):     ${SPLIT_INDEX}`);
  console.log(`  Rows with shifted questions:  ${Math.min(rows.length - SPLIT_INDEX, rows.length - SPLIT_INDEX - SHIFT + SHIFT)}`);
  console.log(`  Rows needing questions:       ${missingRows.length} (rows ${SPLIT_INDEX + 1}-${SPLIT_INDEX + SHIFT})`);
  console.log(`  Orphaned questions:           ${orphanedQuestions.length}`);

  console.log(`\n📋 Next steps:`);
  console.log(`  1. Open ${MISSING_TEMPLATE} and fill in the questions column from your original curriculum`);
  console.log(`  2. Run: node scripts/merge-questions.cjs  (to merge filled template into fixed CSV)`);
  console.log(`  3. Run: node scripts/audit-questions.cjs curriculum-template-fixed.csv  (to verify)`);
  console.log(`  4. Run: node scripts/import-curriculum.cjs curriculum-template-fixed.csv  (to import to Firestore)\n`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

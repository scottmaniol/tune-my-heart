# Curriculum Import Guide

This guide explains how to import your curriculum data into Firestore using a spreadsheet and automated scripts.

## Overview

The system allows you to manage all 260 days of curriculum content (Summary, Study Notes, Devotional, Reflection Questions) in a spreadsheet, then import it all to Firestore with a single command.

---

## 📋 Step 1: Prepare Your Data in a Spreadsheet

### Option A: Use Google Sheets (Recommended)
1. Open the template file: `curriculum-template.csv`
2. Import it into Google Sheets (File → Import)
3. Fill in your curriculum data for all 260 days (52 weeks × 5 days)

### Option B: Use Excel
1. Open `curriculum-template.csv` in Excel
2. Fill in your data
3. Save as CSV when done

### Spreadsheet Columns

| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| `week` | Week number (1-52) | ✅ Yes | 1 |
| `day` | Day number (1-5) | ✅ Yes | 1 |
| `title` | Reading title | ✅ Yes | Creation |
| `reference` | Scripture reference | ✅ Yes | Gen 1:1–2:3 |
| `summary` | Theological summary | ⚪ Optional | Genesis 1 establishes God as... |
| `studyNotes` | Verse-by-verse notes | ⚪ Optional | Chapter 1, Verse 1. ... |
| `devotional` | Daily devotional | ⚪ Optional | [Devotional content] |
| `questions` | All reflection questions (one per line) | ⚪ Optional | Why do you think...?<br>What is our...?<br>What does it mean...? |

### Tips for Data Entry

**Multi-line Text:**
- Spreadsheets handle multi-line text well
- Press `Alt+Enter` (Windows) or `Option+Return` (Mac) for line breaks
- The import script will preserve formatting

**Study Notes Formatting:**
- Use this pattern for automatic italicizing:
  ```
  Chapter 1, Verse 1. Word. Explanation here.
  Verse 2. Another word. More explanation.
  ```
- The app will automatically italicize "Chapter X, Verse Y. Word."

**Reflection Questions:**
- Put all questions in the single `questions` column
- Each question on its own line (press Alt+Enter or Option+Return)
- The import script will automatically split them into an array
- Example in cell:
  ```
  Why do you think God created the world in the order that he did?
  What is our responsibility toward God as his creation?
  What does it mean to have dominion over the earth?
  ```

**Quotes in Text:**
- Use double quotes: `"good"`
- The CSV parser handles them correctly

---

## 🔧 Step 2: Set Up Firebase Admin

Before importing, you need a Firebase Admin SDK key:

### Get Your Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (⚙️ icon) → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the downloaded JSON file as `.firebase-admin-key.json` in your project root

### Security Warning
⚠️ **NEVER commit this file to Git!**

The `.gitignore` already includes it:
```
.firebase-admin-key.json
```

---

## 📦 Step 3: Install Required Packages

```bash
npm install csv-parser firebase-admin --save-dev
```

---

## 🚀 Step 4: Export Your Spreadsheet as CSV

### Google Sheets:
1. File → Download → Comma Separated Values (.csv)
2. Save as `curriculum-data.csv` in your project root

### Excel:
1. File → Save As
2. Choose "CSV (Comma delimited)" format
3. Save as `curriculum-data.csv` in your project root

---

## ⬆️ Step 5: Import to Firestore

Run the import script:

```bash
npm run import-curriculum curriculum-data.csv
```

The script will:
1. ✅ Parse the CSV file
2. ✅ Validate the data
3. ✅ Upload to Firestore in batches
4. ✅ Show progress updates

### Expected Output:
```
📚 Importing Curriculum Data to Firestore
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reading from: /path/to/curriculum-data.csv

✓ Parsed 260 curriculum items from CSV

Uploading 260 items to Firestore...
✓ Successfully uploaded 260 curriculum items to Firestore

✨ Import complete!

You can now view the data in Firebase Console:
https://console.firebase.google.com/project/YOUR_PROJECT/firestore/data/curriculum
```

---

## 🔍 Step 6: Verify the Import

### In Firebase Console:
1. Go to Firestore Database
2. Look for the `curriculum` collection
3. You should see documents like:
   - `week1-day1`
   - `week1-day2`
   - etc.

### In Your App:
1. Run `npm run dev`
2. Navigate to the Reading Plan page
3. The curriculum content should now load from Firestore!

---

## 🔄 Updating Curriculum Data

### To Update Existing Data:

1. Edit your spreadsheet
2. Export as CSV again
3. Run the import script again:
   ```bash
   npm run import-curriculum curriculum-data.csv
   ```

The script will **overwrite** existing data with the same week/day.

---

## 🛠️ Troubleshooting

### "Module not found: csv-parser"
```bash
npm install csv-parser --save-dev
```

### "Firebase Admin not initialized"
- Make sure `.firebase-admin-key.json` exists in project root
- Verify the file is valid JSON
- Check Firebase project ID matches

### "Permission denied" errors
- Check Firestore security rules
- The admin SDK bypasses rules, but check your Firebase IAM permissions

### CSV Parsing Issues
- Ensure your CSV is properly formatted
- Check for unescaped quotes
- Try opening the CSV in a text editor to verify structure

---

## 📊 Firestore Structure

Each document in the `curriculum` collection has this structure:

```typescript
{
  week: number;              // 1-52
  day: number;               // 1-5
  title: string;             // "Creation"
  reference: string;         // "Gen 1:1–2:3"
  summary: string | null;    // Theological summary
  studyNotes: string | null; // Verse notes
  devotional: string | null; // Daily devotional
  reflectionQuestions: string[] | null; // Array of questions
}
```

**Document ID Format:** `week{X}-day{Y}`
- Example: `week1-day1`, `week12-day3`

---

## 🎯 App Integration

### How It Works:

1. **Firestore First:** App tries to fetch from Firestore
2. **Fallback:** If Firestore fails, uses local TypeScript data
3. **Caching:** Data is cached in memory after first fetch
4. **Performance:** Very fast after initial load

### Code Location:
- Service: `src/services/curriculumService.ts`
- Component: `src/pages/ReadingPlan.tsx`
- Types: `src/types/curriculum.ts`

---

## 💡 Advanced Tips

### Bulk Import Testing
Test with a small CSV first (e.g., Week 1 only):
```bash
npm run import-curriculum test-week1.csv
```

### Clear Firestore Data
Currently manual via Firebase Console. Future: Add clear script.

### Backup Your Data
Export from Firestore periodically:
1. Firebase Console → Firestore → Export/Import
2. Or create a backup script

---

## 📝 Next Steps

1. ✅ Fill out your spreadsheet with all 260 days
2. ✅ Test import with a few days first
3. ✅ Import all data
4. ✅ Verify in app
5. ✅ Share with users!

---

## 🆘 Need Help?

Common issues and solutions are in the Troubleshooting section above. For other issues, check:
- Firebase Console for error logs
- Browser console for client-side errors
- Node console for import script errors

---

## 📚 Additional Resources

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Firestore Data Model](https://firebase.google.com/docs/firestore/data-model)
- [CSV Format Guide](https://en.wikipedia.org/wiki/Comma-separated_values)

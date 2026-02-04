# Catechism Data Fix Instructions

## Current Issue
The `src/data/catechismData.ts` file has syntax errors and needs to be regenerated with the correct week alignment.

## The Problem
Week 1 of the catechism contains **TWO questions**:
1. "Who made you?" 
2. "What else did God make?"

This means the current data structure is misaligned by 1 week starting from week 2.

## Solution: Regenerate Using the Script

### Step 1: Get an ESV API Key
1. Go to https://api.esv.org/
2. Sign up for a free account
3. Get your API key

### Step 2: Update the Script
The script `scripts/populate-catechism.cjs` has been partially updated but still has duplicates in weeks 9-52 that need to be manually removed. 

**Alternatively**, you can manually edit the script to match your corrected list exactly, ensuring each week 1-52 has the correct question.

### Step 3: Run the Script
```bash
ESV_API_KEY=your_actual_api_key_here node scripts/populate-catechism.cjs
```

This will:
- Fetch all scripture texts from the ESV API
- Generate a properly formatted `catechismData.ts` file
- Handle quote escaping correctly

### Step 4: Verify
Check that:
- Week 1 shows: "Who made you? What else did God make?"
- Week 2 shows: "Why did God make you and all things?"
- Week 3 shows: "How did God make you and all things?"
- etc.

## Quick Fix (Temporary)

If you need the app running NOW while you work on the full fix:

1. Restore the original catechismData.ts from a backup or git
2. Or manually fix just the syntax errors in the current file (escaping quotes in proof texts)

## Current Status

✅ Audio button logic is correct (handles Q1a.mp3, Q1b.mp3 for week 1)
✅ Storage rules deployed  
✅ Catechism UI with review system working
❌ catechismData.ts has syntax errors and incorrect week alignment

## Need Help?

The core issue is in the `catechismData` array in `scripts/populate-catechism.cjs` lines 106-160. You need to ensure there are exactly 52 unique week entries with no duplicates.

# Catechism Scripture Population Script

This script automatically populates all memory verses and proof texts for the 52-week catechism using the ESV  API.

## Prerequisites

1. **Get a FREE ESV API Key**
   - Visit: https://api.esv.org/
   - Click "Get API Access"
   - Sign up (takes 2-3 minutes)
   - Copy your API key

## Running the Script

### Step 1: Set your API key

```bash
export ESV_API_KEY=your_actual_api_key_here
```

### Step 2: Run the script

```bash
node scripts/populate-catechism.js
```

### What It Does:

The script will:
- Fetch ESV text for all 52 memory verses
- Fetch ESV text for ~200+ proof text references
- Add child-friendly answer portions (italicized in original)
- Generate updated `src/data/catechismData.ts`

**Estimated Time:** 15-20 minutes (rate limiting = 500ms between requests)

### Output:

You'll see progress like this:

```
Starting scripture population...

Processing Week 1: Who made you?
  Fetching memory verse: Gen 1:1
  Fetching proof text: Gen 1:26-27
  Fetching proof text: Gen 2:7
  ✓ Week 1 complete

Processing Week 2: What else did God make?
  ...
```

When complete:
```
✅ SUCCESS! Catechism data written to: src/data/catechismData.ts

Next steps:
1. Review the generated file
2. Update the Catechism.tsx component to use answerChild  
3. Test in the browser
```

## After Running

1. **Review the generated file** - Check `src/data/catechismData.ts`
2. **Update Catechism.tsx** - I'll help you update the component to display child-friendly answers
3. **Test** - Your catechism page will now show full scripture text!

## Troubleshooting

**Error: "Please set your ESV_API_KEY"**
- Make sure you exported the API key: `export ESV_API_KEY=your_key`
- Try running both commands on one line:
  ```bash
  ESV_API_KEY=your_key node scripts/populate-catechism.js
  ```

**Rate Limiting Errors**
- Script includes 500ms delays between requests
- If you hit rate limits, increase delay in script (line 64)

**Failed to fetch scripture**
- Check your internet connection
- Verify API key is valid
- Some references may need manual review

## What Gets Generated

Each question will have:
- Full answer text
- Child-friendly answer (italicized portion from original)
- Full text of memory verse
- Full text of all proof texts

Example output:
```typescript
{
  week: 1,
  question: "Who made you?",
  answer: "God made me.",
  answerChild: "God made me.",
  proofTexts: [
    {
      reference: "Gen 1:26-27",
      text: "Then God said, 'Let us make man in our image...'"
    },
    // ... more proof texts with full text
  ],
  memoryVerse: {
    reference: "Gen 1:1",
    text: "In the beginning, God created the heavens and the earth."
  }
}
```

## Ready?

1. Get your ESV API key: https://api.esv.org/
2. Run: `ESV_API_KEY=your_key node scripts/populate-catechism.js`
3. Wait 15-20 minutes
4. Review the output
5. Let me know when it's done, and I'll update the Catechism component!

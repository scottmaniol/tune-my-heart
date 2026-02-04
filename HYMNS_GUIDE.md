# Hymnal Resources Guide

## Overview

The Hymnal feature displays all 52 weekly hymns with the following resources:
- **Lyrics** - Full text of the hymn
- **PDF Sheet Music** - Downloadable and viewable sheet music
- **Piano Accompaniment** - Audio file for piano/organ accompaniment
- **Vocal Performance** - Audio file with vocal performance to learn melody

## Directory Structure

```
public/hymns/
├── pdfs/              # PDF sheet music files
├── audio/
│   ├── piano/         # Piano accompaniment audio files
│   └── vocal/         # Vocal performance audio files
```

## Adding Hymn Resources

### 1. Adding Lyrics

Edit `src/data/hymnsData.ts` and add the `lyrics` property to the hymn object:

```typescript
{
  week: 1,
  title: "All Creatures of Our God and King",
  author: "Francis of Assisi (1225), trans. William H. Draper (1919)",
  tuneNote: "LASST UNS ERFREUEN",
  lyrics: `All creatures of our God and King,
Lift up your voice and with us sing,
Alleluia! Alleluia!
Thou burning sun with golden beam,
Thou silver moon with softer gleam!

Chorus:
O praise Him! O praise Him!
Alleluia! Alleluia! Alleluia!

[Additional verses...]`
}
```

**Tips for Lyrics:**
- Use backticks (\`) for multi-line strings
- Separate verses with blank lines
- Include choruses/refrains
- Preserve original punctuation and capitalization

### 2. Adding PDF Sheet Music

1. **File Naming Convention**: `week-[number]-[hymn-slug].pdf`
   - Example: `week-01-all-creatures.pdf`
   - Use lowercase, hyphen-separated names

2. **Save to**: `public/hymns/pdfs/`

3. **Update hymnsData.ts**:
```typescript
{
  week: 1,
  title: "All Creatures of Our God and King",
  pdfUrl: "/hymns/pdfs/week-01-all-creatures.pdf",
  // ... other properties
}
```

**Sources for Public Domain Sheet Music:**
- [CPDL (Choral Public Domain Library)](http://www.cpdl.org/)
- [IMSLP (Petrucci Music Library)](https://imslp.org/)
- [Hymnary.org](https://hymnary.org/)
- [Cyberhymnal](http://www.hymntime.com/tch/)

### 3. Adding Piano Accompaniment Audio

1. **File Naming Convention**: `week-[number]-piano.mp3`
   - Example: `week-01-piano.mp3`

2. **Save to**: `public/hymns/audio/piano/`

3. **Update hymnsData.ts**:
```typescript
{
  week: 1,
  title: "All Creatures of Our God and King",
  pianoAudioUrl: "/hymns/audio/piano/week-01-piano.mp3",
  // ... other properties
}
```

**Audio Format Requirements:**
- Format: MP3 or M4A (MP3 recommended for broad compatibility)
- Bitrate: 128-192 kbps (good quality, reasonable file size)
- Sample Rate: 44.1 kHz
- Mono or Stereo: Stereo preferred

**Sources for Hymn Recordings:**
- Record your own piano/organ accompaniment
- [Cyberhymnal](http://www.hymntime.com/tch/) (MIDI files can be converted)
- Commission recordings from musicians
- Check Creative Commons music repositories

### 4. Adding Vocal Performance Audio

1. **File Naming Convention**: `week-[number]-vocal.mp3`
   - Example: `week-01-vocal.mp3`

2. **Save to**: `public/hymns/audio/vocal/`

3. **Update hymnsData.ts**:
```typescript
{
  week: 1,
  title: "All Creatures of Our God and King",
  vocalAudioUrl: "/hymns/audio/vocal/week-01-vocal.mp3",
  // ... other properties
}
```

**Recording Tips:**
- Include all verses
- Clear pronunciation for learning
- Moderate tempo (not too fast)
- Consider including multiple voice parts if applicable

## Complete Example

Here's a fully populated hymn entry:

```typescript
{
  week: 1,
  title: "All Creatures of Our God and King",
  author: "Francis of Assisi (1225), trans. William H. Draper (1919)",
  tuneNote: "LASST UNS ERFREUEN",
  lyrics: `All creatures of our God and King,
Lift up your voice and with us sing,
Alleluia! Alleluia!
Thou burning sun with golden beam,
Thou silver moon with softer gleam!

Chorus:
O praise Him! O praise Him!
Alleluia! Alleluia! Alleluia!

Thou rushing wind that art so strong,
Ye clouds that sail in heaven along,
O praise Him! Alleluia!
Thou rising morn, in praise rejoice,
Ye lights of evening, find a voice!

Thou flowing water, pure and clear,
Make music for thy Lord to hear,
Alleluia! Alleluia!
Thou fire so masterful and bright,
That givest man both warmth and light!

Dear mother earth, who day by day
Unfoldest blessings on our way,
O praise Him! Alleluia!
The flowers and fruits that in thee grow,
Let them His glory also show!

And all ye men of tender heart,
Forgiving others, take your part,
O sing ye! Alleluia!
Ye who long pain and sorrow bear,
Praise God and on Him cast your care!

Let all things their Creator bless,
And worship Him in humbleness,
O praise Him! Alleluia!
Praise, praise the Father, praise the Son,
And praise the Spirit, Three in One!`,
  pdfUrl: "/hymns/pdfs/week-01-all-creatures.pdf",
  pianoAudioUrl: "/hymns/audio/piano/week-01-piano.mp3",
  vocalAudioUrl: "/hymns/audio/vocal/week-01-vocal.mp3"
}
```

## Testing

After adding resources:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Hymnal page

3. Select the week you just added resources for

4. Verify:
   - ✅ Lyrics display correctly with proper formatting
   - ✅ PDF opens and displays in the iframe
   - ✅ PDF download link works
   - ✅ Piano audio plays
   - ✅ Vocal audio plays
   - ✅ No 404 errors in browser console

## Copyright Considerations

### Public Domain Hymns
Most traditional hymns written before 1928 are in the public domain in the USA:
- All 52 hymns in this curriculum are traditional and public domain
- Authors lived in the 18th-19th centuries
- Tunes are also traditional and public domain

### Important Notes
- **Arrangements**: Some modern arrangements may still be copyrighted
- **Recordings**: Performance recordings may have separate copyright
- **Sheet Music**: Modern engravings may have layout copyright
- Always verify public domain status for your jurisdiction
- When in doubt, create your own arrangements/recordings or obtain licenses

## Batch Processing

### Converting MIDI to MP3 (for background tracks)
```bash
# Using timidity and ffmpeg
timidity input.mid -Ow -o - | ffmpeg -i - -acodec libmp3lame -ab 192k output.mp3
```

### Optimizing PDF Size
```bash
# Using Ghostscript
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
```

### Batch Renaming
```bash
# Example: rename files to match convention
for i in *.pdf; do
  mv "$i" "week-$(printf %02d $counter)-$(echo ${i%.pdf} | tr ' ' '-' | tr '[:upper:]' '[:lower:]').pdf"
  ((counter++))
done
```

## Contribution Workflow

1. **Choose a hymn** from the list in `src/data/hymnsData.ts`
2. **Gather resources** (lyrics, sheet music, audio)
3. **Add files** to appropriate directories
4. **Update hymnsData.ts** with file paths
5. **Test** in development mode
6. **Commit** changes with descriptive message:
   ```bash
   git add .
   git commit -m "Add resources for Week X: [Hymn Title]"
   ```

## Progress Tracking

Create a checklist to track which hymns have complete resources:

- [ ] Week 1: All Creatures of Our God and King
- [ ] Week 2: The God of Abraham Praise
- [ ] Week 3: Sing Praise to God Who Reigns Above
- [ ] Week 4: Not What These Hands Have Done
- [ ] Week 5: Blessed Jesus at Thy Word
- [ ] (etc... continue for all 52 weeks)

## Need Help?

- Check existing completed hymns for examples
- Review the Hymnal.tsx component to understand how resources are displayed
- Test thoroughly in development before deploying

---

**Note**: The hymnal interface gracefully handles missing resources by displaying informative messages, so you can add resources incrementally as they become available.

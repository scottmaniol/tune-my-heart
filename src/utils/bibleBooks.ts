/**
 * Bible Book Name Mappings
 * Maps abbreviated book names to their full names
 */

export const bibleBookAbbreviations: { [key: string]: string } = {
  // Old Testament
  'Gen': 'Genesis',
  'Ex': 'Exodus',
  'Lev': 'Leviticus',
  'Num': 'Numbers',
  'Deut': 'Deuteronomy',
  'Josh': 'Joshua',
  'Judg': 'Judges',
  'Ruth': 'Ruth',
  '1 Sam': '1 Samuel',
  '2 Sam': '2 Samuel',
  '1 Kings': '1 Kings',
  '2 Kings': '2 Kings',
  '1 Chr': '1 Chronicles',
  '2 Chr': '2 Chronicles',
  'Ezra': 'Ezra',
  'Ez': 'Ezra',
  'Neh': 'Nehemiah',
  'Esth': 'Esther',
  'Job': 'Job',
  'Ps': 'Psalms',
  'Prov': 'Proverbs',
  'Eccl': 'Ecclesiastes',
  'Song': 'Song of Solomon',
  'Isa': 'Isaiah',
  'Jer': 'Jeremiah',
  'Lam': 'Lamentations',
  'Ezek': 'Ezekiel',
  'Dan': 'Daniel',
  'Hos': 'Hosea',
  'Joel': 'Joel',
  'Amos': 'Amos',
  'Obad': 'Obadiah',
  'Jon': 'Jonah',
  'Mic': 'Micah',
  'Nah': 'Nahum',
  'Hab': 'Habakkuk',
  'Zeph': 'Zephaniah',
  'Hag': 'Haggai',
  'Zech': 'Zechariah',
  'Mal': 'Malachi',
  
  // New Testament
  'Matt': 'Matthew',
  'Mark': 'Mark',
  'Luke': 'Luke',
  'John': 'John',
  'Acts': 'Acts',
  'Rom': 'Romans',
  '1 Cor': '1 Corinthians',
  '2 Cor': '2 Corinthians',
  'Gal': 'Galatians',
  'Eph': 'Ephesians',
  'Phil': 'Philippians',
  'Col': 'Colossians',
  '1 Thess': '1 Thessalonians',
  '2 Thess': '2 Thessalonians',
  '1 Tim': '1 Timothy',
  '2 Tim': '2 Timothy',
  'Titus': 'Titus',
  'Philemon': 'Philemon',
  'Heb': 'Hebrews',
  'James': 'James',
  '1 Pet': '1 Peter',
  '2 Pet': '2 Peter',
  '1 John': '1 John',
  '2 John': '2 John',
  '3 John': '3 John',
  'Jude': 'Jude',
  'Rev': 'Revelation',
};

/**
 * Expands abbreviated Bible book names to their full names
 * @param reference - The Bible reference with abbreviated book names (e.g., "Gen 1-2")
 * @returns The reference with full book names (e.g., "Genesis 1-2")
 */
export function expandBookNames(reference: string): string {
  if (!reference) return reference;

  // Handle multiple references separated by semicolons
  const parts = reference.split(';').map(part => part.trim());
  
  return parts.map(part => {
    // Try to match book abbreviations at the start of each part
    // Handle books with numbers (e.g., "1 Sam", "2 Kings")
    const match = part.match(/^(\d?\s?[A-Za-z]+)/);
    
    if (match) {
      const abbreviation = match[1].trim();
      const fullName = bibleBookAbbreviations[abbreviation];
      
      if (fullName) {
        return part.replace(abbreviation, fullName);
      }
    }
    
    return part;
  }).join('; ');
}

/**
 * Gets the full name of a Bible book from its abbreviation
 * @param abbreviation - The abbreviated book name (e.g., "Gen")
 * @returns The full book name (e.g., "Genesis") or the original if not found
 */
export function getFullBookName(abbreviation: string): string {
  return bibleBookAbbreviations[abbreviation] || abbreviation;
}

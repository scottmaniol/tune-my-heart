import { Translation, ScriptureText } from '../types/curriculum';

/**
 * Bible API service
 * Uses GetBible.life API (free, no key required!) for all translations
 * Falls back to ESV API when ESV key is provided
 */

const ESV_API_KEY = import.meta.env.VITE_ESV_API_KEY || '';

/**
 * Fetch scripture text from bible-api.com (FREE KJV!)
 */
async function fetchFromBibleApi(reference: string): Promise<string> {
  try {
    // bible-api.com - Free KJV API, no key required!
    const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.warn(`Bible API returned ${response.status} for ${reference}`);
      return `[KJV text for ${reference} - temporarily unavailable]`;
    }
    
    const data = await response.json();
    
    // bible-api.com structure
    if (data && data.verses && Array.isArray(data.verses)) {
      const verseTexts = data.verses.map((v: any) => v.text || '').filter(Boolean);
      
      if (verseTexts.length > 0) {
        // Join verses with single space to flow together naturally
        return verseTexts.join(' ');
      }
    }
    
    // Alternative: use the full text if available
    if (data && data.text) {
      return data.text;
    }
    
    console.warn('Bible API returned unexpected format:', data);
    return `[KJV text for ${reference} - please try again or use ESV]`;
  } catch (error) {
    console.error('Error fetching from Bible API:', error);
    return `[KJV - Unable to load ${reference}. Please use ESV translation or your physical Bible.]`;
  }
}

/**
 * Fetch scripture text via Firebase Cloud Function (NKJV!)
 */
async function fetchNKJVViaCloudFunction(reference: string): Promise<string> {
  try {
    // Call our Firebase Cloud Function which proxies bolls.life
    const functionUrl = 'https://fetchnkjv-4g55gn3axa-uc.a.run.app';
    const apiUrl = `${functionUrl}?reference=${encodeURIComponent(reference)}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.warn(`Cloud Function returned ${response.status} for ${reference}`);
      return `[NKJV text for ${reference} - temporarily unavailable]`;
    }
    
    const result = await response.json();
    
    // Extract verse data from Cloud Function response
    if (result.data && Array.isArray(result.data)) {
      const verseTexts = result.data.map((v: any) => v.text || '').filter(Boolean);
      
      if (verseTexts.length > 0) {
        return verseTexts.join('\n\n');
      }
    }
    
    console.warn('Cloud Function returned unexpected format:', result);
    return `[NKJV text for ${reference} - please try again or use ESV]`;
  } catch (error) {
    console.error('Error fetching NKJV via Cloud Function:', error);
    return `[NKJV - Unable to load ${reference}. Please use ESV or KJV translation.]`;
  }
}

/**
 * Fetch scripture text from ESV API
 */
async function fetchFromEsvApi(reference: string): Promise<string> {
  if (!ESV_API_KEY) {
    // Fallback to KJV via bible-api.com
    return fetchFromBibleApi(reference);
  }
  
  try {
    const response = await fetch(
      `https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(reference)}&include-headings=false&include-footnotes=false&include-verse-numbers=false&include-short-copyright=true`,
      {
        headers: {
          'Authorization': `Token ${ESV_API_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from ESV API');
    }
    
    const data = await response.json();
    
    if (data.passages && data.passages.length > 0) {
      // ESV API includes copyright, but ensure it's always present
      let text = data.passages[0];
      
      // Add copyright notice if not already included
      if (!text.includes('(ESV)') && !text.includes('Scripture quotations')) {
        text += '\n\n(ESV)';
      }
      
      return text;
    }
    
    return `[Could not load ${reference}]`;
  } catch (error) {
    console.error('Error fetching from ESV API:', error);
    // Fallback to KJV
    return fetchFromBibleApi(reference);
  }
}

/**
 * Fetch scripture text (main export)
 */
export async function fetchScripture(
  reference: string,
  translation: Translation = 'KJV'
): Promise<ScriptureText> {
  let text = '';
  
  // Use ESV API if available and ESV is selected
  if (translation === 'ESV' && ESV_API_KEY) {
    text = await fetchFromEsvApi(reference);
  } else if (translation === 'KJV') {
    // Use bible-api.com for KJV (FREE!)
    text = await fetchFromBibleApi(reference);
  } else if (translation === 'NKJV') {
    // Use Firebase Cloud Function to fetch NKJV (bypasses CORS)
    text = await fetchNKJVViaCloudFunction(reference);
  } else {
    // For other translations (NASB, LSB), show placeholder for now
    text = `[${translation} translation not yet available. Please use ESV or KJV, or read from your physical Bible.]`;
  }
  
  return {
    reference,
    translation,
    text,
    passages: [text]
  };
}

/**
 * Fallback: Generate placeholder text
 */
export function getPlaceholderScripture(
  reference: string,
  translation: Translation = 'KJV'
): ScriptureText {
  return {
    reference,
    translation,
    text: `[Scripture text for ${reference} (${translation}) is loading...]`,
    passages: []
 };
}

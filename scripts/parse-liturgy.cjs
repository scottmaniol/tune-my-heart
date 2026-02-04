/**
 * Parse LITURGY_CONTENT.md and generate liturgyData.ts
 * This script reads the markdown file and creates the TypeScript data structure
 */

const fs = require('fs');
const path = require('path');

// Read the LITURGY_CONTENT.md file
const contentPath = path.join(__dirname, '..', 'LITURGY_CONTENT.md');
const content = fs.readFileSync(contentPath, 'utf-8');

// Helper function to escape content for template literals
function escapeForTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')  // Escape backslashes first
    .replace(/`/g, '\\`')     // Escape backticks
    .replace(/\$/g, '\\$');   // Escape dollar signs (for template literal interpolation)
}

// Helper function to parse translation-specific content
function parseTranslatedContent(text) {
  const esvMatch = text.match(/\[ESV\]\s*([\s\S]*?)(?:\[KJV\]|$)/);
  const kjvMatch = text.match(/\[KJV\]\s*([\s\S]*?)$/);
  
    if (esvMatch && kjvMatch) {
    const esv = esvMatch[1].trim();
    const kjv = kjvMatch[1].trim();
    return {
      isTranslated: true,
      esv: escapeForTemplate(esv),
      kjv: escapeForTemplate(kjv)
    };
  }
  
  return {
    isTranslated: false,
    content: escapeForTemplate(text.trim())
  };
}

// Parse a single liturgy section
function parseLiturgy(section, type, id, dayOrOccasion) {
  const liturgy = {
    id,
    type,
    name: '',
    description: '',
    parts: []
  };
  
  if (type === 'daily') {
    liturgy.dayOfMonth = dayOrOccasion;
    liturgy.name = `Day ${dayOrOccasion} Liturgy`;
  } else {
    liturgy.specialOccasion = id;
    const nameMatch = section.match(/^##\s+(.+?)\s*-\s*(.+?)$/m);
    if (nameMatch) {
      liturgy.name = nameMatch[1].trim();
      liturgy.description = nameMatch[2].trim();
    }
  }
  
  // Extract each part
  const parts = [
    { type: 'call-to-worship', title: 'Call to Worship', header: '### Call to Worship' },
    { type: 'votum', title: 'The Votum (Psalm 124:8)', header: '### The Votum' },
    { type: 'confession', title: 'Prayer of Confession', header: '### Prayer of Confession' },
    { type: 'assurance', title: 'Assurance of Forgiveness', header: '### Assurance of Forgiveness' },
    { type: 'psalm', title: 'Psalm', header: '### Psalm' },
    { type: 'illumination', title: 'Prayer of Illumination', header: '### Prayer of Illumination' },
    { type: 'reading', title: 'Daily Bible Reading', header: '### Daily Bible Reading' },
    { type: 'intercession', title: 'Personal Intercession', header: '### Personal Intercession' },
    { type: 'lords-prayer', title: "The Lord's Prayer", header: "### The Lord's Prayer" },
    { type: 'doxology', title: 'Doxology', header: '### Doxology' }
  ];
  
  parts.forEach((partDef, index) => {
    const startIdx = section.indexOf(partDef.header);
    if (startIdx === -1) return;
    
    const nextHeader = index < parts.length - 1 ? parts[index + 1].header : '---';
    const endIdx = section.indexOf(nextHeader, startIdx + partDef.header.length);
    
    let partContent = endIdx > startIdx 
      ? section.substring(startIdx + partDef.header.length, endIdx)
      : section.substring(startIdx + partDef.header.length);
    
    partContent = partContent.trim();
    
    // Extract scripture reference if present
    const refMatch = partContent.match(/^([^\n]+)\n/);
    let scriptureRef = '';
    if (refMatch && partDef.type === 'call-to-worship' || partDef.type === 'assurance') {
      scriptureRef = refMatch[1].trim();
      partContent = partContent.substring(refMatch[0].length).trim();
    }
    
    const part = {
      type: partDef.type,
      title: partDef.title,
      content: partContent
    };
    
    if (scriptureRef) {
      part.scriptureReference = scriptureRef;
    }
    
    liturgy.parts.push(part);
  });
  
  return liturgy;
}

// Split content into sections
const daySections = [];
const specialSections = {};

// Parse daily liturgies (Day 1-31)
for (let day = 1; day <= 31; day++) {
  const dayHeader = `## Day ${day} Liturgy`;
  const nextDayHeader = day < 31 ? `## Day ${day + 1} Liturgy` : '# SPECIAL LITURGIES';
  
  const startIdx = content.indexOf(dayHeader);
  const endIdx = content.indexOf(nextDayHeader, startIdx);
  
  if (startIdx !== -1) {
    const section = endIdx > startIdx 
      ? content.substring(startIdx, endIdx)
      : content.substring(startIdx);
    daySections.push({ day, section });
  }
}

// Parse special liturgies
const specialNames = {
  'advent': 'Advent - Beginning of Advent Season',
  'christmas': 'Christmas - Celebration of Christ\'s Birth',
  'epiphany': 'Epiphany - Christ Revealed to the Gentiles',
  'good-friday': 'Good Friday - Remembrance of Christ\'s Sacrifice',
  'easter': 'Easter - Celebration of the Resurrection',
  'pentecost': 'Pentecost - Celebration of the Holy Spirit'
};

Object.keys(specialNames).forEach(key => {
  const header = `## ${specialNames[key].split(' - ')[0]}`;
  const startIdx = content.indexOf(header);
  if (startIdx !== -1) {
    // Find next special or end
    const nextIdx = content.indexOf('\n## ', startIdx + header.length);
    const section = nextIdx > startIdx 
      ? content.substring(startIdx, nextIdx)
      : content.substring(startIdx);
    specialSections[key] = section;
  }
});

// Generate TypeScript code
let tsCode = `/**
 * Daily Liturgy Data
 * Complete liturgies for all 31 days and 6 special occasions
 * AUTO-GENERATED by scripts/parse-liturgy.cjs
 */

import { Liturgy, TranslatedContent, DoxologyMedia } from '../types/liturgy';

// Doxology media URLs
export const doxologyMedia: DoxologyMedia = {
  sheetMusicUrl: 'https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/liturgy%2Fdoxology-sheet-music.pdf?alt=media',
  pianoAccompanimentUrl: 'https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/liturgy%2Fdoxology-piano.mp3?alt=media',
};

// Lord's Prayer (same for all liturgies)
const lordsPrayer: TranslatedContent = {
  esv: "Our Father in heaven, hallowed be your name. Your kingdom come, your will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from evil. For yours is the kingdom and the power and the glory, forever. Amen.",
  kjv: "Our Father which art in heaven, Hallowed be thy name. Thy kingdom come, Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen."
};

// The Votum (same for all liturgies)
const votum: TranslatedContent = {
  esv: "Our help is in the name of the Lord, who made heaven and earth.",
  kjv: "Our help is in the name of the LORD, who made heaven and earth."
};

// Doxology text (same for all liturgies)
const doxologyText = "Praise God, from whom all blessings flow;\\nPraise Him, all creatures here below;\\nPraise Him above, ye heavenly host;\\nPraise Father, Son, and Holy Ghost. Amen.";

// Personal Intercession (same for all liturgies)
const personalIntercession = "Pray for:\\nMissions and Evangelism\\nLocal church members and needs\\nGlobal, National and Local Leaders and Issues\\nPersonal Needs and Holiness";

`;

// Add daily liturgies
tsCode += '// Daily liturgies (31 total)\n';
tsCode += 'export const dailyLiturgies: Liturgy[] = [\n';

daySections.forEach(({ day, section }, index) => {
  const liturgy = parseLiturgy(section, 'daily', `day-${day}`, day);
  tsCode += `  // DAY ${day}\n`;
  tsCode += `  {\n`;
  tsCode += `    id: '${liturgy.id}',\n`;
  tsCode += `    type: '${liturgy.type}',\n`;
  tsCode += `    dayOfMonth: ${liturgy.dayOfMonth},\n`;
  tsCode += `    name: '${liturgy.name}',\n`;
  tsCode += `    parts: [\n`;
  
  liturgy.parts.forEach((part, partIndex) => {
    tsCode += `      {\n`;
    tsCode += `        type: '${part.type}',\n`;
    tsCode += `        title: \`${escapeForTemplate(part.title)}\`,\n`;
    
    // Handle special cases
    if (part.type === 'votum') {
      tsCode += `        content: votum,\n`;
    } else if (part.type === 'lords-prayer') {
      tsCode += `        content: lordsPrayer,\n`;
    } else if (part.type === 'doxology') {
      tsCode += `        content: doxologyText,\n`;
    } else if (part.type === 'intercession') {
      tsCode += `        content: personalIntercession,\n`;
    } else if (part.type === 'reading') {
      tsCode += `        content: '[Will auto-populate from reading schedule]',\n`;
    } else {
      tsCode += `        content: \`${escapeForTemplate(part.content)}\`,\n`;
    }
    
    if (part.scriptureReference) {
      tsCode += `        scriptureReference: \`${escapeForTemplate(part.scriptureReference)}\`\n`;
    }
    
    tsCode += `      }${partIndex < liturgy.parts.length - 1 ? ',' : ''}\n`;
  });
  
  tsCode += `    ]\n`;
  tsCode += `  }${index < daySections.length - 1 ? ',' : ''}\n`;
});

tsCode += '];\n\n';

// Add special liturgies
tsCode += '// Special occasion liturgies\n';
tsCode += 'export const specialLiturgies: Liturgy[] = [\n';

const specialKeys = Object.keys(specialSections);
specialKeys.forEach((key, index) => {
  const section = specialSections[key];
  const liturgy = parseLiturgy(section, 'special', key, key);
  
  // Extract name and description from section
  const headerMatch = section.match(/##\s+(.+?)\s*-\s*(.+?)\n/);
  if (headerMatch) {
    liturgy.name = headerMatch[1].trim();
    liturgy.description = headerMatch[2].trim();
  }
  
  tsCode += `  // ${key.toUpperCase()}\n`;
  tsCode += `  {\n`;
  tsCode += `    id: '${liturgy.id}',\n`;
  tsCode += `    type: '${liturgy.type}',\n`;
  tsCode += `    specialOccasion: '${liturgy.specialOccasion}',\n`;
  tsCode += `    name: \`${escapeForTemplate(liturgy.name)}\`,\n`;
  tsCode += `    description: \`${escapeForTemplate(liturgy.description)}\`,\n`;
  tsCode += `    parts: [\n`;
  
  liturgy.parts.forEach((part, partIndex) => {
    tsCode += `      {\n`;
    tsCode += `        type: '${part.type}',\n`;
    tsCode += `        title: \`${escapeForTemplate(part.title)}\`,\n`;
    
    // Handle special cases  
    if (part.type === 'votum') {
      tsCode += `        content: votum,\n`;
    } else if (part.type === 'lords-prayer') {
      tsCode += `        content: lordsPrayer,\n`;
    } else if (part.type === 'doxology') {
      tsCode += `        content: doxologyText,\n`;
    } else if (part.type === 'intercession') {
      tsCode += `        content: personalIntercession,\n`;
    } else if (part.type === 'reading') {
      tsCode += `        content: '[Will auto-populate from reading schedule]',\n`;
    } else {
      tsCode += `        content: \`${escapeForTemplate(part.content)}\`,\n`;
    }
    
    if (part.scriptureReference) {
      tsCode += `        scriptureReference: \`${escapeForTemplate(part.scriptureReference)}\`\n`;
    }
    
    tsCode += `      }${partIndex < liturgy.parts.length - 1 ? ',' : ''}\n`;
  });
  
  tsCode += `    ]\n`;
  tsCode += `  }${index < specialKeys.length - 1 ? ',' : ''}\n`;
});

tsCode += '];\n\n';

// Add helper functions
tsCode += `// Helper functions
export function getLiturgyByDay(day: number): Liturgy | null {
  return dailyLiturgies.find(l => l.dayOfMonth === day) || null;
}

export function getLiturgyByOccasion(occasion: string): Liturgy | null {
  return specialLiturgies.find(l => l.specialOccasion === occasion) || null;
}

export function getAllLiturgies(): Liturgy[] {
  return [...dailyLiturgies, ...specialLiturgies];
}
`;

// Write the generated file
const outputPath = path.join(__dirname, '..', 'src', 'data', 'liturgyData.ts');
fs.writeFileSync(outputPath, tsCode, 'utf-8');

console.log('✅ Successfully generated liturgyData.ts!');
console.log(`   - ${daySections.length} daily liturgies`);
console.log(`   - ${specialKeys.length} special occasion liturgies`);
console.log(`   - Total: ${daySections.length + specialKeys.length} liturgies`);

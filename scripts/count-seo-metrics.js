const fs = require('fs');
const path = require('path');

// Read the glitter text generator page
const filePath = path.join(__dirname, '../app/generators/glitter-text/page.tsx');
const content = fs.readFileSync(filePath, 'utf-8');

// Extract text content (remove JSX tags, code, etc.)
// This is a simple extraction - focuses on text within quotes and JSX content
const textMatches = content.match(/["'`]([^"'`]+)["'`]/g) || [];
const extractedText = textMatches
  .map(match => match.slice(1, -1)) // Remove quotes
  .filter(text => text.length > 3) // Filter out very short strings
  .join(' ');

// Count total words
const words = extractedText.toLowerCase().split(/\s+/).filter(word => word.length > 0);
const totalWords = words.length;

// Count "glitter text generator" occurrences (case insensitive)
const keyword = 'glitter text generator';
const keywordRegex = new RegExp(keyword, 'gi');
const keywordMatches = extractedText.match(keywordRegex) || [];
const keywordCount = keywordMatches.length;

// Calculate keyword density
const keywordDensity = ((keywordCount / totalWords) * 100).toFixed(2);

console.log('\n=== SEO Metrics for Glitter Text Generator Page ===\n');
console.log(`Total Words: ${totalWords}`);
console.log(`Keyword "${keyword}" Count: ${keywordCount}`);
console.log(`Keyword Density: ${keywordDensity}%`);
console.log(`Target Density: 3%`);
console.log(`Status: ${parseFloat(keywordDensity) >= 2.5 && parseFloat(keywordDensity) <= 3.5 ? '✅ GOOD' : '⚠️ NEEDS ADJUSTMENT'}`);
console.log(`\nWord Count Status: ${totalWords >= 1000 ? '✅ GOOD (1000+ words)' : `⚠️ NEEDS MORE (${1000 - totalWords} words needed)`}`);
console.log('\n');


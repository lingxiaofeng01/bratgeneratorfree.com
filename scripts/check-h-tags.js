const fs = require('fs');
const path = require('path');

// Read the glitter text generator page
const filePath = path.join(__dirname, '../app/generators/glitter-text/page.tsx');
const content = fs.readFileSync(filePath, 'utf-8');

// Extract H tags (h1, h2, h3, h4)
const h1Matches = content.match(/<h1[^>]*>(.*?)<\/h1>/gs) || [];
const h2Matches = content.match(/<h2[^>]*>(.*?)<\/h2>/gs) || [];
const h3Matches = content.match(/<h3[^>]*>(.*?)<\/h3>/gs) || [];
const h4Matches = content.match(/<h4[^>]*>(.*?)<\/h4>/gs) || [];

// Clean up the matches to extract text content
const cleanTag = (tag) => {
  return tag
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ')     // Normalize whitespace
    .trim();
};

console.log('\n=== H Tag Structure Analysis ===\n');

console.log(`📌 H1 Tags (Should be exactly 1):`);
console.log(`   Count: ${h1Matches.length}`);
if (h1Matches.length === 1) {
  console.log('   ✅ GOOD - Only one H1 tag');
} else if (h1Matches.length === 0) {
  console.log('   ❌ ERROR - No H1 tag found');
} else {
  console.log('   ❌ ERROR - Multiple H1 tags found');
}
h1Matches.forEach((tag, index) => {
  console.log(`   ${index + 1}. "${cleanTag(tag)}"`);
});

console.log(`\n📌 H2 Tags (Main sections):`);
console.log(`   Count: ${h2Matches.length}`);
h2Matches.forEach((tag, index) => {
  console.log(`   ${index + 1}. "${cleanTag(tag)}"`);
});

console.log(`\n📌 H3 Tags (Subsections):`);
console.log(`   Count: ${h3Matches.length}`);
h3Matches.forEach((tag, index) => {
  console.log(`   ${index + 1}. "${cleanTag(tag)}"`);
});

console.log(`\n📌 H4 Tags (Sub-subsections):`);
console.log(`   Count: ${h4Matches.length}`);
h4Matches.forEach((tag, index) => {
  console.log(`   ${index + 1}. "${cleanTag(tag)}"`);
});

console.log('\n=== SEO Recommendations ===\n');
if (h1Matches.length === 1) {
  console.log('✅ H1 structure is correct');
} else {
  console.log('❌ Fix H1 structure - should have exactly one H1 tag');
}

if (h2Matches.length >= 3) {
  console.log('✅ Good number of H2 tags for content structure');
} else {
  console.log('⚠️  Consider adding more H2 tags for better content organization');
}

console.log('\n');


#!/usr/bin/env node

/**
 * Generator List Verification Script
 * 验证所有生成器是否正确配置
 */

const fs = require('fs');
const path = require('path');

// ANSI 颜色代码
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// 预期的生成器列表
const expectedGenerators = [
  'vaporwave-text',
  'redacted-text',
  'corrupted-text',
  'fiery-text',
  'mario-text',
  'rainbow-text',
  'alien-text',
  'glitter-text',
  'disney-text',
  'underline-text',
  'dark-souls-text',
  'mirror-text',
  'spongebob-text',
  'spamton-text',
];

console.log(`${colors.bold}${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║         Generator List Verification Script                ║
║         生成器列表验证脚本                                  ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}\n`);

let totalErrors = 0;
let totalWarnings = 0;

// 1. 检查文件夹是否存在
console.log(`${colors.bold}${colors.blue}[1] 检查生成器文件夹...${colors.reset}`);
const generatorsDir = path.join(process.cwd(), 'app', 'generators');
const actualFolders = fs.readdirSync(generatorsDir)
  .filter(item => {
    const itemPath = path.join(generatorsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

console.log(`   找到 ${actualFolders.length} 个文件夹`);

expectedGenerators.forEach(gen => {
  if (actualFolders.includes(gen)) {
    console.log(`   ${colors.green}✓${colors.reset} ${gen}`);
  } else {
    console.log(`   ${colors.red}✗${colors.reset} ${gen} - 文件夹不存在`);
    totalErrors++;
  }
});

// 检查是否有额外的文件夹
const extraFolders = actualFolders.filter(f => !expectedGenerators.includes(f));
if (extraFolders.length > 0) {
  console.log(`\n   ${colors.yellow}⚠${colors.reset} 发现额外的文件夹:`);
  extraFolders.forEach(f => console.log(`     - ${f}`));
  totalWarnings++;
}

// 2. 检查 sitemap
console.log(`\n${colors.bold}${colors.blue}[2] 检查 Sitemap...${colors.reset}`);
const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.xml', 'route.ts');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

expectedGenerators.forEach(gen => {
  if (sitemapContent.includes(`/generators/${gen}`)) {
    console.log(`   ${colors.green}✓${colors.reset} ${gen} 在 sitemap 中`);
  } else {
    console.log(`   ${colors.red}✗${colors.reset} ${gen} 不在 sitemap 中`);
    totalErrors++;
  }
});

// 3. 检查 generators 页面
console.log(`\n${colors.bold}${colors.blue}[3] 检查 Generators 列表页...${colors.reset}`);
const generatorsPagePath = path.join(process.cwd(), 'app', 'generators', 'page.tsx');
const generatorsPageContent = fs.readFileSync(generatorsPagePath, 'utf-8');

expectedGenerators.forEach(gen => {
  if (generatorsPageContent.includes(`/generators/${gen}`)) {
    console.log(`   ${colors.green}✓${colors.reset} ${gen} 在列表页中`);
  } else {
    console.log(`   ${colors.red}✗${colors.reset} ${gen} 不在列表页中`);
    totalErrors++;
  }
});

// 4. 检查首页
console.log(`\n${colors.bold}${colors.blue}[4] 检查首页...${colors.reset}`);
const homePagePath = path.join(process.cwd(), 'app', 'page.tsx');
const homePageContent = fs.readFileSync(homePagePath, 'utf-8');

let homePageGenerators = 0;
expectedGenerators.forEach(gen => {
  if (homePageContent.includes(`/generators/${gen}`)) {
    console.log(`   ${colors.green}✓${colors.reset} ${gen} 在首页中`);
    homePageGenerators++;
  } else {
    console.log(`   ${colors.yellow}⚠${colors.reset} ${gen} 不在首页中（可能正常）`);
    totalWarnings++;
  }
});

console.log(`\n   首页包含 ${homePageGenerators}/${expectedGenerators.length} 个生成器`);

// 5. 检查每个生成器的必需文件
console.log(`\n${colors.bold}${colors.blue}[5] 检查必需文件...${colors.reset}`);
expectedGenerators.forEach(gen => {
  const genDir = path.join(generatorsDir, gen);
  if (!fs.existsSync(genDir)) {
    console.log(`   ${colors.red}✗${colors.reset} ${gen} - 文件夹不存在`);
    totalErrors++;
    return;
  }

  const pagePath = path.join(genDir, 'page.tsx');
  const layoutPath = path.join(genDir, 'layout.tsx');

  const hasPage = fs.existsSync(pagePath);
  const hasLayout = fs.existsSync(layoutPath);

  if (hasPage && hasLayout) {
    console.log(`   ${colors.green}✓${colors.reset} ${gen} - page.tsx & layout.tsx`);
  } else {
    if (!hasPage) {
      console.log(`   ${colors.red}✗${colors.reset} ${gen} - 缺少 page.tsx`);
      totalErrors++;
    }
    if (!hasLayout) {
      console.log(`   ${colors.yellow}⚠${colors.reset} ${gen} - 缺少 layout.tsx`);
      totalWarnings++;
    }
  }
});

// 6. 统计信息
console.log(`\n${colors.bold}${colors.blue}[6] 统计信息...${colors.reset}`);
console.log(`   总生成器数: ${expectedGenerators.length}`);
console.log(`   实际文件夹数: ${actualFolders.length}`);
console.log(`   Sitemap 条目: ${expectedGenerators.filter(g => sitemapContent.includes(`/generators/${g}`)).length}`);
console.log(`   列表页条目: ${expectedGenerators.filter(g => generatorsPageContent.includes(`/generators/${g}`)).length}`);
console.log(`   首页条目: ${homePageGenerators}`);

// 7. 最终结果
console.log(`\n${colors.bold}${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║                    验证结果 Summary                        ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}`);

if (totalErrors === 0 && totalWarnings === 0) {
  console.log(`${colors.green}${colors.bold}
   ✓ 完美！所有检查通过！
   ✓ Perfect! All checks passed!
${colors.reset}`);
} else {
  if (totalErrors > 0) {
    console.log(`${colors.red}${colors.bold}
   ✗ 发现 ${totalErrors} 个错误
   ✗ Found ${totalErrors} error(s)
${colors.reset}`);
  }
  if (totalWarnings > 0) {
    console.log(`${colors.yellow}${colors.bold}
   ⚠ 发现 ${totalWarnings} 个警告
   ⚠ Found ${totalWarnings} warning(s)
${colors.reset}`);
  }
}

// 8. 建议
if (totalErrors > 0 || totalWarnings > 0) {
  console.log(`\n${colors.bold}${colors.blue}建议 Recommendations:${colors.reset}`);
  
  if (totalErrors > 0) {
    console.log(`
   1. 检查缺失的文件和文件夹
   2. 确保所有生成器都在 sitemap 中
   3. 确保所有生成器都在列表页中
   4. 运行 'npm run build' 检查构建错误
    `);
  }
  
  if (totalWarnings > 0) {
    console.log(`
   1. 考虑为所有生成器添加 layout.tsx
   2. 考虑在首页展示所有生成器
   3. 检查是否有不需要的额外文件夹
    `);
  }
}

console.log(`\n${colors.cyan}验证完成！Verification complete!${colors.reset}\n`);

// 退出代码
process.exit(totalErrors > 0 ? 1 : 0);


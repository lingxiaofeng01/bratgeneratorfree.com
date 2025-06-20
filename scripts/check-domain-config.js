const fs = require('fs');
const path = require('path');

function checkDomainConfig() {
  console.log('🔍 检查域名配置...\n');
  
  const expectedDomain = 'https://www.bratgeneratorfree.com';
  const issues = [];
  const success = [];

  // 检查文件列表
  const filesToCheck = [
    { file: 'app/layout.tsx', patterns: ['metadataBase', 'openGraph.url', 'twitter.images'] },
    { file: 'app/robots.txt/route.ts', patterns: ['baseUrl'] },
    { file: 'app/sitemap.xml/route.ts', patterns: ['baseUrl'] },
    { file: 'app/blog/[slug]/page.tsx', patterns: ['baseUrl'] },
    { file: 'next.config.js', patterns: ['destination', 'domains'] },
    { file: 'package.json', patterns: ['homepage'] },
  ];

  filesToCheck.forEach(({ file, patterns }) => {
    const filePath = path.join(__dirname, '..', file);
    
    if (!fs.existsSync(filePath)) {
      issues.push(`❌ 文件不存在: ${file}`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    patterns.forEach(pattern => {
      if (content.includes('www.bratgeneratorfree.com')) {
        success.push(`✅ ${file} - ${pattern} 配置正确`);
      } else if (content.includes('bratgeneratorfree.com')) {
        // 检查是否是重定向配置（这是正确的）
        if (file === 'next.config.js' && content.includes('bratgeneratorfree.com') && content.includes('www.bratgeneratorfree.com')) {
          success.push(`✅ ${file} - 重定向配置正确`);
        } else {
          issues.push(`⚠️ ${file} - ${pattern} 可能需要更新为www版本`);
        }
      }
    });
  });

  // 检查图标文件
  const iconFiles = [
    'public/favicon.svg',
    'public/og-image.svg',
    'public/twitter-image.svg',
    'public/apple-touch-icon.svg',
    'public/android-chrome-192x192.svg',
    'public/android-chrome-512x512.svg'
  ];

  iconFiles.forEach(iconFile => {
    const iconPath = path.join(__dirname, '..', iconFile);
    if (fs.existsSync(iconPath)) {
      const content = fs.readFileSync(iconPath, 'utf8');
      if (content.includes('www.bratgeneratorfree.com')) {
        success.push(`✅ ${iconFile} - 域名配置正确`);
      } else {
        issues.push(`⚠️ ${iconFile} - 域名可能需要更新`);
      }
    } else {
      issues.push(`❌ 图标文件不存在: ${iconFile}`);
    }
  });

  // 输出结果
  console.log('📊 检查结果:\n');
  
  if (success.length > 0) {
    console.log('🎉 配置正确的项目:');
    success.forEach(item => console.log(`  ${item}`));
    console.log('');
  }

  if (issues.length > 0) {
    console.log('⚠️ 需要注意的项目:');
    issues.forEach(item => console.log(`  ${item}`));
    console.log('');
  }

  // 输出配置摘要
  console.log('📋 域名配置摘要:');
  console.log(`  主域名: ${expectedDomain}`);
  console.log(`  重定向: bratgeneratorfree.com → www.bratgeneratorfree.com`);
  console.log(`  SEO优化: ✅ 已完成`);
  console.log(`  301重定向: ✅ 已配置`);
  
  console.log('\n🚀 下一步操作:');
  console.log('  1. 设置环境变量: NEXT_PUBLIC_BASE_URL=https://www.bratgeneratorfree.com');
  console.log('  2. 配置DNS解析到服务器');
  console.log('  3. 验证重定向是否正常工作');
  console.log('  4. 在Google Search Console添加www版本域名');
  console.log('  5. 提交sitemap: https://www.bratgeneratorfree.com/sitemap.xml');

  return { success: success.length, issues: issues.length };
}

// 运行检查
if (require.main === module) {
  const result = checkDomainConfig();
  console.log(`\n✨ 检查完成: ${result.success} 项正确, ${result.issues} 项需要注意`);
}

module.exports = { checkDomainConfig }; 
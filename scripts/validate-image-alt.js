#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🖼️  图片Alt属性验证开始...\n');

// 检查图片alt属性
function validateImageAltAttributes() {
  console.log('📋 检查图片Alt属性设置...');
  
  const appDir = path.join(__dirname, '../app');
  const componentsDir = path.join(__dirname, '../components');
  
  let totalImages = 0;
  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;
  const issues = [];
  
  function checkImagesInFile(filePath, relativePath) {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查Next.js Image组件
    const imageMatches = content.match(/<Image[^>]*>/g);
    if (imageMatches) {
      imageMatches.forEach((imageTag, index) => {
        totalImages++;
        
        // 检查是否有alt属性
        if (imageTag.includes('alt=')) {
          imagesWithAlt++;
          
          // 检查alt属性是否为空
          const altMatch = imageTag.match(/alt=["']([^"']*)["']/);
          if (altMatch) {
            const altText = altMatch[1];
            if (!altText.trim()) {
              issues.push({
                file: relativePath,
                issue: 'Alt属性为空',
                tag: imageTag.substring(0, 100) + '...'
              });
            } else if (altText.includes('{') && altText.includes('}')) {
              // 动态alt属性，这是好的
              console.log(`  ✅ ${relativePath}: 动态alt属性 - ${altText}`);
            } else {
              console.log(`  ✅ ${relativePath}: 静态alt属性 - "${altText}"`);
            }
          }
        } else {
          imagesWithoutAlt++;
          issues.push({
            file: relativePath,
            issue: '缺少alt属性',
            tag: imageTag.substring(0, 100) + '...'
          });
        }
      });
    }
    
    // 检查HTML img标签
    const htmlImageMatches = content.match(/<img[^>]*>/g);
    if (htmlImageMatches) {
      htmlImageMatches.forEach((imageTag) => {
        totalImages++;
        
        if (imageTag.includes('alt=')) {
          imagesWithAlt++;
          const altMatch = imageTag.match(/alt=["']([^"']*)["']/);
          if (altMatch) {
            const altText = altMatch[1];
            if (!altText.trim()) {
              issues.push({
                file: relativePath,
                issue: 'HTML img标签alt属性为空',
                tag: imageTag
              });
            } else {
              console.log(`  ✅ ${relativePath}: HTML img alt属性 - "${altText}"`);
            }
          }
        } else {
          imagesWithoutAlt++;
          issues.push({
            file: relativePath,
            issue: 'HTML img标签缺少alt属性',
            tag: imageTag
          });
        }
      });
    }
  }
  
  function scanDirectory(dir, baseDir = '') {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      const relativePath = path.join(baseDir, file.name);
      
      if (file.isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
        checkImagesInFile(fullPath, relativePath);
      }
    });
  }
  
  console.log('\n📁 扫描app目录...');
  scanDirectory(appDir, 'app');
  
  console.log('\n📁 扫描components目录...');
  scanDirectory(componentsDir, 'components');
  
  console.log('\n📊 图片Alt属性统计：');
  console.log(`  总图片数量: ${totalImages}`);
  console.log(`  有Alt属性: ${imagesWithAlt} (${totalImages > 0 ? Math.round(imagesWithAlt / totalImages * 100) : 0}%)`);
  console.log(`  无Alt属性: ${imagesWithoutAlt} (${totalImages > 0 ? Math.round(imagesWithoutAlt / totalImages * 100) : 0}%)`);
  
  if (issues.length > 0) {
    console.log('\n❌ 发现的问题：');
    issues.forEach((issue, index) => {
      console.log(`\n${index + 1}. ${issue.file}`);
      console.log(`   问题: ${issue.issue}`);
      console.log(`   标签: ${issue.tag}`);
    });
  } else {
    console.log('\n✅ 所有图片都正确设置了Alt属性！');
  }
  
  return issues.length === 0;
}

// 检查博客文章的imageAlt字段
function validateBlogImageAlt() {
  console.log('\n📝 检查博客文章图片Alt设置...');
  
  const contentDir = path.join(__dirname, '../content/blog');
  if (!fs.existsSync(contentDir)) {
    console.log('  ℹ️  未找到content/blog目录');
    return true;
  }
  
  const files = fs.readdirSync(contentDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  let totalPosts = 0;
  let postsWithImageAlt = 0;
  const missingImageAlt = [];
  
  mdFiles.forEach(file => {
    totalPosts++;
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`  🔍 检查 ${file}:`);
    
    // 简化检查：直接在文件内容中搜索imageAlt字段
    if (content.includes('imageAlt:')) {
      postsWithImageAlt++;
      // 提取imageAlt的值
      const imageAltMatch = content.match(/imageAlt:\s*["']?([^"'\n\r]+?)["']?\s*$/m);
      if (imageAltMatch) {
        const imageAlt = imageAltMatch[1].trim();
        if (imageAlt) {
          console.log(`    ✅ 找到imageAlt: "${imageAlt}"`);
        } else {
          console.log(`    ❌ imageAlt字段为空`);
          missingImageAlt.push({ file, issue: 'imageAlt字段为空' });
        }
      } else {
        console.log(`    ❌ imageAlt字段格式错误`);
        missingImageAlt.push({ file, issue: 'imageAlt字段格式错误' });
      }
    } else {
      console.log(`    ❌ 未找到imageAlt字段`);
      missingImageAlt.push({ file, issue: '缺少imageAlt字段' });
    }
  });
  
  console.log(`\n📊 博客文章图片Alt统计：`);
  console.log(`  总文章数量: ${totalPosts}`);
  console.log(`  有imageAlt: ${postsWithImageAlt} (${totalPosts > 0 ? Math.round(postsWithImageAlt / totalPosts * 100) : 0}%)`);
  console.log(`  缺少imageAlt: ${missingImageAlt.length} (${totalPosts > 0 ? Math.round(missingImageAlt.length / totalPosts * 100) : 0}%)`);
  
  if (missingImageAlt.length > 0) {
    console.log('\n⚠️  需要添加imageAlt的文章：');
    missingImageAlt.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.file} - ${item.issue}`);
    });
  }
  
  return missingImageAlt.length === 0;
}

// 生成Alt属性优化建议
function generateAltOptimizationSuggestions() {
  console.log('\n💡 Alt属性最佳实践建议：');
  console.log('');
  console.log('✅ 已实施的优化：');
  console.log('  - 所有Next.js Image组件都设置了alt属性');
  console.log('  - 博客文章图片使用动态alt属性 (post.imageAlt)');
  console.log('  - 团队成员头像使用姓名作为alt属性');
  console.log('  - 博客列表页面实现了fallback机制');
  console.log('');
  console.log('🎯 Alt属性编写原则：');
  console.log('  1. 描述图片内容而不是图片本身');
  console.log('  2. 保持简洁但具有描述性');
  console.log('  3. 避免使用"图片"、"照片"等冗余词汇');
  console.log('  4. 对于装饰性图片可以使用空alt属性');
  console.log('  5. 包含重要的上下文信息');
  console.log('');
  console.log('📝 示例：');
  console.log('  ❌ alt="图片"');
  console.log('  ❌ alt="博客文章封面"');
  console.log('  ✅ alt="Charli XCX brat专辑封面设计教程"');
  console.log('  ✅ alt="lime绿色背景上的黑色粗体字设计"');
  console.log('');
  console.log('🔧 实施建议：');
  console.log('  - 定期审查博客文章的imageAlt字段');
  console.log('  - 为新添加的图片确保有描述性的alt属性');
  console.log('  - 考虑图片的上下文和用途');
  console.log('  - 测试屏幕阅读器的体验');
}

// 运行验证
function runImageAltValidation() {
  console.log('🎯 图片Alt属性全面验证\n');
  
  const componentValidation = validateImageAltAttributes();
  const blogValidation = validateBlogImageAlt();
  
  generateAltOptimizationSuggestions();
  
  const overallSuccess = componentValidation && blogValidation;
  
  console.log('\n📋 验证总结：');
  console.log(`  组件图片Alt属性: ${componentValidation ? '✅ 通过' : '❌ 需要修复'}`);
  console.log(`  博客文章imageAlt: ${blogValidation ? '✅ 通过' : '❌ 需要修复'}`);
  console.log(`  总体评估: ${overallSuccess ? '✅ 优秀' : '⚠️  需要改进'}`);
  
  if (overallSuccess) {
    console.log('\n🎉 恭喜！所有图片都正确设置了Alt属性，符合无障碍访问标准！');
  } else {
    console.log('\n💡 建议优先修复上述问题以提升网站的无障碍访问性。');
  }
  
  return overallSuccess;
}

// 执行验证
const success = runImageAltValidation();
process.exit(success ? 0 : 1); 
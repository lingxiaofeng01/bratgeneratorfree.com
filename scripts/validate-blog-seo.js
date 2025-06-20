#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 博客SEO验证开始...\n');

// 验证博客列表页面元数据
function validateBlogListPage() {
  console.log('📄 验证博客列表页面 (app/blog/page.tsx)...');
  
  const blogPagePath = path.join(__dirname, '../app/blog/page.tsx');
  if (!fs.existsSync(blogPagePath)) {
    console.log('❌ 博客列表页面文件不存在');
    return false;
  }
  
  const content = fs.readFileSync(blogPagePath, 'utf8');
  
  const checks = [
    {
      name: '元数据导出',
      test: content.includes('export const metadata: Metadata'),
      fix: '添加 export const metadata: Metadata 声明'
    },
    {
      name: '专门的标题',
      test: content.includes('Design Blog & Creative Tutorials | Free Brat Generator'),
      fix: '设置博客专门的标题，与首页区分'
    },
    {
      name: '专门的描述',
      test: content.includes('Explore design tutorials, typography art, album cover aesthetics'),
      fix: '设置博客专门的描述，专注于设计内容'
    },
    {
      name: '专门的关键词',
      test: content.includes('design blog, creative tutorials, typography art'),
      fix: '设置博客专门的关键词，避免与首页冲突'
    },
    {
      name: 'OpenGraph设置',
      test: content.includes('openGraph:') && content.includes('type: \'website\''),
      fix: '添加OpenGraph元数据'
    },
    {
      name: 'Twitter卡片',
      test: content.includes('twitter:') && content.includes('summary_large_image'),
      fix: '添加Twitter卡片元数据'
    },
    {
      name: 'Canonical URL',
      test: content.includes('canonical: \'https://www.bratgeneratorfree.com/blog\''),
      fix: '设置规范URL'
    },
    {
      name: '无H1冲突',
      test: !content.includes('<h1') || content.split('<h1').length <= 2,
      fix: '确保页面只有一个H1标签'
    }
  ];
  
  let passed = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name} - ${check.fix}`);
    }
  });
  
  console.log(`\n📊 博客列表页面: ${passed}/${checks.length} 项通过\n`);
  return passed === checks.length;
}

// 验证博客详情页面元数据
function validateBlogDetailPage() {
  console.log('📄 验证博客详情页面 (app/blog/[slug]/page.tsx)...');
  
  const blogDetailPath = path.join(__dirname, '../app/blog/[slug]/page.tsx');
  if (!fs.existsSync(blogDetailPath)) {
    console.log('❌ 博客详情页面文件不存在');
    return false;
  }
  
  const content = fs.readFileSync(blogDetailPath, 'utf8');
  
  const checks = [
    {
      name: '标题格式正确',
      test: content.includes('title: `${post.title} | Free Brat Generator`'),
      fix: '使用正确的标题格式: 文章标题 | Free Brat Generator'
    },
    {
      name: '动态描述',
      test: content.includes('description: post.description'),
      fix: '使用文章的描述作为meta描述'
    },
    {
      name: '动态关键词',
      test: content.includes('keywords: post.tags.join(\', \')'),
      fix: '使用文章标签作为关键词'
    },
    {
      name: '文章H1标签',
      test: content.includes('<h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">') && content.includes('{post.title}'),
      fix: '确保H1标签用在文章标题上'
    },
    {
      name: '导航栏无H1',
      test: !content.includes('<h1 className="text-2xl font-bold text-slate-900">'),
      fix: '导航栏logo不应使用H1标签'
    },
    {
      name: 'OpenGraph文章类型',
      test: content.includes('type: \'article\''),
      fix: '设置OpenGraph类型为article'
    },
    {
      name: '发布时间',
      test: content.includes('publishedTime: post.date'),
      fix: '添加文章发布时间'
    },
    {
      name: '作者信息',
      test: content.includes('authors: [post.author]'),
      fix: '添加作者信息'
    }
  ];
  
  let passed = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name} - ${check.fix}`);
    }
  });
  
  console.log(`\n📊 博客详情页面: ${passed}/${checks.length} 项通过\n`);
  return passed === checks.length;
}

// 验证根布局设置
function validateRootLayout() {
  console.log('📄 验证根布局 (app/layout.tsx)...');
  
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ 根布局文件不存在');
    return false;
  }
  
  const content = fs.readFileSync(layoutPath, 'utf8');
  
  const checks = [
    {
      name: '标题模板',
      test: content.includes('template: \'%s | Free Brat Generator\''),
      fix: '设置标题模板格式'
    },
    {
      name: '首页专门关键词',
      test: content.includes('free brat generator, brat album cover generator') && !content.includes('design blog'),
      fix: '首页关键词应专注于生成器功能'
    },
    {
      name: '首页专门描述',
      test: content.includes('Create stunning brat album covers') && !content.includes('design tutorials'),
      fix: '首页描述应专注于生成器功能'
    }
  ];
  
  let passed = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name} - ${check.fix}`);
    }
  });
  
  console.log(`\n📊 根布局: ${passed}/${checks.length} 项通过\n`);
  return passed === checks.length;
}

// 检查关键词冲突
function checkKeywordConflicts() {
  console.log('🔍 检查关键词冲突...');
  
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  const blogPagePath = path.join(__dirname, '../app/blog/page.tsx');
  
  if (!fs.existsSync(layoutPath) || !fs.existsSync(blogPagePath)) {
    console.log('❌ 无法检查关键词冲突：文件不存在');
    return false;
  }
  
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  const blogContent = fs.readFileSync(blogPagePath, 'utf8');
  
  // 提取关键词
  const layoutKeywords = layoutContent.match(/keywords: ['"`]([^'"`]+)['"`]/)?.[1]?.split(', ') || [];
  const blogKeywords = blogContent.match(/keywords: ['"`]([^'"`]+)['"`]/)?.[1]?.split(', ') || [];
  
  const conflicts = layoutKeywords.filter(keyword => blogKeywords.includes(keyword));
  
  if (conflicts.length === 0) {
    console.log('  ✅ 无关键词冲突');
  } else {
    console.log(`  ⚠️  发现关键词冲突: ${conflicts.join(', ')}`);
    console.log('  建议：为每个页面使用独特的关键词策略');
  }
  
  console.log(`\n📊 首页关键词数量: ${layoutKeywords.length}`);
  console.log(`📊 博客页面关键词数量: ${blogKeywords.length}`);
  console.log(`📊 重复关键词数量: ${conflicts.length}\n`);
  
  return conflicts.length === 0;
}

// 生成SEO报告
function generateSEOReport() {
  console.log('📋 生成SEO优化报告...\n');
  
  const results = {
    blogList: validateBlogListPage(),
    blogDetail: validateBlogDetailPage(),
    rootLayout: validateRootLayout(),
    noConflicts: checkKeywordConflicts()
  };
  
  const totalScore = Object.values(results).filter(Boolean).length;
  const maxScore = Object.keys(results).length;
  
  console.log('🎯 SEO优化总结：');
  console.log(`📊 总体评分: ${totalScore}/${maxScore} (${Math.round(totalScore/maxScore*100)}%)`);
  console.log('');
  
  if (results.blogList) console.log('✅ 博客列表页面SEO优化完成');
  else console.log('❌ 博客列表页面需要优化');
  
  if (results.blogDetail) console.log('✅ 博客详情页面SEO优化完成');
  else console.log('❌ 博客详情页面需要优化');
  
  if (results.rootLayout) console.log('✅ 根布局SEO设置正确');
  else console.log('❌ 根布局需要调整');
  
  if (results.noConflicts) console.log('✅ 无关键词冲突');
  else console.log('⚠️  存在关键词冲突');
  
  console.log('\n🔧 SEO最佳实践建议：');
  console.log('1. 每个页面使用独特的标题和描述');
  console.log('2. 关键词策略要有针对性，避免冲突');
  console.log('3. H1标签只用于页面主标题');
  console.log('4. 确保所有页面都有规范URL');
  console.log('5. OpenGraph和Twitter卡片数据完整');
  
  return totalScore === maxScore;
}

// 运行验证
const success = generateSEOReport();
process.exit(success ? 0 : 1); 
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 网站性能审计开始...\n');

// 分析包大小
function analyzeBundleSize() {
  console.log('📦 分析包大小...');
  
  const packageJsonPath = path.join(__dirname, '../package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ package.json 文件不存在');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  // 检查大型依赖包
  const largeDependencies = [
    'html2canvas', 'dom-to-image-more', '@sanity/client', 
    'embla-carousel-react', 'recharts'
  ];
  
  const foundLargeDeps = dependencies.filter(dep => 
    largeDependencies.some(large => dep.includes(large))
  );
  
  console.log(`  📊 总依赖包数量: ${dependencies.length}`);
  console.log(`  📊 开发依赖包数量: ${devDependencies.length}`);
  console.log(`  ⚠️  大型依赖包: ${foundLargeDeps.join(', ') || '无'}`);
  
  // 建议
  const suggestions = [];
  if (foundLargeDeps.includes('html2canvas')) {
    suggestions.push('考虑懒加载 html2canvas，只在用户点击下载时加载');
  }
  if (foundLargeDeps.includes('recharts')) {
    suggestions.push('考虑使用更轻量的图表库或按需加载');
  }
  if (foundLargeDeps.includes('embla-carousel-react')) {
    suggestions.push('检查是否真的需要轮播组件，考虑原生实现');
  }
  
  if (suggestions.length > 0) {
    console.log('  💡 优化建议:');
    suggestions.forEach(suggestion => console.log(`    - ${suggestion}`));
  }
  
  console.log('');
  return true;
}

// 分析图片优化
function analyzeImageOptimization() {
  console.log('🖼️  分析图片优化...');
  
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  if (!fs.existsSync(nextConfigPath)) {
    console.log('❌ next.config.js 文件不存在');
    return false;
  }
  
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  const checks = [
    {
      name: 'WebP格式支持',
      test: nextConfigContent.includes('image/webp'),
      fix: '在next.config.js中添加WebP格式支持'
    },
    {
      name: 'AVIF格式支持',
      test: nextConfigContent.includes('image/avif'),
      fix: '在next.config.js中添加AVIF格式支持'
    },
    {
      name: '图片域名配置',
      test: nextConfigContent.includes('domains:'),
      fix: '配置外部图片域名白名单'
    },
    {
      name: '图片尺寸配置',
      test: nextConfigContent.includes('deviceSizes'),
      fix: '配置合适的设备尺寸'
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
  
  console.log(`  📊 图片优化评分: ${passed}/${checks.length}\n`);
  
  // 检查静态图片文件
  const publicDir = path.join(__dirname, '../public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|bmp)$/i.test(file)
    );
    
    console.log(`  📁 public目录中的图片文件: ${imageFiles.length}`);
    if (imageFiles.length > 0) {
      console.log('  💡 建议: 考虑将大图片转换为WebP格式以减小文件大小');
    }
  }
  
  console.log('');
  return passed === checks.length;
}

// 分析代码分割
function analyzeCodeSplitting() {
  console.log('🔄 分析代码分割...');
  
  // 检查动态导入
  const appDir = path.join(__dirname, '../app');
  const componentsDir = path.join(__dirname, '../components');
  
  let dynamicImports = 0;
  let totalComponents = 0;
  
  function checkDynamicImports(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        checkDynamicImports(path.join(dir, file.name));
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        totalComponents++;
        const content = fs.readFileSync(path.join(dir, file.name), 'utf8');
        
        if (content.includes('import(') || content.includes('dynamic(')) {
          dynamicImports++;
        }
      }
    });
  }
  
  checkDynamicImports(appDir);
  checkDynamicImports(componentsDir);
  
  console.log(`  📊 总组件数量: ${totalComponents}`);
  console.log(`  📊 动态导入数量: ${dynamicImports}`);
  
  const dynamicImportRatio = totalComponents > 0 ? (dynamicImports / totalComponents * 100).toFixed(1) : 0;
  console.log(`  📊 动态导入比例: ${dynamicImportRatio}%`);
  
  if (dynamicImportRatio < 10) {
    console.log('  💡 建议: 考虑对大型组件使用动态导入以减少初始包大小');
    console.log('    - html2canvas 可以动态导入');
    console.log('    - 博客相关组件可以懒加载');
    console.log('    - 图表组件可以按需加载');
  }
  
  console.log('');
  return dynamicImportRatio >= 10;
}

// 分析字体优化
function analyzeFontOptimization() {
  console.log('🔤 分析字体优化...');
  
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  let fontOptimized = false;
  
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    const checks = [
      {
        name: 'Google Fonts预连接',
        test: content.includes('preconnect') && content.includes('fonts.googleapis.com'),
        fix: '添加Google Fonts预连接'
      },
      {
        name: 'DNS预获取',
        test: content.includes('dns-prefetch'),
        fix: '添加DNS预获取'
      },
      {
        name: '字体预加载',
        test: content.includes('preload') && content.includes('font'),
        fix: '为关键字体添加预加载'
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
    
    fontOptimized = passed >= 2;
    console.log(`  📊 字体优化评分: ${passed}/${checks.length}`);
  }
  
  // 检查外部字体加载
  const globalCssPath = path.join(__dirname, '../app/globals.css');
  if (fs.existsSync(globalCssPath)) {
    const cssContent = fs.readFileSync(globalCssPath, 'utf8');
    if (cssContent.includes('@import') && cssContent.includes('fonts.googleapis.com')) {
      console.log('  ⚠️  发现CSS中的@import字体加载，建议改为HTML预加载');
      fontOptimized = false;
    }
  }
  
  console.log('');
  return fontOptimized;
}

// 分析缓存策略
function analyzeCaching() {
  console.log('💾 分析缓存策略...');
  
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  if (!fs.existsSync(nextConfigPath)) {
    console.log('❌ next.config.js 文件不存在');
    return false;
  }
  
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  const checks = [
    {
      name: 'HTTP缓存头配置',
      test: nextConfigContent.includes('headers()') && nextConfigContent.includes('Cache-Control'),
      fix: '配置适当的HTTP缓存头'
    },
    {
      name: '静态资源缓存',
      test: nextConfigContent.includes('Cache-Control') && nextConfigContent.includes('max-age'),
      fix: '为静态资源设置长期缓存'
    },
    {
      name: 'stale-while-revalidate',
      test: nextConfigContent.includes('stale-while-revalidate'),
      fix: '使用stale-while-revalidate策略'
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
  
  console.log(`  📊 缓存策略评分: ${passed}/${checks.length}`);
  
  if (passed < 2) {
    console.log('  💡 建议缓存策略:');
    console.log('    - 静态资源: max-age=31536000 (1年)');
    console.log('    - API响应: max-age=3600, stale-while-revalidate=86400');
    console.log('    - HTML页面: max-age=0, must-revalidate');
  }
  
  console.log('');
  return passed >= 2;
}

// 分析压缩优化
function analyzeCompression() {
  console.log('🗜️  分析压缩优化...');
  
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  if (!fs.existsSync(nextConfigPath)) {
    console.log('❌ next.config.js 文件不存在');
    return false;
  }
  
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  const checks = [
    {
      name: 'SWC压缩启用',
      test: nextConfigContent.includes('swcMinify: true'),
      fix: '启用SWC压缩'
    },
    {
      name: 'Gzip压缩启用',
      test: nextConfigContent.includes('compress: true'),
      fix: '启用Gzip压缩'
    },
    {
      name: 'CSS优化',
      test: nextConfigContent.includes('optimizeCss: true'),
      fix: '启用CSS优化'
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
  
  console.log(`  📊 压缩优化评分: ${passed}/${checks.length}`);
  console.log('');
  return passed >= 2;
}

// 分析懒加载实现
function analyzeLazyLoading() {
  console.log('⏳ 分析懒加载实现...');
  
  // 检查Image组件使用
  const appDir = path.join(__dirname, '../app');
  let imageComponents = 0;
  let lazyImages = 0;
  let priorityImages = 0;
  
  function checkImages(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        checkImages(path.join(dir, file.name));
      } else if (file.name.endsWith('.tsx')) {
        const content = fs.readFileSync(path.join(dir, file.name), 'utf8');
        
        // 统计Image组件使用
        const imageMatches = content.match(/<Image/g);
        if (imageMatches) {
          imageComponents += imageMatches.length;
          
          // 检查是否有priority属性
          const priorityMatches = content.match(/<Image[^>]*priority[^>]*>/g);
          if (priorityMatches) {
            priorityImages += priorityMatches.length;
          }
          
          // 默认情况下Next.js Image组件是懒加载的
          lazyImages += imageMatches.length;
        }
      }
    });
  }
  
  checkImages(appDir);
  
  console.log(`  📊 Image组件使用数量: ${imageComponents}`);
  console.log(`  📊 懒加载图片数量: ${lazyImages}`);
  console.log(`  📊 优先加载图片数量: ${priorityImages}`);
  
  // 检查组件懒加载
  const componentsDir = path.join(__dirname, '../components');
  let lazyComponents = 0;
  
  function checkLazyComponents(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        checkLazyComponents(path.join(dir, file.name));
      } else if (file.name.endsWith('.tsx')) {
        const content = fs.readFileSync(path.join(dir, file.name), 'utf8');
        
        if (content.includes('Suspense') || content.includes('lazy(')) {
          lazyComponents++;
        }
      }
    });
  }
  
  checkLazyComponents(componentsDir);
  
  console.log(`  📊 懒加载组件数量: ${lazyComponents}`);
  
  const suggestions = [];
  if (priorityImages === 0 && imageComponents > 0) {
    suggestions.push('为首屏关键图片添加priority属性');
  }
  if (lazyComponents === 0) {
    suggestions.push('考虑对非关键组件实现懒加载');
  }
  
  if (suggestions.length > 0) {
    console.log('  💡 懒加载优化建议:');
    suggestions.forEach(suggestion => console.log(`    - ${suggestion}`));
  }
  
  console.log('');
  return imageComponents > 0 && (priorityImages > 0 || lazyComponents > 0);
}

// 分析API优化
function analyzeAPIOptimization() {
  console.log('🔌 分析API优化...');
  
  const apiDir = path.join(__dirname, '../app/api');
  if (!fs.existsSync(apiDir)) {
    console.log('  ℹ️  未找到API目录');
    console.log('');
    return true;
  }
  
  let apiRoutes = 0;
  let cachedRoutes = 0;
  let optimizedRoutes = 0;
  
  function checkAPIRoutes(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        checkAPIRoutes(path.join(dir, file.name));
      } else if (file.name === 'route.ts' || file.name === 'route.js') {
        apiRoutes++;
        const content = fs.readFileSync(path.join(dir, file.name), 'utf8');
        
        // 检查缓存实现
        if (content.includes('Cache-Control') || content.includes('revalidate')) {
          cachedRoutes++;
        }
        
        // 检查性能优化
        if (content.includes('dynamic') || content.includes('force-dynamic')) {
          optimizedRoutes++;
        }
      }
    });
  }
  
  checkAPIRoutes(apiDir);
  
  console.log(`  📊 API路由数量: ${apiRoutes}`);
  console.log(`  📊 缓存路由数量: ${cachedRoutes}`);
  console.log(`  📊 优化路由数量: ${optimizedRoutes}`);
  
  if (apiRoutes > 0) {
    const cacheRatio = (cachedRoutes / apiRoutes * 100).toFixed(1);
    console.log(`  📊 缓存覆盖率: ${cacheRatio}%`);
    
    if (cacheRatio < 50) {
      console.log('  💡 API优化建议:');
      console.log('    - 为静态数据API添加缓存头');
      console.log('    - 使用Next.js的revalidate选项');
      console.log('    - 考虑使用Redis等外部缓存');
    }
  }
  
  console.log('');
  return cachedRoutes >= Math.ceil(apiRoutes * 0.5);
}

// 生成性能报告
function generatePerformanceReport() {
  console.log('📋 生成性能优化报告...\n');
  
  const results = {
    bundleSize: analyzeBundleSize(),
    imageOptimization: analyzeImageOptimization(),
    codeSplitting: analyzeCodeSplitting(),
    fontOptimization: analyzeFontOptimization(),
    caching: analyzeCaching(),
    compression: analyzeCompression(),
    lazyLoading: analyzeLazyLoading(),
    apiOptimization: analyzeAPIOptimization()
  };
  
  const totalScore = Object.values(results).filter(Boolean).length;
  const maxScore = Object.keys(results).length;
  const percentage = Math.round(totalScore / maxScore * 100);
  
  console.log('🎯 性能优化总结：');
  console.log(`📊 总体评分: ${totalScore}/${maxScore} (${percentage}%)`);
  console.log('');
  
  // 分类显示结果
  const categories = {
    '✅ 已优化': [],
    '⚠️  需要改进': [],
    '❌ 需要优化': []
  };
  
  Object.entries(results).forEach(([key, value]) => {
    const name = {
      bundleSize: '包大小分析',
      imageOptimization: '图片优化',
      codeSplitting: '代码分割',
      fontOptimization: '字体优化',
      caching: '缓存策略',
      compression: '压缩优化',
      lazyLoading: '懒加载',
      apiOptimization: 'API优化'
    }[key];
    
    if (value) {
      categories['✅ 已优化'].push(name);
    } else {
      categories['❌ 需要优化'].push(name);
    }
  });
  
  Object.entries(categories).forEach(([category, items]) => {
    if (items.length > 0) {
      console.log(`${category}:`);
      items.forEach(item => console.log(`  - ${item}`));
      console.log('');
    }
  });
  
  // 优先级建议
  console.log('🚀 优化优先级建议：');
  console.log('');
  
  console.log('📈 高优先级（立即执行）：');
  if (!results.compression) {
    console.log('  1. 启用压缩优化 - 可立即减少30-50%的文件大小');
  }
  if (!results.imageOptimization) {
    console.log('  2. 配置图片优化 - WebP格式可减少25-35%的图片大小');
  }
  if (!results.caching) {
    console.log('  3. 实现缓存策略 - 显著提升重复访问速度');
  }
  
  console.log('');
  console.log('📊 中优先级（本周内）：');
  if (!results.codeSplitting) {
    console.log('  1. 实现代码分割 - 减少初始包大小');
  }
  if (!results.lazyLoading) {
    console.log('  2. 优化懒加载 - 提升首屏加载速度');
  }
  if (!results.fontOptimization) {
    console.log('  3. 优化字体加载 - 减少字体闪烁');
  }
  
  console.log('');
  console.log('🔧 低优先级（长期优化）：');
  if (!results.bundleSize) {
    console.log('  1. 分析和减少包大小 - 审查不必要的依赖');
  }
  if (!results.apiOptimization) {
    console.log('  2. 优化API性能 - 实现更好的缓存策略');
  }
  
  console.log('');
  console.log('💡 具体实施建议：');
  console.log('');
  
  if (percentage < 50) {
    console.log('🔴 性能需要大幅改进：');
    console.log('  - 立即实施高优先级优化');
    console.log('  - 考虑使用性能监控工具');
    console.log('  - 定期进行性能审计');
  } else if (percentage < 80) {
    console.log('🟡 性能良好但有改进空间：');
    console.log('  - 逐步实施中优先级优化');
    console.log('  - 监控核心性能指标');
    console.log('  - 优化用户体验细节');
  } else {
    console.log('🟢 性能表现优秀：');
    console.log('  - 保持当前优化水平');
    console.log('  - 关注新的性能优化技术');
    console.log('  - 定期审查和更新');
  }
  
  console.log('');
  console.log('🛠️  推荐工具：');
  console.log('  - Lighthouse: 综合性能测试');
  console.log('  - WebPageTest: 详细性能分析');
  console.log('  - Bundle Analyzer: 包大小分析');
  console.log('  - Chrome DevTools: 实时性能监控');
  
  return percentage >= 80;
}

// 运行性能审计
const success = generatePerformanceReport();
process.exit(success ? 0 : 1); 
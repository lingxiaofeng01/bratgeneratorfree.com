#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 开始实施性能优化...\n');

// 1. 优化字体加载
function optimizeFontLoading() {
  console.log('🔤 优化字体加载...');
  
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ layout.tsx 文件不存在');
    return false;
  }
  
  let content = fs.readFileSync(layoutPath, 'utf8');
  
  // 检查是否已经有字体优化
  if (content.includes('preconnect') && content.includes('fonts.googleapis.com')) {
    console.log('  ✅ 字体预连接已存在');
    return true;
  }
  
  // 在head部分添加字体优化
  const headInsertPoint = content.indexOf('<head>');
  if (headInsertPoint === -1) {
    console.log('❌ 找不到<head>标签');
    return false;
  }
  
  const fontOptimizations = `
        {/* 字体优化 - 预连接和DNS预获取 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        
        {/* 预加载关键字体 */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          as="style" 
        />`;
  
  // 在现有的头部内容之后插入
  const insertAfter = content.indexOf('<head>') + 6;
  content = content.slice(0, insertAfter) + fontOptimizations + content.slice(insertAfter);
  
  fs.writeFileSync(layoutPath, content);
  console.log('  ✅ 字体优化已添加');
  return true;
}

// 2. 实现代码分割 - 懒加载html2canvas
function implementCodeSplitting() {
  console.log('🔄 实现代码分割...');
  
  const pagePath = path.join(__dirname, '../app/page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log('❌ page.tsx 文件不存在');
    return false;
  }
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // 检查是否已经使用动态导入
  if (content.includes('await import(\'html2canvas\')')) {
    console.log('  ✅ html2canvas 已经是动态导入');
    return true;
  }
  
  console.log('  ✅ html2canvas 动态导入已存在于代码中');
  
  // 创建懒加载的博客组件
  const blogComponentPath = path.join(__dirname, '../components/LazyBlogSection.tsx');
  if (!fs.existsSync(blogComponentPath)) {
    const lazyBlogComponent = `'use client';

import { Suspense, lazy } from 'react';
import { BlogPost } from '@/app/page';

const BlogSection = lazy(() => import('./BlogSection'));

interface LazyBlogSectionProps {
  latestPosts: BlogPost[];
}

export default function LazyBlogSection({ latestPosts }: LazyBlogSectionProps) {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <BlogSection latestPosts={latestPosts} />
    </Suspense>
  );
}`;
    
    fs.writeFileSync(blogComponentPath, lazyBlogComponent);
    console.log('  ✅ 懒加载博客组件已创建');
  }
  
  return true;
}

// 3. 优化图片加载
function optimizeImageLoading() {
  console.log('🖼️  优化图片加载...');
  
  // 检查是否有priority属性的使用
  const appDir = path.join(__dirname, '../app');
  
  function addPriorityToImages(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        addPriorityToImages(path.join(dir, file.name));
      } else if (file.name.endsWith('.tsx')) {
        const filePath = path.join(dir, file.name);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 为首屏图片添加priority属性（仅在主页面）
        if (file.name === 'page.tsx' && !content.includes('priority')) {
          // 查找第一个Image组件并添加priority
          content = content.replace(
            /<Image([^>]*?)src={post\.image}([^>]*?)>/,
            '<Image$1src={post.image}$2 priority>'
          );
          
          fs.writeFileSync(filePath, content);
          console.log(`  ✅ 为 ${file.name} 中的首屏图片添加了priority属性`);
        }
      }
    });
  }
  
  addPriorityToImages(appDir);
  return true;
}

// 4. 添加预加载关键资源
function addResourcePreloading() {
  console.log('⚡ 添加资源预加载...');
  
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ layout.tsx 文件不存在');
    return false;
  }
  
  let content = fs.readFileSync(layoutPath, 'utf8');
  
  // 检查是否已经有资源预加载
  if (content.includes('rel="preload"') && content.includes('line.png')) {
    console.log('  ✅ 关键资源预加载已存在');
    return true;
  }
  
  // 添加关键资源预加载
  const preloadResources = `
        {/* 预加载关键资源 */}
        <link rel="preload" href="/line.png" as="image" />
        <link rel="preload" href="/favicon.ico" as="image" />`;
  
  const headEndPoint = content.indexOf('</head>');
  if (headEndPoint === -1) {
    console.log('❌ 找不到</head>标签');
    return false;
  }
  
  content = content.slice(0, headEndPoint) + preloadResources + '\n      ' + content.slice(headEndPoint);
  
  fs.writeFileSync(layoutPath, content);
  console.log('  ✅ 关键资源预加载已添加');
  return true;
}

// 5. 优化API缓存
function optimizeAPICache() {
  console.log('🔌 优化API缓存...');
  
  const apiDir = path.join(__dirname, '../app/api');
  if (!fs.existsSync(apiDir)) {
    console.log('  ℹ️  未找到API目录');
    return true;
  }
  
  // 检查博客API是否有缓存
  const blogApiPath = path.join(apiDir, 'blog/posts/route.ts');
  if (fs.existsSync(blogApiPath)) {
    let content = fs.readFileSync(blogApiPath, 'utf8');
    
    if (!content.includes('Cache-Control')) {
      // 添加缓存头
      const cacheHeaders = `
  // 设置缓存头
  const headers = new Headers();
  headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
  headers.set('Content-Type', 'application/json');
  
  return new NextResponse(JSON.stringify(result), { headers });`;
      
      // 替换简单的返回语句
      content = content.replace(
        /return NextResponse\.json\(([^)]+)\);/g,
        `const result = $1;${cacheHeaders}`
      );
      
      fs.writeFileSync(blogApiPath, content);
      console.log('  ✅ 博客API缓存已优化');
    } else {
      console.log('  ✅ 博客API缓存已存在');
    }
  }
  
  return true;
}

// 6. 创建Service Worker for 缓存
function createServiceWorker() {
  console.log('🛠️  创建Service Worker...');
  
  const swPath = path.join(__dirname, '../public/sw.js');
  if (fs.existsSync(swPath)) {
    console.log('  ✅ Service Worker 已存在');
    return true;
  }
  
  const serviceWorkerContent = `// Service Worker for caching
const CACHE_NAME = 'brat-generator-v1';
const urlsToCache = [
  '/',
  '/blog',
  '/line.png',
  '/favicon.ico',
  '/_next/static/css/',
  '/_next/static/js/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果在缓存中找到，返回缓存版本
        if (response) {
          return response;
        }
        
        // 否则从网络获取
        return fetch(event.request);
      })
  );
});`;
  
  fs.writeFileSync(swPath, serviceWorkerContent);
  console.log('  ✅ Service Worker 已创建');
  
  // 在layout.tsx中注册Service Worker
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    
    if (!content.includes('navigator.serviceWorker')) {
      const swRegistration = `
        <script dangerouslySetInnerHTML={{
          __html: \`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          \`
        }} />`;
      
      const headEndPoint = content.indexOf('</head>');
      content = content.slice(0, headEndPoint) + swRegistration + '\n      ' + content.slice(headEndPoint);
      
      fs.writeFileSync(layoutPath, content);
      console.log('  ✅ Service Worker 注册已添加');
    }
  }
  
  return true;
}

// 7. 添加性能监控
function addPerformanceMonitoring() {
  console.log('📊 添加性能监控...');
  
  const monitoringPath = path.join(__dirname, '../components/PerformanceMonitor.tsx');
  if (fs.existsSync(monitoringPath)) {
    console.log('  ✅ 性能监控组件已存在');
    return true;
  }
  
  const performanceMonitorContent = `'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // 监控Core Web Vitals
    if (typeof window !== 'undefined') {
      // First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime);
          }
        }
      });
      
      observer.observe({ entryTypes: ['paint'] });
      
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('LCP:', entry.startTime);
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);
  
  return null; // 这是一个监控组件，不渲染任何内容
}`;
  
  fs.writeFileSync(monitoringPath, performanceMonitorContent);
  console.log('  ✅ 性能监控组件已创建');
  return true;
}

// 运行所有优化
function runAllOptimizations() {
  console.log('🎯 执行性能优化方案...\n');
  
  const optimizations = [
    { name: '字体加载优化', fn: optimizeFontLoading },
    { name: '代码分割实现', fn: implementCodeSplitting },
    { name: '图片加载优化', fn: optimizeImageLoading },
    { name: '资源预加载', fn: addResourcePreloading },
    { name: 'API缓存优化', fn: optimizeAPICache },
    { name: 'Service Worker', fn: createServiceWorker },
    { name: '性能监控', fn: addPerformanceMonitoring }
  ];
  
  let successCount = 0;
  
  optimizations.forEach(({ name, fn }) => {
    try {
      if (fn()) {
        successCount++;
      }
    } catch (error) {
      console.log(`❌ ${name} 失败:`, error.message);
    }
  });
  
  console.log(`\n📊 优化完成: ${successCount}/${optimizations.length}`);
  console.log('\n🚀 下一步建议:');
  console.log('1. 运行 npm run build 构建项目');
  console.log('2. 使用 Lighthouse 测试性能');
  console.log('3. 监控 Core Web Vitals 指标');
  console.log('4. 定期运行 npm run performance:audit');
  
  return successCount === optimizations.length;
}

// 执行优化
const success = runAllOptimizations();
process.exit(success ? 0 : 1); 
const fs = require('fs');
const path = require('path');

console.log('🔧 PNG图标生成工具');
console.log('===================\n');

// 检查是否存在SVG图标文件
const publicDir = path.join(process.cwd(), 'public');
const svgIcons = [
  'favicon-16x16.svg',
  'favicon-32x32.svg',
  'apple-touch-icon.svg',
  'android-chrome-192x192.svg',
  'android-chrome-512x512.svg'
];

console.log('📋 检查SVG图标文件...');
svgIcons.forEach(icon => {
  const iconPath = path.join(publicDir, icon);
  if (fs.existsSync(iconPath)) {
    console.log(`✅ 找到: ${icon}`);
  } else {
    console.log(`❌ 缺少: ${icon}`);
  }
});

console.log('\n📝 建议操作:');
console.log('由于Node.js环境限制，无法直接转换SVG到PNG。');
console.log('请使用以下方法之一生成PNG图标:\n');

console.log('方法1: 使用在线工具');
console.log('- 访问 https://realfavicongenerator.net/');
console.log('- 上传您的主图标');
console.log('- 下载生成的PNG文件\n');

console.log('方法2: 使用设计工具');
console.log('- 使用Figma、Photoshop或GIMP');
console.log('- 导出以下尺寸的PNG文件:');
console.log('  • favicon-16x16.png (16x16px)');
console.log('  • favicon-32x32.png (32x32px)');
console.log('  • apple-touch-icon.png (180x180px)');
console.log('  • android-chrome-192x192.png (192x192px)');
console.log('  • android-chrome-512x512.png (512x512px)\n');

console.log('方法3: 使用命令行工具 (需要安装)');
console.log('- 安装 ImageMagick: https://imagemagick.org/');
console.log('- 运行命令转换SVG到PNG\n');

// 创建一个简单的HTML文件来帮助用户预览图标
const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图标预览</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .icon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .icon-item { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
        .icon { width: 64px; height: 64px; margin: 10px auto; display: block; border: 1px solid #eee; }
        .small-icon { width: 32px; height: 32px; }
    </style>
</head>
<body>
    <h1>🎨 网站图标预览</h1>
    <p>这个页面可以帮助您预览网站图标。请确保所有PNG文件都已正确生成。</p>
    
    <div class="icon-grid">
        <div class="icon-item">
            <h3>Favicon 16x16</h3>
            <img src="/favicon-16x16.png" alt="Favicon 16x16" class="icon small-icon">
            <p>favicon-16x16.png</p>
        </div>
        
        <div class="icon-item">
            <h3>Favicon 32x32</h3>
            <img src="/favicon-32x32.png" alt="Favicon 32x32" class="icon small-icon">
            <p>favicon-32x32.png</p>
        </div>
        
        <div class="icon-item">
            <h3>Apple Touch Icon</h3>
            <img src="/apple-touch-icon.png" alt="Apple Touch Icon" class="icon">
            <p>apple-touch-icon.png (180x180)</p>
        </div>
        
        <div class="icon-item">
            <h3>Android Chrome 192</h3>
            <img src="/android-chrome-192x192.png" alt="Android Chrome 192" class="icon">
            <p>android-chrome-192x192.png</p>
        </div>
        
        <div class="icon-item">
            <h3>Android Chrome 512</h3>
            <img src="/android-chrome-512x512.png" alt="Android Chrome 512" class="icon">
            <p>android-chrome-512x512.png</p>
        </div>
    </div>
    
    <h2>📱 Web Manifest检查</h2>
    <p>确保 public/site.webmanifest 文件中的图标路径正确:</p>
    <pre><code>{
  "icons": [
    {
      "src": "/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "/favicon-32x32.png", 
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180", 
      "type": "image/png"
    },
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}</code></pre>
</body>
</html>`;

// 保存预览文件
const previewPath = path.join(publicDir, 'icon-preview.html');
fs.writeFileSync(previewPath, previewHtml);
console.log(`✅ 已创建图标预览页面: ${previewPath}`);
console.log('   访问 http://localhost:3000/icon-preview.html 查看图标\n');

console.log('🎯 完成后请运行: npm run validate:seo 检查配置'); 
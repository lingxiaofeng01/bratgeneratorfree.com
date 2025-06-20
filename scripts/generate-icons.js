const fs = require('fs');
const path = require('path');

// 简单的SVG图标生成器
function generateSVGIcon(size, text = 'BG') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#39FF14"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#000">${text}</text>
  </svg>`;
}

// 生成基础图标文件
function generateIcons() {
  const publicDir = path.join(__dirname, '../public');
  
  // 确保public目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const icons = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  // 生成SVG图标
  icons.forEach(icon => {
    const svgContent = generateSVGIcon(icon.size);
    const svgPath = path.join(publicDir, icon.name.replace('.png', '.svg'));
    fs.writeFileSync(svgPath, svgContent);
    console.log(`✅ 生成 ${icon.name.replace('.png', '.svg')}`);
  });

  // 生成OG图片和Twitter图片的SVG版本
  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#39FF14"/>
    <text x="600" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#000">Free Brat Generator</text>
    <text x="600" y="350" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="#000">Create Viral Album Covers</text>
    <text x="600" y="420" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="#000">Inspired by Charli XCX</text>
    <text x="600" y="520" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="#000">www.bratgeneratorfree.com</text>
  </svg>`;

  fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogSvg);
  fs.writeFileSync(path.join(publicDir, 'twitter-image.svg'), ogSvg);
  
  console.log('✅ 生成 og-image.svg');
  console.log('✅ 生成 twitter-image.svg');

  // 生成favicon.ico的替代SVG
  const faviconSvg = generateSVGIcon(32);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
  console.log('✅ 生成 favicon.svg');

  console.log('\n🎉 所有图标文件已生成！');
  console.log('\n📝 注意：');
  console.log('- 生成的是SVG格式文件，现代浏览器都支持');
  console.log('- 如需PNG格式，请使用在线转换工具或设计软件');
  console.log('- 建议使用专业设计工具创建更精美的图标');
}

// 运行脚本
if (require.main === module) {
  generateIcons();
}

module.exports = { generateIcons }; 
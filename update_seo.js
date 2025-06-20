const fs = require('fs');

// 读取原文件
let content = fs.readFileSync('app/layout.tsx', 'utf8');

// 修改标题
content = content.replace(
  "default: 'Free Brat Generator - Create Viral Album Covers Inspired by Charli XCX',",
  "default: 'Brat Generator - Free Brat Text Generator & Album Covers Inspired by Charli XCX',"
);

// 修改描述，根据新标题进行微调
content = content.replace(
  "description: 'Create stunning brat album covers with our free brat generator. Design custom brat text generator artwork inspired by Charli XCX aesthetic. Professional brat font generator tools for instant downloads - completely free!',",
  "description: 'Brat Generator - Create stunning album covers with our free brat text generator inspired by Charli XCX aesthetic. Design custom brat artwork with professional brat font generator tools for instant downloads - completely free!',"
);

// 更新OpenGraph标题
content = content.replace(
  "title: 'Free Brat Generator - Create Viral Album Covers Inspired by Charli XCX',",
  "title: 'Brat Generator - Free Brat Text Generator & Album Covers Inspired by Charli XCX',"
);

// 更新OpenGraph描述
content = content.replace(
  "description: 'Create stunning brat album covers with our free brat generator. Design custom brat text generator artwork inspired by Charli XCX aesthetic - completely free!',",
  "description: 'Brat Generator - Create stunning album covers with our free brat text generator inspired by Charli XCX aesthetic. Design custom brat artwork - completely free!',"
);

// 更新Twitter标题
content = content.replace(
  /title: 'Free Brat Generator - Create Viral Album Covers Inspired by Charli XCX',/g,
  "title: 'Brat Generator - Free Brat Text Generator & Album Covers Inspired by Charli XCX',"
);

// 更新Twitter描述
content = content.replace(
  "description: 'The ultimate free tool to design album covers inspired by the iconic brat aesthetic. Create professional, high-quality artwork instantly with our text generator.',",
  "description: 'Brat Generator - The ultimate free brat text generator to design album covers inspired by the iconic Charli XCX aesthetic. Create professional artwork instantly!',"
);

// 更新图片alt文本
content = content.replace(
  "alt: 'Free Brat Generator - Create Viral Album Covers Inspired by Charli XCX',",
  "alt: 'Brat Generator - Free Brat Text Generator & Album Covers Inspired by Charli XCX',"
);

// 写入文件
fs.writeFileSync('app/layout.tsx', content);

console.log(' SEO标题和描述已成功更新！');
console.log('� 新标题: "Brat Generator - Free Brat Text Generator & Album Covers Inspired by Charli XCX"');
console.log(' 描述已相应调整以保持一致性');

const http = require('http');

function testSitemap() {
  console.log('🗺️  测试 sitemap.xml...\n');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/sitemap.xml',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    console.log(`Cache-Control: ${res.headers['cache-control']}`);
    console.log(`X-Robots-Tag: ${res.headers['x-robots-tag']}`);
    console.log('\n📄 sitemap.xml 内容预览:');
    console.log('----------------------------------------');

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      // 显示前500个字符作为预览
      console.log(data.substring(0, 500) + '...\n');
      console.log('----------------------------------------');
      
      // 检查内容
      const checks = [
        { name: '包含 XML 声明', test: data.includes('<?xml version="1.0"') },
        { name: '包含 urlset 元素', test: data.includes('<urlset') },
        { name: '包含正确域名', test: data.includes('www.bratgeneratorfree.com') },
        { name: '包含主页', test: data.includes('<loc>https://www.bratgeneratorfree.com</loc>') },
        { name: '包含博客页面', test: data.includes('/blog</loc>') },
        { name: '包含关于页面', test: data.includes('/about</loc>') },
        { name: '包含lastmod标签', test: data.includes('<lastmod>') },
        { name: '包含priority标签', test: data.includes('<priority>') },
        { name: '包含changefreq标签', test: data.includes('<changefreq>') },
        { name: '正确的XML结构', test: data.includes('</urlset>') }
      ];

      console.log('\n✅ 内容检查:');
      checks.forEach(check => {
        console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
      });

      // 统计URL数量
      const urlMatches = data.match(/<url>/g);
      const urlCount = urlMatches ? urlMatches.length : 0;
      console.log(`\n📊 统计信息:`);
      console.log(`  总URL数量: ${urlCount}`);
      console.log(`  文件大小: ${Buffer.byteLength(data, 'utf8')} 字节`);

      const allPassed = checks.every(check => check.test);
      console.log(`\n🎉 总体状态: ${allPassed ? '通过' : '需要修复'}`);
      
      if (allPassed) {
        console.log('\n🚀 sitemap.xml 配置完美！');
        console.log('搜索引擎可以正确发现和索引您的所有页面。');
        console.log(`包含 ${urlCount} 个页面的完整站点地图已生成。`);
      } else {
        console.log('\n⚠️  请检查并修复上述问题。');
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ 请求失败: ${e.message}`);
    console.log('请确保开发服务器正在运行: npm run dev');
  });

  req.end();
}

// 如果直接运行此脚本
if (require.main === module) {
  testSitemap();
}

module.exports = { testSitemap }; 
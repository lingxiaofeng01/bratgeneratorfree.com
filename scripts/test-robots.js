const http = require('http');

function testRobotsTxt() {
  console.log('🤖 测试 robots.txt...\n');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/robots.txt',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    console.log(`Cache-Control: ${res.headers['cache-control']}`);
    console.log('\n📄 robots.txt 内容:');
    console.log('----------------------------------------');

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(data);
      console.log('----------------------------------------');
      
      // 检查内容
      const checks = [
        { name: '包含 User-agent: *', test: data.includes('User-agent: *') },
        { name: '包含 Sitemap', test: data.includes('Sitemap:') },
        { name: '包含正确域名', test: data.includes('www.bratgeneratorfree.com') },
        { name: '禁止 /api/', test: data.includes('Disallow: /api/') },
        { name: '允许 /images/', test: data.includes('Allow: /images/') },
        { name: '无中文字符', test: !/[\u4e00-\u9fa5]/.test(data) }
      ];

      console.log('\n✅ 内容检查:');
      checks.forEach(check => {
        console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
      });

      const allPassed = checks.every(check => check.test);
      console.log(`\n🎉 总体状态: ${allPassed ? '通过' : '需要修复'}`);
      
      if (allPassed) {
        console.log('\n🚀 robots.txt 配置完美！');
        console.log('搜索引擎可以正确解析您的网站规则。');
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ 请求失败: ${e.message}`);
    console.log('请确保开发服务器正在运行: npm run dev');
  });

  req.end();
}

// 运行测试
if (require.main === module) {
  testRobotsTxt();
}

module.exports = { testRobotsTxt }; 
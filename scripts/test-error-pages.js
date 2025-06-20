const http = require('http');

function testErrorPages() {
  console.log('🚨 测试错误页面...\n');

  // 测试404页面
  console.log('1️⃣ 测试404页面...');
  testPage('/this-page-does-not-exist', (res, data) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    
    const checks = [
      { name: '包含404标题', test: data.includes('404') },
      { name: '包含page not found', test: data.includes('page not found') },
      { name: '包含返回首页链接', test: data.includes('Back to Home') },
      { name: '包含Browse Blog链接', test: data.includes('Browse Blog') },
      { name: '包含lime色彩主题', test: data.includes('lime-') },
      { name: '包含导航链接', test: data.includes('Popular Pages') },
      { name: '响应式设计', test: data.includes('md:') },
      { name: '包含动画效果', test: data.includes('animate-') }
    ];

    console.log('404页面检查结果:');
    checks.forEach(check => {
      console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
    });
    
    const passed = checks.filter(c => c.test).length;
    console.log(`404页面: ${passed}/${checks.length} 项通过\n`);
  });

  // 测试主页（确保正常页面工作）
  setTimeout(() => {
    console.log('2️⃣ 测试主页（对比）...');
    testPage('/', (res, data) => {
      console.log(`状态码: ${res.statusCode}`);
      
      const checks = [
        { name: '状态码200', test: res.statusCode === 200 },
        { name: '包含标题', test: data.includes('<title>') },
        { name: '包含Brat Generator', test: data.includes('Brat Generator') },
        { name: '不包含404错误', test: !data.includes('page not found') && !data.includes('404') }
      ];

      console.log('主页检查结果:');
      checks.forEach(check => {
        console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
      });
      
      const passed = checks.filter(c => c.test).length;
      console.log(`主页: ${passed}/${checks.length} 项通过\n`);
    });
  }, 1000);
}

function testPage(path, callback) {
  const options = {
    hostname: 'localhost',
    port: 3002, // 使用当前运行的端口
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => callback(res, data));
  });

  req.on('error', (e) => {
    console.error(`❌ 请求失败: ${e.message}`);
    console.log('请确保开发服务器正在运行: npm run dev');
  });

  req.end();
}

// 运行测试
if (require.main === module) {
  testErrorPages();
}

module.exports = { testErrorPages }; 
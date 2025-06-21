const http = require('http');

async function validateFullSEO() {
  console.log('🔍 开始全面SEO验证...\n');
  
  let totalScore = 0;
  let maxScore = 0;

  // 1. robots.txt检查
  console.log('1️⃣ 检查 robots.txt...');
  await new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/robots.txt',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const robotsChecks = [
          { name: '状态码200', test: res.statusCode === 200 },
          { name: '正确的Content-Type', test: res.headers['content-type'] && res.headers['content-type'].includes('text/plain') },
          { name: '包含UTF-8编码', test: res.headers['content-type'] && res.headers['content-type'].includes('charset=utf-8') },
          { name: '包含缓存头', test: !!res.headers['cache-control'] },
          { name: '包含User-agent', test: data.includes('User-agent: *') },
          { name: '包含Sitemap', test: data.includes('Sitemap:') },
          { name: '包含正确域名', test: data.includes('www.bratgeneratorfree.com') },
          { name: '支持主要搜索引擎', test: data.includes('Googlebot') && data.includes('Bingbot') },
          { name: '禁止敏感目录', test: data.includes('Disallow: /api/') && data.includes('Disallow: /admin/') }
        ];

        console.log('robots.txt 检查结果:');
        robotsChecks.forEach(check => {
          console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
        });
        
        const robotsPassed = robotsChecks.filter(c => c.test).length;
        console.log(`robots.txt: ${robotsPassed}/${robotsChecks.length} 项通过\n`);
        totalScore += robotsPassed;
        maxScore += robotsChecks.length;
        resolve();
      });
    });

    req.on('error', () => {
      console.log('❌ robots.txt 测试失败 - 请确保服务器运行\n');
      maxScore += 9;
      resolve();
    });

    req.end();
  });

  // 2. sitemap.xml检查
  console.log('2️⃣ 检查 sitemap.xml...');
  await new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/sitemap.xml',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const urlMatches = data.match(/<url>/g);
        const urlCount = urlMatches ? urlMatches.length : 0;
        
        const sitemapChecks = [
          { name: '状态码200', test: res.statusCode === 200 },
          { name: '正确的Content-Type', test: res.headers['content-type'] && res.headers['content-type'].includes('application/xml') },
          { name: '包含XML声明', test: data.includes('<?xml version="1.0"') },
          { name: '包含urlset', test: data.includes('<urlset') },
          { name: '包含正确域名', test: data.includes('www.bratgeneratorfree.com') },
          { name: '包含主页', test: data.includes('<loc>https://www.bratgeneratorfree.com</loc>') },
          { name: '包含博客页面', test: data.includes('/blog</loc>') },
          { name: '包含关于页面', test: data.includes('/about</loc>') },
          { name: '包含lastmod', test: data.includes('<lastmod>') },
          { name: '包含priority', test: data.includes('<priority>') },
          { name: 'URL数量合理', test: urlCount >= 3 && urlCount <= 50 }
        ];

        console.log('sitemap.xml 检查结果:');
        sitemapChecks.forEach(check => {
          console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
        });
        
        const sitemapPassed = sitemapChecks.filter(c => c.test).length;
        console.log(`sitemap.xml: ${sitemapPassed}/${sitemapChecks.length} 项通过`);
        console.log(`包含 ${urlCount} 个URL\n`);
        totalScore += sitemapPassed;
        maxScore += sitemapChecks.length;
        resolve();
      });
    });

    req.on('error', () => {
      console.log('❌ sitemap.xml 测试失败 - 请确保服务器运行\n');
      maxScore += 11;
      resolve();
    });

    req.end();
  });

  // 3. 首页SEO检查
  console.log('3️⃣ 检查首页SEO...');
  await new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const homePageChecks = [
          { name: '状态码200', test: res.statusCode === 200 },
          { name: '包含title标签', test: data.includes('<title>') },
          { name: '包含meta description', test: data.includes('meta name="description"') },
          { name: '包含meta keywords', test: data.includes('meta name="keywords"') },
          { name: '包含Open Graph', test: data.includes('property="og:') },
          { name: '包含Twitter Cards', test: data.includes('name="twitter:') },
          { name: '包含canonical URL', test: data.includes('rel="canonical"') },
          { name: '包含结构化数据', test: data.includes('application/ld+json') },
          { name: '包含关键词"brat generator"', test: data.toLowerCase().includes('brat generator') }
        ];

        console.log('首页SEO检查结果:');
        homePageChecks.forEach(check => {
          console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
        });
        
        const homePagePassed = homePageChecks.filter(c => c.test).length;
        console.log(`首页SEO: ${homePagePassed}/${homePageChecks.length} 项通过\n`);
        totalScore += homePagePassed;
        maxScore += homePageChecks.length;
        resolve();
      });
    });

    req.on('error', () => {
      console.log('❌ 首页SEO测试失败 - 请确保服务器运行\n');
      maxScore += 9;
      resolve();
    });

    req.end();
  });

  // 4. 博客页面检查
  console.log('4️⃣ 检查博客页面...');
  await new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/blog',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const blogPageChecks = [
          { name: '状态码200', test: res.statusCode === 200 },
          { name: '包含title标签', test: data.includes('<title>') },
          { name: '包含meta description', test: data.includes('meta name="description"') },
          { name: '包含文章列表', test: data.includes('article') || data.includes('blog') },
          { name: '包含导航链接', test: data.includes('href="/blog/') }
        ];

        console.log('博客页面检查结果:');
        blogPageChecks.forEach(check => {
          console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
        });
        
        const blogPagePassed = blogPageChecks.filter(c => c.test).length;
        console.log(`博客页面: ${blogPagePassed}/${blogPageChecks.length} 项通过\n`);
        totalScore += blogPagePassed;
        maxScore += blogPageChecks.length;
        resolve();
      });
    });

    req.on('error', () => {
      console.log('❌ 博客页面测试失败 - 请确保服务器运行\n');
      maxScore += 5;
      resolve();
    });

    req.end();
  });

  // 生成最终报告
  const percentage = Math.round((totalScore / maxScore) * 100);
  console.log('📊 SEO验证总结');
  console.log('========================================');
  console.log(`总分: ${totalScore}/${maxScore} (${percentage}%)`);
  
  if (percentage >= 90) {
    console.log('🎉 优秀！您的SEO配置非常完善。');
  } else if (percentage >= 75) {
    console.log('✅ 良好！SEO配置基本完善，可以进一步优化。');
  } else if (percentage >= 60) {
    console.log('⚠️  一般，需要改进一些SEO配置。');
  } else {
    console.log('❌ 需要大幅改进SEO配置。');
  }
  
  console.log('\n🔧 建议：');
  if (percentage < 100) {
    console.log('- 修复上述检查中失败的项目');
    console.log('- 确保所有页面都有适当的meta标签');
    console.log('- 验证结构化数据的正确性');
    console.log('- 检查内部链接结构');
  } else {
    console.log('- SEO配置完美！');
    console.log('- 定期监控搜索引擎收录情况');
    console.log('- 持续更新和优化内容');
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  validateFullSEO().catch(console.error);
}

module.exports = { validateFullSEO }; 
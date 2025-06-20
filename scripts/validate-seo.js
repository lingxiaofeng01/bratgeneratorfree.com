const http = require('http');
const { checkDomainConfig } = require('./check-domain-config');
const { testRobotsTxt } = require('./test-robots');

async function validateSEO() {
  console.log('🔍 全面SEO验证开始...\n');
  
  let totalScore = 0;
  let maxScore = 0;
  
  // 1. 域名配置检查
  console.log('1️⃣ 检查域名配置...');
  try {
    const domainResult = checkDomainConfig();
    console.log(`域名配置: ${domainResult.success} 项正确, ${domainResult.issues} 项需要注意\n`);
    totalScore += domainResult.success;
    maxScore += 15;
  } catch (error) {
    console.log('❌ 域名配置检查失败\n');
    maxScore += 15;
  }

  // 2. robots.txt检查
  console.log('2️⃣ 检查 robots.txt...');
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
          { name: '无中文字符', test: !/[\u4e00-\u9fa5]/.test(data) },
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
      maxScore += 10;
      resolve();
    });

    req.end();
  });

  // 3. sitemap.xml检查
  console.log('3️⃣ 检查 sitemap.xml...');
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
        const sitemapChecks = [
          { name: '状态码200', test: res.statusCode === 200 },
          { name: '正确的Content-Type', test: res.headers['content-type'] && res.headers['content-type'].includes('application/xml') },
          { name: '包含XML声明', test: data.includes('<?xml version="1.0"') },
          { name: '包含urlset', test: data.includes('<urlset') },
          { name: '包含正确域名', test: data.includes('www.bratgeneratorfree.com') },
          { name: '包含主页', test: data.includes('<loc>https://www.bratgeneratorfree.com</loc>') },
          { name: '包含博客页面', test: data.includes('/blog') },
          { name: '包含lastmod', test: data.includes('<lastmod>') },
          { name: '包含priority', test: data.includes('<priority>') }
        ];

        console.log('sitemap.xml 检查结果:');
        sitemapChecks.forEach(check => {
          console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
        });
        
        const sitemapPassed = sitemapChecks.filter(c => c.test).length;
        console.log(`sitemap.xml: ${sitemapPassed}/${sitemapChecks.length} 项通过\n`);
        totalScore += sitemapPassed;
        maxScore += sitemapChecks.length;
        resolve();
      });
    });

    req.on('error', () => {
      console.log('❌ sitemap.xml 测试失败 - 请确保服务器运行\n');
      maxScore += 9;
      resolve();
    });

    req.end();
  });

  // 4. 页面元数据检查
  console.log('4️⃣ 检查页面元数据...');
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
        const metaChecks = [
          { name: '包含title标签', test: data.includes('<title>') },
          { name: '包含meta description', test: data.includes('name="description"') },
          { name: '包含meta keywords', test: data.includes('name="keywords"') },
          { name: '包含viewport标签', test: data.includes('name="viewport"') },
          { name: '包含theme-color', test: data.includes('name="theme-color"') },
          { name: '包含OpenGraph', test: data.includes('property="og:') },
          { name: '包含Twitter卡片', test: data.includes('name="twitter:') },
          { name: '包含canonical', test: data.includes('rel="canonical"') },
          { name: '包含favicon', test: data.includes('rel="icon"') },
          { name: '包含manifest', test: data.includes('rel="manifest"') },
          { name: '包含结构化数据', test: data.includes('application/ld+json') },
          { name: '包含PWA相关标签', test: data.includes('apple-mobile-web-app') }
        ];

        console.log('页面元数据检查结果:');
        metaChecks.forEach(check => {
          console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
        });
        
        const metaPassed = metaChecks.filter(c => c.test).length;
        console.log(`页面元数据: ${metaPassed}/${metaChecks.length} 项通过\n`);
        totalScore += metaPassed;
        maxScore += metaChecks.length;
        resolve();
      });
    });

    req.on('error', () => {
      console.log('❌ 页面元数据测试失败 - 请确保服务器运行\n');
      maxScore += 12;
      resolve();
    });

    req.end();
  });

  // 5. 结构化数据检查
  console.log('5️⃣ 检查结构化数据...');
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
        const structuredChecks = [
          { name: '包含WebApplication类型', test: data.includes('"@type": "WebApplication"') },
          { name: '包含Organization类型', test: data.includes('"@type": "Organization"') },
          { name: '包含聚合评分', test: data.includes('aggregateRating') },
          { name: '包含功能列表', test: data.includes('featureList') },
          { name: '包含价格信息', test: data.includes('"price": "0"') },
          { name: '包含创建者信息', test: data.includes('creator') }
        ];

        console.log('结构化数据检查结果:');
        structuredChecks.forEach(check => {
          console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
        });
        
        const structuredPassed = structuredChecks.filter(c => c.test).length;
        console.log(`结构化数据: ${structuredPassed}/${structuredChecks.length} 项通过\n`);
        totalScore += structuredPassed;
        maxScore += structuredChecks.length;
        resolve();
      });
    });

    req.on('error', () => {
      console.log('❌ 结构化数据测试失败 - 请确保服务器运行\n');
      maxScore += 6;
      resolve();
    });

    req.end();
  });

  // 计算总分
  const percentage = Math.round((totalScore / maxScore) * 100);
  const grade = percentage >= 95 ? 'A+' : percentage >= 90 ? 'A' : percentage >= 85 ? 'B+' : percentage >= 80 ? 'B' : percentage >= 75 ? 'C+' : percentage >= 70 ? 'C' : 'D';
  
  console.log('🎉 SEO验证完成！');
  console.log(`\n📊 总体评分: ${totalScore}/${maxScore} (${percentage}%) - 等级: ${grade}`);
  
  if (percentage >= 95) {
    console.log('🌟 优秀！您的网站SEO配置非常完善！');
  } else if (percentage >= 85) {
    console.log('👍 良好！还有一些小地方可以优化');
  } else if (percentage >= 70) {
    console.log('⚠️  一般，建议进行更多优化');
  } else {
    console.log('❌ 需要大幅改进SEO配置');
  }
  
  console.log('\n📋 建议后续操作:');
  console.log('1. 在Google Search Console验证域名');
  console.log('2. 提交sitemap到各大搜索引擎');
  console.log('3. 监控网站索引状态');
  console.log('4. 定期检查SEO表现');
  console.log('5. 使用 npm run validate:blog-seo 检查博客SEO');
  
  return {
    score: totalScore,
    maxScore: maxScore,
    percentage: percentage,
    grade: grade
  };
}

// 运行验证
if (require.main === module) {
  validateSEO().catch(console.error);
}

module.exports = { validateSEO }; 
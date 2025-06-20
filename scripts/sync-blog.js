#!/usr/bin/env node

const https = require('https');
const http = require('http');

// 配置
const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  secret: process.env.REVALIDATE_SECRET || 'your-secret-key',
  timeout: 30000 // 30秒超时
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.secret}`,
        ...options.headers
      },
      timeout: config.timeout
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时'));
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

async function syncBlog() {
  try {
    log('🚀 开始同步博客内容...', colors.cyan);
    log(`📡 目标地址: ${config.baseUrl}`, colors.blue);
    
    // 首先获取当前状态
    log('\n📊 获取当前博客状态...', colors.yellow);
    const statusResponse = await makeRequest(`${config.baseUrl}/api/sync-blog`);
    
    if (statusResponse.status === 200) {
      const status = statusResponse.data.status;
      log(`📚 当前文章数量: ${status.totalPosts}`, colors.green);
      log(`🏷️ 分类数量: ${status.totalCategories}`, colors.green);
      log(`⭐ 精选文章: ${status.featuredPosts}`, colors.green);
      
      if (status.latestPost) {
        log(`📝 最新文章: ${status.latestPost.title} (${status.latestPost.date})`, colors.green);
      }
    } else {
      log(`⚠️ 获取状态失败: ${statusResponse.data.message || '未知错误'}`, colors.yellow);
    }

    // 执行同步
    log('\n🔄 执行博客同步...', colors.yellow);
    const syncResponse = await makeRequest(`${config.baseUrl}/api/sync-blog`, {
      method: 'POST'
    });

    if (syncResponse.status === 200) {
      const result = syncResponse.data;
      log('\n✅ 博客同步成功!', colors.green);
      log(`📚 同步了 ${result.data.totalPosts} 篇文章`, colors.green);
      log(`🏷️ 同步了 ${result.data.totalCategories} 个分类`, colors.green);
      log(`⭐ 包含 ${result.data.featuredPosts} 篇精选文章`, colors.green);
      
      if (result.data.latestPost) {
        log(`📝 最新文章: ${result.data.latestPost.title}`, colors.green);
      }
      
      log(`🕐 同步时间: ${result.timestamp}`, colors.blue);
      log(`🔄 重新验证了 ${result.revalidatedPaths.length} 个路径`, colors.blue);
      
    } else if (syncResponse.status === 401) {
      log('❌ 认证失败: 请检查 REVALIDATE_SECRET 环境变量', colors.red);
      process.exit(1);
    } else {
      log(`❌ 同步失败: ${syncResponse.data.message || '未知错误'}`, colors.red);
      if (syncResponse.data.error) {
        log(`错误详情: ${syncResponse.data.error}`, colors.red);
      }
      process.exit(1);
    }

    // 全站缓存重新验证
    log('\n🌐 执行全站缓存重新验证...', colors.yellow);
    const revalidateResponse = await makeRequest(`${config.baseUrl}/api/revalidate`, {
      method: 'POST'
    });

    if (revalidateResponse.status === 200) {
      log('✅ 全站缓存重新验证成功!', colors.green);
      log(`🔄 重新验证了: ${revalidateResponse.data.revalidated.join(', ')}`, colors.blue);
    } else {
      log(`⚠️ 全站缓存重新验证失败: ${revalidateResponse.data.message || '未知错误'}`, colors.yellow);
    }

    log('\n🎉 博客同步完成!', colors.bright + colors.green);
    
  } catch (error) {
    log(`❌ 同步过程中发生错误: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    log('📖 博客同步工具使用说明:', colors.bright);
    log('');
    log('用法: node scripts/sync-blog.js [选项]', colors.cyan);
    log('');
    log('选项:', colors.yellow);
    log('  -h, --help     显示帮助信息');
    log('  --status       仅显示当前状态，不执行同步');
    log('');
    log('环境变量:', colors.yellow);
    log('  NEXT_PUBLIC_BASE_URL  网站基础URL (默认: http://localhost:3000)');
    log('  REVALIDATE_SECRET     重新验证密钥 (默认: your-secret-key)');
    log('');
    log('示例:', colors.green);
    log('  node scripts/sync-blog.js');
    log('  node scripts/sync-blog.js --status');
    log('  NEXT_PUBLIC_BASE_URL=https://your-site.com node scripts/sync-blog.js');
    return;
  }

  if (args.includes('--status')) {
    try {
      log('📊 获取博客状态...', colors.cyan);
      const response = await makeRequest(`${config.baseUrl}/api/sync-blog`);
      
      if (response.status === 200) {
        const status = response.data.status;
        log('\n📊 博客状态:', colors.bright);
        log(`📚 文章总数: ${status.totalPosts}`, colors.green);
        log(`🏷️ 分类数量: ${status.totalCategories}`, colors.green);
        log(`⭐ 精选文章: ${status.featuredPosts}`, colors.green);
        
        if (status.latestPost) {
          log(`📝 最新文章: ${status.latestPost.title}`, colors.green);
          log(`📅 发布日期: ${status.latestPost.date}`, colors.blue);
        }
        
        if (status.stats) {
          log(`📊 统计信息:`, colors.yellow);
          log(`  总词数: ${status.stats.totalWords?.toLocaleString() || 'N/A'}`);
          log(`  平均阅读时间: ${status.stats.averageReadingTime || 'N/A'} 分钟`);
        }
      } else {
        log(`❌ 获取状态失败: ${response.data.message || '未知错误'}`, colors.red);
      }
    } catch (error) {
      log(`❌ 获取状态时发生错误: ${error.message}`, colors.red);
    }
    return;
  }

  await syncBlog();
}

// 运行主函数
main().catch(error => {
  log(`❌ 程序执行失败: ${error.message}`, colors.red);
  process.exit(1);
}); 
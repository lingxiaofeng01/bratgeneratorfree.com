import { getAllPosts, getAllCategories, getAllTags } from '@/lib/markdown-blog';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bratgeneratorfree.com';

export async function GET() {
  try {
    const [posts] = await Promise.all([
      getAllPosts(),
      // 移除categories和tags的获取，因为没有相应的页面路由
    ]);

    // 静态页面URLs - 只包含实际需要的页面
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const, // 首页每日更新
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const, // 博客列表页每日更新
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const, // 关于页面每月更新
        priority: 0.8,
      },
      // 移除 /blog/stats 页面
    ];

    // 博客文章URLs - 优化基于内容特征的优先级
    const postUrls = posts.map((post) => {
      // 根据文章特征计算优先级
      let priority = 0.7; // 基础优先级
      if (post.featured) priority = 0.9; // 特色文章
      else if (post.tags.length > 3) priority = 0.8; // 标签丰富的文章
      else if (post.wordCount > 1000) priority = 0.75; // 长文章
      
      // 计算更新频率
      const daysSincePublication = Math.floor(
        (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24)
      );
      let changeFreq: 'daily' | 'weekly' | 'monthly' = 'weekly';
      if (daysSincePublication < 7) changeFreq = 'daily'; // 新文章
      else if (daysSincePublication > 90) changeFreq = 'monthly'; // 老文章

      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.lastModified 
          ? new Date(post.lastModified).toISOString() 
          : new Date(post.date).toISOString(),
        changeFrequency: changeFreq,
        priority: priority,
      };
    });

    // 移除不存在的分类和标签页面URLs
    // const categoryUrls = []; // 网站没有分类页面路由
    // const tagUrls = []; // 网站没有标签页面路由

    // 合并所有URLs并按优先级排序 - 只包含实际需要的页面
    const allUrls = [...staticUrls, ...postUrls]
      .sort((a, b) => b.priority - a.priority);

    // 生成XML格式的sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=21600', // 优化缓存策略: 12小时缓存，6小时后台更新
        'X-Robots-Tag': 'index, follow',
        'Vary': 'Accept-Encoding',
      },
    });
  } catch (error) {
    console.error('生成sitemap时出错:', error);
    
    // 错误时返回基础sitemap
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    return new Response(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache',
      },
      status: 200, // 即使出错也返回基础sitemap
    });
  }
} 
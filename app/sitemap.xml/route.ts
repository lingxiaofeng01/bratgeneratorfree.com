import { getAllPosts } from '@/lib/markdown-blog';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bratgeneratorfree.com';

export async function GET() {
  try {
    // 获取所有博客文章
    const posts = await getAllPosts();

    // 静态页面URLs - 只包含实际存在的页面
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/generators`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      // Generators - sorted by creation date (newest first)
      {
        url: `${baseUrl}/generators/spamton-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/vaporwave-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/redacted-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/corrupted-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/fiery-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/mario-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/rainbow-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/alien-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/spongebob-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/mirror-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/disney-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/underline-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/dark-souls-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/generators/glitter-text`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
      },
    ];

    // 博客文章URLs - 优化基于内容特征的优先级
    const postUrls = posts.map((post) => {
      // 根据文章特征计算优先级
      let priority = 0.7; // 基础优先级
      if (post.featured) priority = 0.9; // 特色文章
      else if (post.tags && post.tags.length > 3) priority = 0.8; // 标签丰富的文章
      else if (post.wordCount && post.wordCount > 1000) priority = 0.75; // 长文章
      
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

    // 合并所有URLs并按优先级排序
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
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=21600',
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
    <loc>${baseUrl}/generators</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/spamton-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/vaporwave-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/redacted-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/corrupted-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/fiery-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/mario-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/rainbow-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/alien-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/spongebob-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/mirror-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/disney-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/underline-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/dark-souls-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/generators/glitter-text</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
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
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
    
    return new Response(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
      status: 200,
    });
  }
} 
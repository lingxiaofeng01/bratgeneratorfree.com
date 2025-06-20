const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bratgeneratorfree.com';

export function GET() {
  const robots = `User-agent: *
Allow: /

# Major Search Engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1
Max-image-preview: large
Max-snippet: -1
Max-video-preview: -1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: YandexBot
Allow: /
Crawl-delay: 2

# Disallow private and system directories
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: /.well-known/
Disallow: /404
Disallow: /500
Disallow: /.env*
Disallow: /node_modules/

# Allow important static resources
Allow: /images/
Allow: /_next/static/
Allow: /favicon.ico
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /*.css$
Allow: /*.js$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Additional information
# This site is optimized for search engines
# Free Brat Generator - Create viral album covers
# Contact: Available through website contact form`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
} 
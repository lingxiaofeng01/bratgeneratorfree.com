/** @type {import('next').NextConfig} */
// Enable strict mode
const nextConfig = {
  // Enable SWC compression
  swcMinify: true,
  
  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'images.pexels.com',
      'api.pexels.com',
      'i.picsum.photos',
      'picsum.photos',
      'via.placeholder.com',
      'www.bratgeneratorfree.com'
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enable compression
  compress: true,
  
  // SEO优化 - 重定向配置
  async redirects() {
    return [
      // 1. HTTP不带www重定向到HTTPS带www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bratgeneratorfree.com',
          },
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.bratgeneratorfree.com/:path*',
        statusCode: 301,
      },
      // 2. HTTPS不带www重定向到HTTPS带www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bratgeneratorfree.com',
          },
        ],
        destination: 'https://www.bratgeneratorfree.com/:path*',
        statusCode: 301,
      },
      // 3. HTTP带www重定向到HTTPS带www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.bratgeneratorfree.com',
          },
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.bratgeneratorfree.com/:path*',
        statusCode: 301,
      },
    ]
  },

  // 安全和SEO头部
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
    ]
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;

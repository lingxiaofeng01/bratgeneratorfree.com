import { Metadata } from 'next';
import { BlogPost } from '@/lib/markdown-blog';

const defaultMeta = {
  title: 'Brat Generator - Free Album Cover Maker',
  description: 'Create iconic brat-style album covers with our free and easy-to-use text generator. Inspired by Charli XCX, perfect for social media and music projects.',
  keywords: 'brat generator, text generator, album cover maker, charli xcx, brat font, free design tool',
  author: 'BratGen Team',
  url: 'https://bratgen.com',
  image: 'https://bratgen.com/og-image.png',
  twitterHandle: '@bratgenerator',
};

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  ogType: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

// Function to generate SEO metadata for a page
export function generateSEOData(pageMeta: Partial<typeof defaultMeta> = {}): Metadata {
  const meta = { ...defaultMeta, ...pageMeta };
  
  return {
    metadataBase: new URL(meta.url),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.author, url: meta.url }],
    creator: meta.author,
    publisher: meta.author,
    
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.url,
      siteName: 'Brat Generator',
      images: [
        {
          url: meta.image,
          width: 1200,
          height: 630,
          alt: `${meta.title} Open Graph Image`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      creator: meta.twitterHandle,
      images: [meta.image],
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    
    manifest: '/site.webmanifest',
  };
}

// 生成文章的SEO数据
export function generateArticleSchema(post: BlogPost, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title || 'Untitled',
    description: post.description || 'No description available',
    image: post.image ? [post.image] : [],
    datePublished: post.date || new Date().toISOString(),
    dateModified: post.lastModified || post.date || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: post.author || 'Anonymous',
      url: `${baseUrl}/author/${(post.author || 'anonymous').toLowerCase().replace(/\s+/g, '-')}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BratGen',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 800,
        height: 200,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    articleSection: post.category || 'General',
    keywords: (post.tags || []).join(', '),
    wordCount: post.wordCount || 0,
    timeRequired: `PT${post.readingTime || 5}M`,
    inLanguage: 'zh-CN',
  };
}

// 生成博客列表页的SEO数据
export function generateBlogListSEO(baseUrl: string): SEOData {
  return {
    title: '设计博客 | BratGen - 创意设计灵感与教程',
    description: '探索最新的设计趋势、brat美学、专辑封面设计技巧。获取专业的设计灵感和实用教程，提升您的创意技能。',
    keywords: ['设计博客', 'brat aesthetic', '专辑封面设计', '设计教程', '创意灵感', '视觉设计', 'design blog', 'album cover'],
    canonicalUrl: `${baseUrl}/blog`,
    ogImage: `${baseUrl}/images/blog-og.jpg`,
    ogType: 'website',
  };
}

// 生成分类页面的SEO数据
export function generateCategorySEO(category: string, baseUrl: string): SEOData {
  const categoryTitles: Record<string, string> = {
    'design': '设计文章',
    'typography': '字体设计',
    'branding': '品牌设计',
    'tutorial': '设计教程',
    'inspiration': '设计灵感',
  };

  const categoryDescriptions: Record<string, string> = {
    'design': '探索最新的设计趋势和技巧，从基础理论到高级应用，全面提升您的设计技能。',
    'typography': '深入了解字体设计的艺术，掌握字体选择、排版和视觉层次的专业技巧。',
    'branding': '学习品牌视觉设计的核心原则，创建具有影响力的品牌形象和视觉识别系统。',
    'tutorial': '详细的设计教程和步骤指南，从新手到专家的完整学习路径。',
    'inspiration': '发现令人惊艳的设计作品和创意灵感，拓展您的设计思维。',
  };

  return {
    title: `${categoryTitles[category.toLowerCase()] || category} | BratGen 设计博客`,
    description: categoryDescriptions[category.toLowerCase()] || `查看所有关于${category}的设计文章和教程。`,
    keywords: [category, '设计', '教程', 'brat aesthetic', 'design'],
    canonicalUrl: `${baseUrl}/blog/category/${category.toLowerCase()}`,
    ogImage: `${baseUrl}/images/category-${category.toLowerCase()}-og.jpg`,
    ogType: 'website',
  };
}

// 生成面包屑结构化数据
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// 生成博客主页的结构化数据
export function generateBlogSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'BratGen 设计博客',
    description: '专业的设计博客，提供最新的设计趋势、教程和创意灵感',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'BratGen',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 800,
        height: 200,
      },
    },
    inLanguage: 'zh-CN',
  };
}

// 生成网站的结构化数据
export function generateWebsiteSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BratGen',
    description: '创建专业的专辑封面和设计作品，探索brat美学和现代设计趋势',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BratGen',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 800,
        height: 200,
      },
    },
    sameAs: [
      'https://twitter.com/bratgen',
      'https://instagram.com/bratgen',
      'https://github.com/bratgen',
    ],
  };
}

// 生成 FAQ 结构化数据
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
} 
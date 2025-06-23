import { getAllPosts, getAllCategories } from '@/lib/markdown-blog';
import BlogPageClient from './blog-page-client';
import { Metadata } from 'next';

// 博客列表页面专门的SEO元数据
export const metadata: Metadata = {
  title: 'Design Blog & Creative Tutorials | Free Brat Generator',
  description: 'Explore design tutorials, typography art, album cover aesthetics, and creative inspiration. Learn about brat style, digital art trends, and visual culture.',
  keywords: 'design blog, creative tutorials, typography art, album aesthetics, brat style, digital art, visual culture, design inspiration, creative writing, art tutorials',
  authors: [{ name: 'Free Brat Generator Team' }],
  creator: 'Free Brat Generator',
  publisher: 'Free Brat Generator',
  category: 'Design & Art',
  openGraph: {
    title: 'Design Blog & Creative Tutorials | Free Brat Generator',
    description: 'Explore design tutorials, typography art, album cover aesthetics, and creative inspiration. Learn about brat style, digital art trends, and visual culture.',
    url: 'https://www.bratgeneratorfree.com/blog',
    siteName: 'Free Brat Generator',
    images: [
      {
        url: 'https://www.bratgeneratorfree.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Brat Generator Design Blog - Creative Tutorials and Inspiration',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Blog & Creative Tutorials | Free Brat Generator',
    description: 'Explore design tutorials, typography art, album cover aesthetics, and creative inspiration.',
    images: ['https://www.bratgeneratorfree.com/og-image.jpg'],
    creator: '@bratgenerator',
  },
  alternates: {
    canonical: 'https://www.bratgeneratorfree.com/blog',
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
};

export default async function BlogPage() {
  try {
    // 获取博客数据和分类
    const [allPosts, categories] = await Promise.all([
      getAllPosts(),
      getAllCategories()
    ]);

    // 计算统计数据
    const totalWords = allPosts.reduce((sum, post) => sum + post.wordCount, 0);
    const featuredCount = allPosts.filter(post => post.featured).length;

    return (
      <BlogPageClient
        allPosts={allPosts}
        categories={categories}
        totalWords={totalWords}
        featuredCount={featuredCount}
      />
    );
  } catch (error) {
    console.error('Error loading blog data:', error);
    
    return (
      <BlogPageClient
        allPosts={[]}
        categories={[]}
        totalWords={0}
        featuredCount={0}
        error="Error loading blog data"
      />
    );
  }
}
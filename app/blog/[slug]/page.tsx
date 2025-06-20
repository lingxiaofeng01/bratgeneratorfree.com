import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Sparkles, Tag, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getLatestPosts, type BlogPost } from '@/lib/markdown-blog';
import { PostInteractions } from './interactive-components';
// 暂时注释掉这些导入，因为这些函数可能不存在或导致错误
// import { generateSEOData, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bratgeneratorfree.com';

// 生成静态参数 - 用于静态生成
export async function generateStaticParams() {
  try {
    console.log('Generating static params...');
    const slugs = getAllPostSlugs();
    console.log(`Found ${slugs.length} blog posts`);
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// 生成元数据 - SEO优化
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    console.log(`Generating metadata for ${params.slug}...`);
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      console.warn(`Blog post not found: ${params.slug}`);
      return {
        title: 'Post Not Found | Free Brat Generator Blog',
        description: 'Sorry, the post you are looking for does not exist or has been removed.',
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title: `${post.title} | Free Brat Generator`,
      description: post.description,
      keywords: post.tags.join(', '),
      authors: [{ name: post.author }],
      creator: post.author,
      publisher: 'Free Brat Generator',
      category: post.category,
      openGraph: {
        title: post.title,
        description: post.description,
        url: post.canonicalUrl || `${baseUrl}/blog/${post.slug}`,
        siteName: 'Free Brat Generator',
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.imageAlt,
          },
        ],
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.lastModified || post.date,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [post.image],
      },
      alternates: {
        canonical: post.canonicalUrl || `${baseUrl}/blog/${post.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Loading Error | Free Brat Generator Blog',
      description: 'An error occurred while loading the page. Please try again later.',
    };
  }
}

// 主组件
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    console.log(`Loading blog post: ${params.slug}`);
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      console.warn(`Blog post does not exist: ${params.slug}`);
      notFound();
    }

    console.log(`Successfully loaded blog post: ${post.title}`);
    
    // 获取相关文章和最新文章
    let relatedPosts: BlogPost[] = [];
    let latestPosts: BlogPost[] = [];
    try {
      [relatedPosts, latestPosts] = await Promise.all([
        getRelatedPosts(params.slug, 6), // 增加到6篇相关文章
        getLatestPosts(5) // 获取5篇最新文章
      ]);
      console.log(`Found ${relatedPosts.length} related posts`);
      console.log(`Found ${latestPosts.length} latest posts`);
      
      // 从最新文章中移除当前文章
      latestPosts = latestPosts.filter(p => p.slug !== params.slug);
    } catch (error) {
      console.error('Error fetching related/latest posts:', error);
    }

    const shareUrl = `${baseUrl}/blog/${post.slug}`;
    const shareText = `${post.title} - ${post.description}`;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <Sparkles className="w-8 h-8 text-lime-500 group-hover:text-lime-600 transition-colors" />
                <span className="text-2xl font-bold text-slate-900 group-hover:text-lime-600 transition-colors">Brat Generator</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-slate-900 font-medium">
                  Blog
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  About
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* 面包屑导航 */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-slate-900 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">{post.title}</span>
          </nav>

          {/* 返回博客按钮 */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-4 gap-12">
            {/* 主要内容 */}
            <article className="lg:col-span-3">
              {/* 文章头部 */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-lime-100 text-lime-800">
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge variant="default" className="bg-orange-100 text-orange-800">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  {post.description}
                </p>

                <Separator className="mb-8" />
              </header>

              {/* 特色图片 */}
              <div className="relative mb-8 h-96">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover rounded-lg shadow-lg"
                  priority />
              </div>

              {/* 文章内容 */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-slate-700 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* 标签 */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-lime-500" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 分享按钮 */}
              <PostInteractions shareUrl={shareUrl} shareText={shareText} />
            </article>

            {/* 侧边栏 */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* 文章信息 */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Post Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Author</span>
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Published</span>
                        <span className="font-medium">
                          {new Date(post.date).toLocaleDateString('en-US')}
                        </span>
                      </div>
                      {post.lastModified && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Last Updated</span>
                          <span className="font-medium">
                            {new Date(post.lastModified).toLocaleDateString('en-US')}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">Reading Time</span>
                        <span className="font-medium">{post.readingTime} min read</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Word Count</span>
                        <span className="font-medium">{post.wordCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 最新文章 */}
                {latestPosts.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-lime-500" />
                        Latest Articles
                      </h3>
                      <div className="space-y-4">
                        {latestPosts.map((latestPost) => (
                          <Link 
                            key={latestPost.slug} 
                            href={`/blog/${latestPost.slug}`}
                            className="block group"
                          >
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-16 h-16 relative">
                                <Image
                                  src={latestPost.image}
                                  alt={latestPost.imageAlt}
                                  fill
                                  sizes="64px"
                                  className="object-cover rounded-lg"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-slate-900 group-hover:text-lime-600 transition-colors line-clamp-2 mb-1">
                                  {latestPost.title}
                                </h4>
                                <div className="flex items-center text-xs text-slate-500">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  <span>{new Date(latestPost.date).toLocaleDateString('en-US')}</span>
                                  <span className="mx-2">•</span>
                                  <span>{latestPost.readingTime} min read</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </aside>
          </div>

          {/* 相关文章 - 移到文章下方 */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t">
              <div className="flex items-center mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                    <Tag className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Related Articles</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-6"></div>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white rounded-xl">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-lime-500 text-black hover:bg-lime-600 font-medium">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-lime-200 text-lime-700 hover:bg-lime-50">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-lime-600 transition-colors leading-snug">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      
                      <p className="text-slate-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                        {relatedPost.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span className="font-medium">{relatedPost.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(relatedPost.date).toLocaleDateString('en-US')}</span>
                        </div>
                        <div className="flex items-center text-lime-600 font-medium">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{relatedPost.readingTime}min</span>
                        </div>
                      </div>
                      
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button 
                          variant="outline" 
                          className="w-full border-lime-200 text-lime-700 hover:bg-lime-50 hover:border-lime-300 font-medium py-2 rounded-lg group-hover:shadow-md transition-all"
                        >
                          Read More
                          <ArrowLeft className="w-3 h-3 ml-2 rotate-180 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* 在博客详情页添加面包屑 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.bratgeneratorfree.com"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Blog",
                  "item": "https://www.bratgeneratorfree.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": `https://www.bratgeneratorfree.com/blog/${post.slug}`
                }
              ]
            })
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error rendering blog post page:', error);
    notFound();
  }
}
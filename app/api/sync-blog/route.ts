import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getAllPosts, getAllCategories, getBlogStats } from '@/lib/markdown-blog';

export async function POST(request: NextRequest) {
  try {
    // 验证请求来源
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATE_SECRET || 'your-secret-key';
    
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: '未授权的请求' }, { status: 401 });
    }

    console.log('🔄 开始同步博客内容...');

    // 重新加载博客数据以确保最新内容
    const [posts, categories, stats] = await Promise.all([
      getAllPosts(),
      getAllCategories(),
      getBlogStats()
    ]);

    console.log(`📚 发现 ${posts.length} 篇文章`);
    console.log(`🏷️ 发现 ${categories.length} 个分类`);

    // 重新验证所有博客相关的路径
    revalidatePath('/blog');
    revalidatePath('/blog/stats');
    
    // 为每篇文章重新验证路径
    for (const post of posts) {
      revalidatePath(`/blog/${post.slug}`);
    }

    // 重新验证首页（如果显示最新文章）
    revalidatePath('/');

    // 重新验证API缓存
    revalidateTag('blog-posts');
    revalidateTag('blog-categories');
    revalidateTag('blog-stats');

    console.log('✅ 博客内容同步完成');

    return NextResponse.json({
      message: '博客内容同步成功',
      timestamp: new Date().toISOString(),
      data: {
        totalPosts: posts.length,
        totalCategories: categories.length,
        featuredPosts: posts.filter(p => p.featured).length,
        latestPost: posts[0] ? {
          title: posts[0].title,
          date: posts[0].date,
          slug: posts[0].slug
        } : null
      },
      revalidatedPaths: [
        '/',
        '/blog',
        '/blog/stats',
        ...posts.map(p => `/blog/${p.slug}`)
      ]
    });

  } catch (error) {
    console.error('❌ 博客同步失败:', error);
    return NextResponse.json(
      {
        message: '博客同步失败',
        error: error instanceof Error ? error.message : '未知错误',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 提供博客状态信息
    const [posts, categories, stats] = await Promise.all([
      getAllPosts(),
      getAllCategories(),
      getBlogStats()
    ]);

    return NextResponse.json({
      message: '博客状态信息',
      timestamp: new Date().toISOString(),
      status: {
        totalPosts: posts.length,
        totalCategories: categories.length,
        featuredPosts: posts.filter(p => p.featured).length,
        latestPost: posts[0] ? {
          title: posts[0].title,
          date: posts[0].date,
          slug: posts[0].slug
        } : null,
        stats
      },
      usage: 'POST /api/sync-blog with Authorization: Bearer YOUR_SECRET to sync'
    });

  } catch (error) {
    console.error('❌ 获取博客状态失败:', error);
    return NextResponse.json(
      {
        message: '获取博客状态失败',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
} 
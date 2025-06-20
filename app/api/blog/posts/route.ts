import { NextResponse } from 'next/server';
import { getAllPosts, getLatestPosts, searchPosts, getPostsByCategory } from '@/lib/markdown-blog';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const limit = searchParams.get('limit');
    const query = searchParams.get('query');
    const category = searchParams.get('category');

    const allPosts = await getAllPosts();

    // 设置缓存头
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
    headers.set('Content-Type', 'application/json');

    if (action === 'latest') {
      const numLimit = limit ? parseInt(limit, 10) : 3;
      if (isNaN(numLimit)) {
        return NextResponse.json(
          { error: 'Invalid limit parameter. Must be a number.' },
          { status: 400, headers }
        );
      }
      const latestPosts = allPosts.slice(0, numLimit);
      return NextResponse.json(latestPosts, { headers });
    }
    
    switch (action) {
      case 'search':
        if (!query) {
          return NextResponse.json(
            { error: 'Query parameter is required for search' },
            { status: 400, headers }
          );
        }
        const searchResults = await searchPosts(query);
        return NextResponse.json(searchResults, { headers });
        
      case 'category':
        if (!category) {
          return NextResponse.json(
            { error: 'Category parameter is required' },
            { status: 400, headers }
          );
        }
        const categoryPosts = await getPostsByCategory(category);
        return NextResponse.json(categoryPosts, { headers });
        
      case 'all':
      default:
        return NextResponse.json(allPosts, { headers });
    }
  } catch (error) {
    console.error('API Error fetching posts:', error);
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
    headers.set('Content-Type', 'application/json');
    
    return NextResponse.json(
      { error: 'An internal server error occurred while fetching posts.' },
      { status: 500, headers }
    );
  }
} 
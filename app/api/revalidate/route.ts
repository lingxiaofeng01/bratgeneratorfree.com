import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, tag } = body;

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ 
        message: `Path ${path} revalidated successfully`,
        timestamp: new Date().toISOString()
      });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ 
        message: `Tag ${tag} revalidated successfully`,
        timestamp: new Date().toISOString()
      });
    }

    // 重新验证所有主要页面
    const paths = ['/', '/blog', '/about'];
    paths.forEach(path => revalidatePath(path));
    
    return NextResponse.json({ 
      message: 'All main paths revalidated successfully',
      paths,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error during revalidation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: '请使用 POST 方法触发重新验证',
    usage: 'POST /api/revalidate with Authorization: Bearer YOUR_SECRET'
  });
} 
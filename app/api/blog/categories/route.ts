import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/markdown-blog';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('API Error fetching categories:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while fetching categories.' },
      { status: 500 }
    );
  }
} 
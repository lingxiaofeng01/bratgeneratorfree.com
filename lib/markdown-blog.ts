import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  lastModified?: string;
  readingTime: number;
  wordCount: number;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  content: string;
  canonicalUrl?: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

// 计算阅读时间（基于平均阅读速度 250 字/分钟）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // 至少 1 分钟
}

// 计算字数
function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

// 获取所有博客文章的 slug
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// 根据 slug 获取单篇博客文章
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 将 Markdown 转换为 HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // 计算阅读时间和字数
    const readingTime = calculateReadingTime(content);
    const wordCount = calculateWordCount(content);

    const post: BlogPost = {
      slug,
      title: data.title || '',
      description: data.description || '',
      author: data.author || 'Anonymous',
      date: data.date || new Date().toISOString().split('T')[0],
      lastModified: data.lastModified,
      readingTime,
      wordCount,
      category: data.category || 'Uncategorized',
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image || 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=1200',
      imageAlt: data.imageAlt || data.title || 'Blog post image',
      featured: Boolean(data.featured),
      content: contentHtml,
      canonicalUrl: data.canonicalUrl,
    };

    return post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// 获取所有博客文章
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const slugs = getAllPostSlugs();
    const posts = await Promise.all(
      slugs.map(slug => getPostBySlug(slug))
    );
    
    // 过滤掉 null 值并按日期排序
    const validPosts = posts.filter((post): post is BlogPost => post !== null);
    
    return validPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // 最新的在前
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

// 获取最新的博客文章（用于首页展示）
export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

// 获取特色文章
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured);
}

// 根据分类获取文章
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  if (category === 'All') return allPosts;
  return allPosts.filter(post => post.category === category);
}

// 搜索文章
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.content.toLowerCase().includes(lowercaseQuery)
  );
}

// 获取相关文章
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];
  
  // 基于标签和分类的相关度计算
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;
      
      // 相同标签加分（提高权重）
      const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += commonTags.length * 5; // 每个相同标签5分
      
      // 相同分类加分
      if (post.category === currentPost.category) {
        score += 2; // 相同分类2分
      }
      
      // 如果有相同标签，额外加分
      if (commonTags.length > 0) {
        score += 3; // 有相同标签额外3分
      }
      
      // 如果标签完全匹配或大部分匹配，额外加分
      if (commonTags.length >= Math.min(currentPost.tags.length, post.tags.length) / 2) {
        score += 5; // 标签匹配度高额外5分
      }
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      // 先按分数排序，分数相同按日期排序
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(item => item.post);
  
  return relatedPosts;
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = new Set(allPosts.map(post => post.category));
  return ['All', ...Array.from(categories).sort()];
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const allTags = allPosts.flatMap(post => post.tags);
  const uniqueTags = new Set(allTags);
  return Array.from(uniqueTags).sort();
}

// 获取博客统计信息
export async function getBlogStats() {
  const allPosts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();
  
  return {
    totalPosts: allPosts.length,
    featuredPosts: allPosts.filter(post => post.featured).length,
    totalCategories: categories.length - 1, // 减去 'All'
    totalTags: tags.length,
    totalWords: allPosts.reduce((sum, post) => sum + post.wordCount, 0),
    averageReadingTime: Math.round(
      allPosts.reduce((sum, post) => sum + post.readingTime, 0) / allPosts.length
    ),
  };
} 
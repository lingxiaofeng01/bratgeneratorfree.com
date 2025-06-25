'use client';

import { Calendar, User, ArrowRight, Tag, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { type BlogPost } from '@/lib/markdown-blog';

interface BlogClientComponentProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export default function BlogClientComponent({ initialPosts }: BlogClientComponentProps) {
  // 获取所有精选文章（移除限制）
  const featuredPosts = initialPosts.filter(post => post.featured);
  
  // 获取非精选文章，按时间排序（最新的在前）
  const regularPosts = initialPosts.filter(post => !post.featured);

  return (
    <div className="space-y-12">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                <Tag className="w-5 h-5 text-amber-600" />
        </div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Articles</h2>
        </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-6"></div>
      </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.slug} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white rounded-2xl">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={post.image || 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-amber-500 text-black hover:bg-amber-600 font-semibold px-3 py-1.5 text-sm">
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge variant="secondary" className="bg-white/90 text-slate-900 mb-3">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-lime-200 text-lime-700 hover:bg-lime-50">
                        #{tag}
                        </Badge>
                      ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-lime-600 transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1.5" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-lime-600 font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <Button className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 rounded-xl group-hover:shadow-lg group-hover:shadow-lime-500/25 transition-all">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <section>
          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Latest Articles</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.slug} className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white rounded-xl">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={post.image || 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-lime-500 text-black hover:bg-lime-600 font-medium">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-lime-200 text-lime-700 hover:bg-lime-50">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-lime-600 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
                    </div>
                    <div className="flex items-center text-lime-600 font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{post.readingTime}min</span>
                    </div>
                  </div>
                  
                    <Link href={`/blog/${post.slug}`}>
                    <Button 
                      variant="outline" 
                      className="w-full border-lime-200 text-lime-700 hover:bg-lime-50 hover:border-lime-300 font-medium py-2 rounded-lg group-hover:shadow-md transition-all"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
        </div>
  );
} 
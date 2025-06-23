'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, TrendingUp, Calendar, Users, Sparkles, Menu, X } from 'lucide-react';
import BlogClientComponent from './blog-client';

interface BlogPageClientProps {
  allPosts: any[];
  categories: string[];
  totalWords: number;
  featuredCount: number;
  error?: string;
}

export default function BlogPageClient({ 
  allPosts, 
  categories, 
  totalWords, 
  featuredCount, 
  error 
}: BlogPageClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <Sparkles className="w-8 h-8 text-lime-500 group-hover:text-lime-600 transition-colors" />
                <span className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-lime-600 transition-colors">
                  Brat Generator
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/" 
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/blog" 
                  className="text-slate-900 font-semibold relative"
                >
                  Blog
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-lime-500 rounded-full"></div>
                </Link>
                <Link 
                  href="/about" 
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  About
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-600" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-600" />
                )}
              </button>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
                <div className="flex flex-col space-y-4 pt-4">
                  <Link 
                    href="/" 
                    className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/blog" 
                    className="text-slate-900 font-semibold py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Error Loading Blog</h3>
            <p className="text-slate-600 mb-8">Sorry, there was an error loading the blog content.</p>
            <Link 
              href="/" 
              className="text-lime-600 hover:text-lime-800 font-medium underline"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <Sparkles className="w-8 h-8 text-lime-500 group-hover:text-lime-600 transition-colors" />
              <span className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-lime-600 transition-colors">
                Brat Generator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Home
              </Link>
              <Link 
                href="/blog" 
                className="text-slate-900 font-semibold relative"
              >
                Blog
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-lime-500 rounded-full"></div>
              </Link>
              <Link 
                href="/about" 
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                About
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
              <div className="flex flex-col space-y-4 pt-4">
                <Link 
                  href="/" 
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/blog" 
                  className="text-slate-900 font-semibold py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/about" 
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 py-12">
          <div className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-800 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Design & Creative Blog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Design <span className="text-lime-500 relative">
              Insights
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-lime-200 rounded-full"></div>
            </span> & Inspiration
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore the latest design trends, typography art, and visual culture. From album aesthetics to digital art, discover unlimited creative possibilities.
          </p>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg mb-3 md:mb-4 mx-auto">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{allPosts.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Articles</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg mb-3 md:mb-4 mx-auto">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{featuredCount}</div>
              <div className="text-xs md:text-sm text-slate-600">Featured</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg mb-3 md:mb-4 mx-auto">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{categories.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Categories</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg mb-3 md:mb-4 mx-auto">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{Math.round(totalWords / 1000)}K</div>
              <div className="text-xs md:text-sm text-slate-600">Words</div>
            </div>
          </div>
        </div>

        {/* 文章列表 */}
        {allPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No Articles Yet</h3>
            <p className="text-slate-600 mb-8">Please check if there are Markdown files in the content/blog directory</p>
          </div>
        ) : (
          <BlogClientComponent initialPosts={allPosts} categories={categories} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">Brat Generator</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Explore unlimited design possibilities and share unique creative perspectives.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/" className="block text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="block text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map((category) => (
                  <span 
                    key={category}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
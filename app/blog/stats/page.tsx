import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, FileText, Tag, Calendar, User, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBlogStats, getAllCategories, getAllTags, getAllPosts } from '@/lib/markdown-blog';

export const metadata: Metadata = {
  title: 'Blog Stats | Brat Generator Design Blog',
  description: 'View detailed statistics for the Brat Generator blog, including post count, category distribution, popular tags, and more.',
  keywords: 'Brat Generator, Blog Stats, Data Analysis, Design Blog',
};

export default async function BlogStatsPage() {
  const [stats, categories, tags, allPosts] = await Promise.all([
    getBlogStats(),
    getAllCategories(),
    getAllTags(),
    getAllPosts()
  ]);

  // Calculate category distribution
  const categoryStats = categories
    .filter(cat => cat !== 'All')
    .map(category => ({
      name: category,
      count: allPosts.filter(post => post.category === category).length,
      percentage: allPosts.length > 0 ? Math.round((allPosts.filter(post => post.category === category).length / allPosts.length) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);

  // Calculate tag usage frequency
  const tagStats = tags
    .map(tag => ({
      name: tag,
      count: allPosts.filter(post => post.tags.includes(tag)).length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20); // Show top 20 popular tags

  // Calculate monthly posting statistics
  const monthlyStats = allPosts.reduce((acc, post) => {
    const date = new Date(post.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = Object.entries(monthlyStats)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // Show last 12 months

  // Calculate author statistics
  const authorStats = allPosts.reduce((acc, post) => {
    acc[post.author] = (acc[post.author] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const authorData = Object.entries(authorStats)
    .map(([author, count]) => ({ author, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-lime-500" />
              <h1 className="text-2xl font-bold text-slate-900">Brat Generator</h1>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                HOME
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-lime-100 text-lime-800 hover:bg-lime-200">
            Blog Data Analysis
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Blog Stats <span className="text-lime-500">Dashboard</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get in-depth insights into the content distribution, posting trends, and user preferences of the Brat Generator blog.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Posts</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalPosts}</p>
                </div>
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-lime-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Featured Posts</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.featuredPosts}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Categories</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalCategories}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Tags</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalTags}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-lime-500" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <Badge variant="secondary" className="mr-3">
                        {category.name}
                      </Badge>
                      <div className="flex-1 bg-slate-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-lime-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-slate-900">{category.count}</span>
                      <span className="text-xs text-slate-500 ml-1">({category.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="w-5 h-5 mr-2 text-lime-500" />
                Popular Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tagStats.map((tag) => (
                  <Badge 
                    key={tag.name} 
                    variant="outline" 
                    className="hover:bg-lime-50 hover:border-lime-300 transition-colors"
                  >
                    {tag.name} ({tag.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posting Trends and Author Stats */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Posting Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-lime-500" />
                Monthly Posting Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      {new Date(data.month + '-01').toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-lime-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(data.count / Math.max(...monthlyData.map(d => d.count), 1)) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900 w-8 text-right">
                        {data.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Author Contribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-lime-500" />
                Author Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {authorData.map((author) => (
                  <div key={author.author} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-lime-600" />
                      </div>
                      <span className="font-medium text-slate-900">{author.author}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 bg-slate-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-lime-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(author.count / Math.max(...authorData.map(a => a.count), 1)) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900 w-8 text-right">
                        {author.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Stats */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-lime-500" />
              Content Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stats.totalWords.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">Total Words</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stats.averageReadingTime}
                </div>
                <div className="text-sm text-slate-600">Avg. Reading Time (min)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {allPosts.length > 0 ? Math.round(stats.totalWords / stats.totalPosts).toLocaleString() : 0}
                </div>
                <div className="text-sm text-slate-600">Avg. Words Per Post</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Blog */}
        <div className="text-center">
          <Link href="/blog">
            <Button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold">
              Back to Blog Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
} 
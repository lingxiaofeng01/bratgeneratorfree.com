import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-lime-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-lime-400 rounded-full opacity-10 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-lime-500 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number with brat style */}
        <div className="mb-8">
          <div className="inline-block relative">
            <h1 className="text-9xl md:text-[12rem] font-black text-lime-500 opacity-90 leading-none">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-black opacity-10 transform translate-x-2 translate-y-2 leading-none">
              404
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-lime-200 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {/* Brat style heading */}
            <div className="mb-6">
              <div className="inline-block bg-lime-500 text-black px-6 py-3 rounded-lg transform -rotate-1 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold lowercase">
                  page not found
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                Oops! The page you're looking for doesn't exist. 
                <br className="hidden md:block" />
                Maybe it's creating some brat vibes somewhere else? 🎵
              </p>

              <div className="flex items-center justify-center space-x-2 text-slate-500">
                <Sparkles className="w-5 h-5 text-lime-500" />
                <span className="text-sm">Don't worry, we'll get you back on track</span>
                <Sparkles className="w-5 h-5 text-lime-500" />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Link href="/">
                  <Button 
                    size="lg" 
                    className="bg-lime-500 hover:bg-lime-600 text-black font-bold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Back to Home
                  </Button>
                </Link>

                <Link href="/blog">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-lime-300 text-lime-700 hover:bg-lime-50 font-medium px-8 py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Browse Blog
                  </Button>
                </Link>
              </div>

              {/* Popular links */}
              <div className="pt-8 border-t border-lime-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                  Popular Pages
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link 
                    href="/" 
                    className="text-sm text-lime-600 hover:text-lime-800 hover:underline transition-colors"
                  >
                    Brat Generator
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link 
                    href="/blog" 
                    className="text-sm text-lime-600 hover:text-lime-800 hover:underline transition-colors"
                  >
                    Blog
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link 
                    href="/about" 
                    className="text-sm text-lime-600 hover:text-lime-800 hover:underline transition-colors"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* Fun message */}
              <div className="pt-6">
                <div className="inline-block bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm">
                  <span className="font-medium">Pro tip:</span> Try using the search or navigation menu
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Still lost? Head back to the{' '}
            <Link href="/" className="text-lime-600 hover:text-lime-800 font-medium underline">
              Free Brat Generator
            </Link>
            {' '}and create something amazing!
          </p>
        </div>
      </div>
    </div>
  );
} 
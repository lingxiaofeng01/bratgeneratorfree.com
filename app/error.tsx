'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-400 rounded-full opacity-10 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-orange-500 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 500 Number with brat style */}
        <div className="mb-8">
          <div className="inline-block relative">
            <h1 className="text-9xl md:text-[12rem] font-black text-red-500 opacity-90 leading-none">
              500
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-black opacity-10 transform translate-x-2 translate-y-2 leading-none">
              500
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {/* Brat style heading */}
            <div className="mb-6">
              <div className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg transform -rotate-1 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold lowercase flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  something went wrong
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                Oops! Our server encountered an unexpected error. 
                <br className="hidden md:block" />
                Don't worry, it's not your fault - we're on it! 🔧
              </p>

              <div className="flex items-center justify-center space-x-2 text-slate-500">
                <Sparkles className="w-5 h-5 text-red-500" />
                <span className="text-sm">We're working to fix this issue</span>
                <Sparkles className="w-5 h-5 text-red-500" />
              </div>

              {/* Error details (dev mode only) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-slate-100 p-4 rounded-lg text-left">
                  <h4 className="font-semibold text-slate-800 mb-2">Error Details (Dev Mode):</h4>
                  <code className="text-sm text-red-600 break-all">
                    {error.message}
                  </code>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button 
                  onClick={reset}
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </Button>

                <Link href="/">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-red-300 text-red-700 hover:bg-red-50 font-medium px-8 py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              {/* Popular links */}
              <div className="pt-8 border-t border-red-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                  Quick Navigation
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link 
                    href="/" 
                    className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
                  >
                    Brat Generator
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link 
                    href="/blog" 
                    className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
                  >
                    Blog
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link 
                    href="/about" 
                    className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* Fun message */}
              <div className="pt-6">
                <div className="inline-block bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm">
                  <span className="font-medium">Status:</span> Our team has been notified
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            If this problem persists, please try refreshing the page or come back to the{' '}
            <Link href="/" className="text-red-600 hover:text-red-800 font-medium underline">
              Free Brat Generator
            </Link>
            {' '}later.
          </p>
        </div>
      </div>
    </div>
  );
} 
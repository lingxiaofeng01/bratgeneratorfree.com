import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100 flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-lime-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-lime-400 rounded-full opacity-10 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-lime-500 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Animated logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-lime-500 rounded-2xl flex items-center justify-center mx-auto animate-bounce shadow-lg">
            <span className="text-black font-bold text-2xl">B</span>
          </div>
        </div>

        {/* Loading text with brat style */}
        <div className="mb-6">
          <div className="inline-block bg-lime-500 text-black px-6 py-3 rounded-lg transform -rotate-1 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold lowercase">
              loading brat vibes...
            </h2>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-lime-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-lime-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-lime-500 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Fun message */}
        <div className="flex items-center justify-center space-x-2 text-slate-500">
          <Sparkles className="w-4 h-4 text-lime-500 animate-pulse" />
          <span className="text-sm">Getting everything ready for you</span>
          <Sparkles className="w-4 h-4 text-lime-500 animate-pulse" />
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-lime-200 rounded-full h-2">
            <div className="bg-lime-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 
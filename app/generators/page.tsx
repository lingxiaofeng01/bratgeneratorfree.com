'use client';

import Link from 'next/link';
import { Sparkles, Skull, ChevronRight, Menu, X, FlipHorizontal, Smile, Rocket, Rainbow } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function GeneratorsPage() {
  useEffect(() => {
    document.title = 'Free Text Generators - Glitter Text, Mirror Text, Dark Souls & More';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our collection of free online text generators. Create glitter text, mirror text, Dark Souls messages, and more. No signup required, instant download.');
    }
  }, []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const generators = [
    {
      title: 'Rainbow Text Generator',
      description: 'Create stunning rainbow text with 6+ unique fonts and 6 gradient presets. Customize colors, effects, and download instantly - completely free!',
      icon: Rainbow,
      href: '/generators/rainbow-text',
      gradient: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
      bgGradient: 'from-pink-50 via-purple-50 to-blue-50',
      borderColor: 'border-purple-200',
      features: ['6+ Rainbow Fonts', '6 Gradient Presets', 'Full Customization', 'Instant Download']
    },
    {
      title: 'Alien Text Generator',
      description: 'Transform your text into alien fonts with 10+ unique extraterrestrial styles. Perfect for sci-fi designs, games, and creative projects.',
      icon: Rocket,
      href: '/generators/alien-text',
      gradient: 'from-purple-500 to-green-500',
      bgGradient: 'from-purple-50 to-green-50',
      borderColor: 'border-purple-200',
      features: ['10+ Alien Fonts', 'Full Customization', 'Glow Effects', 'Free Download']
    },
    {
      title: 'Glitter Text Generator',
      description: 'Create dazzling glitter text with 176+ unique effects. Customize fonts, sizes, angles, shadows, and borders for stunning designs.',
      icon: Sparkles,
      href: '/generators/glitter-text',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      features: ['176+ Glitter Effects', 'Custom Fonts & Sizes', 'Instant Download', 'No Watermarks']
    },
    {
      title: 'Disney Text Generator',
      description: 'Create magical Disney-style text with 8 authentic fonts and 4 stunning presets. Customize colors, sizes, and download instantly.',
      icon: Sparkles,
      href: '/generators/disney-text',
      gradient: 'from-blue-500 to-purple-500',
      bgGradient: 'from-blue-50 to-purple-50',
      borderColor: 'border-blue-200',
      features: ['8 Disney Fonts', '4 Style Presets', 'Full Customization', 'Free Download']
    },
    {
      title: 'Underline Text Generator',
      description: 'Transform your text with 20 beautiful underline styles. Perfect for social media, messaging apps, and creative designs.',
      icon: Sparkles,
      href: '/generators/underline-text',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-200',
      features: ['20 Premium Styles', 'One-Click Copy', 'Universal Compatibility', '100% Free']
    },
    {
      title: 'Dark Souls Text Generator',
      description: 'Create iconic Dark Souls text messages like "YOU DIED" and "VICTORY ACHIEVED". Perfect for gaming memes and content.',
      icon: Skull,
      href: '/generators/dark-souls-text',
      gradient: 'from-red-600 to-slate-800',
      bgGradient: 'from-slate-50 to-slate-100',
      borderColor: 'border-slate-200',
      features: ['3 Classic Styles', 'Custom Messages', 'Glow Effects', 'High Quality PNG']
    },
    {
      title: 'Mirror Text Generator',
      description: 'Create stunning mirrored text effects instantly. Horizontal, vertical, and reverse text transformations. Perfect for social media and creative designs.',
      icon: FlipHorizontal,
      href: '/generators/mirror-text',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-200',
      features: ['4 Mirror Modes', 'Real-time Preview', 'One-Click Copy', 'Unicode Support']
    },
    {
      title: 'SpongeBob Text Generator',
      description: 'Create hilarious SpongeBob mocking text with 6 conversion modes including random case, alternating case, bold, and italic. Perfect for memes and social media.',
      icon: Smile,
      href: '/generators/spongebob-text',
      gradient: 'from-yellow-500 to-blue-500',
      bgGradient: 'from-yellow-50 to-blue-50',
      borderColor: 'border-yellow-200',
      features: ['6 Conversion Modes', 'Instant Copy', 'Meme Ready', '100% Free']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-xl font-bold text-slate-800">
                Text Generators
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-lime-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-lime-600 font-semibold">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-lime-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-lime-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-lime-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-slate-600 hover:text-lime-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/generators"
                  className="text-lime-600 font-semibold py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Generators
                </Link>
                <Link
                  href="/blog"
                  className="text-slate-600 hover:text-lime-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-lime-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-lime-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Free Online Text Generators
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8">
            Create stunning text designs with our collection of professional generators. 
            From glitter effects to gaming aesthetics, transform your text into eye-catching visuals instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
              <span>No Watermarks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
              <span>No Signup Required</span>
            </div>
          </div>
        </div>

        {/* Generators Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {generators.map((generator, index) => {
            const Icon = generator.icon;
            return (
              <Link key={index} href={generator.href}>
                <Card className={`p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br ${generator.bgGradient} border-2 ${generator.borderColor} h-full`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${generator.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{generator.title}</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {generator.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {generator.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-700">
                        <ChevronRight className="w-4 h-4 text-lime-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-lime-600 hover:text-lime-700 font-semibold text-sm group">
                    <span>Try Now</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">More Generators Coming Soon</h2>
          <p className="text-slate-600 mb-8">
            We're constantly adding new text generators to help you create amazing designs. 
            Stay tuned for more creative tools!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-500">
            <div className="p-4 bg-slate-100 rounded-lg">
              <span className="font-semibold">Neon Text</span>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <span className="font-semibold">3D Text</span>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <span className="font-semibold">Fire Text</span>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <span className="font-semibold">Ice Text</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <h4 className="text-lg font-bold text-white">Text Generators</h4>
              </div>
              <p className="text-sm text-slate-400">
                Create stunning text designs with our professional generators. Free, fast, and easy to use.
              </p>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Generators</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Brat Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/glitter-text" className="hover:text-white transition-colors">
                    Glitter Text Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/disney-text" className="hover:text-white transition-colors">
                    Disney Text Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/dark-souls-text" className="hover:text-white transition-colors">
                    Dark Souls Text Generator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Text Generators. All rights reserved. Create stunning text designs for free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


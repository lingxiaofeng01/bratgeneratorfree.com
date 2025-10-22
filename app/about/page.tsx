'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Users, Zap, Heart, Target, Award, ChevronRight, BookOpen, Twitter, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const milestones = [
    {
      year: '2023',
      title: 'Project Kick-off',
      description: 'Based on in-depth research of the Charli XCX "brat" aesthetic, development of the first generator prototype began.'
    },
    {
      year: 'Early 2025',
      title: 'Public Launch',
      description: 'Brat Generator was officially launched, receiving positive feedback and praise from the design community.'
    },
    {
      year: 'Mid 2025',
      title: 'Feature Expansion',
      description: 'Added support for multi-line text, a custom color picker, and advanced text effects.'
    },
    {
      year: 'Today',
      title: 'Continuous Innovation',
      description: 'Serving over 50,000 users, we continue to optimize the product experience and add new features.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'User-First',
      description: 'We always prioritize the user experience, listening to feedback to continuously improve our product features and interface design.'
    },
    {
      icon: Zap,
      title: 'Innovation-Driven',
      description: 'We constantly explore new technologies and design trends to provide users with cutting-edge creative tools and features.'
    },
    {
      icon: Users,
      title: 'Open Collaboration',
      description: 'We believe in the spirit of open source and the power of community, building a better design ecosystem with creators worldwide.'
    },
    {
      icon: Target,
      title: 'Pursuit of Quality',
      description: 'We strive for perfection in code quality and design details, ensuring every feature is meticulously crafted.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-lime-500" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Brat Generator</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                HOME
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-900 font-medium relative">
                About
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-lime-500 rounded-full"></div>
              </Link>
              <Link href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">
                Terms
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
                  className="text-slate-600 hover:text-slate-900 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link 
                  href="/blog" 
                  className="text-slate-600 hover:text-slate-900 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/about" 
                  className="text-slate-900 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-lime-100 text-lime-800 hover:bg-lime-200">
              About Brat Generator
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Empowering everyone to create
              <span className="text-lime-500"> professional-grade</span>
               designs
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
              Brat Generator was born from a love for Charli XCX's iconic "brat" aesthetic. We believe that great design tools should be simple and accessible,
              allowing every creator—whether a musician, designer, or content creator—to easily express their creative ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-lime-500" />
                <span>50,000+ Active Users</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-lime-500" />
                <span>4.9/5 User Rating</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-lime-500" />
                <span>100% Free to Use</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
                We are committed to democratizing design tools, ensuring that professional creative expression is no longer a privilege for a select few.
                With our Brat Generator, anyone can create an impressive album cover design in minutes using our intuitive Brat Generator platform.
              </p>
              <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                We believe technology should serve creativity, not hinder it. That's why we simplify the complex design process
                into an intuitive interface, allowing users to focus on their creative ideas rather than technical details.
              </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-amber-900">
                <strong>ⓘ Important Disclaimer:</strong> Brat Generator is a fan-inspired creative tool inspired by Charli XCX's iconic "brat" aesthetic.
                This is NOT an official product and is NOT affiliated with, endorsed by, or associated with Charli XCX, her management, record label, or any official entity.
                We are independent creators who built this tool for the community.
              </p>
            </div>
              <Link href="/">
                <Button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold">
                  Start Creating <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-lime-50 to-emerald-50 border-lime-200">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-black" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                  <p className="text-slate-700 leading-relaxed">
                    To become the world's most popular Brat Generator and creative design tool platform, enabling everyone to easily express their creative ideas with Brat Generator,
                    driving the process of design democratization, and making creativity ubiquitous.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              These values guide our every decision, shaping the direction of our product and our team culture.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <value.icon className="w-6 h-6 md:w-8 md:h-8 text-lime-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Development Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              From the initial idea to today's achievements, here is a record of our growth.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-lime-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 md:w-16 md:h-16 bg-lime-500 rounded-full flex items-center justify-center text-black font-bold text-sm md:text-lg z-10">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="ml-6 md:ml-8 flex-1">
                      <Card className="p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-4">
                          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-0">{milestone.title}</h3>
                          <Badge variant="outline" className="w-fit text-lime-600 border-lime-200">
                            {milestone.year}
                          </Badge>
                        </div>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">{milestone.description}</p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Connect */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-lime-500 to-emerald-500 text-black overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
              <p className="text-base md:text-lg mb-8 text-black/80 max-w-2xl mx-auto">
                Join thousands of creators who are already using Brat Generator to bring their artistic visions to life.
                Start creating your unique album covers today!
          </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" variant="secondary" className="bg-white/20 hover:bg-white/30 text-black border-black/20">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Creating
            </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="border-black/30 text-black hover:bg-white/10">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Read Our Blog
            </Button>
                </Link>
          </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">Brat Generator</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                The ultimate free tool for creating professional-grade album covers inspired by the iconic brat aesthetic.
                Accessible, intuitive, and completely free.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
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
                <Link href="/about" className="block text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="block text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
            </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Brat Generator. Empowering creativity, inspiring innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
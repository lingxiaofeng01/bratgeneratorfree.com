import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Users, Zap, Heart, Target, Award, ChevronRight, BookOpen, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'About Us | Brat Generator - Professional Album Cover Maker',
  description: 'Learn the story, mission, and team behind Brat Generator. We are dedicated to providing creators with the best brat-style album cover generation tool, making professional design accessible to everyone.',
  keywords: 'Brat Generator, About Us, Album Cover Generator, Design Tool, Creative Team',
  openGraph: {
    title: 'About Brat Generator - Professional Album Cover Design Tool',
    description: 'Discover our story, mission, and team. Explore how Brat Generator helps creators worldwide produce outstanding album cover designs.',
    type: 'website',
  },
};

export default function AboutPage() {
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
              <h1 className="text-2xl font-bold text-slate-900">Brat Generator</h1>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                HOME
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-900 font-medium">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-lime-100 text-lime-800 hover:bg-lime-200">
              About Brat Generator
            </Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Empowering everyone to create
              <span className="text-lime-500"> professional-grade</span>
               designs
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Brat Generator was born from a love for Charli XCX's iconic "brat" aesthetic. We believe that great design tools should be simple and accessible,
              allowing every creator—whether a musician, designer, or content creator—to easily express their creative ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We are committed to democratizing design tools, ensuring that professional creative expression is no longer a privilege for a select few.
                With Brat Generator, anyone can create an impressive album cover design in minutes.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We believe technology should serve creativity, not hinder it. That's why we simplify the complex design process
                into an intuitive interface, allowing users to focus on their creative ideas rather than technical details.
              </p>
              <Link href="/">
                <Button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold">
                  Start Creating <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-lime-50 to-emerald-50 border-lime-200">
                <div className="text-center">
                  <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                  <p className="text-slate-700 leading-relaxed">
                    To become the world's most popular creative design tool platform, enabling everyone to easily express their creative ideas,
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These values guide our every decision, shaping the direction of our product and our team culture.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Development Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From the initial idea to today's achievements, here is a record of our growth.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-lime-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-black font-bold text-lg z-10">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="ml-8 flex-1">
                      <Card className="p-6">
                        <div className="flex items-center mb-3">
                          <Badge variant="secondary" className="mr-3">{milestone.year}</Badge>
                          <h3 className="text-xl font-semibold text-slate-900">{milestone.title}</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Tech Stack</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We use modern technologies to build a fast, reliable, and enjoyable experience.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              <Badge className="px-4 py-2 text-lg bg-gray-200 text-gray-800">Next.js</Badge>
              <Badge className="px-4 py-2 text-lg bg-gray-200 text-gray-800">React</Badge>
              <Badge className="px-4 py-2 text-lg bg-gray-200 text-gray-800">TypeScript</Badge>
              <Badge className="px-4 py-2 text-lg bg-gray-200 text-gray-800">Tailwind CSS</Badge>
              <Badge className="px-4 py-2 text-lg bg-gray-200 text-gray-800">Vercel</Badge>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="bg-gradient-to-r from-lime-500 to-emerald-500 rounded-2xl p-12 text-center text-black">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Have questions or ideas? We'd love to hear from you. Follow us on social media or send us an email.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline" size="lg" className="bg-white/20 hover:bg-white/40 border-white text-black">
              <a href="https://twitter.com/bratgenerator" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5 mr-2" />
                Follow on Twitter
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/20 hover:bg-white/40 border-white text-black">
              <a href="mailto:contact@bratgenerator.com">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-lime-400" />
                <h4 className="text-xl font-bold">Brat Generator</h4>
              </div>
              <p className="text-slate-400">
                Create stunning album covers and explore the infinite possibilities of the "brat" aesthetic.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Tools</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/" className="hover:text-white transition-colors">Cover Generator</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Template Library</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Design Blog</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Brat Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
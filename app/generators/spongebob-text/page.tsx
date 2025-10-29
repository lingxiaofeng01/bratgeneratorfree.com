'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Download, Menu, X, Copy, Check, Smile, Zap, Star, ChevronRight, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// SpongeBob mocking text conversion modes
const CONVERSION_MODES = [
  {
    id: 'random',
    name: 'Random Case',
    description: 'Random uppercase and lowercase letters (50% probability)',
    icon: Zap,
    example: 'rAnDoM CaSe TeXt'
  },
  {
    id: 'alternating',
    name: 'Alternating Case',
    description: 'Alternating between uppercase and lowercase',
    icon: Sparkles,
    example: 'aLtErNaTiNg CaSe'
  },
  {
    id: 'random-bold',
    name: 'Random Bold',
    description: 'Random case with bold Unicode characters',
    icon: Star,
    example: '𝗿𝗔𝗡𝗱𝗼𝗠 𝗯𝗢𝗟𝗱'
  },
  {
    id: 'alternating-bold',
    name: 'Alternating Bold',
    description: 'Alternating case with bold Unicode characters',
    icon: Star,
    example: '𝗮𝗟𝘁𝗘𝗿𝗡𝗮𝗧𝗶𝗡𝗴'
  },
  {
    id: 'random-italic',
    name: 'Random Italic',
    description: 'Random case with italic Unicode characters',
    icon: Star,
    example: '𝘳𝘈𝘕𝘥𝘰𝘔 𝘪𝘛𝘈𝘭𝘪𝘊'
  },
  {
    id: 'alternating-italic',
    name: 'Alternating Italic',
    description: 'Alternating case with italic Unicode characters',
    icon: Star,
    example: '𝘢𝘓𝘵𝘌𝘳𝘕𝘢𝘛𝘪𝘕𝘨'
  }
];

// Unicode character maps
const BOLD_SANS_MAP: Record<string, string> = {
  'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
  'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
  'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
  'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
  'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
  'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
  '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const ITALIC_MAP: Record<string, string> = {
  'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
  'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
  'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
  'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑',
  'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛',
  'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
};

export default function SpongeBobTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('SpongeBob Mocking Text');
  const [outputText, setOutputText] = useState('');
  const [selectedMode, setSelectedMode] = useState('random');
  const [copied, setCopied] = useState(false);

  // Apply character map to text
  const applyCharMap = (map: Record<string, string>, text: string): string => {
    return text.split('').map(c => map[c] || map[c.toLowerCase()] || c).join('');
  };

  // Convert text based on selected mode
  const convertText = (text: string, mode: string): string => {
    if (!text) return '';

    switch (mode) {
      case 'random':
        return text.split('').map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
      
      case 'alternating': {
        const offset = Math.round(Math.random());
        return text.split('').map((c, i) => (i + offset) % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
      }
      
      case 'random-bold': {
        const randomCase = text.split('').map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
        return applyCharMap(BOLD_SANS_MAP, randomCase);
      }
      
      case 'alternating-bold': {
        const offset = Math.round(Math.random());
        const alternatingCase = text.split('').map((c, i) => (i + offset) % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
        return applyCharMap(BOLD_SANS_MAP, alternatingCase);
      }
      
      case 'random-italic': {
        const randomCase = text.split('').map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
        return applyCharMap(ITALIC_MAP, randomCase);
      }
      
      case 'alternating-italic': {
        const offset = Math.round(Math.random());
        const alternatingCase = text.split('').map((c, i) => (i + offset) % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
        return applyCharMap(ITALIC_MAP, alternatingCase);
      }
      
      default:
        return text;
    }
  };

  // Update output when input or mode changes
  useEffect(() => {
    setOutputText(convertText(inputText, selectedMode));
  }, [inputText, selectedMode]);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Regenerate (for random modes)
  const handleRegenerate = () => {
    setOutputText(convertText(inputText, selectedMode));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Smile className="w-8 h-8 text-yellow-500" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">SpongeBob Text Generator</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-yellow-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-slate-900 font-medium hover:text-yellow-600 transition-colors">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-yellow-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-yellow-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-yellow-600 transition-colors">
                Contact
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
                <Link href="/" className="text-slate-600 hover:text-yellow-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  HOME
                </Link>
                <Link href="/generators" className="text-slate-900 font-medium hover:text-yellow-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Generators
                </Link>
                <Link href="/blog" className="text-slate-600 hover:text-yellow-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Blog
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-yellow-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-slate-600 hover:text-yellow-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Smile className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            SpongeBob Mocking Text Generator
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Create hilarious SpongeBob mocking text instantly! Convert your text into alternating case letters, 
            perfect for memes, social media posts, and adding sarcastic tone to any message. 
            Choose from 6 different styles including random case, alternating case, bold, and italic variations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>6 Conversion Modes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Instant Copy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>No Sign-up Required</span>
            </div>
          </div>
        </section>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Input Section */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 text-yellow-500 mr-2" />
              Enter Your Text
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-text" className="text-base font-semibold mb-2 block">
                  Input Text
                </Label>
                <textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your text here..."
                  className="w-full h-40 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none text-lg"
                />
              </div>

              {/* Conversion Mode Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Select Conversion Mode
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONVERSION_MODES.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedMode === mode.id
                            ? 'border-yellow-500 bg-yellow-50 shadow-md'
                            : 'border-slate-200 hover:border-yellow-300 hover:bg-yellow-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-5 h-5 mt-0.5 ${selectedMode === mode.id ? 'text-yellow-600' : 'text-slate-400'}`} />
                          <div className="flex-1 min-w-0">
                            <div className={`font-semibold mb-1 ${selectedMode === mode.id ? 'text-yellow-900' : 'text-slate-900'}`}>
                              {mode.name}
                            </div>
                            <div className="text-xs text-slate-500 mb-2">
                              {mode.description}
                            </div>
                            <div className="text-sm font-mono text-slate-600 truncate">
                              {mode.example}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-8 bg-gradient-to-br from-yellow-50 to-blue-50 border-2 border-yellow-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
              SpongeBob Mocking Text Output
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 min-h-[160px] border-2 border-yellow-300 shadow-inner">
                <div className="text-2xl font-semibold text-slate-900 break-words leading-relaxed">
                  {outputText || 'Your converted text will appear here...'}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCopy}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold"
                  disabled={!outputText}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Text
                    </>
                  )}
                </Button>
                {(selectedMode.includes('random')) && (
                  <Button
                    onClick={handleRegenerate}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    disabled={!inputText}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Pro Tip:</strong> For random modes, click the refresh button to generate different variations!
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Why Use Our SpongeBob Text Generator?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Conversion</h3>
              <p className="text-slate-600">
                Convert your text to SpongeBob mocking text instantly with real-time preview.
                No waiting, no processing delays - just type and see the results immediately.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Styles</h3>
              <p className="text-slate-600">
                Choose from 6 different conversion modes including random case, alternating case,
                bold Unicode, and italic Unicode variations for maximum creative flexibility.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Copy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">One-Click Copy</h3>
              <p className="text-slate-600">
                Copy your converted SpongeBob mocking text with a single click.
                Perfect for quickly sharing on social media, messaging apps, or meme creation.
              </p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            How to Use SpongeBob Text Generator
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Enter Text</h3>
              <p className="text-sm text-slate-600">
                Type or paste your text into the input box
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Choose Mode</h3>
              <p className="text-sm text-slate-600">
                Select your preferred conversion style
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Preview Result</h3>
              <p className="text-sm text-slate-600">
                See your mocking text instantly generated
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Copy & Share</h3>
              <p className="text-sm text-slate-600">
                Click copy and use it anywhere you want
              </p>
            </div>
          </div>
        </section>

        {/* About SpongeBob Mocking Text Section */}
        <section className="mb-16">
          <Card className="p-8 md:p-12 bg-white">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              What is SpongeBob Mocking Text?
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 mb-4">
                SpongeBob mocking text, also known as "mocking SpongeBob meme text" or "sarcastic text,"
                originated from a scene in the SpongeBob SquarePants cartoon where SpongeBob acts like a chicken.
                This meme format became viral in May 2017 and has since become one of the most popular ways to
                express sarcasm or mockery online.
              </p>
              <p className="text-lg text-slate-700 mb-4">
                The alternating uppercase and lowercase letters create a "mocking" tone that's perfect for:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
                <li>Creating funny memes and social media posts</li>
                <li>Adding sarcastic tone to messages</li>
                <li>Making humorous responses in conversations</li>
                <li>Creating engaging content for Twitter, Instagram, and TikTok</li>
                <li>Adding personality to your online communications</li>
              </ul>
              <p className="text-lg text-slate-700">
                Our SpongeBob text generator makes it easy to create this popular text style with multiple
                variations including random case, alternating case, and special Unicode styles with bold and
                italic formatting. Whether you're creating memes, posting on social media, or just having fun
                with friends, our generator provides the perfect tool for all your mocking text needs.
              </p>
            </div>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                What is the SpongeBob mocking meme?
              </h3>
              <p className="text-slate-600">
                The SpongeBob mocking meme comes from a scene where SpongeBob acts like a chicken.
                It uses alternating uppercase and lowercase letters to convey a sarcastic or mocking tone,
                and became viral on social media in 2017.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                How does the text conversion work?
              </h3>
              <p className="text-slate-600">
                Our generator uses JavaScript to convert your text in real-time. For random mode,
                each letter has a 50% chance of being uppercase or lowercase. For alternating mode,
                letters alternate between cases in a pattern.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Can I use this text on social media?
              </h3>
              <p className="text-slate-600">
                Yes! The generated text works perfectly on all social media platforms including Twitter,
                Instagram, Facebook, TikTok, Discord, and messaging apps. The Unicode styles (bold/italic)
                are supported on most modern platforms.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Is this generator free to use?
              </h3>
              <p className="text-slate-600">
                Absolutely! Our SpongeBob text generator is 100% free with no sign-up required,
                no watermarks, and unlimited usage. Generate as much mocking text as you want!
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                What's the difference between the modes?
              </h3>
              <p className="text-slate-600">
                Random mode creates unpredictable patterns, while alternating mode creates consistent patterns.
                Bold and italic modes use special Unicode characters that appear styled on most platforms,
                adding extra visual emphasis to your mocking text.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Can I convert long text?
              </h3>
              <p className="text-slate-600">
                Yes! Our generator can handle text of any length, from short phrases to entire paragraphs.
                The conversion happens instantly regardless of text length, making it perfect for both
                quick messages and longer content.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-yellow-500 to-blue-500 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Hilarious SpongeBob Mocking Text?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users creating funny memes and sarcastic messages with our free SpongeBob text generator!
          </p>
          <Button
            size="lg"
            className="bg-white text-yellow-600 hover:bg-slate-100 font-semibold px-8 py-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Creating Now
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Smile className="w-8 h-8 text-yellow-500" />
                <span className="text-xl font-bold">SpongeBob Text Generator</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                The ultimate free tool for creating SpongeBob mocking text with multiple styles.
                Perfect for memes, social media, and adding sarcastic tone to your messages.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Brat Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators" className="hover:text-white transition-colors">
                    All Generators
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-slate-400">
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
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 SpongeBob Text Generator. All rights reserved. Create hilarious mocking text for memes and social media.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}




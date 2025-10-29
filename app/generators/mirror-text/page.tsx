'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Copy, Check, RotateCcw, FlipHorizontal, FlipVertical, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Unicode character mappings for mirroring
const mirrorMap: { [key: string]: string } = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
  'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
  'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
  'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H',
  'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ',
  'Q': 'Ὸ', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6',
  '.': '˙', ',': '\'', '!': '¡', '?': '¿', '\'': ',', '"': '„', ';': '؛',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
  '&': '⅋', '_': '‾'
};

const horizontalMirrorMap: { [key: string]: string } = {
  'A': 'A', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'H': 'H', 'I': 'I', 'M': 'M',
  'O': 'O', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y',
  'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'h': 'ʜ', 'i': 'i', 'm': 'm',
  'n': 'n', 'o': 'o', 'p': 'q', 'q': 'p', 's': 'ƨ', 't': 't', 'u': 'u', 'v': 'v',
  'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
};

type MirrorMode = 'horizontal' | 'vertical' | 'both' | 'reverse';

export default function MirrorTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('Mirror Your Text');
  const [outputText, setOutputText] = useState('');
  const [mirrorMode, setMirrorMode] = useState<MirrorMode>('horizontal');
  const [copied, setCopied] = useState(false);

  // Update page title and meta
  useEffect(() => {
    document.title = 'Mirror Text Generator - Free Online Text Mirroring Tool';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create mirrored text instantly with our free online mirror text generator. Horizontal, vertical, and reverse text effects. Perfect for social media, design, and creative projects.');
    }
  }, []);

  // Mirror text function
  const mirrorText = (text: string, mode: MirrorMode): string => {
    if (!text) return '';

    switch (mode) {
      case 'horizontal':
        // Reverse the text and mirror each character
        return text
          .split('')
          .reverse()
          .map(char => horizontalMirrorMap[char] || char)
          .join('');

      case 'vertical':
        // Mirror each character vertically (upside down)
        return text
          .split('')
          .reverse()
          .map(char => mirrorMap[char] || char)
          .join('');

      case 'both':
        // Both horizontal and vertical mirroring
        return text
          .split('')
          .map(char => mirrorMap[char] || char)
          .join('');

      case 'reverse':
        // Just reverse the text without character mirroring
        return text.split('').reverse().join('');

      default:
        return text;
    }
  };

  // Update output when input or mode changes
  useEffect(() => {
    setOutputText(mirrorText(inputText, mirrorMode));
  }, [inputText, mirrorMode]);

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Reset function
  const handleReset = () => {
    setInputText('Mirror Your Text');
    setMirrorMode('horizontal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-slate-800">
                Mirror Text Generator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-indigo-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-indigo-600 font-semibold">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors">
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-slate-200 pt-4">
              <Link
                href="/"
                className="block text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/generators"
                className="block text-indigo-600 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Generators
              </Link>
              <Link
                href="/blog"
                className="block text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="block text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-slate-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Free Mirror Text Generator - Flip & Reverse Text Online
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Create stunning mirrored text effects instantly with our free online tool.
            Horizontal flip, vertical mirror, upside-down text, and reverse text.
            Perfect for social media, creative designs, and unique text presentations.
            100% free, no signup required!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <FlipHorizontal className="w-4 h-4 text-indigo-500" />
              <span>Horizontal Mirror</span>
            </div>
            <div className="flex items-center gap-2">
              <FlipVertical className="w-4 h-4 text-purple-500" />
              <span>Vertical Mirror</span>
            </div>
            <div className="flex items-center gap-2">
              <Shuffle className="w-4 h-4 text-pink-500" />
              <span>Multiple Modes</span>
            </div>
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-blue-500" />
              <span>One-Click Copy</span>
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="p-6 md:p-8 bg-white shadow-xl border-2 border-indigo-100">
            {/* Mirror Mode Selection */}
            <div className="mb-8">
              <Label className="text-lg font-semibold text-slate-900 mb-4 block">
                Select Mirror Mode
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setMirrorMode('horizontal')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    mirrorMode === 'horizontal'
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  <FlipHorizontal className={`w-6 h-6 mx-auto mb-2 ${
                    mirrorMode === 'horizontal' ? 'text-indigo-600' : 'text-slate-400'
                  }`} />
                  <div className="text-sm font-medium text-slate-700">Horizontal</div>
                  <div className="text-xs text-slate-500 mt-1">txeT rorriM</div>
                </button>

                <button
                  onClick={() => setMirrorMode('vertical')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    mirrorMode === 'vertical'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                  }`}
                >
                  <FlipVertical className={`w-6 h-6 mx-auto mb-2 ${
                    mirrorMode === 'vertical' ? 'text-purple-600' : 'text-slate-400'
                  }`} />
                  <div className="text-sm font-medium text-slate-700">Vertical</div>
                  <div className="text-xs text-slate-500 mt-1">ʇxǝ⊥ ɹoɹɹᴉW</div>
                </button>

                <button
                  onClick={() => setMirrorMode('both')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    mirrorMode === 'both'
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-slate-200 hover:border-pink-300 hover:bg-slate-50'
                  }`}
                >
                  <Shuffle className={`w-6 h-6 mx-auto mb-2 ${
                    mirrorMode === 'both' ? 'text-pink-600' : 'text-slate-400'
                  }`} />
                  <div className="text-sm font-medium text-slate-700">Both</div>
                  <div className="text-xs text-slate-500 mt-1">ʇxǝ⊥ ɹoɹɹᴉW</div>
                </button>

                <button
                  onClick={() => setMirrorMode('reverse')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    mirrorMode === 'reverse'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <RotateCcw className={`w-6 h-6 mx-auto mb-2 ${
                    mirrorMode === 'reverse' ? 'text-blue-600' : 'text-slate-400'
                  }`} />
                  <div className="text-sm font-medium text-slate-700">Reverse</div>
                  <div className="text-xs text-slate-500 mt-1">txeT esreveR</div>
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <Label htmlFor="input-text" className="text-lg font-semibold text-slate-900 mb-3 block">
                Enter Your Text
              </Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your text here..."
                className="min-h-[120px] text-lg border-2 border-slate-200 focus:border-indigo-400 rounded-xl resize-none"
              />
            </div>

            {/* Output Section */}
            <div className="mb-6">
              <Label htmlFor="output-text" className="text-lg font-semibold text-slate-900 mb-3 block">
                Mirrored Text
              </Label>
              <div className="relative">
                <Textarea
                  id="output-text"
                  value={outputText}
                  readOnly
                  className="min-h-[120px] text-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl resize-none font-mono"
                />
                <Button
                  onClick={copyToClipboard}
                  className={`absolute top-3 right-3 ${
                    copied
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white transition-all`}
                  size="sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-2 border-slate-300 hover:border-slate-400 text-slate-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            Powerful Features of Our Mirror Text Generator
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-indigo-100">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <FlipHorizontal className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Horizontal Mirror</h3>
              <p className="text-slate-600">
                Flip your text horizontally like looking in a mirror. Perfect for creative designs and social media posts.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <FlipVertical className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Vertical Mirror</h3>
              <p className="text-slate-600">
                Turn your text upside down using Unicode characters. Great for unique text effects and puzzles.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-pink-100">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <Shuffle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Both Directions</h3>
              <p className="text-slate-600">
                Combine horizontal and vertical mirroring for maximum effect. Create truly unique text transformations.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">One-Click Copy</h3>
              <p className="text-slate-600">
                Instantly copy your mirrored text to clipboard. Quick and easy sharing across all platforms.
              </p>
            </Card>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              How to Use Our Free Mirror Text Generator
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Choose Mirror Mode</h3>
                  <p className="text-slate-600">
                    Select from horizontal, vertical, both, or reverse text modes based on your desired effect.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Enter Your Text</h3>
                  <p className="text-slate-600">
                    Type or paste your text into the input field. The mirrored version will appear instantly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Copy and Share</h3>
                  <p className="text-slate-600">
                    Click the copy button to instantly copy your mirrored text and use it anywhere you want!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            Creative Use Cases for Mirrored Text
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-slate-100 hover:border-indigo-200 transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Social Media</h3>
              <p className="text-slate-600 mb-4">
                Create eye-catching posts and bios that stand out. Perfect for Instagram, Twitter, Facebook, and TikTok.
              </p>
              <div className="text-sm text-indigo-600 font-mono bg-indigo-50 p-3 rounded-lg">
                ɯɐɹƃɐʇsuI ʎɯ ʞɔǝɥƆ
              </div>
            </Card>

            <Card className="p-6 border-2 border-slate-100 hover:border-purple-200 transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Design Projects</h3>
              <p className="text-slate-600 mb-4">
                Add unique text effects to your graphic designs, logos, and creative projects.
              </p>
              <div className="text-sm text-purple-600 font-mono bg-purple-50 p-3 rounded-lg">
                ngiseᗡ evitɒɘɿƆ
              </div>
            </Card>

            <Card className="p-6 border-2 border-slate-100 hover:border-pink-200 transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fun & Games</h3>
              <p className="text-slate-600 mb-4">
                Create puzzles, secret messages, and fun challenges for friends and followers.
              </p>
              <div className="text-sm text-pink-600 font-mono bg-pink-50 p-3 rounded-lg">
                ¿ǝɯ pɐǝɹ noʎ uɐƆ
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions About Mirror Text
          </h2>
          <div className="space-y-6">
            <Card className="p-6 border-2 border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                How does the mirror text generator work?
              </h3>
              <p className="text-slate-600">
                Our generator uses Unicode characters to create mirrored text effects. For horizontal mirroring,
                we reverse the text direction and use mirrored character equivalents. For vertical mirroring,
                we use upside-down Unicode characters similar to Leonardo da Vinci's famous mirrored handwriting.
              </p>
            </Card>

            <Card className="p-6 border-2 border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Can I use mirrored text on social media?
              </h3>
              <p className="text-slate-600">
                Yes! Mirrored text works on most social media platforms including Instagram, Twitter, Facebook,
                TikTok, and more. Simply copy the generated text and paste it into your posts, bios, or comments.
              </p>
            </Card>

            <Card className="p-6 border-2 border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Is the mirror text generator free?
              </h3>
              <p className="text-slate-600">
                Absolutely! Our mirror text generator is 100% free to use with no registration required.
                Create unlimited mirrored text for personal or commercial projects.
              </p>
            </Card>

            <Card className="p-6 border-2 border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                What's the difference between horizontal and vertical mirroring?
              </h3>
              <p className="text-slate-600">
                Horizontal mirroring flips text left-to-right (like a mirror reflection), while vertical
                mirroring flips text upside-down. The "Both" mode combines both effects for a complete
                transformation. "Reverse" simply reverses the character order without changing individual letters.
              </p>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-indigo-500" />
                <h4 className="text-lg font-bold text-white">Mirror Text Generator</h4>
              </div>
              <p className="text-sm text-slate-400">
                Create stunning mirrored text effects instantly. Free, fast, and easy to use for all your creative projects.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Generators</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Brat Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/glitter-text" className="hover:text-white transition-colors">
                    Glitter Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/disney-text" className="hover:text-white transition-colors">
                    Disney Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/dark-souls-text" className="hover:text-white transition-colors">
                    Dark Souls Text
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Resources</h5>
              <ul className="space-y-2 text-slate-400">
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
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
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
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Mirror Text Generator. All rights reserved. Create stunning mirrored text effects for free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}



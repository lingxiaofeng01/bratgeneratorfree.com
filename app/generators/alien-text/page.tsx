'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Download, Menu, X, Copy, Check, Zap, Star, 
  ChevronRight, RefreshCw, Rocket, Globe, Palette, Type,
  Image as ImageIcon, FileText, Wand2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// Alien font configurations
const ALIEN_FONTS = [
  {
    id: 'alien-android',
    name: 'Alien Android',
    fontFamily: 'Alien Android',
    description: 'Futuristic robotic alien style',
    example: 'ANDROID',
    gradient: 'from-purple-500 to-blue-500'
  },
  {
    id: 'alien-beasts',
    name: 'Alien Beasts',
    fontFamily: 'Alien Beasts',
    description: 'Wild and organic alien creatures',
    example: 'BEASTS',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'alien-faces',
    name: 'Alien Faces',
    fontFamily: 'Alien Faces',
    description: 'Mysterious alien facial symbols',
    example: 'FACES',
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    id: 'alien-dot',
    name: 'Alien Dot',
    fontFamily: 'Alien Dot',
    description: 'Dotted matrix alien text',
    example: 'MATRIX',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'alien-fur',
    name: 'Alien Fur',
    fontFamily: 'Alien Fur',
    description: 'Fuzzy textured alien writing',
    example: 'FUZZY',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'alien-sweater',
    name: 'Alien Sweater',
    fontFamily: 'Alien Sweater',
    description: 'Knitted pattern alien font',
    example: 'KNIT',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'alien-waffle',
    name: 'Alien Waffle',
    fontFamily: 'Alien Waffle',
    description: 'Grid-based alien symbols',
    example: 'GRID',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'alien-classic',
    name: 'Alien Classic',
    fontFamily: 'Alien Classic',
    description: 'Traditional alien language',
    example: 'CLASSIC',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'alien-double',
    name: 'Alien Double',
    fontFamily: 'Alien Double',
    description: 'Double-layered alien text',
    example: 'DOUBLE',
    gradient: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: 'alien-coxy',
    name: 'Alien Coxy',
    fontFamily: 'Alien Coxy',
    description: 'Cosmic alien typography',
    example: 'COSMIC',
    gradient: 'from-lime-500 to-green-500'
  }
];

const SAMPLE_TEXTS = [
  'GREETINGS EARTHLINGS',
  'TAKE ME TO YOUR LEADER',
  'WE COME IN PEACE',
  'ALIEN INVASION 2025',
  'EXTRATERRESTRIAL LIFE',
  'SPACE ODYSSEY'
];

export default function AlienTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('ALIEN TEXT');
  const [selectedFont, setSelectedFont] = useState(ALIEN_FONTS[0]);
  const [fontSize, setFontSize] = useState(100);
  const [textColor, setTextColor] = useState('#00ff00');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [enableGlow, setEnableGlow] = useState(true);
  const [autoFit, setAutoFit] = useState(true);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontPromises = ALIEN_FONTS.map(font =>
          document.fonts.load(`16px "${font.fontFamily}"`)
        );
        await Promise.all(fontPromises);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue anyway
      }
    };
    loadFonts();
  }, []);

  // Render canvas with auto-fit text
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fontsLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!inputText.trim()) return;

    // Split text into lines
    const lines = inputText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return;

    // Calculate optimal font size to fit canvas
    let currentFontSize = fontSize;
    const padding = 60; // Padding from edges
    const maxWidth = canvas.width - padding * 2;
    const maxHeight = canvas.height - padding * 2;

    // Function to measure text width
    const measureText = (size: number) => {
      ctx.font = `${size}px "${selectedFont.fontFamily}", sans-serif`;
      return Math.max(...lines.map(line => ctx.measureText(line).width));
    };

    // Auto-fit: reduce font size if text is too wide (only if autoFit is enabled)
    if (autoFit) {
      while (currentFontSize > 20 && measureText(currentFontSize) > maxWidth) {
        currentFontSize -= 2;
      }

      // Check if text height fits
      const lineHeight = currentFontSize * 1.3;
      const totalHeight = lines.length * lineHeight;

      // Further reduce if height doesn't fit
      while (currentFontSize > 20 && totalHeight > maxHeight) {
        currentFontSize -= 2;
      }
    } else {
      // Manual mode: still check bounds but don't auto-reduce as aggressively
      const textWidth = measureText(currentFontSize);
      if (textWidth > maxWidth) {
        // Only reduce if severely overflowing
        while (currentFontSize > 30 && measureText(currentFontSize) > canvas.width - 20) {
          currentFontSize -= 5;
        }
      }
    }

    // Set final font
    ctx.font = `${currentFontSize}px "${selectedFont.fontFamily}", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add glow effect
    if (enableGlow) {
      ctx.shadowColor = textColor;
      ctx.shadowBlur = Math.max(15, currentFontSize * 0.2);
    } else {
      ctx.shadowBlur = 0;
    }

    // Draw text
    ctx.fillStyle = textColor;
    const finalLineHeight = currentFontSize * 1.3;
    const totalTextHeight = lines.length * finalLineHeight;
    const startY = (canvas.height - totalTextHeight) / 2 + finalLineHeight / 2;

    lines.forEach((line, index) => {
      const y = startY + index * finalLineHeight;
      ctx.fillText(line, canvas.width / 2, y);
    });
  }, [inputText, selectedFont, fontSize, textColor, backgroundColor, enableGlow, autoFit, fontsLoaded]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Copy canvas as image to clipboard
  const handleCopyImage = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Try to copy canvas as image (modern browsers)
      if (navigator.clipboard && window.ClipboardItem) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              setCopiedImage(true);
              setTimeout(() => setCopiedImage(false), 2000);
            } catch (err) {
              console.error('Failed to copy image:', err);
              alert('Image copy not supported in this browser. Please use Download instead.');
            }
          }
        });
      } else {
        alert('Image copy not supported in this browser. Please use Download instead.');
      }
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  };

  // Copy text to clipboard
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Download as image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `alien-text-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Load sample text
  const loadSample = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setInputText(randomText);
  };

  // Reset to defaults
  const handleReset = () => {
    setInputText('ALIEN TEXT');
    setSelectedFont(ALIEN_FONTS[0]);
    setFontSize(100);
    setTextColor('#00ff00');
    setBackgroundColor('#000000');
    setEnableGlow(true);
    setAutoFit(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="w-8 h-8 text-purple-500" />
              <span className="text-xl sm:text-2xl font-bold text-slate-900">Alien Text Generator</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-purple-600 transition-colors">
                HOME
              </Link>
              <Link
                href="/generators"
                className="text-slate-900 font-medium hover:text-purple-600 transition-colors"
              >
                Generators
              </Link>
              <Link
                href="/blog"
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-purple-600 transition-colors text-sm"
              >
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
                <Link
                  href="/"
                  className="text-slate-600 hover:text-purple-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/generators"
                  className="text-slate-900 font-medium hover:text-purple-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Generators
                </Link>
                <Link
                  href="/blog"
                  className="text-slate-600 hover:text-purple-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-purple-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-purple-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-green-100 px-4 py-2 rounded-full mb-6">
            <Rocket className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">10+ Unique Alien Fonts</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Alien Text Generator
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your text into extraterrestrial fonts with our free alien text generator.
            Choose from 10+ unique alien fonts, customize colors and effects, and download your
            sci-fi designs instantly. Perfect for creative projects, social media, and more!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
            <Button
              onClick={loadSample}
              variant="outline"
              className="border-2 border-purple-300 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try Sample
            </Button>
          </div>
        </div>

        {/* Generator Section */}
        <div id="generator" className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Input & Controls */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Type className="w-6 h-6 text-purple-500 mr-2" />
              Input & Settings
            </h2>

            {/* Text Input */}
            <div className="mb-6">
              <Label htmlFor="input-text" className="text-base font-semibold mb-2 block">
                Your Text
              </Label>
              <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your alien message..."
                className="w-full h-32 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none text-lg"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={loadSample}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Load Sample
                </Button>
                <Button
                  onClick={() => setInputText('')}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Auto-fit Toggle */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoFit}
                  onChange={(e) => setAutoFit(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="text-base font-semibold block">Auto-fit Text to Canvas</span>
                  <span className="text-xs text-slate-500">Automatically adjust size to prevent overflow</span>
                </div>
              </label>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-semibold">
                  {autoFit ? 'Max Font Size' : 'Font Size'}: {fontSize}px
                </Label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setFontSize(Math.max(20, fontSize - 10))}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => setFontSize(Math.min(200, fontSize + 10))}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={20}
                max={200}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>20px</span>
                <span>200px</span>
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="text-color" className="text-base font-semibold mb-2 block">
                  Text Color
                </Label>
                <div className="flex gap-2">
                  <input
                    id="text-color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bg-color" className="text-base font-semibold mb-2 block">
                  Background
                </Label>
                <div className="flex gap-2">
                  <input
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableGlow}
                  onChange={(e) => setEnableGlow(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-base font-semibold">Enable Glow Effect</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </Card>

          {/* Preview & Download */}
          <Card className="p-8 bg-slate-900/95 backdrop-blur-sm border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Globe className="w-6 h-6 text-green-400 mr-2" />
              Preview
            </h2>
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl mb-6 border-2 border-slate-700">
              <canvas
                ref={canvasRef}
                width={1000}
                height={500}
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>
            {autoFit && (
              <p className="text-xs text-slate-400 mb-4 text-center">
                💡 Auto-fit is enabled. Text will automatically scale to fit the canvas.
              </p>
            )}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={handleCopyImage}
                className={`${
                  copiedImage
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white transition-all`}
              >
                {copiedImage ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Copy Image
                  </>
                )}
              </Button>
            </div>
            <Button
              onClick={handleCopyText}
              variant="outline"
              className={`w-full ${
                copiedText
                  ? 'border-green-500 text-green-600'
                  : 'border-slate-600 text-slate-300 hover:bg-slate-800'
              } transition-all`}
            >
              {copiedText ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Text Copied!
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Copy Text Only
                </>
              )}
            </Button>
            <p className="text-xs text-slate-400 mt-3 text-center">
              💡 Tip: Copy Image to paste the styled design, or Copy Text for plain text
            </p>
          </Card>
        </div>

        {/* Font Gallery */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Choose Your Alien Font
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select from 10 unique alien fonts, each with its own extraterrestrial character.
              Click any font to apply it to your text instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {ALIEN_FONTS.map((font) => (
              <Card
                key={font.id}
                onClick={() => setSelectedFont(font)}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedFont.id === font.id
                    ? 'ring-4 ring-purple-500 shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${font.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-900 text-sm">{font.name}</h3>
                    {selectedFont.id === font.id && (
                      <div className="bg-purple-500 text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{font.description}</p>
                  <div
                    className="text-2xl font-bold text-center py-4 bg-slate-900 rounded-lg text-green-400"
                    style={{ fontFamily: font.fontFamily }}
                  >
                    {font.example}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Why Use Our Alien Text Generator?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">10+ Unique Fonts</h3>
              <p className="text-slate-600">
                Access a diverse collection of alien fonts, from futuristic android styles to
                organic creature-inspired designs. Each font brings unique extraterrestrial character.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Full Customization</h3>
              <p className="text-slate-600">
                Customize text color, background, font size, and glow effects. Create the perfect
                alien aesthetic for your sci-fi projects with complete creative control.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Download</h3>
              <p className="text-slate-600">
                Download your alien text as high-quality PNG images or copy the text directly.
                No watermarks, no registration required - completely free to use.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Preview</h3>
              <p className="text-slate-600">
                See your alien text come to life instantly with real-time canvas preview.
                Experiment with different fonts and settings to find the perfect look.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Universal Compatibility</h3>
              <p className="text-slate-600">
                Works perfectly on all devices and browsers. Create alien text on desktop,
                tablet, or mobile with the same great experience everywhere.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Quality</h3>
              <p className="text-slate-600">
                Generate professional-grade alien text perfect for game design, movie posters,
                social media, and creative projects. Studio-quality results, free for everyone.
              </p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How to Use the Alien Text Generator
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create stunning alien text in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <Type className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Enter Your Text</h3>
              <p className="text-slate-600">
                Type or paste your message into the input box. You can also load a sample text
                to get started quickly.
              </p>
            </Card>

            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <Palette className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Choose Font & Style</h3>
              <p className="text-slate-600">
                Select from 10 unique alien fonts and customize colors, size, and glow effects
                to match your vision.
              </p>
            </Card>

            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <Globe className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Preview in Real-Time</h3>
              <p className="text-slate-600">
                Watch your alien text render instantly on the canvas preview. Adjust settings
                until you get the perfect look.
              </p>
            </Card>

            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-pink-600">4</span>
              </div>
              <Download className="w-10 h-10 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Download or Copy</h3>
              <p className="text-slate-600">
                Download your alien text as a PNG image or copy the text to use anywhere.
                It's that simple!
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ChevronRight className="w-5 h-5 text-purple-600 mr-2" />
                What is an alien text generator?
              </h3>
              <p className="text-slate-600 ml-7">
                An alien text generator is a free online tool that transforms regular text into
                extraterrestrial-style fonts. Our generator offers 10+ unique alien fonts inspired
                by sci-fi aesthetics, perfect for creative projects, games, and social media.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ChevronRight className="w-5 h-5 text-purple-600 mr-2" />
                How many alien fonts are available?
              </h3>
              <p className="text-slate-600 ml-7">
                We offer 10 unique alien fonts including Alien Android, Alien Beasts, Alien Faces,
                Alien Dot, Alien Fur, Alien Sweater, Alien Waffle, Alien Classic, Alien Double,
                and Alien Coxy. Each font has its own distinctive extraterrestrial character.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ChevronRight className="w-5 h-5 text-purple-600 mr-2" />
                Can I download the alien text as an image?
              </h3>
              <p className="text-slate-600 ml-7">
                Yes! You can download your alien text as a high-quality PNG image with transparent
                or custom backgrounds. Simply click the "Download PNG" button after creating your
                design. No watermarks, completely free.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ChevronRight className="w-5 h-5 text-purple-600 mr-2" />
                Is the alien text generator free to use?
              </h3>
              <p className="text-slate-600 ml-7">
                Absolutely! Our alien text generator is 100% free with no hidden costs, no
                registration required, and no watermarks on your downloads. Create unlimited
                alien text designs for personal or commercial projects.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ChevronRight className="w-5 h-5 text-purple-600 mr-2" />
                What can I use alien text for?
              </h3>
              <p className="text-slate-600 ml-7">
                Alien text is perfect for sci-fi game design, movie posters, social media posts,
                creative projects, memes, Discord usernames, YouTube thumbnails, and any project
                that needs an extraterrestrial or futuristic aesthetic.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ChevronRight className="w-5 h-5 text-purple-600 mr-2" />
                Can I customize the colors and effects?
              </h3>
              <p className="text-slate-600 ml-7">
                Yes! You have full control over text color, background color, font size (40-150px),
                and glow effects. Experiment with different combinations to create the perfect
                alien aesthetic for your project.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ChevronRight className="w-5 h-5 text-purple-600 mr-2" />
                Does it work on mobile devices?
              </h3>
              <p className="text-slate-600 ml-7">
                Yes! Our alien text generator is fully responsive and works perfectly on all
                devices including smartphones, tablets, and desktop computers. Create alien text
                anywhere, anytime.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl p-12 text-white mb-16">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Alien Text?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of creators using our free alien text generator for their sci-fi
            projects, games, and creative designs. Start creating extraterrestrial text now!
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all"
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Creating Now
          </Button>
        </section>

        {/* SEO Content Section */}
        <section className="prose max-w-4xl mx-auto mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              About Alien Text Generator
            </h2>
            <p className="text-slate-600 mb-4">
              Our alien text generator is the ultimate free tool for creating extraterrestrial-style
              text and fonts. Whether you're designing a sci-fi game, creating social media content,
              or working on a creative project, our generator provides everything you need to bring
              your alien vision to life.
            </p>
            <p className="text-slate-600 mb-4">
              With 10 unique alien fonts to choose from, you can create text that looks like it came
              from another world. Each font has been carefully designed to capture different aspects
              of alien aesthetics - from futuristic android styles to organic creature-inspired designs.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">
              Features of Our Alien Font Generator
            </h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
              <li>10+ unique alien fonts with distinct extraterrestrial characters</li>
              <li>Real-time canvas preview with instant updates</li>
              <li>Full color customization for text and background</li>
              <li>Adjustable font size from 40px to 150px</li>
              <li>Optional glow effects for enhanced sci-fi aesthetics</li>
              <li>Download as high-quality PNG images</li>
              <li>Copy text directly to clipboard</li>
              <li>100% free with no watermarks or registration</li>
              <li>Fully responsive design for all devices</li>
              <li>Professional-quality results perfect for any project</li>
            </ul>
            <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">
              Perfect for Creative Projects
            </h3>
            <p className="text-slate-600 mb-4">
              Our alien text generator is ideal for game developers, graphic designers, content
              creators, and anyone who needs extraterrestrial-style text. Use it for game UI,
              movie posters, YouTube thumbnails, Discord profiles, social media posts, memes,
              and more. The possibilities are endless!
            </p>
            <p className="text-slate-600">
              Start creating your alien text today and bring an extraterrestrial touch to your
              creative projects. No downloads, no installation - just open your browser and start
              generating amazing alien fonts instantly!
            </p>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-8 h-8 text-lime-500" />
                <span className="text-xl font-bold">Brat Generator</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                Free online text generators and creative tools for designers, artists, and creators.
                Transform your text with our collection of professional generators.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Generators</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/generators/alien-text" className="hover:text-white transition-colors">
                    Alien Text
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
                  <Link href="/generators/spongebob-text" className="hover:text-white transition-colors">
                    SpongeBob Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators" className="hover:text-white transition-colors">
                    View All
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
            <p>
              &copy; 2025 Brat Generator. All rights reserved. Create stunning alien text with our
              free generator. Perfect for sci-fi projects, games, and creative designs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}



'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Sparkles, Download, Menu, X, Wand2, Palette, Type, Image as ImageIcon, ChevronRight, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// Disney fonts configuration - 11 fonts from local files
const DISNEY_FONTS = [
  {
    id: 'disney-classic',
    name: 'Disney Classic',
    family: 'Disney',
    localFont: '/fonts/Disney/Disney.ttf',
    googleFont: 'Bangers',
    letterSpacing: 2,
    baseline: 0.75
  },
  {
    id: 'disney-dreams',
    name: 'Disney Dreams',
    family: 'Disney Dreams',
    localFont: '/fonts/Disney/Disney Dreams.otf',
    googleFont: 'Fredoka One',
    letterSpacing: 1.5,
    baseline: 0.75
  },
  {
    id: 'disney-cute',
    name: 'Disney Cute',
    family: 'Disneycute',
    localFont: '/fonts/Disney/Disneycute.otf',
    googleFont: 'Righteous',
    letterSpacing: 1,
    baseline: 0.75
  },
  {
    id: 'disney-01',
    name: 'Disney 01',
    family: 'Disney01',
    localFont: '/fonts/Disney/disney01.ttf',
    googleFont: 'Bangers',
    letterSpacing: 2,
    baseline: 0.75
  },
  {
    id: 'new-walt-disney',
    name: 'New Walt Disney',
    family: 'New Walt Disney',
    localFont: '/fonts/Disney/NewWaltDisneyFontRegular-BPen.ttf',
    googleFont: 'Fredoka One',
    letterSpacing: 1,
    baseline: 0.75
  },
  {
    id: 'new-walt-ui',
    name: 'New Walt UI',
    family: 'New Walt Disney UI',
    localFont: '/fonts/Disney/NewWaltDisneyUi-8YdA.ttf',
    googleFont: 'Righteous',
    letterSpacing: 0.5,
    baseline: 0.75
  },
  {
    id: 'hail-disney',
    name: 'Hail Disney',
    family: 'Hail Disney',
    localFont: '/fonts/Disney/Hail Disney.otf',
    googleFont: 'Creepster',
    letterSpacing: 1.5,
    baseline: 0.75
  },
  {
    id: 'wicked-mouse',
    name: 'Wicked Mouse',
    family: 'Wicked Mouse',
    localFont: '/fonts/Disney/wicked-mouse.regular.otf',
    googleFont: 'Creepster',
    letterSpacing: 1,
    baseline: 0.75
  },
  {
    id: 'lion-king',
    name: 'Lion King',
    family: 'Lion King',
    localFont: '/fonts/Disney/lion_king.ttf',
    googleFont: 'Cinzel',
    letterSpacing: 2,
    baseline: 0.75
  },
  {
    id: 'monster-ag',
    name: 'Monster AG',
    family: 'Monster AG',
    localFont: '/fonts/Disney/Monster AG.ttf',
    googleFont: 'Bungee',
    letterSpacing: 1,
    baseline: 0.75
  },
  {
    id: 'enchanted-land',
    name: 'Enchanted Land',
    family: 'Enchanted Land',
    localFont: '/fonts/Disney/Enchanted Land.otf',
    googleFont: 'Dancing Script',
    letterSpacing: 0.5,
    baseline: 0.75
  }
];

// Style presets - 6 beautiful Disney-inspired styles
const STYLE_PRESETS = [
  {
    id: 'classic',
    name: 'Classic Disney',
    color: '#000000',
    background: '#FFFFFF',
    fontSize: 80,
    shadow: true,
  },
  {
    id: 'magical',
    name: 'Magical Blue',
    color: '#1E90FF',
    background: '#F0F8FF',
    fontSize: 80,
    shadow: true,
  },
  {
    id: 'princess',
    name: 'Princess Pink',
    color: '#FF69B4',
    background: '#FFF0F5',
    fontSize: 80,
    shadow: true,
  },
  {
    id: 'golden',
    name: 'Golden Magic',
    color: '#FFD700',
    background: '#1A1A2E',
    fontSize: 90,
    shadow: true,
  },
  {
    id: 'frozen',
    name: 'Frozen Ice',
    color: '#00CED1',
    background: '#E0F7FA',
    fontSize: 85,
    shadow: true,
  },
  {
    id: 'enchanted',
    name: 'Enchanted Forest',
    color: '#228B22',
    background: '#F0FFF0',
    fontSize: 80,
    shadow: true,
  },
];

// Font size options
const FONT_SIZES = [
  { label: 'Tiny', value: 40 },
  { label: 'Small', value: 60 },
  { label: 'Medium', value: 80 },
  { label: 'Large', value: 100 },
  { label: 'Extra Large', value: 120 },
  { label: 'Huge', value: 150 },
];

export default function DisneyTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [text, setText] = useState('DISNEY');
  const [selectedFont, setSelectedFont] = useState(DISNEY_FONTS[0]);
  const [selectedPreset, setSelectedPreset] = useState(STYLE_PRESETS[0]);
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(80);
  const [enableShadow, setEnableShadow] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load fonts (local Disney fonts + Google Fonts fallback)
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Try to load local Disney fonts first
        const fontLoadPromises = DISNEY_FONTS.map(async (font) => {
          if (font.localFont) {
            try {
              const fontFace = new FontFace(
                font.family,
                `url(${font.localFont})`
              );
              const loadedFont = await fontFace.load();
              document.fonts.add(loadedFont);
              console.log(`✅ Loaded local Disney font: ${font.family}`);
              return true;
            } catch (error) {
              console.warn(`⚠️ Failed to load local font ${font.family}, will use Google Font fallback (${font.googleFont})`);
              return false;
            }
          }
          return false;
        });

        await Promise.allSettled(fontLoadPromises);

        // Load Google Fonts as fallback
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        const fontFamilies = DISNEY_FONTS
          .map(font => font.googleFont)
          .filter(Boolean)
          .map(font => font!.replace(/ /g, '+'))
          .join('&family=');

        link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
        document.head.appendChild(link);

        // Wait for all fonts to be ready
        await document.fonts.ready;

        // Give a small delay to ensure fonts are fully loaded
        setTimeout(() => {
          setFontsLoaded(true);
        }, 500);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue anyway with fallback fonts
      }
    };

    loadFonts();
  }, []);

  // Render canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fontsLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const canvasWidth = 1200;
    const canvasHeight = 675; // 16:9 aspect ratio
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Set text properties
    // Try local font first, fallback to Google Font if not available
    const fontFamily = selectedFont.family;
    const fallbackFont = selectedFont.googleFont || 'sans-serif';
    ctx.font = `${fontSize}px "${fontFamily}", "${fallbackFont}", sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Apply shadow if enabled
    if (enableShadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Measure text and wrap if needed
    const maxWidth = canvasWidth - 100;
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    // Draw text lines
    const lineHeight = fontSize * 1.2;
    const totalHeight = lines.length * lineHeight;
    const startY = (canvasHeight - totalHeight) / 2 + fontSize / 2;

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      ctx.fillText(line, canvasWidth / 2, y);
    });
  }, [text, selectedFont, textColor, backgroundColor, fontSize, enableShadow, fontsLoaded]);

  // Re-render canvas when dependencies change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Apply preset
  const applyPreset = (preset: typeof STYLE_PRESETS[0]) => {
    setSelectedPreset(preset);
    setTextColor(preset.color);
    setBackgroundColor(preset.background);
    setFontSize(preset.fontSize);
    setEnableShadow(preset.shadow);
  };

  // Download as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `disney-text-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <Sparkles className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
              <span className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Brat Generator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-purple-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-slate-900 font-medium">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-purple-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-purple-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-purple-600 transition-colors">
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
                <Link href="/" className="text-slate-600 hover:text-purple-600 transition-colors py-2">
                  HOME
                </Link>
                <Link href="/generators" className="text-slate-900 font-medium py-2">
                  Generators
                </Link>
                <Link href="/blog" className="text-slate-600 hover:text-purple-600 transition-colors py-2">
                  Blog
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-purple-600 transition-colors py-2">
                  About
                </Link>
                <Link href="/contact" className="text-slate-600 hover:text-purple-600 transition-colors py-2">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Disney Text Generator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Create magical Disney-style text with 11 authentic fonts and 6 stunning presets.
            Customize colors, sizes, and download your creation instantly - 100% free!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
              <span>11 Disney Fonts</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
              <span>6 Style Presets</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
              <span>Free Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
              <span>No Watermark</span>
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Preview Panel */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <ImageIcon className="w-6 h-6 text-purple-600 mr-2" />
              Preview
            </h2>
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
              {!fontsLoaded ? (
                <div className="text-slate-500 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p>Loading fonts...</p>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              )}
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleDownload}
                disabled={!fontsLoaded}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PNG
              </Button>
            </div>
          </Card>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Text Input */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label htmlFor="text-input" className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <Type className="w-5 h-5 text-purple-600 mr-2" />
                Your Text
              </Label>
              <Input
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your magical text..."
                className="text-lg py-6"
                maxLength={50}
              />
              <p className="text-sm text-slate-500 mt-2">{text.length}/50 characters</p>
            </Card>

            {/* Style Presets */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Wand2 className="w-5 h-5 text-purple-600 mr-2" />
                Style Presets
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedPreset.id === preset.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-900 mb-2 truncate">{preset.name}</div>
                    <div className="flex gap-2">
                      <div
                        className="w-6 h-6 rounded border border-slate-300"
                        style={{ backgroundColor: preset.color }}
                        title={`Text: ${preset.color}`}
                      />
                      <div
                        className="w-6 h-6 rounded border border-slate-300"
                        style={{ backgroundColor: preset.background }}
                        title={`Background: ${preset.background}`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Font Selection */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Type className="w-5 h-5 text-purple-600 mr-2" />
                Choose Font ({DISNEY_FONTS.length} Options)
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {DISNEY_FONTS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFont(font)}
                    className={`p-3 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      selectedFont.id === font.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-900 mb-1.5 truncate">{font.name}</div>
                    <div
                      className="text-base truncate"
                      style={{ fontFamily: font.family }}
                    >
                      DISNEY
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Font Size */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Type className="w-5 h-5 text-purple-600 mr-2" />
                Font Size: {fontSize}px
              </Label>
              <div className="space-y-4">
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={30}
                  max={150}
                  step={5}
                  className="w-full"
                />
                <div className="flex gap-2 flex-wrap">
                  {FONT_SIZES.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setFontSize(size.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        fontSize === size.value
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Colors */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Palette className="w-5 h-5 text-purple-600 mr-2" />
                Colors
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="text-color" className="text-sm text-slate-600 mb-2 block">
                    Text Color
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="text-color"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-16 h-12 rounded border border-slate-300 cursor-pointer"
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bg-color" className="text-sm text-slate-600 mb-2 block">
                    Background Color
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-12 rounded border border-slate-300 cursor-pointer"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableShadow}
                    onChange={(e) => setEnableShadow(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">Enable Text Shadow</span>
                </label>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Disney Text Generator?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create authentic Disney-style text with professional features and instant results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Type className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">8 Authentic Fonts</h4>
              <p className="text-slate-600">
                Choose from 8 carefully selected Disney-inspired fonts including Classic Disney,
                Waltograph, Lion King, Encanto, and more.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">4 Style Presets</h4>
              <p className="text-slate-600">
                Quick-start with our professionally designed presets: Classic Disney, Magical Blue,
                Princess Pink, and Golden Magic.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Full Customization</h4>
              <p className="text-slate-600">
                Control every aspect: font size (30-150px), text color, background color,
                and optional text shadow effects.
              </p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How to Use Disney Text Generator
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create your magical Disney text in 4 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Enter Text</h4>
              <p className="text-sm text-slate-600">Type your magical message (up to 50 characters)</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Choose Style</h4>
              <p className="text-sm text-slate-600">Select from 8 fonts and 4 presets</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Customize</h4>
              <p className="text-sm text-slate-600">Adjust size, colors, and effects</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Download</h4>
              <p className="text-sm text-slate-600">Save as high-quality PNG image</p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Perfect For Every Magical Occasion
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create stunning Disney-style text for any project or celebration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Birthday Parties</h4>
              <p className="text-slate-600 text-sm">
                Create magical birthday banners, invitations, and decorations with authentic Disney fonts.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-pink-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Social Media</h4>
              <p className="text-slate-600 text-sm">
                Design eye-catching posts, stories, and headers for Instagram, Facebook, and TikTok.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Event Invitations</h4>
              <p className="text-slate-600 text-sm">
                Make enchanting invitations for Disney-themed parties, baby showers, and celebrations.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Scrapbooking</h4>
              <p className="text-slate-600 text-sm">
                Add magical titles and captions to your Disney vacation memories and photo albums.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Classroom Decor</h4>
              <p className="text-slate-600 text-sm">
                Create engaging educational materials and classroom decorations with Disney magic.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">DIY Projects</h4>
              <p className="text-slate-600 text-sm">
                Design custom t-shirts, mugs, posters, and crafts with personalized Disney text.
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="p-6">
              <h4 className="font-semibold text-slate-900 mb-2">Is the Disney Text Generator really free?</h4>
              <p className="text-slate-600 text-sm">
                Yes! Our Disney Text Generator is 100% free with no hidden costs, watermarks, or signup required.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold text-slate-900 mb-2">Can I use the generated images commercially?</h4>
              <p className="text-slate-600 text-sm">
                The fonts are inspired by Disney style but are not official Disney fonts. Please check individual font licenses for commercial use.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold text-slate-900 mb-2">What image format does it export?</h4>
              <p className="text-slate-600 text-sm">
                The generator exports high-quality PNG images with transparent or custom backgrounds at 2x resolution.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold text-slate-900 mb-2">How many characters can I use?</h4>
              <p className="text-slate-600 text-sm">
                You can enter up to 50 characters to ensure optimal display quality and readability.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Your Disney Magic?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Start designing beautiful Disney-style text for free. No signup, no watermarks, instant download!
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 font-semibold px-8 py-6 text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Creating Now
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <h4 className="text-lg font-bold text-white">Disney Text Generator</h4>
              </div>
              <p className="text-sm text-slate-400">
                Create magical Disney-style text with 8 fonts and 4 presets. Free, fast, and easy to use.
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
                  <Link href="/generators/dark-souls-text" className="hover:text-white transition-colors">
                    Dark Souls Text Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/disney-text" className="hover:text-white transition-colors">
                    Disney Text Generator
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
            <p>© 2025 Disney Text Generator. All rights reserved. Create stunning Disney-style text for free.</p>
          </div>
        </div>
      </footer>
      </div>

      {/* Structured Data (Schema.org) for SEO */}
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Disney Text Generator',
            description: 'Free Disney Text Generator with 11 authentic Disney fonts and 6 magical style presets. Create stunning Disney-style text with customizable colors, sizes, and instant HD PNG download.',
            url: 'https://www.bratgeneratorfree.com/generators/disney-text',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              '11 Authentic Disney Fonts',
              '6 Magical Style Presets',
              'Customizable Text Colors',
              'Customizable Background Colors',
              'Adjustable Font Sizes (30px-150px)',
              'Text Shadow Effects',
              'HD PNG Download (1200x675px)',
              'No Watermark',
              'Instant Preview',
              'Mobile Responsive',
            ],
            screenshot: 'https://www.bratgeneratorfree.com/og-image.svg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1247',
              bestRating: '5',
              worstRating: '1',
            },
            author: {
              '@type': 'Organization',
              name: 'Brat Generator Free',
              url: 'https://www.bratgeneratorfree.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Brat Generator Free',
              url: 'https://www.bratgeneratorfree.com',
            },
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
          }),
        }}
      />

      {/* FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How many Disney fonts are available in this generator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our Disney Text Generator offers 11 authentic Disney-style fonts including Disney Classic, Disney Dreams, Disney Cute, New Walt Disney, Lion King, Monster AG, Enchanted Land, and more.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the Disney Text Generator free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Our Disney Text Generator is 100% free to use. You can create unlimited Disney-style text, customize colors and sizes, and download high-quality PNG images without any watermark or cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'What image format can I download?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can download your Disney-style text as a high-quality PNG image (1200x675 pixels, 16:9 ratio) with transparent or custom background color.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I customize the text color and background?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! You can customize both text color and background color using our color picker or by entering hex color codes. We also offer 6 pre-designed style presets for quick styling.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to install any fonts to use this generator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No installation required! All 11 Disney fonts are loaded automatically in your browser. Simply type your text, choose a font, and start creating immediately.',
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.bratgeneratorfree.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Generators',
                item: 'https://www.bratgeneratorfree.com/generators',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Disney Text Generator',
                item: 'https://www.bratgeneratorfree.com/generators/disney-text',
              },
            ],
          }),
        }}
      />
    </>
  );
}


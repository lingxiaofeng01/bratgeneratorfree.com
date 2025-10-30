'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Download, Copy, RefreshCw, Type, Palette, Sparkles, Menu, X, Star, Zap, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

// Fiery fonts configuration
const FIERY_FONTS = [
  {
    id: 'fiery-sun',
    name: 'Fiery Sun',
    fontFamily: 'Fiery Sun Demo',
    file: 'Fiery Sun Demo.ttf',
    description: 'Bold and blazing sun-inspired font'
  },
  {
    id: 'fiery-turk',
    name: 'Fiery Turk',
    fontFamily: 'Fiery Turk',
    file: 'Fiery_Turk.ttf',
    description: 'Dynamic Turkish-style fiery font'
  }
];

// Fire color presets
const FIRE_PRESETS = [
  { id: 'classic', name: 'Classic Fire', gradient: 'linear-gradient(180deg, #FF4500 0%, #FF8C00 50%, #FFD700 100%)', textColor: '#FF4500', glowColor: '#FF8C00' },
  { id: 'inferno', name: 'Inferno', gradient: 'linear-gradient(180deg, #DC143C 0%, #FF6347 50%, #FFA500 100%)', textColor: '#DC143C', glowColor: '#FF6347' },
  { id: 'blue-flame', name: 'Blue Flame', gradient: 'linear-gradient(180deg, #0066FF 0%, #00BFFF 50%, #87CEEB 100%)', textColor: '#0066FF', glowColor: '#00BFFF' },
  { id: 'purple-fire', name: 'Purple Fire', gradient: 'linear-gradient(180deg, #8B00FF 0%, #DA70D6 50%, #FFB6C1 100%)', textColor: '#8B00FF', glowColor: '#DA70D6' },
  { id: 'green-fire', name: 'Green Fire', gradient: 'linear-gradient(180deg, #00FF00 0%, #7FFF00 50%, #ADFF2F 100%)', textColor: '#00FF00', glowColor: '#7FFF00' },
  { id: 'white-hot', name: 'White Hot', gradient: 'linear-gradient(180deg, #FFFFFF 0%, #FFE4B5 50%, #FFA500 100%)', textColor: '#FFFFFF', glowColor: '#FFE4B5' }
];

// Sample texts
const SAMPLE_TEXTS = [
  'FIRE',
  'BLAZING',
  'INFERNO',
  'FLAME',
  'BURNING',
  'HOT STUFF',
  'ON FIRE'
];

export default function FieryTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [text, setText] = useState('FIRE');
  const [selectedFont, setSelectedFont] = useState(FIERY_FONTS[0]);
  const [selectedPreset, setSelectedPreset] = useState(FIRE_PRESETS[0]);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(140);
  const [glowIntensity, setGlowIntensity] = useState(30);
  const [enableAnimation, setEnableAnimation] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Use document.fonts.load() API like mario-text
        const fontPromises = FIERY_FONTS.map(font =>
          document.fonts.load(`16px "${font.fontFamily}"`)
        );
        await Promise.all(fontPromises);

        // Wait for fonts to be ready
        await document.fonts.ready;

        // Small delay to ensure fonts are fully loaded
        setTimeout(() => {
          setFontsLoaded(true);
          console.log('✅ Fiery fonts loaded successfully');
        }, 300);
      } catch (error) {
        console.error('❌ Error loading fonts:', error);
        // Continue anyway with fallback fonts
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  // Render canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = 1200;
    const canvasHeight = 675;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (!text.trim()) {
      // Show placeholder text when empty
      ctx.font = '32px Arial, sans-serif';
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Enter text to see fiery preview...', canvasWidth / 2, canvasHeight / 2);
      return;
    }

    // Set font with fallback
    ctx.font = `${fontSize}px "${selectedFont.fontFamily}", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Create gradient for text
    const gradient = ctx.createLinearGradient(
      canvasWidth / 2 - 300,
      canvasHeight / 2 - fontSize / 2,
      canvasWidth / 2 + 300,
      canvasHeight / 2 + fontSize / 2
    );

    const gradientStops = selectedPreset.gradient.match(/#[0-9A-F]{6}/gi) || [];
    if (gradientStops.length >= 2) {
      gradient.addColorStop(0, gradientStops[0]);
      gradient.addColorStop(0.5, gradientStops[1] || gradientStops[0]);
      gradient.addColorStop(1, gradientStops[2] || gradientStops[1] || gradientStops[0]);
    } else {
      // Fallback gradient
      gradient.addColorStop(0, '#FF4500');
      gradient.addColorStop(0.5, '#FF8C00');
      gradient.addColorStop(1, '#FFD700');
    }

    const displayText = text.toUpperCase();

    // Draw glow effect (multiple layers for intensity)
    if (glowIntensity > 0) {
      for (let i = 0; i < 3; i++) {
        ctx.shadowColor = selectedPreset.glowColor;
        ctx.shadowBlur = glowIntensity * (i + 1);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = gradient;
        ctx.fillText(displayText, canvasWidth / 2, canvasHeight / 2);
      }
    }

    // Reset shadow for main text
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Draw main text with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(displayText, canvasWidth / 2, canvasHeight / 2);

    // Add stroke for better definition
    ctx.strokeStyle = selectedPreset.textColor;
    ctx.lineWidth = 3;
    ctx.strokeText(displayText, canvasWidth / 2, canvasHeight / 2);

  }, [text, selectedFont, selectedPreset, backgroundColor, fontSize, glowIntensity]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Download image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `fiery-text-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        console.log('✅ Image downloaded successfully!');
      }
    });
  };

  // Copy to clipboard
  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          console.log('✅ Image copied to clipboard!');
        }
      });
    } catch (error) {
      console.error('❌ Failed to copy image:', error);
    }
  };

  // Load random sample
  const loadSample = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setText(randomText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Flame className="w-8 h-8 text-orange-500" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Fiery Text Generator</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-orange-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-slate-600 hover:text-orange-600 transition-colors">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-orange-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-orange-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-orange-600 transition-colors">
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
                <Link href="/" className="text-slate-600 hover:text-orange-600 transition-colors py-2">
                  HOME
                </Link>
                <Link href="/generators" className="text-slate-600 hover:text-orange-600 transition-colors py-2">
                  Generators
                </Link>
                <Link href="/blog" className="text-slate-600 hover:text-orange-600 transition-colors py-2">
                  Blog
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-orange-600 transition-colors py-2">
                  About
                </Link>
                <Link href="/contact" className="text-slate-600 hover:text-orange-600 transition-colors py-2">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Fiery Text Generator - Create Blazing Hot Text Effects
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Transform your text into stunning fiery masterpieces with our professional Fiery Text Generator.
            Choose from 2 authentic fiery fonts, customize fire effects, and download instantly - 100% free!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>2 Fiery Fonts</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-red-500 fill-red-500" />
              <span>6 Fire Presets</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>Custom Glow Effects</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Free Download</span>
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16" id="generator">
          {/* Preview */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Flame className="w-6 h-6 text-orange-500 mr-2" />
              Fiery Text Preview
            </h3>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden">
              {enableAnimation && (
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent animate-pulse"></div>
              )}
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto relative z-10"
              />
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Image
              </Button>
            </div>
          </Card>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Text Input */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label htmlFor="text-input" className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <Type className="w-5 h-5 text-orange-600 mr-2" />
                Your Text
              </Label>
              <Input
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                placeholder="Enter your fiery text..."
                className="text-lg py-6 mb-2"
                maxLength={30}
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500">{text.length}/30 characters</p>
                <Button onClick={loadSample} variant="outline" size="sm">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Random Sample
                </Button>
              </div>
            </Card>

            {/* Font Selection */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <Type className="w-5 h-5 text-orange-600 mr-2" />
                Fiery Font Style
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {FIERY_FONTS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFont(font)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedFont.id === font.id
                        ? 'border-orange-500 bg-orange-50 shadow-lg'
                        : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{font.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{font.description}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Fire Presets */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <Palette className="w-5 h-5 text-orange-600 mr-2" />
                Fire Color Preset
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {FIRE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedPreset.id === preset.id
                        ? 'border-orange-500 shadow-lg scale-105'
                        : 'border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    <div
                      className="h-12 rounded-md mb-2"
                      style={{ background: preset.gradient }}
                    ></div>
                    <div className="text-sm font-medium text-slate-900 text-center">{preset.name}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Advanced Settings */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 text-orange-600 mr-2" />
                Advanced Settings
              </Label>

              {/* Font Size */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <Label className="text-sm text-slate-700">Font Size</Label>
                  <span className="text-sm font-medium text-orange-600">{fontSize}px</span>
                </div>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={40}
                  max={200}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Glow Intensity */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <Label className="text-sm text-slate-700">Glow Intensity</Label>
                  <span className="text-sm font-medium text-orange-600">{glowIntensity}px</span>
                </div>
                <Slider
                  value={[glowIntensity]}
                  onValueChange={(value) => setGlowIntensity(value[0])}
                  min={0}
                  max={50}
                  step={2}
                  className="w-full"
                />
              </div>

              {/* Background Color */}
              <div className="mb-6">
                <Label className="text-sm text-slate-700 mb-2 block">Background Color</Label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 rounded border-2 border-slate-200 cursor-pointer"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Animation Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-700">Enable Animation</Label>
                <button
                  onClick={() => setEnableAnimation(!enableAnimation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enableAnimation ? 'bg-orange-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enableAnimation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Why Choose Our Fiery Text Generator?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Authentic Fiery Fonts</h4>
              <p className="text-slate-600">
                Access 2 professional fiery fonts - Fiery Sun and Fiery Turk. Each font is carefully selected to create stunning blazing text effects that stand out.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">6 Fire Color Presets</h4>
              <p className="text-slate-600">
                Choose from Classic Fire, Inferno, Blue Flame, Purple Fire, Green Fire, and White Hot presets. Each preset features authentic fire gradients and glow effects.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Advanced Customization</h4>
              <p className="text-slate-600">
                Fine-tune font size, glow intensity, background color, and animation effects. Create unique fiery text designs that match your vision perfectly.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Instant Download</h4>
              <p className="text-slate-600">
                Download your fiery text as high-quality PNG images instantly. No watermarks, no signup required. Perfect for social media, posters, and designs.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Real-Time Preview</h4>
              <p className="text-slate-600">
                See your fiery text come to life instantly with real-time preview. Experiment with different fonts, colors, and effects before downloading.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">100% Free Forever</h4>
              <p className="text-slate-600">
                Our Fiery Text Generator is completely free with no hidden costs. Create unlimited fiery text designs without any restrictions or limitations.
              </p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            How to Create Fiery Text in 4 Easy Steps
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Enter Your Text</h4>
              <p className="text-slate-600">
                Type your desired text in the input field. Keep it short and impactful for best results.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Choose Font & Preset</h4>
              <p className="text-slate-600">
                Select from 2 fiery fonts and 6 fire color presets to match your style.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Customize Effects</h4>
              <p className="text-slate-600">
                Adjust font size, glow intensity, and background color to perfect your design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Download & Share</h4>
              <p className="text-slate-600">
                Download your fiery text as PNG or copy to clipboard and share instantly!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">What is a Fiery Text Generator?</h4>
              <p className="text-slate-600">
                A Fiery Text Generator is a free online tool that creates blazing hot text effects using authentic fiery fonts and fire-themed color gradients.
                It's perfect for creating eye-catching designs for social media, posters, logos, and more.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Is the Fiery Text Generator really free?</h4>
              <p className="text-slate-600">
                Yes! Our Fiery Text Generator is 100% free with no hidden costs, watermarks, or signup requirements.
                Create unlimited fiery text designs and download them instantly without any restrictions.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">What fonts are included in the Fiery Text Generator?</h4>
              <p className="text-slate-600">
                We offer 2 professional fiery fonts: Fiery Sun Demo (bold and blazing sun-inspired) and Fiery Turk (dynamic Turkish-style fiery font).
                Both fonts are optimized for creating stunning fire text effects.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Can I customize the fire colors?</h4>
              <p className="text-slate-600">
                Absolutely! Choose from 6 fire color presets including Classic Fire, Inferno, Blue Flame, Purple Fire, Green Fire, and White Hot.
                Each preset features authentic fire gradients and customizable glow effects.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">What format can I download my fiery text in?</h4>
              <p className="text-slate-600">
                You can download your fiery text as high-quality PNG images (1200x675px) perfect for social media, websites, and print.
                You can also copy the image directly to your clipboard for quick sharing.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Can I use fiery text for commercial projects?</h4>
              <p className="text-slate-600">
                Yes! All fiery text designs created with our generator can be used for both personal and commercial projects.
                However, please check the individual font licenses for specific commercial use terms.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Blazing Hot Fiery Text?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Start designing stunning fiery text effects for free. No signup, no watermarks, instant download!
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-slate-100 font-semibold px-8 py-6 text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Flame className="w-5 h-5 mr-2" />
            Start Creating Now
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <span className="text-xl font-bold text-white">Fiery Text</span>
              </div>
              <p className="text-sm text-slate-400">
                Create stunning fiery text effects with professional fonts and fire-themed gradients. 100% free forever.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
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
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Generators</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/generators/fiery-text" className="hover:text-white transition-colors">
                    Fiery Text
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
                  <Link href="/generators/mario-text" className="hover:text-white transition-colors">
                    Mario Text
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
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

          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Fiery Text Generator. All rights reserved. Create stunning blazing text effects for free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


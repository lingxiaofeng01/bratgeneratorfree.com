'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Download, Type, Palette, Sparkles, Menu, X, Star, ImageIcon, Gamepad2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

// Mario font configurations
const MARIO_FONTS = [
  {
    id: 'super-mario-bros',
    name: 'Super Mario Bros',
    fontFamily: 'Super Mario Bros',
    gradient: 'from-red-500 to-red-600',
    preview: 'MARIO'
  },
  {
    id: 'super-mario-64',
    name: 'Super Mario 64 DS',
    fontFamily: 'Super Mario 64 DS',
    gradient: 'from-blue-500 to-blue-600',
    preview: 'MARIO'
  },
  {
    id: 'super-mario-256',
    name: 'Super Mario 256',
    fontFamily: 'Super Mario 256',
    gradient: 'from-yellow-500 to-yellow-600',
    preview: 'MARIO'
  },
  {
    id: 'smb-font',
    name: 'SMB Font',
    fontFamily: 'SMB Font',
    gradient: 'from-green-500 to-green-600',
    preview: 'MARIO'
  },
  {
    id: 'super-mario-world',
    name: 'Super Mario World',
    fontFamily: 'Super Mario World',
    gradient: 'from-purple-500 to-purple-600',
    preview: 'MARIO'
  }
];

// Color presets inspired by Mario games
const COLOR_PRESETS = [
  { name: 'Classic Mario', text: '#E60012', bg: '#0066CC' },
  { name: 'Luigi Green', text: '#00A651', bg: '#FFFFFF' },
  { name: 'Fire Flower', text: '#FF6B00', bg: '#FFD700' },
  { name: 'Star Power', text: '#FFD700', bg: '#000000' },
  { name: 'Mushroom Kingdom', text: '#FF0000', bg: '#8BC34A' },
  { name: 'Bowser Castle', text: '#FF4500', bg: '#2C2C2C' }
];

const SAMPLE_TEXTS = [
  "LET'S-A GO!",
  "IT'S ME, MARIO!",
  "SUPER MARIO",
  "GAME OVER",
  "LEVEL UP!",
  "POWER UP!"
];

export default function MarioTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [text, setText] = useState("SUPER MARIO");
  const [selectedFont, setSelectedFont] = useState(MARIO_FONTS[0]);
  const [fontSize, setFontSize] = useState(80);
  const [textColor, setTextColor] = useState('#E60012');
  const [backgroundColor, setBackgroundColor] = useState('#0066CC');
  const [enableOutline, setEnableOutline] = useState(true);
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [outlineWidth, setOutlineWidth] = useState(4);
  const [enableShadow, setEnableShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(10);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontPromises = MARIO_FONTS.map(font =>
          document.fonts.load(`16px "${font.fontFamily}"`)
        );
        await Promise.all(fontPromises);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true);
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

    const canvasWidth = 1200;
    const canvasHeight = 675;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (!text.trim()) return;

    // Set font
    ctx.font = `${fontSize}px "${selectedFont.fontFamily}", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

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
      const x = canvasWidth / 2;

      // Draw outline
      if (enableOutline) {
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = outlineWidth;
        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        ctx.strokeText(line, x, y);
      }

      // Draw shadow
      if (enableShadow) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
      } else {
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Draw text
      ctx.fillStyle = textColor;
      ctx.fillText(line, x, y);
    });
  }, [text, selectedFont, fontSize, textColor, backgroundColor, enableOutline, outlineColor, outlineWidth, enableShadow, shadowColor, shadowBlur, fontsLoaded]);

  // Re-render canvas when dependencies change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Apply color preset
  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setTextColor(preset.text);
    setBackgroundColor(preset.bg);
  };

  // Download image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `mario-text-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Load random sample
  const loadSample = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setText(randomText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-red-500" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Mario Text Generator</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-red-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-slate-900 font-medium hover:text-red-600 transition-colors">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-red-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-red-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-red-600 transition-colors">
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
                <Link href="/" className="text-slate-600 hover:text-red-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  HOME
                </Link>
                <Link href="/generators" className="text-slate-900 font-medium hover:text-red-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Generators
                </Link>
                <Link href="/blog" className="text-slate-600 hover:text-red-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Blog
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-red-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-slate-600 hover:text-red-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
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
            Super Mario Text Generator
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Create authentic Super Mario-style text with 5 iconic fonts from the Mushroom Kingdom.
            Customize colors, add effects, and download instantly - 100% free!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-red-500 fill-red-500" />
              <span>5 Mario Fonts</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-500" />
              <span>6 Color Presets</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Custom Effects</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-green-500" />
              <span>Instant Download</span>
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Preview Panel */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <ImageIcon className="w-6 h-6 text-red-600 mr-2" />
              Preview
            </h3>
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
              {!fontsLoaded ? (
                <div className="text-slate-500 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p>Loading Mario fonts...</p>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={handleDownload} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
            </div>
          </Card>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Text Input */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label htmlFor="text-input" className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <Type className="w-5 h-5 text-red-600 mr-2" />
                Your Text
              </Label>
              <Input
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                placeholder="Enter your text..."
                className="text-lg py-6 mb-2"
                maxLength={50}
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500">{text.length}/50 characters</p>
                <Button onClick={loadSample} variant="outline" size="sm">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Random Sample
                </Button>
              </div>
            </Card>

            {/* Font Size */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-base font-semibold text-slate-900 mb-3 block">
                Font Size: {fontSize}px
              </Label>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={40}
                max={150}
                step={5}
                className="mb-2"
              />
            </Card>

            {/* Color Presets */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-base font-semibold text-slate-900 mb-3 block">
                Color Presets
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COLOR_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="px-3 py-2 rounded-lg border-2 border-slate-200 hover:border-red-500 transition-all text-sm font-medium"
                    style={{
                      background: `linear-gradient(135deg, ${preset.text} 0%, ${preset.bg} 100%)`
                    }}
                  >
                    <span className="text-white drop-shadow-lg">{preset.name}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Custom Colors */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-base font-semibold text-slate-900 mb-3 block">
                Custom Colors
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="text-color" className="text-sm text-slate-600 mb-2 block">
                    Text Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="text-color"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bg-color" className="text-sm text-slate-600 mb-2 block">
                    Background Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Text Effects */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <Label className="text-base font-semibold text-slate-900 mb-4 block">
                Text Effects
              </Label>

              {/* Outline */}
              <div className="mb-4 pb-4 border-b border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="outline-toggle" className="text-sm font-medium">
                    Outline
                  </Label>
                  <Switch
                    id="outline-toggle"
                    checked={enableOutline}
                    onCheckedChange={setEnableOutline}
                  />
                </div>
                {enableOutline && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-slate-600 mb-2 block">
                        Outline Width: {outlineWidth}px
                      </Label>
                      <Slider
                        value={[outlineWidth]}
                        onValueChange={(value) => setOutlineWidth(value[0])}
                        min={1}
                        max={10}
                        step={1}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-600 mb-2 block">
                        Outline Color
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={outlineColor}
                          onChange={(e) => setOutlineColor(e.target.value)}
                          className="w-16 h-8 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={outlineColor}
                          onChange={(e) => setOutlineColor(e.target.value)}
                          className="flex-1 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shadow */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="shadow-toggle" className="text-sm font-medium">
                    Drop Shadow
                  </Label>
                  <Switch
                    id="shadow-toggle"
                    checked={enableShadow}
                    onCheckedChange={setEnableShadow}
                  />
                </div>
                {enableShadow && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-slate-600 mb-2 block">
                        Shadow Blur: {shadowBlur}px
                      </Label>
                      <Slider
                        value={[shadowBlur]}
                        onValueChange={(value) => setShadowBlur(value[0])}
                        min={0}
                        max={30}
                        step={1}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-600 mb-2 block">
                        Shadow Color
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={shadowColor}
                          onChange={(e) => setShadowColor(e.target.value)}
                          className="w-16 h-8 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={shadowColor}
                          onChange={(e) => setShadowColor(e.target.value)}
                          className="flex-1 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Font Selection */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">
              Choose Your Mario Font
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select from 5 authentic Super Mario fonts, each capturing the iconic style of different Mario games.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {MARIO_FONTS.map((font) => (
              <Card
                key={font.id}
                onClick={() => setSelectedFont(font)}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedFont.id === font.id
                    ? 'ring-4 ring-red-500 shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${font.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-900 text-sm">{font.name}</h4>
                    {selectedFont.id === font.id && (
                      <div className="bg-red-500 text-white p-1 rounded-full">
                        <Star className="w-3 h-3 fill-white" />
                      </div>
                    )}
                  </div>
                  <div
                    className="text-center py-6 bg-white rounded-lg border-2 border-slate-200 group-hover:border-red-300 transition-colors"
                    style={{
                      fontFamily: `"${font.fontFamily}", sans-serif`,
                      fontSize: '32px',
                      lineHeight: '1'
                    }}
                  >
                    {font.preview}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-16">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-red-50 to-yellow-50">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              How to Create Mario Text
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Enter Your Text</h4>
                <p className="text-sm text-slate-600">
                  Type your message in the text input field
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Choose Font & Colors</h4>
                <p className="text-sm text-slate-600">
                  Select your favorite Mario font and customize colors
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Add Effects</h4>
                <p className="text-sm text-slate-600">
                  Apply outlines and shadows for extra impact
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Download</h4>
                <p className="text-sm text-slate-600">
                  Click download to save your Mario text as PNG
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Why Use Our Mario Text Generator?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Gamepad2 className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Authentic Mario Fonts</h4>
              <p className="text-slate-600">
                5 genuine Super Mario fonts from classic games including Super Mario Bros, Mario 64, and Mario World.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Full Customization</h4>
              <p className="text-slate-600">
                Choose from 6 color presets or create custom combinations. Add outlines and shadows for perfect results.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Instant Download</h4>
              <p className="text-slate-600">
                Download high-quality PNG images instantly. No signup, no watermarks, completely free forever.
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Is this Mario Text Generator free to use?
                </h4>
                <p className="text-slate-600">
                  Yes! Our Mario Text Generator is 100% free with no hidden costs, no signup required, and no watermarks on your downloads.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Can I use these Mario fonts for commercial projects?
                </h4>
                <p className="text-slate-600">
                  The fonts are fan-made recreations. For personal projects, they're perfect. For commercial use, please verify licensing requirements.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  What image format does the generator create?
                </h4>
                <p className="text-slate-600">
                  The generator creates high-quality PNG images with transparent or custom backgrounds, perfect for any project.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  How many Mario fonts are available?
                </h4>
                <p className="text-slate-600">
                  We offer 5 authentic Super Mario fonts including Super Mario Bros, Super Mario 64 DS, Super Mario 256, SMB Font, and Super Mario World.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Can I customize the colors?
                </h4>
                <p className="text-slate-600">
                  Absolutely! Choose from 6 Mario-themed color presets or create your own custom color combinations for text and background.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Your Mario Masterpiece?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Start designing Super Mario-style text for free. No signup, no watermarks, instant download!
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-slate-100 font-semibold px-8 py-6 text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Let's-a Go! Start Creating
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Gamepad2 className="w-8 h-8 text-red-500" />
                <span className="text-xl font-bold">Mario Text Generator</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                The ultimate free tool for creating Super Mario-style text with authentic fonts.
                Perfect for gaming content, party invitations, and creative projects.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-slate-400">
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
            <p>&copy; 2025 Brat Generator. All rights reserved. Mario™ and related characters are trademarks of Nintendo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


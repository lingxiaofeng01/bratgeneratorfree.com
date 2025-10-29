'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Download, RefreshCw, Rainbow, Palette, Type, AlignCenter, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import html2canvas from 'html2canvas';

// Rainbow font list - Using web-safe and Google Fonts for better compatibility
const rainbowFonts = [
  { name: 'Bold Impact', family: 'Impact, "Arial Black", sans-serif' },
  { name: 'Comic Sans', family: '"Comic Sans MS", "Comic Sans", cursive' },
  { name: 'Brush Script', family: '"Brush Script MT", cursive' },
  { name: 'Courier Bold', family: '"Courier New", Courier, monospace' },
  { name: 'Georgia Bold', family: 'Georgia, serif' },
  { name: 'Arial Black', family: '"Arial Black", Gadget, sans-serif' },
];

// Rainbow gradient presets
const gradientPresets = [
  { 
    name: 'Classic Rainbow', 
    gradient: 'linear-gradient(90deg, #ff0000 0%, #ff7f00 16.67%, #ffff00 33.33%, #00ff00 50%, #0000ff 66.67%, #8b00ff 83.33%, #ff0000 100%)',
    colors: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff']
  },
  { 
    name: 'Pastel Rainbow', 
    gradient: 'linear-gradient(90deg, #ffb3ba 0%, #ffdfba 20%, #ffffba 40%, #baffc9 60%, #bae1ff 80%, #e0bbff 100%)',
    colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e0bbff']
  },
  { 
    name: 'Neon Rainbow', 
    gradient: 'linear-gradient(90deg, #ff006e 0%, #ff4d00 20%, #ffea00 40%, #00ff41 60%, #00b8ff 80%, #d600ff 100%)',
    colors: ['#ff006e', '#ff4d00', '#ffea00', '#00ff41', '#00b8ff', '#d600ff']
  },
  { 
    name: 'Sunset Rainbow', 
    gradient: 'linear-gradient(90deg, #ff0844 0%, #ff6b35 25%, #f7931e 50%, #fdc830 75%, #f37335 100%)',
    colors: ['#ff0844', '#ff6b35', '#f7931e', '#fdc830', '#f37335']
  },
  { 
    name: 'Ocean Rainbow', 
    gradient: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
    colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe']
  },
  { 
    name: 'Fire Rainbow', 
    gradient: 'linear-gradient(90deg, #ff0000 0%, #ff4500 25%, #ff8c00 50%, #ffd700 75%, #ffff00 100%)',
    colors: ['#ff0000', '#ff4500', '#ff8c00', '#ffd700', '#ffff00']
  },
];

// Text alignment options
const alignmentOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

interface RainbowConfig {
  text: string;
  font: string;
  fontSize: number;
  gradient: string;
  backgroundColor: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  rotation: number;
  skew: number;
  bold: boolean;
  italic: boolean;
  uppercase: boolean;
  hasShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  shadowDistance: number;
  hasOutline: boolean;
  outlineColor: string;
  outlineWidth: number;
  backgroundImage: string | null;
}

export default function RainbowTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [config, setConfig] = useState<RainbowConfig>({
    text: 'RAINBOW',
    font: rainbowFonts[0].family,
    fontSize: 72,
    gradient: gradientPresets[0].gradient,
    backgroundColor: '#1e293b', // Dark slate background for better rainbow visibility
    textAlign: 'center',
    lineHeight: 1.2,
    letterSpacing: 2,
    rotation: 0,
    skew: 0,
    bold: true, // Default to bold for better visibility
    italic: false,
    uppercase: true,
    hasShadow: false,
    shadowColor: '#000000',
    shadowBlur: 4,
    shadowDistance: 2,
    hasOutline: false,
    outlineColor: '#ffffff',
    outlineWidth: 2,
    backgroundImage: null,
  });

  // Update page title
  useEffect(() => {
    document.title = 'Rainbow Text Generator - Free Rainbow Font Generator with 6+ Fonts';
  }, []);

  // Handle background image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig(prev => ({ ...prev, backgroundImage: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove background image
  const removeBackgroundImage = () => {
    setConfig(prev => ({ ...prev, backgroundImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Reset to defaults
  const handleReset = () => {
    setConfig({
      text: 'RAINBOW',
      font: 'Rainbow-Classic',
      fontSize: 72,
      gradient: gradientPresets[0].gradient,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 2,
      rotation: 0,
      skew: 0,
      bold: false,
      italic: false,
      uppercase: true,
      hasShadow: false,
      shadowColor: '#000000',
      shadowBlur: 4,
      shadowDistance: 2,
      hasOutline: false,
      outlineColor: '#000000',
      outlineWidth: 2,
      backgroundImage: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Download as PNG
  const handleDownload = async () => {
    if (!previewRef.current || !config.text.trim()) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2 as any,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      } as any);

      const link = document.createElement('a');
      link.download = `rainbow-text-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Generate text style
  const getTextStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      fontFamily: config.font,
      fontSize: `${config.fontSize}px`,
      backgroundImage: config.gradient, // Use backgroundImage instead of background to avoid conflict with backgroundClip
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textAlign: config.textAlign,
      lineHeight: config.lineHeight,
      letterSpacing: `${config.letterSpacing}px`,
      fontWeight: config.bold ? '900' : '700', // Use heavier weights for better visibility
      fontStyle: config.italic ? 'italic' : 'normal',
      textTransform: config.uppercase ? 'uppercase' : 'none',
      transform: `rotate(${config.rotation}deg) skewY(${config.skew}deg)`,
      transition: 'all 0.3s ease',
      display: 'inline-block',
    };

    if (config.hasShadow) {
      style.filter = `drop-shadow(${config.shadowDistance}px ${config.shadowDistance}px ${config.shadowBlur}px ${config.shadowColor})`;
    }

    if (config.hasOutline) {
      style.WebkitTextStroke = `${config.outlineWidth}px ${config.outlineColor}`;
    }

    return style;
  };

  // Generate preview container style
  const getPreviewStyle = (): React.CSSProperties => {
    return {
      backgroundColor: config.backgroundImage ? 'transparent' : config.backgroundColor,
      backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  };

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-lime-500" />
                <span className="text-xl sm:text-2xl font-bold text-slate-900">Brat Generator</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-slate-600 hover:text-lime-600 transition-colors">
                  HOME
                </Link>
                <Link
                  href="/generators"
                  className="text-slate-900 font-medium hover:text-lime-600 transition-colors"
                >
                  Generators
                </Link>
                <Link
                  href="/blog"
                  className="text-slate-600 hover:text-lime-600 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-lime-600 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-lime-600 transition-colors text-sm"
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
                    className="text-slate-600 hover:text-lime-600 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    HOME
                  </Link>
                  <Link
                    href="/generators"
                    className="text-slate-900 font-medium hover:text-lime-600 transition-colors py-2"
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
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-red-100 via-yellow-100 via-green-100 via-blue-100 to-purple-100">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <Rainbow className="w-12 h-12 text-purple-600 mr-3" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Rainbow Text Generator
              </h1>
            </div>
            <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6">
              Create stunning rainbow text with our free rainbow text generator. Choose from 6+ unique fonts, customize gradients, add effects, and download instantly - completely free!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-purple-500" />
                <span>6+ Rainbow Fonts</span>
              </div>
              <div className="flex items-center">
                <Palette className="w-4 h-4 mr-1 text-blue-500" />
                <span>6 Gradient Presets</span>
              </div>
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1 text-green-500" />
                <span>Instant Download</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Generator Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Control Panel */}
              <div className="space-y-6">
                {/* Text Input */}
                <Card className="p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <Type className="w-5 h-5 mr-2 text-purple-600" />
                    <h2 className="text-xl font-semibold">Text Input</h2>
                  </div>
                  <Textarea
                    value={config.text}
                    onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter your text here..."
                    className="min-h-[100px] text-lg"
                  />
                </Card>

                {/* Font Selection */}
                <Card className="p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    <h2 className="text-xl font-semibold">Rainbow Font</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {rainbowFonts.map((font) => (
                      <button
                        key={font.family}
                        onClick={() => setConfig(prev => ({ ...prev, font: font.family }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          config.font === font.family
                            ? 'border-purple-500 bg-purple-50 shadow-md'
                            : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                        }`}
                        style={{ fontFamily: font.family }}
                      >
                        <div className="text-2xl bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
                          Aa
                        </div>
                        <div className="text-xs text-slate-600 mt-1">{font.name}</div>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Rainbow Gradient Presets */}
                <Card className="p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <Palette className="w-5 h-5 mr-2 text-purple-600" />
                    <h2 className="text-xl font-semibold">Rainbow Gradient</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {gradientPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setConfig(prev => ({ ...prev, gradient: preset.gradient }))}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          config.gradient === preset.gradient
                            ? 'border-purple-500 shadow-md'
                            : 'border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <div
                          className="h-8 rounded mb-2"
                          style={{ background: preset.gradient }}
                        />
                        <div className="text-xs text-slate-700 font-medium">{preset.name}</div>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Text Style Controls */}
                <Card className="p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Text Style</h2>
                  <div className="space-y-4">
                    {/* Font Size */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Font Size: {config.fontSize}px
                      </Label>
                      <Slider
                        value={[config.fontSize]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, fontSize: value }))}
                        min={12}
                        max={200}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Line Height */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Line Height: {config.lineHeight.toFixed(1)}
                      </Label>
                      <Slider
                        value={[config.lineHeight]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, lineHeight: value }))}
                        min={0.8}
                        max={3}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    {/* Letter Spacing */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Letter Spacing: {config.letterSpacing}px
                      </Label>
                      <Slider
                        value={[config.letterSpacing]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, letterSpacing: value }))}
                        min={-10}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Text Format Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant={config.bold ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, bold: !prev.bold }))}
                        className="flex-1"
                      >
                        <span className="font-bold">B</span>
                      </Button>
                      <Button
                        variant={config.italic ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, italic: !prev.italic }))}
                        className="flex-1"
                      >
                        <span className="italic">I</span>
                      </Button>
                      <Button
                        variant={config.uppercase ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, uppercase: !prev.uppercase }))}
                        className="flex-1"
                      >
                        <span className="text-xs">AA</span>
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Transform Controls */}
                <Card className="p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Transform</h2>
                  <div className="space-y-4">
                    {/* Rotation */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Rotation: {config.rotation}°
                      </Label>
                      <Slider
                        value={[config.rotation]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, rotation: value }))}
                        min={-180}
                        max={180}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Skew */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Skew: {config.skew}°
                      </Label>
                      <Slider
                        value={[config.skew]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, skew: value }))}
                        min={-45}
                        max={45}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </Card>

                {/* Effects */}
                <Card className="p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Effects</h2>
                  <div className="space-y-4">
                    {/* Shadow */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="shadow"
                          checked={config.hasShadow}
                          onCheckedChange={(checked) =>
                            setConfig(prev => ({ ...prev, hasShadow: checked as boolean }))
                          }
                        />
                        <Label htmlFor="shadow" className="font-medium cursor-pointer">
                          Text Shadow
                        </Label>
                      </div>
                      {config.hasShadow && (
                        <div className="pl-6 space-y-3">
                          <div>
                            <Label className="text-sm mb-2 block">Shadow Color</Label>
                            <Input
                              type="color"
                              value={config.shadowColor}
                              onChange={(e) => setConfig(prev => ({ ...prev, shadowColor: e.target.value }))}
                              className="h-10 w-full"
                            />
                          </div>
                          <div>
                            <Label className="text-sm mb-2 block">
                              Distance: {config.shadowDistance}px
                            </Label>
                            <Slider
                              value={[config.shadowDistance]}
                              onValueChange={([value]) => setConfig(prev => ({ ...prev, shadowDistance: value }))}
                              min={0}
                              max={20}
                              step={1}
                            />
                          </div>
                          <div>
                            <Label className="text-sm mb-2 block">
                              Blur: {config.shadowBlur}px
                            </Label>
                            <Slider
                              value={[config.shadowBlur]}
                              onValueChange={([value]) => setConfig(prev => ({ ...prev, shadowBlur: value }))}
                              min={0}
                              max={30}
                              step={1}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Outline */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="outline"
                          checked={config.hasOutline}
                          onCheckedChange={(checked) =>
                            setConfig(prev => ({ ...prev, hasOutline: checked as boolean }))
                          }
                        />
                        <Label htmlFor="outline" className="font-medium cursor-pointer">
                          Text Outline
                        </Label>
                      </div>
                      {config.hasOutline && (
                        <div className="pl-6 space-y-3">
                          <div>
                            <Label className="text-sm mb-2 block">Outline Color</Label>
                            <Input
                              type="color"
                              value={config.outlineColor}
                              onChange={(e) => setConfig(prev => ({ ...prev, outlineColor: e.target.value }))}
                              className="h-10 w-full"
                            />
                          </div>
                          <div>
                            <Label className="text-sm mb-2 block">
                              Width: {config.outlineWidth}px
                            </Label>
                            <Slider
                              value={[config.outlineWidth]}
                              onValueChange={([value]) => setConfig(prev => ({ ...prev, outlineWidth: value }))}
                              min={1}
                              max={10}
                              step={1}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Background */}
                <Card className="p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
                    <h2 className="text-xl font-semibold">Background</h2>
                  </div>
                  <div className="space-y-4">
                    {/* Background Color */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Background Color</Label>
                      <Input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="h-12 w-full"
                      />
                    </div>

                    {/* Background Image */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Background Image</Label>
                      {config.backgroundImage ? (
                        <div className="relative">
                          <img
                            src={config.backgroundImage}
                            alt="Background"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={removeBackgroundImage}
                            className="absolute top-2 right-2"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="bg-image-upload"
                          />
                          <Label
                            htmlFor="bg-image-upload"
                            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors"
                          >
                            <div className="text-center">
                              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                              <span className="text-sm text-slate-600">Click to upload image</span>
                            </div>
                          </Label>
                        </div>
                      )}
                    </div>

                    {/* Text Alignment */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Text Alignment</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {alignmentOptions.map((option) => (
                          <Button
                            key={option.value}
                            variant={config.textAlign === option.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setConfig(prev => ({ ...prev, textAlign: option.value as any }))}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Preview Area */}
              <div className="lg:sticky lg:top-24 h-fit">
                <Card className="p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Live Preview</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                      </Button>
                      <Button
                        onClick={handleDownload}
                        disabled={!config.text.trim() || isDownloading}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Download className="w-4 h-4" />
                        {isDownloading ? 'Downloading...' : 'Download'}
                      </Button>
                    </div>
                  </div>

                  {/* Preview Canvas */}
                  <div
                    ref={previewRef}
                    className="w-full min-h-[400px] rounded-lg flex items-center justify-center p-8 overflow-hidden"
                    style={getPreviewStyle()}
                  >
                    {config.text.trim() ? (
                      <div
                        className="break-words max-w-full"
                        style={getTextStyle()}
                      >
                        {config.text}
                      </div>
                    ) : (
                      <div className="text-slate-400 text-center">
                        <Type className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Enter text to see preview</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
                Why Choose Our Rainbow Text Generator?
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our rainbow text generator offers professional quality, instant results, and unlimited creativity. Create stunning rainbow text with our free online tool - all at your fingertips.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">6+ Unique Rainbow Fonts</h3>
                <p className="text-slate-600">
                  Our rainbow text generator offers 6 professionally curated web-safe fonts including Impact, Comic Sans, Brush Script, and more. Each font is optimized for perfect rainbow gradient display.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">6 Gradient Presets</h3>
                <p className="text-slate-600">
                  Select from beautiful pre-made rainbow gradients: Classic Rainbow, Pastel Rainbow, Neon Rainbow, Sunset, Ocean, and Fire. Each preset is carefully designed for maximum visual impact.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Type className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Customization</h3>
                <p className="text-slate-600">
                  Control every aspect: font size (12-200px), line height, letter spacing, rotation, skew, bold, italic, uppercase, shadows, and outlines.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Rainbow Text Download</h3>
                <p className="text-slate-600">
                  Download your rainbow text as high-quality PNG images (2x resolution) with transparent backgrounds. Our rainbow text generator creates perfect images for social media, websites, and print.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Background Options</h3>
                <p className="text-slate-600">
                  Add solid colors or upload custom background images to make your text stand out. Perfect for creating complete designs ready to share.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Free Rainbow Text Generator</h3>
                <p className="text-slate-600">
                  No signup, no watermarks, no hidden fees. Use our rainbow text generator to create unlimited rainbow text completely free. No credit card required, ever.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How to Create Rainbow Text
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Enter Your Text</h3>
                    <p className="text-slate-600">
                      Type or paste your text into the text input area. You can use multiple lines for longer messages.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Choose Your Style</h3>
                    <p className="text-slate-600">
                      Select a rainbow font and gradient preset. Customize the size, spacing, and text formatting to your liking.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Add Effects</h3>
                    <p className="text-slate-600">
                      Apply shadows, outlines, rotation, or skew effects. Upload a background image or choose a background color.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Download & Share</h3>
                    <p className="text-slate-600">
                      Click the Download button to save your rainbow text as a high-quality PNG image. Share it anywhere!
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Perfect for Every Creative Project
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Rainbow text adds vibrant, eye-catching appeal to any design. Here are some popular ways to use our rainbow text generator for your creative projects.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-lg font-semibold mb-2">Social Media Posts</h3>
                <p className="text-slate-600 text-sm">
                  Use our rainbow text generator to create attention-grabbing Instagram stories, Facebook posts, and Twitter headers with colorful rainbow text.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🎂</div>
                <h3 className="text-lg font-semibold mb-2">Birthday & Events</h3>
                <p className="text-slate-600 text-sm">
                  Design vibrant birthday banners, party invitations, and celebration announcements with rainbow effects.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🏳️‍🌈</div>
                <h3 className="text-lg font-semibold mb-2">Pride & LGBTQ+</h3>
                <p className="text-slate-600 text-sm">
                  Show your support with rainbow pride text for Pride Month, events, and inclusive messaging.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-lg font-semibold mb-2">Logos & Branding</h3>
                <p className="text-slate-600 text-sm">
                  Create colorful logos, brand names, and business graphics with professional rainbow gradients.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="text-lg font-semibold mb-2">YouTube Thumbnails</h3>
                <p className="text-slate-600 text-sm">
                  Make your video thumbnails pop with our rainbow text generator. Create vibrant rainbow text that attracts clicks and views.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-lg font-semibold mb-2">Educational Content</h3>
                <p className="text-slate-600 text-sm">
                  Create engaging classroom materials, presentations, and learning resources with colorful text.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">💌</div>
                <h3 className="text-lg font-semibold mb-2">Greeting Cards</h3>
                <p className="text-slate-600 text-sm">
                  Design personalized greeting cards, thank you notes, and special occasion messages.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🌐</div>
                <h3 className="text-lg font-semibold mb-2">Website Headers</h3>
                <p className="text-slate-600 text-sm">
                  Add eye-catching rainbow text to website banners, hero sections, and promotional areas.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Rainbow Text Generator FAQ
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Common questions about our rainbow text generator and creating rainbow text
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">What is a rainbow text generator?</h3>
                <p className="text-slate-600">
                  A rainbow text generator is a free online tool that applies colorful gradient effects to text, creating a rainbow-like appearance. Our rainbow text generator uses CSS gradient technology to create smooth, vibrant color transitions across your text, making it perfect for social media, designs, and creative projects. This rainbow text generator is the easiest way to create professional rainbow text online.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">How do I download my rainbow text?</h3>
                <p className="text-slate-600">
                  Simply click the "Download" button after customizing your text. Our rainbow text generator will export your rainbow text as a high-quality PNG image with a transparent background (or your chosen background). The image is rendered at 2x resolution for crisp, professional results.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Can I use rainbow text for commercial projects?</h3>
                <p className="text-slate-600">
                  Yes! All rainbow text created with our rainbow text generator is 100% free to use for both personal and commercial projects. There are no attribution requirements, watermarks, or licensing fees. Use our rainbow text generator to create as many designs as you need.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">What's the difference between the gradient presets?</h3>
                <p className="text-slate-600">
                  We offer 6 unique gradient presets: <strong>Classic Rainbow</strong> (traditional ROYGBIV colors), <strong>Pastel Rainbow</strong> (soft, gentle tones), <strong>Neon Rainbow</strong> (bright, vibrant colors), <strong>Sunset Rainbow</strong> (warm orange-pink tones), <strong>Ocean Rainbow</strong> (cool blue-green shades), and <strong>Fire Rainbow</strong> (hot red-orange-yellow hues). Each creates a different mood and visual effect.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Can I add shadows and outlines to rainbow text?</h3>
                <p className="text-slate-600">
                  Absolutely! Our rainbow text generator includes advanced effects like drop shadows (with customizable color, distance, and blur) and text outlines (with adjustable color and width). These effects help your rainbow text stand out even more and improve readability on different backgrounds.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">What image format does the generator export?</h3>
                <p className="text-slate-600">
                  Our rainbow text generator exports your rainbow text as PNG images. PNG format supports transparency, which means you can easily place your rainbow text on any background without white boxes around it. The images are rendered at 2x resolution for high quality.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-slate">
              <h2 className="text-2xl font-bold mb-4">About Our Rainbow Text Generator</h2>
              <p className="text-slate-600 mb-4">
                Our rainbow text generator is the ultimate free online tool for creating stunning rainbow text effects. Whether you're designing social media posts, creating YouTube thumbnails, or making eye-catching graphics, our rainbow text generator provides everything you need. With 6 unique fonts and 6 beautiful gradient presets, this rainbow text generator makes it easy to create professional rainbow text in seconds.
              </p>
              <p className="text-slate-600 mb-4">
                The rainbow text generator features include customizable font sizes, line heights, letter spacing, rotation, skew effects, shadows, and outlines. You can download your rainbow text as high-quality PNG images with transparent backgrounds. Our rainbow text generator is completely free - no signup required, no watermarks, and unlimited downloads.
              </p>
              <p className="text-slate-600">
                Start using our rainbow text generator today to create beautiful rainbow text for your projects. This rainbow text generator is perfect for beginners and professionals alike. Try our rainbow text generator now and see how easy it is to create stunning rainbow text effects!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-8 h-8 text-lime-500" />
                  <span className="text-xl font-bold">Brat Generator</span>
                </div>
                <p className="text-slate-400 mb-4">
                  Create stunning rainbow text with our free rainbow text generator. Professional quality, instant results.
                </p>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Tools</h5>
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
                    <Link href="/generators/mirror-text" className="hover:text-white transition-colors">
                      Mirror Text
                    </Link>
                  </li>
                  <li>
                    <Link href="/generators" className="hover:text-white transition-colors">
                      All Generators
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
              <p>&copy; 2025 Brat Generator. All rights reserved. Create stunning rainbow text with our free rainbow text generator.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}


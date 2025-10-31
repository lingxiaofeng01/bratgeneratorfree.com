'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Download, RefreshCw, Waves, Palette, Type, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import html2canvas from 'html2canvas';

// Vaporwave color schemes
const vaporwaveColorSchemes = [
  { name: 'Classic Vaporwave', gradient: 'linear-gradient(135deg, #FF71CE 0%, #01CDFE 50%, #05FFA1 100%)', bg: '#1a0033' },
  { name: 'Sunset Dreams', gradient: 'linear-gradient(135deg, #FF6EC7 0%, #FFA06E 50%, #FFDE59 100%)', bg: '#2d1b4e' },
  { name: 'Neon Nights', gradient: 'linear-gradient(135deg, #B967FF 0%, #05FFA1 50%, #FFFB96 100%)', bg: '#0a0015' },
  { name: 'Miami Vice', gradient: 'linear-gradient(135deg, #FF0080 0%, #7928CA 50%, #FF0080 100%)', bg: '#1a0033' },
  { name: 'Cyber Pink', gradient: 'linear-gradient(135deg, #FF1493 0%, #00FFFF 50%, #FF1493 100%)', bg: '#0d0221' },
  { name: 'Purple Haze', gradient: 'linear-gradient(135deg, #9D50BB 0%, #6E48AA 50%, #9D50BB 100%)', bg: '#1a0033' },
  { name: 'Ocean Breeze', gradient: 'linear-gradient(135deg, #00D4FF 0%, #090979 50%, #00D4FF 100%)', bg: '#000428' },
  { name: 'Retro Future', gradient: 'linear-gradient(135deg, #F857A6 0%, #FF5858 50%, #F857A6 100%)', bg: '#2d1b4e' },
];

// Vaporwave fonts
const vaporwaveFonts = [
  { name: 'Impact', family: 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif' },
  { name: 'Arial Black', family: '"Arial Black", Gadget, sans-serif' },
  { name: 'Courier New', family: '"Courier New", Courier, monospace' },
  { name: 'Georgia', family: 'Georgia, serif' },
  { name: 'Verdana', family: 'Verdana, Geneva, sans-serif' },
  { name: 'Times New Roman', family: '"Times New Roman", Times, serif' },
  { name: 'Comic Sans MS', family: '"Comic Sans MS", cursive, sans-serif' },
  { name: 'Trebuchet MS', family: '"Trebuchet MS", Helvetica, sans-serif' },
];

// Text effects
const textEffects = [
  { name: 'None', value: 'none' },
  { name: 'Glitch', value: 'glitch' },
  { name: 'Neon Glow', value: 'neon' },
  { name: 'Chrome', value: 'chrome' },
  { name: 'Retro Shadow', value: 'retro-shadow' },
  { name: '3D Extrude', value: '3d-extrude' },
];

interface VaporwaveConfig {
  text: string;
  font: string;
  fontSize: number;
  colorScheme: number;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  effect: string;
  uppercase: boolean;
  italic: boolean;
  rotation: number;
  glowIntensity: number;
  showGrid: boolean;
  showSun: boolean;
}

export default function VaporwaveTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<VaporwaveConfig>({
    text: 'VAPORWAVE',
    font: vaporwaveFonts[0].family,
    fontSize: 72,
    colorScheme: 0,
    textAlign: 'center',
    lineHeight: 1.2,
    letterSpacing: 8,
    effect: 'neon',
    uppercase: true,
    italic: false,
    rotation: 0,
    glowIntensity: 20,
    showGrid: true,
    showSun: true,
  });

  useEffect(() => {
    document.title = 'Vaporwave Text Generator - Free Aesthetic Vaporwave Font Generator';
  }, []);

  const handleDownload = async () => {
    if (!previewRef.current || !config.text.trim()) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `vaporwave-text-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(config.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig({
      text: 'VAPORWAVE',
      font: vaporwaveFonts[0].family,
      fontSize: 72,
      colorScheme: 0,
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 8,
      effect: 'neon',
      uppercase: true,
      italic: false,
      rotation: 0,
      glowIntensity: 20,
      showGrid: true,
      showSun: true,
    });
  };

  const getTextStyle = (): React.CSSProperties & { [key: string]: any } => {
    const scheme = vaporwaveColorSchemes[config.colorScheme];

    // Base text style
    const baseStyle: any = {
      fontFamily: config.font,
      fontSize: `${config.fontSize}px`,
      textAlign: config.textAlign,
      lineHeight: config.lineHeight,
      letterSpacing: `${config.letterSpacing}px`,
      fontStyle: config.italic ? 'italic' : 'normal',
      textTransform: config.uppercase ? 'uppercase' : 'none',
      transform: `rotate(${config.rotation}deg)`,
      fontWeight: 'bold',
    };

    // Chrome effect uses solid color, others use gradient
    if (config.effect === 'chrome') {
      return {
        ...baseStyle,
        color: '#e0e0e0',
        textShadow: '0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0, 0px 4px 0px #909090, 0px 5px 10px rgba(0,0,0,.5)',
      };
    }

    // All other effects use gradient text
    const gradientStyle: any = {
      ...baseStyle,
      backgroundImage: scheme.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      MozBackgroundClip: 'text',
      MozTextFillColor: 'transparent',
      backgroundClip: 'text',
    };

    // Apply effect-specific filters
    if (config.effect === 'neon') {
      gradientStyle.filter = `drop-shadow(0 0 ${config.glowIntensity}px #FF71CE) drop-shadow(0 0 ${config.glowIntensity * 2}px #01CDFE)`;
    } else if (config.effect === 'glitch') {
      gradientStyle.filter = `drop-shadow(2px 2px 0px #FF71CE) drop-shadow(-2px -2px 0px #01CDFE)`;
    } else if (config.effect === 'retro-shadow') {
      gradientStyle.filter = 'drop-shadow(3px 3px 0px #FF71CE) drop-shadow(6px 6px 0px #01CDFE) drop-shadow(9px 9px 0px #05FFA1)';
    } else if (config.effect === '3d-extrude') {
      gradientStyle.filter = 'drop-shadow(1px 1px 0px #FF71CE) drop-shadow(2px 2px 0px #FF71CE) drop-shadow(3px 3px 0px #01CDFE) drop-shadow(4px 4px 0px #01CDFE) drop-shadow(5px 5px 0px #05FFA1) drop-shadow(6px 6px 0px #05FFA1) drop-shadow(7px 7px 10px rgba(0,0,0,0.5))';
    }

    return gradientStyle;
  };

  const getBackgroundStyle = () => {
    const scheme = vaporwaveColorSchemes[config.colorScheme];
    return {
      backgroundColor: scheme.bg,
      backgroundImage: config.showGrid 
        ? 'linear-gradient(rgba(255, 113, 206, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 113, 206, 0.1) 1px, transparent 1px)'
        : 'none',
      backgroundSize: config.showGrid ? '50px 50px' : 'auto',
      position: 'relative' as const,
      overflow: 'hidden',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
      {/* Header */}
      <header className="border-b border-purple-500/30 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Waves className="w-8 h-8 text-pink-400" />
              <span className="text-xl sm:text-2xl font-bold text-white">Vaporwave Text Generator</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-pink-300 hover:text-pink-400 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-pink-300 hover:text-pink-400 transition-colors">
                Generators
              </Link>
              <Link href="/blog" className="text-pink-300 hover:text-pink-400 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-pink-300 hover:text-pink-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-pink-300 hover:text-pink-400 transition-colors">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-pink-500/20 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-pink-300" />
              ) : (
                <Menu className="w-6 h-6 text-pink-300" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-500/30">
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/"
                  className="text-pink-300 hover:text-pink-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/generators"
                  className="text-pink-300 hover:text-pink-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Generators
                </Link>
                <Link
                  href="/blog"
                  className="text-pink-300 hover:text-pink-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-pink-300 hover:text-pink-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-pink-300 hover:text-pink-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-purple-900/50 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Vaporwave Text Generator
            </h1>
            <p className="text-lg md:text-xl text-pink-200 max-w-3xl mx-auto mb-8">
              Create stunning vaporwave aesthetic text with our free online generator. Choose from 8+ color schemes, multiple fonts, and retro effects. Perfect for social media, artwork, and design projects.
            </p>
          </div>
        </section>

        {/* Main Generator Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Control Panel */}
              <div className="space-y-6">
                {/* Text Input */}
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <Type className="w-5 h-5 mr-2 text-pink-400" />
                    <h2 className="text-xl font-semibold text-white">Text Input</h2>
                  </div>
                  <Textarea
                    value={config.text}
                    onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter your vaporwave text..."
                    className="min-h-[100px] text-lg bg-purple-900/30 border-pink-500/30 text-white placeholder:text-pink-300/50"
                  />
                </Card>

                {/* Font Settings */}
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <Palette className="w-5 h-5 mr-2 text-cyan-400" />
                    <h2 className="text-xl font-semibold text-white">Font & Style</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-pink-200">Font Family</Label>
                      <Select value={config.font} onValueChange={(value) => setConfig(prev => ({ ...prev, font: value }))}>
                        <SelectTrigger className="bg-purple-900/30 border-pink-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-900 border-pink-500/30">
                          {vaporwaveFonts.map((font) => (
                            <SelectItem key={font.family} value={font.family} className="text-white hover:bg-pink-500/20">
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-pink-200">Font Size: {config.fontSize}px</Label>
                      <Slider
                        value={[config.fontSize]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, fontSize: value }))}
                        min={24}
                        max={120}
                        step={2}
                        className="mt-2 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-500"
                      />
                    </div>

                    <div>
                      <Label className="text-pink-200">Letter Spacing: {config.letterSpacing}px</Label>
                      <Slider
                        value={[config.letterSpacing]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, letterSpacing: value }))}
                        min={0}
                        max={20}
                        step={1}
                        className="mt-2 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-500"
                      />
                    </div>

                    <div>
                      <Label className="text-pink-200">Line Height: {config.lineHeight}</Label>
                      <Slider
                        value={[config.lineHeight]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, lineHeight: value }))}
                        min={0.8}
                        max={2}
                        step={0.1}
                        className="mt-2 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-500"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="uppercase"
                          checked={config.uppercase}
                          onCheckedChange={(checked) => setConfig(prev => ({ ...prev, uppercase: checked as boolean }))}
                          className="border-pink-500/30"
                        />
                        <Label htmlFor="uppercase" className="text-pink-200 cursor-pointer">Uppercase</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="italic"
                          checked={config.italic}
                          onCheckedChange={(checked) => setConfig(prev => ({ ...prev, italic: checked as boolean }))}
                          className="border-pink-500/30"
                        />
                        <Label htmlFor="italic" className="text-pink-200 cursor-pointer">Italic</Label>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Color Scheme */}
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-white mb-4">Color Scheme</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {vaporwaveColorSchemes.map((scheme, index) => (
                      <button
                        key={index}
                        onClick={() => setConfig(prev => ({ ...prev, colorScheme: index }))}
                        className={`relative p-3 rounded-lg border-2 transition-all overflow-hidden ${
                          config.colorScheme === index
                            ? 'border-pink-400 ring-2 ring-pink-400/50 scale-105'
                            : 'border-pink-500/30 hover:border-pink-400/50'
                        }`}
                      >
                        <div
                          className="absolute inset-0 opacity-80"
                          style={{ background: scheme.gradient }}
                        />
                        <div className="relative z-10 text-white text-sm font-semibold" style={{
                          textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 1px 1px 2px rgba(0,0,0,1)'
                        }}>
                          {scheme.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Effects */}
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-white mb-4">Text Effects</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-pink-200">Effect Type</Label>
                      <Select value={config.effect} onValueChange={(value) => setConfig(prev => ({ ...prev, effect: value }))}>
                        <SelectTrigger className="bg-purple-900/30 border-pink-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-900 border-pink-500/30">
                          {textEffects.map((effect) => (
                            <SelectItem key={effect.value} value={effect.value} className="text-white hover:bg-pink-500/20">
                              {effect.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {config.effect === 'neon' && (
                      <div>
                        <Label className="text-pink-200">Glow Intensity: {config.glowIntensity}px</Label>
                        <Slider
                          value={[config.glowIntensity]}
                          onValueChange={([value]) => setConfig(prev => ({ ...prev, glowIntensity: value }))}
                          min={0}
                          max={50}
                          step={2}
                          className="mt-2 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-500"
                        />
                      </div>
                    )}

                    <div>
                      <Label className="text-pink-200">Rotation: {config.rotation}°</Label>
                      <Slider
                        value={[config.rotation]}
                        onValueChange={([value]) => setConfig(prev => ({ ...prev, rotation: value }))}
                        min={-45}
                        max={45}
                        step={1}
                        className="mt-2 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-500"
                      />
                    </div>

                    <div>
                      <Label className="text-pink-200">Text Alignment</Label>
                      <div className="flex gap-2 mt-2">
                        {(['left', 'center', 'right'] as const).map((align) => (
                          <Button
                            key={align}
                            variant={config.textAlign === align ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setConfig(prev => ({ ...prev, textAlign: align }))}
                            className={config.textAlign === align ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-500/30 text-pink-200'}
                          >
                            {align.charAt(0).toUpperCase() + align.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Background Options */}
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-white mb-4">Background Options</h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showGrid"
                        checked={config.showGrid}
                        onCheckedChange={(checked) => setConfig(prev => ({ ...prev, showGrid: checked as boolean }))}
                        className="border-pink-500/30"
                      />
                      <Label htmlFor="showGrid" className="text-pink-200 cursor-pointer">Show Retro Grid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showSun"
                        checked={config.showSun}
                        onCheckedChange={(checked) => setConfig(prev => ({ ...prev, showSun: checked as boolean }))}
                        className="border-pink-500/30"
                      />
                      <Label htmlFor="showSun" className="text-pink-200 cursor-pointer">Show Sunset</Label>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Preview Area */}
              <div className="lg:sticky lg:top-24 h-fit">
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Live Preview</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="flex items-center gap-2 border-pink-500/30 text-pink-200 hover:bg-pink-500/20"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                      </Button>
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/20"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        onClick={handleDownload}
                        disabled={!config.text.trim() || isDownloading}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                      >
                        <Download className="w-4 h-4" />
                        {isDownloading ? 'Downloading...' : 'Download'}
                      </Button>
                    </div>
                  </div>

                  <div
                    ref={previewRef}
                    className="relative rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center p-8"
                    style={getBackgroundStyle()}
                  >
                    {config.showSun && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-t from-pink-500 via-purple-500 to-transparent rounded-full blur-3xl opacity-50" />
                    )}
                    <div className="relative z-10 w-full">
                      <div
                        style={getTextStyle()}
                        className="whitespace-pre-wrap break-words [&]:bg-clip-text [&]:-webkit-background-clip-text"
                      >
                        {config.text || 'Enter text above'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border border-pink-500/20">
                    <p className="text-sm text-pink-200">
                      💡 <strong>Tip:</strong> Experiment with different color schemes and effects to create the perfect vaporwave aesthetic. Try combining neon glow with the retro grid for maximum impact!
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Why Choose Our Vaporwave Text Generator?
              </h2>
              <p className="text-lg text-pink-200 max-w-3xl mx-auto">
                Create authentic vaporwave aesthetic text with professional-grade features and instant results
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">8+ Color Schemes</h3>
                <p className="text-pink-200">
                  Choose from authentic vaporwave color palettes including Classic Vaporwave, Miami Vice, Neon Nights, and more
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Multiple Effects</h3>
                <p className="text-pink-200">
                  Apply neon glow, glitch, chrome, retro shadow, and 3D extrude effects for stunning results
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Type className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Custom Typography</h3>
                <p className="text-pink-200">
                  Full control over font family, size, spacing, alignment, and styling options
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Instant Download</h3>
                <p className="text-pink-200">
                  Download your vaporwave text as high-quality PNG images with transparent backgrounds
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Retro Aesthetics</h3>
                <p className="text-pink-200">
                  Add retro grid backgrounds and sunset effects for authentic 80s/90s vaporwave vibes
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">100% Free</h3>
                <p className="text-pink-200">
                  No signup, no watermarks, no limits. Create unlimited vaporwave text completely free
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                How to Create Vaporwave Text
              </h2>
              <p className="text-lg text-pink-200 max-w-3xl mx-auto">
                Follow these simple steps to generate your perfect vaporwave aesthetic text
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Enter Your Text</h3>
                <p className="text-pink-200 text-sm">
                  Type or paste your text into the input field
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Choose Style</h3>
                <p className="text-pink-200 text-sm">
                  Select your favorite color scheme and font
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Apply Effects</h3>
                <p className="text-pink-200 text-sm">
                  Add neon glow, glitch, or other retro effects
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  4
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Download</h3>
                <p className="text-pink-200 text-sm">
                  Click download to save your vaporwave text
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Vaporwave Text Generator FAQ
              </h2>
              <p className="text-lg text-pink-200 max-w-3xl mx-auto">
                Common questions about creating vaporwave aesthetic text
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">What is vaporwave text?</h3>
                <p className="text-pink-200">
                  Vaporwave text is a style of typography that embodies the vaporwave aesthetic - a retro-futuristic art movement inspired by 1980s and 1990s pop culture, technology, and consumerism. It typically features neon colors, gradient effects, and nostalgic design elements.
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">How do I create vaporwave text?</h3>
                <p className="text-pink-200">
                  Simply enter your text in the input field, choose from our 8+ authentic vaporwave color schemes, select your preferred font, and apply effects like neon glow or glitch. You can customize every aspect including size, spacing, rotation, and background elements.
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">What are the best color schemes for vaporwave?</h3>
                <p className="text-pink-200">
                  Classic vaporwave colors include hot pink (#FF71CE), cyan (#01CDFE), and neon green (#05FFA1). Our generator includes authentic schemes like Classic Vaporwave, Miami Vice, Neon Nights, and Sunset Dreams - all carefully crafted to capture the true vaporwave aesthetic.
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">Can I use vaporwave text for commercial projects?</h3>
                <p className="text-pink-200">
                  Yes! All text generated with our tool is free to use for both personal and commercial projects. There are no watermarks, no attribution required, and no usage restrictions. Create unlimited vaporwave text for your designs, social media, artwork, or business needs.
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">What file format does the generator export?</h3>
                <p className="text-pink-200">
                  The generator exports high-quality PNG images with transparent backgrounds, perfect for layering in design software or posting on social media. The images are rendered at 2x resolution for crisp, professional results.
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">What makes good vaporwave typography?</h3>
                <p className="text-pink-200">
                  Good vaporwave typography combines bold, impactful fonts with vibrant gradient colors, neon effects, and retro elements like grid backgrounds or sunset imagery. Key characteristics include high contrast, nostalgic aesthetics, and a blend of futuristic and vintage design elements.
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">Is this vaporwave text generator free?</h3>
                <p className="text-pink-200">
                  Absolutely! Our vaporwave text generator is 100% free with no hidden costs, no signup required, and no watermarks. You can create and download unlimited vaporwave text designs without any restrictions.
                </p>
              </Card>

              <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">Can I customize the background?</h3>
                <p className="text-pink-200">
                  Yes! You can toggle the retro grid background and sunset effect to create the perfect vaporwave atmosphere. Each color scheme also comes with its own carefully selected background color that complements the text gradient.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Generators */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                More Text Generators
              </h2>
              <p className="text-lg text-pink-200 max-w-3xl mx-auto">
                Explore our other creative text generators
              </p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Link href="/generators/rainbow-text">
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all cursor-pointer h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">Rainbow Text</h3>
                  <p className="text-pink-200 text-sm">Create colorful rainbow gradient text</p>
                </Card>
              </Link>
              <Link href="/generators/glitter-text">
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all cursor-pointer h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">Glitter Text</h3>
                  <p className="text-pink-200 text-sm">Add sparkle with 176+ glitter effects</p>
                </Card>
              </Link>
              <Link href="/generators/neon-text">
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all cursor-pointer h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">Neon Text</h3>
                  <p className="text-pink-200 text-sm">Create glowing neon sign effects</p>
                </Card>
              </Link>
              <Link href="/generators">
                <Card className="p-6 bg-black/40 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all cursor-pointer h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">All Generators</h3>
                  <p className="text-pink-200 text-sm">View all text generators</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-pink-500/30 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Waves className="w-8 h-8 text-pink-400" />
                <span className="text-xl font-bold">Brat Generator</span>
              </div>
              <p className="text-pink-200 leading-relaxed mb-6 max-w-md">
                Create stunning vaporwave text and explore our collection of free text generators. Professional-quality results, instant downloads, completely free.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Generators</h5>
              <ul className="space-y-2 text-pink-200">
                <li>
                  <Link href="/generators/vaporwave-text" className="hover:text-white transition-colors">
                    Vaporwave Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/rainbow-text" className="hover:text-white transition-colors">
                    Rainbow Text
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
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
              <ul className="space-y-2 text-pink-200">
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
          <div className="border-t border-pink-500/30 mt-8 pt-8 text-center text-pink-200">
            <p>&copy; 2025 Brat Generator. All rights reserved. Create stunning vaporwave text and aesthetic designs with our free online tools.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


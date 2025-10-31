'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Droplet, Menu, X, Copy, Check, Download, RefreshCw, Skull, Zap, Star, Sparkles, Heart, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import html2canvas from 'html2canvas';

// Blood effect styles
const BLOOD_STYLES = [
  {
    id: 'dripping',
    name: 'Dripping Blood',
    description: 'Classic dripping blood effect',
    icon: Droplet,
    example: 'Blood drips down'
  },
  {
    id: 'splatter',
    name: 'Blood Splatter',
    description: 'Splattered blood effect',
    icon: Sparkles,
    example: 'Splattered chaos'
  },
  {
    id: 'stain',
    name: 'Blood Stain',
    description: 'Dried blood stain effect',
    icon: AlertTriangle,
    example: 'Stained horror'
  },
  {
    id: 'gory',
    name: 'Gory Text',
    description: 'Extreme gore effect',
    icon: Skull,
    example: 'Maximum gore'
  },
  {
    id: 'fresh',
    name: 'Fresh Blood',
    description: 'Wet, fresh blood look',
    icon: Heart,
    example: 'Fresh crimson'
  },
  {
    id: 'drip-heavy',
    name: 'Heavy Drip',
    description: 'Heavy dripping effect',
    icon: Zap,
    example: 'Heavy drips'
  }
];

// Blood color presets
const BLOOD_COLORS = [
  { name: 'Crimson Red', value: '#DC143C', shadow: '#8B0000' },
  { name: 'Dark Blood', value: '#8B0000', shadow: '#4B0000' },
  { name: 'Fresh Blood', value: '#FF0000', shadow: '#CC0000' },
  { name: 'Dried Blood', value: '#5C0000', shadow: '#2B0000' },
  { name: 'Zombie Green', value: '#00FF00', shadow: '#008000' },
  { name: 'Toxic Purple', value: '#8B008B', shadow: '#4B0082' },
  { name: 'Alien Blue', value: '#0000FF', shadow: '#000080' },
  { name: 'Custom', value: 'custom', shadow: 'custom' }
];

// Horror fonts
const HORROR_FONTS = [
  { name: 'Impact', family: 'Impact, Haettenschweiler, "Franklin Gothic Bold", sans-serif' },
  { name: 'Creepster', family: '"Creepster", cursive' },
  { name: 'Nosifer', family: '"Nosifer", cursive' },
  { name: 'Butcherman', family: '"Butcherman", cursive' },
  { name: 'Eater', family: '"Eater", cursive' },
  { name: 'Metal Mania', family: '"Metal Mania", cursive' },
  { name: 'Rubik Wet Paint', family: '"Rubik Wet Paint", cursive' },
  { name: 'Arial Black', family: '"Arial Black", sans-serif' }
];

interface BloodyConfig {
  text: string;
  style: string;
  bloodColor: number;
  customColor: string;
  customShadow: string;
  font: string;
  fontSize: number;
  dripIntensity: number;
  glowIntensity: number;
  animationSpeed: number;
  uppercase: boolean;
  enableAnimation: boolean;
  letterSpacing: number;
}

export default function BloodyTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<BloodyConfig>({
    text: 'BLOODY TEXT',
    style: 'dripping',
    bloodColor: 0,
    customColor: '#DC143C',
    customShadow: '#8B0000',
    font: HORROR_FONTS[0].family,
    fontSize: 72,
    dripIntensity: 50,
    glowIntensity: 30,
    animationSpeed: 3,
    uppercase: true,
    enableAnimation: true,
    letterSpacing: 4
  });

  useEffect(() => {
    document.title = 'Bloody Text Generator - Create Horror Blood Dripping Text Online';
  }, []);

  const updateConfig = (key: keyof BloodyConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(config.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current || !config.text.trim()) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        logging: false,
        backgroundColor: '#000000'
      } as any);
      
      const link = document.createElement('a');
      link.download = `bloody-text-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const getBloodColor = () => {
    if (config.bloodColor === BLOOD_COLORS.length - 1) {
      return config.customColor;
    }
    return BLOOD_COLORS[config.bloodColor].value;
  };

  const getShadowColor = () => {
    if (config.bloodColor === BLOOD_COLORS.length - 1) {
      return config.customShadow;
    }
    return BLOOD_COLORS[config.bloodColor].shadow;
  };

  const getTextStyle = () => {
    const bloodColor = getBloodColor();
    const shadowColor = getShadowColor();
    
    let textShadow = '';
    const dripAmount = config.dripIntensity / 10;
    
    // Base shadow for depth
    for (let i = 1; i <= 5; i++) {
      textShadow += `${i}px ${i}px ${i * 2}px ${shadowColor}, `;
    }
    
    // Glow effect
    if (config.glowIntensity > 0) {
      const glowSize = config.glowIntensity / 5;
      textShadow += `0 0 ${glowSize}px ${bloodColor}, `;
      textShadow += `0 0 ${glowSize * 2}px ${bloodColor}, `;
    }
    
    textShadow = textShadow.slice(0, -2); // Remove trailing comma

    return {
      color: bloodColor,
      fontFamily: config.font,
      fontSize: `${config.fontSize}px`,
      textShadow,
      letterSpacing: `${config.letterSpacing}px`,
      textTransform: config.uppercase ? 'uppercase' : 'none',
      fontWeight: 'bold',
      lineHeight: 1.4,
      filter: config.style === 'gory' ? 'contrast(1.2) saturate(1.5)' : 'none',
      WebkitTextStroke: config.style === 'stain' ? `1px ${shadowColor}` : 'none'
    } as React.CSSProperties;
  };

  const getDripStyle = () => {
    const bloodColor = getBloodColor();
    const intensity = config.dripIntensity;
    
    return {
      background: `linear-gradient(180deg, transparent 0%, ${bloodColor}40 50%, ${bloodColor} 100%)`,
      height: `${intensity}px`,
      filter: `blur(${intensity / 20}px)`,
      animation: config.enableAnimation ? `drip ${config.animationSpeed}s ease-in-out infinite` : 'none'
    } as React.CSSProperties;
  };

  const getSplatterStyle = () => {
    const bloodColor = getBloodColor();
    return {
      background: `radial-gradient(circle, ${bloodColor} 0%, transparent 70%)`,
      opacity: config.dripIntensity / 100,
      filter: `blur(${config.dripIntensity / 30}px)`
    } as React.CSSProperties;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      <style jsx global>{`
        @keyframes drip {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.8; }
          50% { transform: translateY(10px) scaleY(1.2); opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        
        @keyframes blood-splatter {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 0.6; }
        }
      `}</style>

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Skull className="w-8 h-8 text-red-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Brat Generator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-300 hover:text-red-500 transition-colors">
                Home
              </Link>
              <Link href="/generators" className="text-slate-300 hover:text-red-500 transition-colors">
                All Generators
              </Link>
              <Link href="/blog" className="text-slate-300 hover:text-red-500 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-red-500 transition-colors">
                About
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-red-500"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-red-900/20">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-slate-300 hover:text-red-500 transition-colors">
                  Home
                </Link>
                <Link href="/generators" className="text-slate-300 hover:text-red-500 transition-colors">
                  All Generators
                </Link>
                <Link href="/blog" className="text-slate-300 hover:text-red-500 transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="text-slate-300 hover:text-red-500 transition-colors">
                  About
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-800/30 rounded-full px-4 py-2 mb-6">
            <Droplet className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-300">Free Horror Text Generator</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
            Bloody Text Generator
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Create spine-chilling bloody text effects with dripping blood, gore, and horror fonts.
            Perfect for Halloween, horror games, and creepy designs. Download instantly!
          </p>
        </div>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Panel - Style Selection */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                <Skull className="w-5 h-5" />
                Blood Effect Style
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {BLOOD_STYLES.map((style) => {
                  const Icon = style.icon;
                  return (
                    <button
                      key={style.id}
                      onClick={() => updateConfig('style', style.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        config.style === style.id
                          ? 'border-red-600 bg-red-950/50 shadow-lg shadow-red-900/20'
                          : 'border-slate-700 bg-slate-800/30 hover:border-red-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${
                          config.style === style.id ? 'text-red-500' : 'text-slate-400'
                        }`} />
                        <div className="flex-1">
                          <div className={`font-semibold mb-1 ${
                            config.style === style.id ? 'text-red-400' : 'text-slate-300'
                          }`}>
                            {style.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {style.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Quick Examples */}
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Quick Examples</h3>
              <div className="space-y-2">
                {['HORROR NIGHT', 'BLOOD MOON', 'ZOMBIE ZONE', 'SCARY PARTY'].map((example) => (
                  <button
                    key={example}
                    onClick={() => updateConfig('text', example)}
                    className="w-full p-3 text-left rounded-lg bg-slate-800/30 hover:bg-red-950/30 border border-slate-700 hover:border-red-700 transition-all text-slate-300 text-sm"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Panel - Preview and Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <Label className="text-slate-300 mb-2 block">Your Text</Label>
              <Textarea
                value={config.text}
                onChange={(e) => updateConfig('text', e.target.value)}
                placeholder="Enter your bloody text..."
                className="w-full min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-200 focus:border-red-600 resize-none"
                maxLength={200}
              />
              <div className="text-xs text-slate-500 mt-2">
                {config.text.length}/200 characters
              </div>
            </Card>

            {/* Preview */}
            <Card className="p-8 bg-black border-red-900/30 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  onClick={handleCopy}
                  size="sm"
                  variant="outline"
                  className="border-red-700 text-red-400 hover:bg-red-950/50"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleDownload}
                  size="sm"
                  variant="outline"
                  className="border-red-700 text-red-400 hover:bg-red-950/50"
                  disabled={isDownloading}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div
                ref={previewRef}
                className="min-h-[300px] flex items-center justify-center p-8 relative"
              >
                {/* Background effects */}
                {config.style === 'splatter' && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          ...getSplatterStyle(),
                          width: `${Math.random() * 100 + 50}px`,
                          height: `${Math.random() * 100 + 50}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `blood-splatter ${Math.random() * 3 + 2}s ease-in-out infinite`
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="relative z-10">
                  <div
                    style={getTextStyle()}
                    className="text-center break-words max-w-full"
                  >
                    {config.text || 'BLOODY TEXT'}
                  </div>

                  {/* Dripping effect */}
                  {(config.style === 'dripping' || config.style === 'drip-heavy' || config.style === 'fresh') && config.dripIntensity > 0 && (
                    <div className="flex justify-center gap-4 mt-2">
                      {[...Array(config.style === 'drip-heavy' ? 8 : 5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 rounded-full"
                          style={{
                            ...getDripStyle(),
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Controls */}
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Blood Color */}
                <div>
                  <Label className="text-slate-300 mb-3 block">Blood Color</Label>
                  <Select
                    value={config.bloodColor.toString()}
                    onValueChange={(value) => updateConfig('bloodColor', parseInt(value))}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {BLOOD_COLORS.map((color, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          <div className="flex items-center gap-2">
                            {color.value !== 'custom' && (
                              <div
                                className="w-4 h-4 rounded-full border border-slate-600"
                                style={{ backgroundColor: color.value }}
                              />
                            )}
                            <span>{color.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {config.bloodColor === BLOOD_COLORS.length - 1 && (
                    <div className="mt-3 space-y-2">
                      <input
                        type="color"
                        value={config.customColor}
                        onChange={(e) => updateConfig('customColor', e.target.value)}
                        className="w-full h-10 rounded cursor-pointer"
                      />
                      <input
                        type="color"
                        value={config.customShadow}
                        onChange={(e) => updateConfig('customShadow', e.target.value)}
                        className="w-full h-10 rounded cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* Font */}
                <div>
                  <Label className="text-slate-300 mb-3 block">Horror Font</Label>
                  <Select
                    value={config.font}
                    onValueChange={(value) => updateConfig('font', value)}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {HORROR_FONTS.map((font) => (
                        <SelectItem key={font.family} value={font.family}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div>
                  <Label className="text-slate-300 mb-3 block">
                    Font Size: {config.fontSize}px
                  </Label>
                  <Slider
                    value={[config.fontSize]}
                    onValueChange={([value]) => updateConfig('fontSize', value)}
                    min={24}
                    max={120}
                    step={2}
                    className="cursor-pointer"
                  />
                </div>

                {/* Drip Intensity */}
                <div>
                  <Label className="text-slate-300 mb-3 block">
                    Drip Intensity: {config.dripIntensity}%
                  </Label>
                  <Slider
                    value={[config.dripIntensity]}
                    onValueChange={([value]) => updateConfig('dripIntensity', value)}
                    min={0}
                    max={100}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>

                {/* Glow Intensity */}
                <div>
                  <Label className="text-slate-300 mb-3 block">
                    Glow Intensity: {config.glowIntensity}%
                  </Label>
                  <Slider
                    value={[config.glowIntensity]}
                    onValueChange={([value]) => updateConfig('glowIntensity', value)}
                    min={0}
                    max={100}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>

                {/* Letter Spacing */}
                <div>
                  <Label className="text-slate-300 mb-3 block">
                    Letter Spacing: {config.letterSpacing}px
                  </Label>
                  <Slider
                    value={[config.letterSpacing]}
                    onValueChange={([value]) => updateConfig('letterSpacing', value)}
                    min={0}
                    max={20}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Toggle Options */}
              <div className="mt-6 pt-6 border-t border-slate-700 grid md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.uppercase}
                    onChange={(e) => updateConfig('uppercase', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 text-red-600 focus:ring-red-600"
                  />
                  <span className="text-slate-300">Uppercase Text</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enableAnimation}
                    onChange={(e) => updateConfig('enableAnimation', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 text-red-600 focus:ring-red-600"
                  />
                  <span className="text-slate-300">Enable Animation</span>
                </label>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Powerful Horror Text Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm hover:border-red-700 transition-all">
              <Droplet className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-400 mb-3">6 Blood Styles</h3>
              <p className="text-slate-400">
                Choose from dripping, splatter, stain, gory, fresh blood, and heavy drip effects for maximum horror impact.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm hover:border-red-700 transition-all">
              <Sparkles className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-400 mb-3">Custom Colors</h3>
              <p className="text-slate-400">
                8 blood color presets including crimson, dark blood, zombie green, and custom color picker for unique effects.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm hover:border-red-700 transition-all">
              <Skull className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-400 mb-3">Horror Fonts</h3>
              <p className="text-slate-400">
                8 terrifying fonts including Creepster, Nosifer, Butcherman, and more for authentic horror typography.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm hover:border-red-700 transition-all">
              <Zap className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-400 mb-3">Live Animation</h3>
              <p className="text-slate-400">
                Animated dripping blood effects with adjustable speed for dynamic, eye-catching horror text.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm hover:border-red-700 transition-all">
              <Download className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-400 mb-3">Instant Download</h3>
              <p className="text-slate-400">
                Download your bloody text as high-quality PNG images with transparent backgrounds for any project.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm hover:border-red-700 transition-all">
              <Star className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-400 mb-3">100% Free</h3>
              <p className="text-slate-400">
                No watermarks, no sign-up required, unlimited downloads. Create as many bloody text designs as you want!
              </p>
            </Card>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            How to Create Bloody Text
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-600">
                <span className="text-2xl font-bold text-red-500">1</span>
              </div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Enter Text</h3>
              <p className="text-slate-400 text-sm">
                Type your message in the text area (up to 200 characters)
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-600">
                <span className="text-2xl font-bold text-red-500">2</span>
              </div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Choose Style</h3>
              <p className="text-slate-400 text-sm">
                Select from 6 blood effect styles and customize colors
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-600">
                <span className="text-2xl font-bold text-red-500">3</span>
              </div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Customize</h3>
              <p className="text-slate-400 text-sm">
                Adjust font, size, drip intensity, glow, and animation
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-600">
                <span className="text-2xl font-bold text-red-500">4</span>
              </div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Download</h3>
              <p className="text-slate-400 text-sm">
                Copy text or download as PNG for your horror projects
              </p>
            </Card>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Perfect For Horror Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-red-400 mb-4">🎃 Halloween Events</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Party invitations and posters</li>
                <li>• Haunted house signage</li>
                <li>• Trick-or-treat decorations</li>
                <li>• Costume contest banners</li>
              </ul>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-red-400 mb-4">🎮 Gaming Content</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Horror game titles and logos</li>
                <li>• Twitch overlays and alerts</li>
                <li>• YouTube thumbnails</li>
                <li>• Discord server graphics</li>
              </ul>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-red-400 mb-4">🎬 Creative Projects</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Movie posters and titles</li>
                <li>• Book covers and artwork</li>
                <li>• Social media graphics</li>
                <li>• T-shirt and merch designs</li>
              </ul>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-red-400 mb-4">📱 Digital Content</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Instagram and TikTok posts</li>
                <li>• Website headers and banners</li>
                <li>• Email campaign graphics</li>
                <li>• Profile pictures and avatars</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                Is the Bloody Text Generator completely free?
              </h3>
              <p className="text-slate-400">
                Yes! Our bloody text generator is 100% free with no hidden costs, watermarks, or sign-up requirements.
                Create unlimited bloody text designs and download them instantly.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                Can I use the bloody text for commercial projects?
              </h3>
              <p className="text-slate-400">
                Absolutely! You can use the generated bloody text for both personal and commercial projects, including
                merchandise, marketing materials, games, and more. No attribution required.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                What blood effect styles are available?
              </h3>
              <p className="text-slate-400">
                We offer 6 unique blood styles: Dripping Blood (classic drips), Blood Splatter (chaotic splashes),
                Blood Stain (dried effect), Gory Text (extreme gore), Fresh Blood (wet look), and Heavy Drip (intense dripping).
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                Can I customize the blood color?
              </h3>
              <p className="text-slate-400">
                Yes! Choose from 7 preset blood colors (Crimson Red, Dark Blood, Fresh Blood, Dried Blood, Zombie Green,
                Toxic Purple, Alien Blue) or use the custom color picker to create your own unique blood shade.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                How do I download my bloody text?
              </h3>
              <p className="text-slate-400">
                Click the download button in the preview area to save your bloody text as a high-quality PNG image with
                a transparent background. Perfect for layering in design software or social media posts.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                What fonts work best for bloody text?
              </h3>
              <p className="text-slate-400">
                We recommend bold, impactful fonts like Impact, Creepster, Nosifer, or Butcherman for maximum horror effect.
                These fonts have strong letterforms that showcase the blood dripping and gore effects beautifully.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                Can I animate the blood dripping effect?
              </h3>
              <p className="text-slate-400">
                Yes! Enable the animation toggle to make the blood drips move dynamically. You can also adjust the animation
                speed for slower, creepier drips or faster, more intense effects.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                Is there a character limit for bloody text?
              </h3>
              <p className="text-slate-400">
                The generator supports up to 200 characters. This is perfect for titles, slogans, and short messages.
                For best visual impact, we recommend keeping text concise (1-3 words).
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <Card className="p-12 bg-gradient-to-br from-red-950/50 to-slate-900/50 border-red-900/30 backdrop-blur-sm">
            <Skull className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Ready to Create Horror Text?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Start creating spine-chilling bloody text effects now. Perfect for Halloween, horror games,
              and creepy designs. 100% free, no sign-up required!
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg"
            >
              <Droplet className="w-5 h-5 mr-2" />
              Create Bloody Text Now
            </Button>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="prose prose-invert max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-slate-900/50 border-red-900/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-red-400 mb-6">
              About Bloody Text Generator
            </h2>

            <div className="space-y-4 text-slate-400">
              <p>
                The <strong className="text-red-400">Bloody Text Generator</strong> is a powerful, free online tool
                designed to create spine-chilling horror text effects with realistic blood dripping, splatters, and gore.
                Perfect for Halloween events, horror games, creepy social media posts, and any project that needs a
                terrifying touch.
              </p>

              <p>
                Our advanced generator offers <strong className="text-red-400">6 unique blood effect styles</strong>,
                from classic dripping blood to extreme gore effects. Each style can be customized with 8 different blood
                colors, including traditional crimson red, dark dried blood, and even zombie green or toxic purple for
                supernatural horror themes.
              </p>

              <p>
                What sets our bloody text generator apart is the <strong className="text-red-400">live animation feature</strong>.
                Watch as blood drips down your text in real-time, creating dynamic, eye-catching effects that bring your
                horror designs to life. Adjust the drip intensity, glow effects, and animation speed to achieve the perfect
                level of terror.
              </p>

              <p>
                Choose from <strong className="text-red-400">8 horror-themed fonts</strong> including Creepster, Nosifer,
                Butcherman, and Eater. These specially selected typefaces are designed to maximize the impact of blood
                effects, with bold letterforms that showcase drips, splatters, and stains beautifully.
              </p>

              <p>
                The generator is completely <strong className="text-red-400">free to use</strong> with no watermarks,
                sign-up requirements, or download limits. Create unlimited bloody text designs and download them as
                high-quality PNG images with transparent backgrounds, perfect for layering in Photoshop, Canva, or any
                design software.
              </p>

              <p>
                Whether you're creating Halloween party invitations, horror game titles, YouTube thumbnails, Twitch overlays,
                or social media graphics, our bloody text generator provides professional-quality results in seconds.
                The intuitive interface makes it easy for anyone to create terrifying text effects, no design experience required.
              </p>

              <p>
                <strong className="text-red-400">Popular use cases include:</strong> Halloween decorations and signage,
                horror movie posters, haunted house attractions, zombie apocalypse themes, vampire and werewolf designs,
                gore and slasher aesthetics, creepy pasta content, horror game branding, and scary social media posts.
              </p>

              <p>
                Start creating your bloody text masterpiece today and unleash the horror! With our powerful customization
                options and instant download feature, you'll have professional-quality bloody text ready for your project
                in minutes.
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-red-900/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Skull className="w-6 h-6 text-red-600" />
                <span className="text-lg font-bold text-red-500">Brat Generator</span>
              </Link>
              <p className="text-slate-400 text-sm">
                Create stunning text effects with our free online generators. No sign-up required!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/generators" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    All Generators
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Generators */}
            <div>
              <h3 className="text-white font-semibold mb-4">Popular Generators</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/generators/vaporwave-text" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Vaporwave Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/spamton-text" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Spamton Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/corrupted-text" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Corrupted Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/rainbow-text" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Rainbow Text
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-red-500 text-sm transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Brat Generator. All rights reserved. Create amazing text effects for free!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


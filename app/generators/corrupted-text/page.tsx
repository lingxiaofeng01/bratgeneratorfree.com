'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Skull, Menu, X, Copy, RotateCcw, Zap, Star, Sparkles, AlertCircle, CheckCircle2, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

// Unicode diacritics ranges for corrupted text
const DIACRITICS_TOP = [
  '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
  '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
  '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u031A', '\u031B', '\u033D',
  '\u033E', '\u033F', '\u0340', '\u0341', '\u0342', '\u0343', '\u0344', '\u0346',
  '\u034A', '\u034B', '\u034C', '\u0350', '\u0351', '\u0352', '\u0357', '\u035B',
  '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036A',
  '\u036B', '\u036C', '\u036D', '\u036E', '\u036F'
];

const DIACRITICS_MIDDLE = [
  '\u0315', '\u031C', '\u031D', '\u031E', '\u031F', '\u0320', '\u0321', '\u0322',
  '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u032A',
  '\u032B', '\u032C', '\u032D', '\u032E', '\u032F', '\u0330', '\u0331', '\u0332',
  '\u0333', '\u0339', '\u033A', '\u033B', '\u033C', '\u0345', '\u0347', '\u0348',
  '\u0349', '\u034D', '\u034E', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359',
  '\u035A', '\u0358'
];

const DIACRITICS_BOTTOM = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031C', '\u031D', '\u031E', '\u031F',
  '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032A', '\u032B', '\u032C',
  '\u032D', '\u032E', '\u032F', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339',
  '\u033A', '\u033B', '\u033C', '\u0345', '\u0347', '\u0348', '\u0349', '\u034D',
  '\u034E', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035A', '\u0323'
];

interface PresetStyle {
  name: string;
  icon: any;
  description: string;
  top: number;
  middle: number;
  bottom: number;
  intensity: number;
}

const PRESET_STYLES: PresetStyle[] = [
  {
    name: 'Mild Chaos',
    icon: Sparkles,
    description: 'Subtle corruption effect',
    top: 2,
    middle: 1,
    bottom: 2,
    intensity: 30
  },
  {
    name: 'Moderate Glitch',
    icon: Zap,
    description: 'Balanced corruption',
    top: 5,
    middle: 2,
    bottom: 5,
    intensity: 50
  },
  {
    name: 'Heavy Corruption',
    icon: AlertCircle,
    description: 'Strong distortion',
    top: 10,
    middle: 3,
    bottom: 10,
    intensity: 75
  },
  {
    name: 'Extreme Zalgo',
    icon: Skull,
    description: 'Maximum chaos',
    top: 20,
    middle: 5,
    bottom: 20,
    intensity: 100
  },
  {
    name: 'Top Heavy',
    icon: Star,
    description: 'Corruption above text',
    top: 15,
    middle: 0,
    bottom: 2,
    intensity: 60
  },
  {
    name: 'Bottom Heavy',
    icon: Star,
    description: 'Corruption below text',
    top: 2,
    middle: 0,
    bottom: 15,
    intensity: 60
  }
];

export default function CorruptedTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('Corrupted Text Generator');
  const [outputText, setOutputText] = useState('');
  const [topIntensity, setTopIntensity] = useState(5);
  const [middleIntensity, setMiddleIntensity] = useState(2);
  const [bottomIntensity, setBottomIntensity] = useState(5);
  const [enableTop, setEnableTop] = useState(true);
  const [enableMiddle, setEnableMiddle] = useState(true);
  const [enableBottom, setEnableBottom] = useState(true);
  const [randomization, setRandomization] = useState(50);
  const [copySuccess, setCopySuccess] = useState(false);
  const [unzalgoMode, setUnzalgoMode] = useState(false);

  // Update page title and meta
  useEffect(() => {
    document.title = 'Corrupted Text Generator - Create Zalgo & Glitch Text Online Free';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free corrupted text generator with advanced controls. Create creepy Zalgo text, glitch effects, and distorted fonts. Customize intensity, randomization, and direction. Copy instantly!');
    }
  }, []);

  // Generate corrupted text
  const generateCorruptedText = useCallback((text: string): string => {
    if (!text) return '';

    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      // Skip whitespace and newlines
      if (char === ' ' || char === '\n' || char === '\t') {
        result += char;
        continue;
      }

      let corruptedChar = char;

      // Add top diacritics
      if (enableTop && topIntensity > 0) {
        const count = Math.floor(topIntensity * (1 - (Math.random() * randomization / 100)));
        for (let j = 0; j < count; j++) {
          const randomDiacritic = DIACRITICS_TOP[Math.floor(Math.random() * DIACRITICS_TOP.length)];
          corruptedChar += randomDiacritic;
        }
      }

      // Add middle diacritics
      if (enableMiddle && middleIntensity > 0) {
        const count = Math.floor(middleIntensity * (1 - (Math.random() * randomization / 100)));
        for (let j = 0; j < count; j++) {
          const randomDiacritic = DIACRITICS_MIDDLE[Math.floor(Math.random() * DIACRITICS_MIDDLE.length)];
          corruptedChar += randomDiacritic;
        }
      }

      // Add bottom diacritics
      if (enableBottom && bottomIntensity > 0) {
        const count = Math.floor(bottomIntensity * (1 - (Math.random() * randomization / 100)));
        for (let j = 0; j < count; j++) {
          const randomDiacritic = DIACRITICS_BOTTOM[Math.floor(Math.random() * DIACRITICS_BOTTOM.length)];
          corruptedChar += randomDiacritic;
        }
      }

      result += corruptedChar;
    }

    return result;
  }, [topIntensity, middleIntensity, bottomIntensity, enableTop, enableMiddle, enableBottom, randomization]);

  // UnZalgo function - remove all diacritics
  const unzalgoText = useCallback((text: string): string => {
    if (!text) return '';
    
    // Remove all combining diacritical marks (Unicode range U+0300 to U+036F)
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }, []);

  // Update output when inputs change
  useEffect(() => {
    if (unzalgoMode) {
      setOutputText(unzalgoText(inputText));
    } else {
      setOutputText(generateCorruptedText(inputText));
    }
  }, [inputText, generateCorruptedText, unzalgoText, unzalgoMode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setInputText('Corrupted Text Generator');
    setTopIntensity(5);
    setMiddleIntensity(2);
    setBottomIntensity(5);
    setEnableTop(true);
    setEnableMiddle(true);
    setEnableBottom(true);
    setRandomization(50);
    setUnzalgoMode(false);
  };

  const applyPreset = (preset: PresetStyle) => {
    setTopIntensity(preset.top);
    setMiddleIntensity(preset.middle);
    setBottomIntensity(preset.bottom);
    setRandomization(preset.intensity);
    setEnableTop(preset.top > 0);
    setEnableMiddle(preset.middle > 0);
    setEnableBottom(preset.bottom > 0);
    setUnzalgoMode(false);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `corrupted-text-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Skull className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Brat Generator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/generators" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                All Generators
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Blog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                About
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                Home
              </Link>
              <Link href="/generators" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                All Generators
              </Link>
              <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                Blog
              </Link>
              <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                About
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Skull className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Corrupted Text Generator
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            Create Creepy Zalgo & Glitch Text Effects with Our Corrupted Text Generator
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Transform your text into corrupted, glitchy, and creepy Zalgo text with our advanced Corrupted Text Generator. Perfect for social media, gaming, and creative projects.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Preset Styles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-purple-600" />
            Quick Presets
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PRESET_STYLES.map((preset, index) => {
              const Icon = preset.icon;
              return (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="group relative bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{preset.name}</h3>
                  <p className="text-xs text-gray-500">{preset.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Generator */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <Card className="p-6 bg-white shadow-xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-semibold text-gray-900">Input Text</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-[200px] text-lg font-mono resize-none border-2 border-gray-300 focus:border-purple-500 rounded-lg"
            />
          </Card>

          {/* Output Section */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-semibold text-gray-900">
                {unzalgoMode ? 'Cleaned Text' : 'Corrupted Text'}
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {copySuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
            <Textarea
              value={outputText}
              readOnly
              placeholder={unzalgoMode ? "Cleaned text will appear here..." : "Corrupted text will appear here..."}
              className="min-h-[200px] text-lg font-mono resize-none bg-white/50 border-2 border-purple-300 rounded-lg"
            />
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="p-8 bg-white shadow-xl border-2 border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            Advanced Controls
          </h2>

          {/* UnZalgo Mode Toggle */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">UnZalgo Mode</h3>
                  <p className="text-sm text-gray-600">Remove corruption and restore clean text</p>
                </div>
              </div>
              <Checkbox
                checked={unzalgoMode}
                onCheckedChange={(checked) => setUnzalgoMode(checked as boolean)}
                className="w-6 h-6"
              />
            </div>
          </div>

          {!unzalgoMode && (
            <div className="space-y-8">
              {/* Top Diacritics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={enableTop}
                      onCheckedChange={(checked) => setEnableTop(checked as boolean)}
                      className="w-5 h-5"
                    />
                    <Label className="text-base font-semibold text-gray-900">
                      Top Corruption
                    </Label>
                  </div>
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    {topIntensity}
                  </span>
                </div>
                <Slider
                  value={[topIntensity]}
                  onValueChange={(value) => setTopIntensity(value[0])}
                  max={25}
                  step={1}
                  disabled={!enableTop}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Add diacritical marks above characters
                </p>
              </div>

              {/* Middle Diacritics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={enableMiddle}
                      onCheckedChange={(checked) => setEnableMiddle(checked as boolean)}
                      className="w-5 h-5"
                    />
                    <Label className="text-base font-semibold text-gray-900">
                      Middle Corruption
                    </Label>
                  </div>
                  <span className="text-sm font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                    {middleIntensity}
                  </span>
                </div>
                <Slider
                  value={[middleIntensity]}
                  onValueChange={(value) => setMiddleIntensity(value[0])}
                  max={10}
                  step={1}
                  disabled={!enableMiddle}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Add diacritical marks through characters
                </p>
              </div>

              {/* Bottom Diacritics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={enableBottom}
                      onCheckedChange={(checked) => setEnableBottom(checked as boolean)}
                      className="w-5 h-5"
                    />
                    <Label className="text-base font-semibold text-gray-900">
                      Bottom Corruption
                    </Label>
                  </div>
                  <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                    {bottomIntensity}
                  </span>
                </div>
                <Slider
                  value={[bottomIntensity]}
                  onValueChange={(value) => setBottomIntensity(value[0])}
                  max={25}
                  step={1}
                  disabled={!enableBottom}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Add diacritical marks below characters
                </p>
              </div>

              {/* Randomization */}
              <div className="space-y-4 pt-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold text-gray-900">
                    Randomization
                  </Label>
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                    {randomization}%
                  </span>
                </div>
                <Slider
                  value={[randomization]}
                  onValueChange={(value) => setRandomization(value[0])}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Control variation in corruption intensity across characters
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Skull className="w-5 h-5 text-purple-600" />
              What is Corrupted Text?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Corrupted text, also known as Zalgo text or glitch text, is created by combining regular characters with Unicode diacritical marks. These marks are normally used for accents and pronunciation, but when stacked excessively, they create a creepy, distorted appearance. Our Corrupted Text Generator makes it easy to create these effects.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This effect became popular in internet culture for creating eerie, supernatural-looking text that appears to "break" normal formatting rules. Use our Corrupted Text Generator to create professional corrupted text effects.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              How to Use This Corrupted Text Generator
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">1.</span>
                <span>Type or paste your text in the Corrupted Text Generator input box</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">2.</span>
                <span>Choose a preset or customize corruption levels in the Corrupted Text Generator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">3.</span>
                <span>Adjust top, middle, and bottom intensity sliders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">4.</span>
                <span>Copy the corrupted text and use it anywhere!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">5.</span>
                <span>Use UnZalgo mode to clean corrupted text</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real-time Preview</h3>
              <p className="text-gray-600">
                See your corrupted text update instantly as you adjust settings in our Corrupted Text Generator
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">6 Quick Presets</h3>
              <p className="text-gray-600">
                Choose from carefully crafted Corrupted Text Generator presets for instant results
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-red-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Controls</h3>
              <p className="text-gray-600">
                Fine-tune top, middle, bottom corruption and randomization
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">UnZalgo Mode</h3>
              <p className="text-gray-600">
                Remove corruption and restore text to its original form
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">One-Click Copy</h3>
              <p className="text-gray-600">
                Copy your corrupted text to clipboard instantly
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Download as File</h3>
              <p className="text-gray-600">
                Save your corrupted text as a .txt file for later use
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mb-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our Corrupted Text Generator?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Corrupted Text Generator is the most advanced and user-friendly tool for creating Zalgo text, glitch text, and corrupted text effects online. Unlike other corrupted text generators, we offer precise 3-direction control (top, middle, bottom), 6 professionally designed presets, and an exclusive UnZalgo mode for cleaning corrupted text. Whether you're creating content for social media, gaming, or creative projects, our Corrupted Text Generator provides the perfect balance of power and simplicity.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Corrupted Text Generator uses authentic Unicode diacritical marks to create professional-looking corrupted text that works across all platforms. With real-time preview, one-click copy, and download features, our Corrupted Text Generator makes it easy to create and share your corrupted text creations. Try our free Corrupted Text Generator today and experience the difference!
          </p>
        </div>

        {/* FAQ Section */}
        <Card className="p-8 bg-white shadow-xl border-2 border-gray-200 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What is Zalgo text?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Zalgo text is a form of corrupted text created by combining normal characters with excessive Unicode diacritical marks. It creates a creepy, glitchy appearance that seems to "break" normal text formatting. The name comes from an internet meme character associated with chaos and corruption. Our Corrupted Text Generator specializes in creating authentic Zalgo text effects.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Where can I use corrupted text?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You can use corrupted text from our Corrupted Text Generator on most social media platforms (Twitter, Facebook, Instagram, Discord), messaging apps, forums, and anywhere that supports Unicode text. However, some platforms may filter or limit excessive diacritics to prevent abuse.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Is corrupted text safe to use?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, corrupted text is completely safe. It uses standard Unicode characters that are part of the official character set. However, excessive corruption can make text difficult to read and may cause display issues on some older systems or applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How does the UnZalgo feature work?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The UnZalgo feature removes all combining diacritical marks from text, restoring it to its original readable form. This is useful when you receive corrupted text and want to see what it originally said, or if you want to clean up text that has too much corruption.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Can I control how corrupted the text looks?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely! Our generator offers advanced controls including separate intensity sliders for top, middle, and bottom corruption, randomization settings, and quick presets. You can create anything from subtle glitch effects to extreme corruption.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Will corrupted text work on mobile devices?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, corrupted text from our Corrupted Text Generator works on most modern mobile devices. However, the appearance may vary slightly depending on the device's font rendering engine and operating system. Our Corrupted Text Generator is fully responsive and works great on mobile browsers.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Skull className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Brat Generator</span>
              </div>
              <p className="text-gray-400 text-sm">
                Create stunning text effects and designs with our free online generators.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Generators</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/generators/glitter-text" className="hover:text-white transition-colors">
                    Glitter Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/rainbow-text" className="hover:text-white transition-colors">
                    Rainbow Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/mirror-text" className="hover:text-white transition-colors">
                    Mirror Text
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
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
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
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
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

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Brat Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


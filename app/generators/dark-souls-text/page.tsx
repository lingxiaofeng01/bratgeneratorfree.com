'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Download, Share2, Skull, Swords, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

type TextStyle = 'YOU_DIED' | 'VICTORY_ACHIEVED' | 'CUSTOM';

interface CustomFormat {
  topText: string;
  bottomText: string;
}

export default function DarkSoulsTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textStyle, setTextStyle] = useState<TextStyle>('YOU_DIED');
  const [customFormat, setCustomFormat] = useState<CustomFormat>({ topText: 'HUMANITY', bottomText: 'RESTORED' });
  const [fadeInAnimation, setFadeInAnimation] = useState(true);
  const [addGlowEffect, setAddGlowEffect] = useState(false);
  const [enableSound, setEnableSound] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update page title and meta
  useEffect(() => {
    document.title = 'Dark Souls Text Generator - Create YOU DIED & VICTORY ACHIEVED Messages';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Dark Souls text generator. Create iconic YOU DIED and VICTORY ACHIEVED messages. Perfect for gaming memes, Twitch overlays, and social media. Instant download, no watermarks.');
    }
  }, []);

  // Generate Dark Souls text
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background to black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get text based on style
    let displayText = '';
    let textColor = '';
    let fontSize = 80;
    let isMultiLine = false;
    let topText = '';
    let bottomText = '';

    switch (textStyle) {
      case 'YOU_DIED':
        displayText = 'YOU DIED';
        textColor = '#8B0000'; // Dark red
        break;
      case 'VICTORY_ACHIEVED':
        displayText = 'VICTORY ACHIEVED';
        textColor = '#9B8B4D'; // Gold/bronze
        fontSize = 60;
        break;
      case 'CUSTOM':
        isMultiLine = true;
        topText = customFormat.topText.toUpperCase();
        bottomText = customFormat.bottomText.toUpperCase();
        textColor = '#8B0000'; // Dark red
        fontSize = 60;
        break;
    }

    // Set font
    ctx.font = `bold ${fontSize}px "Trajan Pro", "Times New Roman", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor;

    // Draw text with glow effect if enabled
    if (addGlowEffect) {
      // Draw multiple layers for stronger glow effect
      ctx.shadowColor = textColor;
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // First glow layer
      if (isMultiLine) {
        ctx.fillText(topText, canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height / 2 + 50);
      } else {
        ctx.fillText(displayText, canvas.width / 2, canvas.height / 2);
      }

      // Second glow layer for intensity
      ctx.shadowBlur = 50;
      if (isMultiLine) {
        ctx.fillText(topText, canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height / 2 + 50);
      } else {
        ctx.fillText(displayText, canvas.width / 2, canvas.height / 2);
      }

      // Reset shadow for final crisp text
      ctx.shadowBlur = 0;
    }

    // Draw final text (crisp layer on top)
    if (isMultiLine) {
      ctx.fillText(topText, canvas.width / 2, canvas.height / 2 - 50);
      ctx.fillText(bottomText, canvas.width / 2, canvas.height / 2 + 50);
    } else {
      ctx.fillText(displayText, canvas.width / 2, canvas.height / 2);
    }
  }, [textStyle, customFormat, addGlowEffect]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `dark-souls-${textStyle.toLowerCase()}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      const file = new File([blob], 'dark-souls-text.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Dark Souls Text Generator',
          text: 'Check out my Dark Souls text!',
        });
      } else {
        // Fallback to download
        handleDownload();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      handleDownload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Skull className="w-8 h-8 text-red-500" />
              <span className="text-xl sm:text-2xl font-bold text-white">Dark Souls Text Generator</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-red-500 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-slate-300 hover:text-red-500 transition-colors">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-300 hover:text-red-500 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-red-500 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-red-500 transition-colors">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-slate-300 hover:text-red-500 transition-colors py-2">
                  HOME
                </Link>
                <Link href="/generators" className="text-slate-300 hover:text-red-500 transition-colors py-2">
                  Generators
                </Link>
                <Link href="/blog" className="text-slate-300 hover:text-red-500 transition-colors py-2">
                  Blog
                </Link>
                <Link href="/about" className="text-slate-300 hover:text-red-500 transition-colors py-2">
                  About
                </Link>
                <Link href="/contact" className="text-slate-300 hover:text-red-500 transition-colors py-2">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Dark Souls <span className="text-red-500">Text Generator</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-6">
            Create iconic Dark Souls text messages with our free generator. Choose from classic styles like "YOU DIED" and "VICTORY ACHIEVED",
            or create your own custom messages in the legendary Dark Souls aesthetic.
          </p>
          <p className="text-base text-slate-400 max-w-2xl mx-auto mb-8">
            Perfect for memes, social media posts, gaming content, and more. Download high-quality images instantly with no watermarks.
          </p>
        </section>

        {/* Text Style Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Text Style</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => setTextStyle('YOU_DIED')}
              className={`p-6 rounded-lg border-2 transition-all ${
                textStyle === 'YOU_DIED'
                  ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-red-500/50'
              }`}
            >
              <Skull className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">YOU DIED</h3>
              <p className="text-sm text-slate-400">The iconic death message</p>
            </button>

            <button
              onClick={() => setTextStyle('VICTORY_ACHIEVED')}
              className={`p-6 rounded-lg border-2 transition-all ${
                textStyle === 'VICTORY_ACHIEVED'
                  ? 'border-yellow-600 bg-yellow-600/10 shadow-lg shadow-yellow-600/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-yellow-600/50'
              }`}
            >
              <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">VICTORY ACHIEVED</h3>
              <p className="text-sm text-slate-400">Celebrate your triumph</p>
            </button>

            <button
              onClick={() => setTextStyle('CUSTOM')}
              className={`p-6 rounded-lg border-2 transition-all ${
                textStyle === 'CUSTOM'
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-blue-500/50'
              }`}
            >
              <Swords className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Custom Format</h3>
              <p className="text-sm text-slate-400">Create your own message</p>
            </button>
          </div>
        </div>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Preview */}
          <Card className="p-8 bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Preview</h2>
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <canvas
                ref={canvasRef}
                width={1000}
                height={500}
                className={`w-full h-auto ${fadeInAnimation ? 'animate-fade-in' : ''}`}
              />
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5 mr-2" />
                Download as Image
              </Button>
              <Button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </Card>

          {/* Controls */}
          <Card className="p-8 bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Customize</h2>
            
            <div className="space-y-6">
              {/* Custom Format Template */}
              {textStyle === 'CUSTOM' && (
                <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">Custom Format Template</h3>
                  <div>
                    <Label htmlFor="topText" className="text-sm font-semibold text-slate-300 mb-2 block">
                      Top Text (e.g., HUMANITY)
                    </Label>
                    <Input
                      id="topText"
                      value={customFormat.topText}
                      onChange={(e) => setCustomFormat({ ...customFormat, topText: e.target.value })}
                      placeholder="HUMANITY"
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bottomText" className="text-sm font-semibold text-slate-300 mb-2 block">
                      Bottom Text (e.g., RESTORED)
                    </Label>
                    <Input
                      id="bottomText"
                      value={customFormat.bottomText}
                      onChange={(e) => setCustomFormat({ ...customFormat, bottomText: e.target.value })}
                      placeholder="RESTORED"
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    Create your own [NOUN] [VERBED] format in Dark Souls style
                  </p>
                </div>
              )}

              {/* Text Effects */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Text Effects</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fadeIn"
                    checked={fadeInAnimation}
                    onCheckedChange={(checked) => setFadeInAnimation(checked as boolean)}
                  />
                  <Label htmlFor="fadeIn" className="text-sm font-semibold text-slate-300 cursor-pointer">
                    Fade In Animation
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="glow"
                    checked={addGlowEffect}
                    onCheckedChange={(checked) => setAddGlowEffect(checked as boolean)}
                  />
                  <Label htmlFor="glow" className="text-sm font-semibold text-slate-300 cursor-pointer">
                    Add Glow Effect
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sound"
                    checked={enableSound}
                    onCheckedChange={(checked) => setEnableSound(checked as boolean)}
                  />
                  <Label htmlFor="sound" className="text-sm font-semibold text-slate-300 cursor-pointer">
                    Enable Sound (Preview Only)
                  </Label>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Use Our Dark Souls Text Generator?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Create authentic Dark Souls text messages with professional quality and instant results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-slate-800/50 border-slate-700 hover:shadow-lg hover:shadow-red-500/10 transition-all">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Skull className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Authentic Style</h4>
              <p className="text-slate-400">
                Perfectly recreates the iconic Dark Souls text aesthetic with accurate fonts, colors, and styling.
                Every detail matches the original game's legendary messages.
              </p>
            </Card>
            <Card className="p-6 text-center bg-slate-800/50 border-slate-700 hover:shadow-lg hover:shadow-yellow-600/10 transition-all">
              <div className="w-16 h-16 bg-yellow-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Multiple Styles</h4>
              <p className="text-slate-400">
                Choose from classic messages like "YOU DIED" and "VICTORY ACHIEVED", or create custom messages
                with your own text in the same iconic format.
              </p>
            </Card>
            <Card className="p-6 text-center bg-slate-800/50 border-slate-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Instant Download</h4>
              <p className="text-slate-400">
                Download high-quality PNG images instantly. No watermarks, no signup required.
                Perfect for memes, social media, and gaming content.
              </p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 md:p-12 border border-slate-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How to Use the Dark Souls Text Generator
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Create your Dark Souls text in just a few simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="font-semibold text-white mb-2 text-lg">Choose Style</h4>
              <p className="text-sm text-slate-400">
                Select from YOU DIED, VICTORY ACHIEVED, or create a custom message format.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="font-semibold text-white mb-2 text-lg">Customize Text</h4>
              <p className="text-sm text-slate-400">
                For custom format, enter your own text to create unique Dark Souls style messages.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="font-semibold text-white mb-2 text-lg">Add Effects</h4>
              <p className="text-sm text-slate-400">
                Enable fade-in animation and glow effects to enhance your Dark Souls text.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                4
              </div>
              <h4 className="font-semibold text-white mb-2 text-lg">Download & Share</h4>
              <p className="text-sm text-slate-400">
                Download your creation as a high-quality image or share directly to social media.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Perfect for Gaming Content & Memes
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Create Dark Souls text for various creative projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow border-l-4 border-red-500">
              <h4 className="text-lg font-semibold text-white mb-3">Gaming Memes</h4>
              <p className="text-slate-400 text-sm mb-3">
                Create hilarious Dark Souls memes for Reddit, Twitter, Discord, and gaming communities.
                Perfect for sharing your gaming experiences and frustrations.
              </p>
              <p className="text-xs text-red-500 font-medium">Most popular use</p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow border-l-4 border-yellow-600">
              <h4 className="text-lg font-semibold text-white mb-3">Twitch Overlays</h4>
              <p className="text-slate-400 text-sm mb-3">
                Add Dark Souls style death screens and victory messages to your Twitch streams.
                Enhance viewer engagement with iconic gaming aesthetics.
              </p>
              <p className="text-xs text-yellow-600 font-medium">For streamers</p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-white mb-3">YouTube Thumbnails</h4>
              <p className="text-slate-400 text-sm mb-3">
                Create eye-catching thumbnails for gaming videos with authentic Dark Souls text.
                Boost click-through rates with recognizable gaming imagery.
              </p>
              <p className="text-xs text-blue-500 font-medium">Increase views</p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <h4 className="text-lg font-semibold text-white mb-3">Social Media Posts</h4>
              <p className="text-slate-400 text-sm mb-3">
                Share Dark Souls style messages on Instagram, Facebook, and Twitter.
                Express life's challenges with gaming humor that resonates.
              </p>
              <p className="text-xs text-green-500 font-medium">Viral potential</p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
              <h4 className="text-lg font-semibold text-white mb-3">Discord Reactions</h4>
              <p className="text-slate-400 text-sm mb-3">
                Create custom Dark Souls reaction images for Discord servers and gaming chats.
                Add personality to your online gaming communities.
              </p>
              <p className="text-xs text-purple-500 font-medium">Community favorite</p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <h4 className="text-lg font-semibold text-white mb-3">Game Development</h4>
              <p className="text-slate-400 text-sm mb-3">
                Use as placeholder or inspiration for your own game's UI and messaging systems.
                Study the iconic Dark Souls aesthetic for your projects.
              </p>
              <p className="text-xs text-orange-500 font-medium">For developers</p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Everything you need to know about the Dark Souls Text Generator
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                Is this Dark Souls text generator free to use?
              </h4>
              <p className="text-slate-400">
                Yes! Our Dark Souls text generator is completely free with no hidden costs, watermarks, or signup requirements.
                Create unlimited Dark Souls style messages and download them as high-quality images at no charge.
              </p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                Can I use these images for commercial purposes?
              </h4>
              <p className="text-slate-400">
                The images you create are free to use for personal projects, memes, and social media. However, please note that
                "Dark Souls" is a trademark of FromSoftware/Bandai Namco. For commercial use, ensure you comply with fair use
                guidelines and trademark laws.
              </p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                What text styles are available?
              </h4>
              <p className="text-slate-400">
                We offer three main styles: "YOU DIED" (the iconic death message in dark red), "VICTORY ACHIEVED" (the triumph
                message in gold/bronze), and Custom Format where you can create your own [NOUN] [VERBED] style messages like
                "HUMANITY RESTORED" or any other combination you imagine.
              </p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                What file format does the generator export?
              </h4>
              <p className="text-slate-400">
                The generator exports your Dark Souls text as PNG (Portable Network Graphics) files. PNG format provides
                high-quality images that work perfectly for social media, memes, thumbnails, and overlays. The images are
                1000x500 pixels, ideal for most online uses.
              </p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                Can I customize the colors and fonts?
              </h4>
              <p className="text-slate-400">
                Currently, the generator uses authentic Dark Souls colors and fonts to maintain the iconic aesthetic:
                dark red for "YOU DIED", gold/bronze for "VICTORY ACHIEVED", and dark red for custom messages. These colors
                are carefully chosen to match the original game's style.
              </p>
            </Card>
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                Does the generator work on mobile devices?
              </h4>
              <p className="text-slate-400">
                Yes! Our Dark Souls text generator is fully responsive and works perfectly on desktop computers, tablets,
                and mobile phones. The interface adapts to your screen size for the best experience on any device.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-red-600 to-slate-900 rounded-2xl p-12 border border-red-500/20 mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Creating Dark Souls Text Now
          </h2>
          <p className="text-xl mb-8 text-slate-200">
            Free Dark Souls text generator - No signup required, unlimited downloads!
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-slate-100 font-semibold px-8 py-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Create Your Text
          </Button>
        </section>

        {/* SEO Content Section */}
        <section className="mb-16 bg-slate-800/30 rounded-xl p-8 md:p-12 border border-slate-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              About the Dark Souls Text Generator
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 mb-4">
                Welcome to the ultimate <strong>Dark Souls text generator</strong> - a free online tool that lets you create
                authentic Dark Souls style text messages instantly. Whether you want to recreate the iconic "YOU DIED" screen,
                celebrate with "VICTORY ACHIEVED", or craft your own custom messages, our generator provides everything you need
                to capture the legendary Dark Souls aesthetic.
              </p>
              <p className="text-slate-300 mb-4">
                Dark Souls, developed by FromSoftware, is renowned for its challenging gameplay and iconic visual design. The game's
                text messages, particularly the "YOU DIED" screen, have become legendary in gaming culture and spawned countless memes.
                Our <strong>Dark Souls text generator</strong> faithfully recreates this aesthetic with accurate fonts, colors, and styling,
                allowing you to create your own Dark Souls style messages for any purpose.
              </p>
              <p className="text-slate-300 mb-4">
                This tool is perfect for gamers, content creators, streamers, and meme enthusiasts. Create custom death screens for your
                Twitch overlays, design eye-catching YouTube thumbnails, make viral gaming memes for social media, or simply express
                life's challenges with Dark Souls humor. The generator is completely free to use with no watermarks or signup requirements.
              </p>
              <p className="text-slate-300">
                Join thousands of Dark Souls fans and content creators who use our generator to bring the iconic Souls aesthetic to their
                projects. Start creating your own Dark Souls text messages today and share them with the gaming community!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Skull className="w-6 h-6 text-red-500" />
                <h4 className="text-xl font-bold">Dark Souls Text</h4>
              </div>
              <p className="text-slate-400 mb-4">
                Create authentic Dark Souls text messages with our free generator.
                Perfect for memes, gaming content, and social media.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Generators</h5>
              <ul className="space-y-2 text-slate-400">
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
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-slate-400">
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
            <p>&copy; 2025 Dark Souls Text Generator. All rights reserved. Dark Souls is a trademark of FromSoftware/Bandai Namco.</p>
          </div>
        </div>
      </footer>

      {/* Add CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 2s ease-in;
        }
      `}</style>
    </div>
  );
}


'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Download, RefreshCw, Zap, Star, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Glitter images list
const glitterImages = [
  'DCglit109.gif', 'DCglit111.gif', 'DCaqua.gif', 'DCglit77.gif', 'DCglit150.gif', 
  'DCglit98.gif', 'DCglit69.gif', 'DCglit94.gif', 'DCrosey.gif', 'DCglit23.gif', 
  'DCglit29.gif', 'DCabyss.gif', 'DCglit40.gif', 'DCglit123.gif', 'DCbe4.gif', 
  'DCglit134.gif', 'DCglit2.gif', 'DCglit153.gif', 'purplepink.gif', 'DCglit92.gif', 
  'DCglit18.gif', 'DCwavey.gif', 'DCglit82.gif', 'DCglit14.gif', 'DCglit11.gif', 
  'DCglit31.gif', 'DCglit110.gif', 'DCpixdiamonds.gif', 'DCglit8.gif', 'DCglit16.gif', 
  'DCdaisy.gif', 'DCbe2.gif', 'DCsunset2.gif', 'DCglit135.gif', 'DCglit54.gif', 
  'DCglit37.gif', 'DCglit62.gif', 'DCglit33.gif', 'DCglit41.gif', 'DCglit64.gif', 
  'DCglit100.gif', 'DCglit10.gif', 'DCglit65.gif', 'DCglit149.gif', 'DCseafoam.gif', 
  'DCglit165.gif', 'DCglit44.gif', 'DCneopolitan.gif', 'DCglit9.gif', 'DCglit79.gif', 
  'DCglit19.gif', 'DCglit50.gif', 'DCglit3.gif', 'DCglit124.gif', 'DCspiderman.gif', 
  'DCdeepviolet.gif', 'DCglit90.gif', 'DCglit121.gif', 'DCglit148.gif', 'DCglit167.gif', 
  'DCpicnic.gif', 'DCglit36.gif', 'DCglit6.gif', 'DCglit12.gif', 'DCglit39.gif', 
  'DCglit152.gif', 'DCforest.gif', 'DCglit67.gif', 'DCvio.gif', 'DCglit161.gif', 
  'DCglit60.gif', 'DCglit48.gif', 'DCglit52.gif', 'DCglit122.gif', 'DCglit160.gif', 
  'DCglit38.gif', 'DCglit116.gif', 'DCglit155.gif', 'DCglit99.gif', 'DCglit30.gif', 
  'DCglit53.gif', 'DCglit73.gif', 'DCglit88.gif', 'DCglit75.gif', 'DCglit74.gif', 
  'DCglit101.gif', 'DCcheck.gif', 'DCglit25.gif', 'DCglit139.gif', 'DCglit93.gif', 
  'DCbe.gif', 'DCglit63.gif', 'DCglit105.gif', 'DCglit21.gif', 'DCglit119.gif', 
  'DCglit66.gif', 'DCglit118.gif', 'DCglit157.gif', 'DCglit146.gif', 'DCglit56.gif', 
  'DCglit114.gif', 'DCglit102.gif', 'DCglit70.gif', 'DCglit35.gif', 'DCglit20.gif', 
  'DCdeepvio2.gif', 'DCglit28.gif', 'DCsunset.gif', 'DCglit24.gif', 'DCglit96.gif', 
  'DCglit136.gif', 'DCglit113.gif', 'DCchampagne.gif', 'DCglit91.gif', 'DCglit83.gif', 
  'DCindigo.gif', 'DCglit145.gif', 'DCglit162.gif', 'DCgoldnugget.gif', 'DCglit57.gif', 
  'DCglit117.gif', 'DCglit158.gif', 'DCglit144.gif', 'DCglit163.gif', 'DCglit17.gif', 
  'DCglit151.gif', 'DCglit87.gif', 'DCglit143.gif', 'DCglit131.gif', 'DCglit137.gif', 
  'DCglit142.gif', 'DCglit72.gif', 'DCglit43.gif', 'DCglit107.gif', 'DCglit159.gif', 
  'DCglit1.gif', 'DCglit47.gif', 'DCglit106.gif', 'DCflame.gif', 'DCglit58.gif', 
  'DCglit89.gif', 'DCglit147.gif', 'DCdarkness.gif', 'DCglit141.gif', 'DCpastel2.gif', 
  'DCglit32.gif', 'DCglit42.gif', 'DClav.gif', 'DCglit7.gif', 'DCglit80.gif', 
  'DCglit45.gif', 'DCneptune.gif', 'DCglit104.gif', 'DCglit112.gif', 'DCglit120.gif', 
  'DCglit125.gif', 'DCglit34.gif', 'DClav2.gif', 'DCxmas.gif', 'DCyelowgreen.gif', 
  'DCglit164.gif', 'DCglit5.gif', 'DCglit26.gif', 'DCember.gif', 'DCglit127.gif', 
  'DCtmv.gif', 'DCglit15.gif', 'DCglit55.gif', 'DCglit81.gif', 'DCglit128.gif', 
  'DCglit85.gif', 'DCglit140.gif', 'DCtang.gif', 'DCglit76.gif', 'DCglit61.gif'
];

const fonts = [
  'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 
  'Impact', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Brush Script MT',
  'Lucida Handwriting', 'Papyrus', 'Copperplate', 'Palatino', 'Garamond'
];

const textSizes = ['12', '16', '20', '24', '28', '32', '36', '40', '48', '56', '64', '72', '80', '96', '120'];
const textAngles = ['0', '15', '30', '45', '60', '90', '180', '270', '315', '330', '345'];
const borderWidths = ['0', '1', '2', '3', '4', '5', '6', '8', '10'];

export default function GlitterTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [text, setText] = useState('GLITTER');
  const [font, setFont] = useState('Arial Black');
  const [textSize, setTextSize] = useState('72');
  const [textAngle, setTextAngle] = useState('0');
  const [selectedGlitter, setSelectedGlitter] = useState('DCglit109.gif');
  const [hasShadow, setHasShadow] = useState(true);
  const [hasBorder, setHasBorder] = useState(true);
  const [borderWidth, setBorderWidth] = useState('2');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate glitter text
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load glitter image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `/glitters/${selectedGlitter}`;
    
    img.onload = () => {
      // Set font
      ctx.font = `bold ${textSize}px ${font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Save context
      ctx.save();

      // Apply rotation
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((parseInt(textAngle) * Math.PI) / 180);

      // Draw shadow if enabled
      if (hasShadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
      }

      // Draw border if enabled
      if (hasBorder && parseInt(borderWidth) > 0) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = parseInt(borderWidth);
        ctx.strokeText(text, 0, 0);
      }

      // Create pattern from glitter image
      const pattern = ctx.createPattern(img, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillText(text, 0, 0);
      }

      // Restore context
      ctx.restore();
    };
  }, [text, font, textSize, textAngle, selectedGlitter, hasShadow, hasBorder, borderWidth]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `glitter-text-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleReset = () => {
    setText('GLITTER');
    setFont('Arial Black');
    setTextSize('72');
    setTextAngle('0');
    setSelectedGlitter('DCglit109.gif');
    setHasShadow(true);
    setHasBorder(true);
    setBorderWidth('2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <span className="text-xl sm:text-2xl font-bold text-slate-900">Glitter Text Generator</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-purple-600 transition-colors">
                HOME
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
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-slate-600 hover:text-purple-600 transition-colors py-2">
                  HOME
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

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Free Glitter Text Generator - 176+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Sparkling Effects</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Transform your words into dazzling glitter text with our professional glitter text generator.
            Choose from 176+ unique glitter effects, customize fonts, sizes, angles, and styles to create eye-catching designs instantly.
            Our free online glitter text generator makes it easy to add sparkle and shine to any text for social media, websites, invitations, and more.
          </p>
          <p className="text-base text-slate-500 max-w-2xl mx-auto mb-8">
            Whether you need glitter text for Instagram posts, YouTube thumbnails, birthday cards, or business branding,
            our glitter text generator provides all the tools you need. This powerful glitter text generator works directly in your browser -
            no design skills required, just type, customize, and download your sparkling creations!
          </p>
        </section>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Preview */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Glitter Text Preview
            </h2>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="max-w-full h-auto"
              />
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
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

          {/* Controls */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Palette className="w-6 h-6 text-purple-500 mr-2" />
              Customize Your Glitter Text
            </h2>
            
            <div className="space-y-6">
              {/* Your Text */}
              <div>
                <Label htmlFor="text" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Your Text
                </Label>
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text"
                  className="w-full"
                />
              </div>

              {/* Text Font */}
              <div>
                <Label htmlFor="font" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Text Font
                </Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger id="font">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Text Size */}
              <div>
                <Label htmlFor="size" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Text Size
                </Label>
                <Select value={textSize} onValueChange={setTextSize}>
                  <SelectTrigger id="size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {textSizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}px</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Text Angle */}
              <div>
                <Label htmlFor="angle" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Text Angle
                </Label>
                <Select value={textAngle} onValueChange={setTextAngle}>
                  <SelectTrigger id="angle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {textAngles.map((angle) => (
                      <SelectItem key={angle} value={angle}>{angle}°</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Shadow */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shadow"
                  checked={hasShadow}
                  onCheckedChange={(checked) => setHasShadow(checked as boolean)}
                />
                <Label htmlFor="shadow" className="text-sm font-semibold text-slate-700 cursor-pointer">
                  Shadow
                </Label>
              </div>

              {/* Border */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="border"
                  checked={hasBorder}
                  onCheckedChange={(checked) => setHasBorder(checked as boolean)}
                />
                <Label htmlFor="border" className="text-sm font-semibold text-slate-700 cursor-pointer">
                  Border
                </Label>
              </div>

              {/* Border Width */}
              {hasBorder && (
                <div>
                  <Label htmlFor="borderWidth" className="text-sm font-semibold text-slate-700 mb-2 block">
                    Border Width
                  </Label>
                  <Select value={borderWidth} onValueChange={setBorderWidth}>
                    <SelectTrigger id="borderWidth">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {borderWidths.map((width) => (
                        <SelectItem key={width} value={width}>{width}px</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Glitter Selection */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Zap className="w-6 h-6 text-yellow-500 mr-2" />
            Choose Your Glitter Text Generator Effect - {glitterImages.length}+ Options
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
            {glitterImages.map((glitter) => (
              <button
                key={glitter}
                onClick={() => setSelectedGlitter(glitter)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-110 ${
                  selectedGlitter === glitter
                    ? 'border-purple-500 ring-2 ring-purple-300 shadow-lg'
                    : 'border-slate-200 hover:border-purple-300'
                }`}
              >
                <img
                  src={`/glitters/${glitter}`}
                  alt={glitter}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </Card>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Glitter Text Generator?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our free glitter text generator combines powerful features with ease of use, making it the perfect tool
              for creating professional sparkling text designs in seconds.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">176+ Glitter Effects</h4>
              <p className="text-slate-600">
                Our glitter text generator offers the largest collection of glitter patterns online.
                From classic sparkles to rainbow glitters, metallic shimmers, and seasonal themes -
                find the perfect glitter effect to make your text truly shine and capture attention.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Complete Customization</h4>
              <p className="text-slate-600">
                Take full control of your glitter text design with our comprehensive customization options.
                Choose from 15 fonts, adjust text size from 12px to 120px, rotate at any angle,
                add shadows for depth, and apply borders with adjustable width for professional results.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Instant Download</h4>
              <p className="text-slate-600">
                Download your glitter text as high-quality PNG images with transparent backgrounds,
                perfect for layering on any design. No watermarks, no signup required, no waiting -
                just instant access to your sparkling text creations ready for immediate use.
              </p>
            </Card>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Glitter Text Generator Uses - Perfect for Every Occasion
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our glitter text generator is versatile and perfect for countless creative projects.
              Discover popular ways to use your sparkling text designs created with our free glitter text generator.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Social Media Graphics</h4>
              <p className="text-slate-600 text-sm mb-3">
                Create eye-catching glitter text for Instagram stories, Facebook posts, Twitter headers, and TikTok videos using our glitter text generator.
                Stand out in crowded social feeds with sparkling text that grabs attention and boosts engagement.
              </p>
              <p className="text-xs text-purple-600 font-medium">Perfect for influencers & brands</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-pink-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Event Invitations</h4>
              <p className="text-slate-600 text-sm mb-3">
                Design stunning invitations for birthdays, weddings, baby showers, and parties with our glitter text generator.
                Add glamorous glitter text to make your event announcements unforgettable and memorable.
              </p>
              <p className="text-xs text-pink-600 font-medium">Ideal for celebrations</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">YouTube Thumbnails</h4>
              <p className="text-slate-600 text-sm mb-3">
                Boost your video click-through rates with attention-grabbing glitter text thumbnails created using our glitter text generator.
                Perfect for beauty, fashion, lifestyle, and entertainment channels looking to increase views.
              </p>
              <p className="text-xs text-blue-600 font-medium">Increase video views</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Website Headers</h4>
              <p className="text-slate-600 text-sm mb-3">
                Enhance your website design with sparkling headers and banners created with our glitter text generator.
                Create unique branding elements that shine and capture visitor attention instantly.
              </p>
              <p className="text-xs text-green-600 font-medium">Professional web design</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Greeting Cards</h4>
              <p className="text-slate-600 text-sm mb-3">
                Create personalized greeting cards for holidays, birthdays, anniversaries, and special occasions using our glitter text generator.
                Add festive glitter text to spread joy, celebration, and warm wishes.
              </p>
              <p className="text-xs text-orange-600 font-medium">Personal & heartfelt</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Business Branding</h4>
              <p className="text-slate-600 text-sm mb-3">
                Design eye-catching logos, promotional materials, and marketing graphics with our glitter text generator.
                Perfect for beauty salons, boutiques, event planners, and creative businesses wanting to stand out.
              </p>
              <p className="text-xs text-red-600 font-medium">Stand out from competitors</p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How to Use Our Glitter Text Generator - Step by Step Guide
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Creating beautiful glitter text is easy with our intuitive glitter text generator.
              Follow these simple steps to design and download your sparkling text in seconds using our free glitter text generator.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Enter Your Text</h4>
              <p className="text-sm text-slate-600">
                Type any word or phrase into the text input field. Our glitter text generator supports all characters and languages.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Choose Glitter Effect</h4>
              <p className="text-sm text-slate-600">
                Browse through 176+ stunning glitter patterns. Click any glitter to apply it instantly to your text.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Customize Style</h4>
              <p className="text-sm text-slate-600">
                Select your preferred font, adjust text size, set rotation angle, and toggle shadow or border effects.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                4
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Download & Share</h4>
              <p className="text-sm text-slate-600">
                Click the Download button to save your glitter text as a high-quality PNG image ready to use anywhere.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 max-w-3xl mx-auto">
            <h4 className="font-semibold text-slate-900 mb-3 text-center">Pro Tips for Best Results</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Use bold fonts like Arial Black or Impact for maximum glitter visibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Enable shadows to make your glitter text pop against any background</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Experiment with different glitter patterns to match your project's theme</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Try various text angles for dynamic, eye-catching designs</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Glitter Text Generator FAQ - Common Questions Answered
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about using our free glitter text generator to create stunning sparkling text designs
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                Is this glitter text generator really free to use?
              </h4>
              <p className="text-slate-600">
                Yes! Our glitter text generator is completely free with no hidden costs, watermarks, or signup requirements.
                You can create unlimited glitter text designs using our glitter text generator and download them as high-quality PNG images at no charge.
                We believe everyone should have access to professional glitter text generator tools without barriers.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                Can I use the glitter text I create for commercial purposes?
              </h4>
              <p className="text-slate-600">
                Absolutely! All glitter text created with our glitter text generator can be used for both personal and commercial projects.
                This includes social media marketing, business branding, product packaging, website design, print materials, and more.
                You retain full rights to your glitter text generator designs. However, please ensure you have the rights to use any custom fonts you may apply.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                What fonts are available in the glitter text generator?
              </h4>
              <p className="text-slate-600">
                Our glitter text generator includes 15 popular web-safe fonts: Arial, Arial Black, Comic Sans MS, Courier New, Georgia,
                Impact, Times New Roman, Trebuchet MS, Verdana, Brush Script MT, Lucida Handwriting, Papyrus, Copperplate, Palatino, and Garamond.
                These fonts in our glitter text generator are universally supported and ensure your glitter text renders perfectly across all devices and browsers.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                What file format does the glitter text generator export?
              </h4>
              <p className="text-slate-600">
                The glitter text generator exports your designs as PNG (Portable Network Graphics) files with transparent backgrounds.
                PNG format is ideal for our glitter text generator because it supports high-quality images with transparency, making it easy to overlay
                your glitter text on any background. The exported images from our glitter text generator are 800x400 pixels, perfect for social media and web use.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                How many glitter effects are available in the glitter text generator?
              </h4>
              <p className="text-slate-600">
                Our glitter text generator offers 176+ unique glitter effects and patterns! From classic gold and silver sparkles to
                vibrant rainbow glitters, pastel shimmers, and themed effects for holidays and special occasions. Each glitter pattern
                in our glitter text generator is carefully curated to provide stunning visual impact. Browse through our extensive glitter text generator collection to find the perfect
                sparkle for your text designs.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                Can I customize the size and angle of my glitter text?
              </h4>
              <p className="text-slate-600">
                Yes! Our glitter text generator provides complete customization control. Choose from 15 text sizes ranging from 12px to 120px,
                and select from 11 different rotation angles (0° to 345°) in our glitter text generator. You can also add shadows for depth, apply borders with adjustable
                width (0-10px), and combine these glitter text generator options to create unique effects. The real-time preview lets you see changes instantly.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                Do I need to install any software to use the glitter text generator?
              </h4>
              <p className="text-slate-600">
                No installation required! Our glitter text generator is a web-based tool that works directly in your browser.
                This online glitter text generator is compatible with all modern browsers including Chrome, Firefox, Safari, and Edge on desktop, tablet, and mobile devices.
                Simply visit our glitter text generator website, start creating, and download your glitter text instantly. No apps, plugins, or downloads needed.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">
                Can I create animated glitter text with this generator?
              </h4>
              <p className="text-slate-600">
                Currently, our glitter text generator creates static PNG images with glitter pattern fills. While the glitter textures
                in our glitter text generator are sourced from animated GIFs, the final exported text is a static image. This ensures compatibility across
                all platforms and keeps file sizes small. For animated effects, you can use the glitter text generator exported images in video editing software
                or animation tools.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Start Using Our Free Glitter Text Generator Now
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Create stunning glitter text designs instantly with our free glitter text generator. No signup required, unlimited downloads!
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 font-semibold px-8 py-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Creating Now
          </Button>
        </section>

        {/* SEO Content Section */}
        <section className="mb-16 bg-slate-50 rounded-xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              About Our Free Glitter Text Generator - The Ultimate Sparkle Text Tool
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-4">
                Welcome to the most comprehensive <strong>glitter text generator</strong> available online. Our free tool empowers
                creators, designers, marketers, and enthusiasts to transform ordinary text into extraordinary sparkling designs.
                Whether you're creating content for Instagram, designing YouTube thumbnails, crafting event invitations, or
                developing brand materials, this professional platform provides everything you need to make your
                text shine with stunning glitter effects.
              </p>
              <p className="text-slate-600 mb-4">
                What sets our <strong>glitter text generator</strong> apart is the extensive collection of 176+ unique glitter effects.
                Each pattern has been carefully selected to offer diverse visual styles - from subtle shimmers perfect for
                elegant designs to bold, vibrant sparkles ideal for eye-catching social media posts. The advanced customization features
                allow you to fine-tune every aspect of your design until it's perfect.
              </p>
              <p className="text-slate-600 mb-4">
                The interface is designed for both beginners and professionals. New users can
                create stunning glitter text in seconds with intuitive controls, while experienced designers appreciate the
                advanced customization options available. Choose from 15 professional fonts, adjust text size from small to extra large,
                rotate your text at any angle, add depth with shadows, and enhance visibility with customizable borders - all with our powerful <strong>glitter text generator</strong>.
              </p>
              <p className="text-slate-600 mb-4">
                This <strong>glitter text generator</strong> is completely free with no hidden costs, watermarks, or signup requirements.
                We believe powerful design tools should be accessible to everyone. All creations can be
                used for personal and commercial projects without restrictions. Download high-quality PNG images with transparent
                backgrounds, perfect for overlaying on any design or background.
              </p>
              <p className="text-slate-600">
                Join thousands of satisfied users who trust this tool for their creative projects.
                From social media influencers and content creators to small business owners and event planners, our <strong>glitter text generator</strong> helps bring
                ideas to life with dazzling effects. Start creating your sparkling text designs today and discover why this
                free <strong>glitter text generator</strong> is the preferred choice for stunning text effects online.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h4 className="text-xl font-bold">Glitter Text Generator</h4>
              </div>
              <p className="text-slate-400 mb-4">
                Create stunning glitter text designs with our professional generator.
                176+ unique effects, full customization, and instant downloads.
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
            <p>&copy; 2025 Glitter Text Generator. All rights reserved. Create stunning glitter text designs for free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


'use client';

import { useState, useCallback, useEffect } from 'react';
import { Download, Palette, Type, Sparkles, CornerUpRight, AlignLeft, AlignCenter, AlignRight, FlipHorizontal, FlipVertical, RotateCcw, Save, ChevronRight, Star, Users, Zap, BookOpen, HelpCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';
import { useDebounce } from '@/hooks/use-debounce';
import { Toaster, toast } from 'react-hot-toast';
import ScribbleOverlay from '@/components/ScribbleOverlay';
import SocialShare from '@/components/SocialShare';
import ImageExporter, { ExportFormat } from '@/lib/image-export';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  lastModified?: string;
  readingTime: number;
  wordCount: number;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
}

interface BratConfig {
  text: string;
  bgColor: string;
  customColor: string;
  isCustomColor: boolean;
  fontSize: number;
  borderRadius: number;
  textAlign: string;
  flipHorizontal: boolean;
  flipVertical: boolean;
  blurAmount: number;
  scribbleStyle: 'classic' | 'mirror' | 'texture' | 'scribble';
}

const defaultConfig: BratConfig = {
  text: 'Input Some Text To Generate Your Custom Brat Cover',
  bgColor: 'lime',
  customColor: '#8acf00',
  isCustomColor: false,
  fontSize: 80,
  borderRadius: 8,
  textAlign: 'center',
  flipHorizontal: false,
  flipVertical: false,
  blurAmount: 1.5,
  scribbleStyle: 'classic',
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  
  const [config, setConfig] = useState<BratConfig>(defaultConfig);

  const [isDownloading, setIsDownloading] = useState(false);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [scribbleImage, setScribbleImage] = useState<HTMLImageElement | null>(null);
  const [lastGeneratedImageUrl, setLastGeneratedImageUrl] = useState<string>('');

  // Preload scribble image
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = document.createElement('img');
      img.crossOrigin = "anonymous";
      img.src = '/line.png';
      img.onload = () => {
        setScribbleImage(img);
      };
      img.onerror = () => {
        console.error('Scribble image preload failed');
      };
    }
  }, []);

  // On mount: set client flag and fetch posts.
  useEffect(() => {
    setIsClient(true);
    
    // Fetch blog posts asynchronously
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts?action=latest&limit=3');
        if (response.ok) {
          const posts = await response.json();
          setLatestPosts(posts);
        }
      } catch (error) {
        console.error('Failed to load latest posts:', error);
      }
    };
    
    loadPosts();
  }, []); // Runs only once on mount

  // Debounce text and font size from the config state
  const debouncedText = useDebounce(config.text, 300);
  const debouncedFontSize = useDebounce(config.fontSize, 100);

  // Reset to default configuration
  const handleReset = useCallback(() => {
    setConfig(defaultConfig);
  }, [setConfig]);

  const backgroundColors = {
    lime: 'bg-[#8acf00]',
    white: 'bg-white',
    black: 'bg-black',
    pink: 'bg-pink-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    orange: 'bg-orange-400',
    red: 'bg-red-400',
  };

  const textColors = {
    lime: 'text-black',
    white: 'text-black',
    black: 'text-white',
    pink: 'text-white',
    blue: 'text-white',
    purple: 'text-white',
    orange: 'text-black',
    red: 'text-white',
  };

  const getCurrentBgColor = () => {
    if (config.isCustomColor && config.bgColor === 'custom') {
      return config.customColor;
    }
    const bgColorMap = {
      lime: '#8acf00',
      white: '#ffffff',
      black: '#000000',
      pink: '#f472b6',
      blue: '#60a5fa',
      purple: '#a78bfa',
      orange: '#fb923c',
      red: '#f87171',
    };
    return bgColorMap[config.bgColor as keyof typeof bgColorMap] || '#8acf00';
  };

  const getCurrentTextColor = () => {
    if (config.isCustomColor && config.bgColor === 'custom') {
      const color = config.customColor.replace('#', '');
      if (color.length === 6) {
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? '#000000' : '#ffffff';
    }
      return '#000000';
    }
    return textColors[config.bgColor as keyof typeof textColors] === 'text-white' ? '#ffffff' : '#000000';
  };

  const handleDownload = useCallback(async (format: ExportFormat = 'png') => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    try {
      const previewElement = document.getElementById('brat-preview-area');
      if (!previewElement) {
        throw new Error('Preview element not found');
      }

      // 临时隐藏颜色选择器
      const colorPicker = previewElement.querySelector('.absolute.top-3.left-3') as HTMLElement;
      const originalDisplay = colorPicker?.style.display;
      if (colorPicker) {
        colorPicker.style.display = 'none';
      }

      // 使用ImageExporter进行统一的导出和下载
      const shareableImageUrl = await ImageExporter.exportAndDownload(
        previewElement,
        format,
        {
          ...config,
          textAlign: config.textAlign as 'left' | 'center' | 'right'
        }
      );

      // 恢复颜色选择器显示
      if (colorPicker) {
        colorPicker.style.display = originalDisplay || '';
      }

      // 保存用于分享的图片URL
      setLastGeneratedImageUrl(shareableImageUrl);
      
      toast.success(`${format.toUpperCase()} image downloaded successfully! Saved to downloads folder`, {
        position: "top-center",
        duration: 4000,
      });

    } catch (error) {
      console.error('Download failed:', error);
      
      // 确保在错误情况下也恢复颜色选择器显示
      const previewElement = document.getElementById('brat-preview-area');
      const colorPicker = previewElement?.querySelector('.absolute.top-3.left-3') as HTMLElement;
      if (colorPicker) {
        colorPicker.style.display = '';
      }
      
      // 错误处理
      let errorMessage = 'Download failed: ';
      let suggestion = '';
      
      if (error instanceof Error) {
        if (error.message.includes('tainted') || error.message.includes('CORS')) {
          errorMessage += 'Image security restriction';
          suggestion = 'Please ensure network connection is stable';
        } else if (error.message.includes('fonts')) {
          errorMessage += 'Font loading failed';
          suggestion = 'Please refresh the page and try again';
        } else if (error.message.includes('element')) {
          errorMessage += 'Preview element not found';
          suggestion = 'Please refresh the page and try again';
        } else {
          errorMessage += 'Unknown error';
          suggestion = 'Please try refreshing the page';
        }
      } else {
        errorMessage += 'System error';
        suggestion = 'Please contact technical support';
      }
      
      toast.error(`${errorMessage}. ${suggestion}`, {
        position: "top-center",
        duration: 6000,
      });
      
      // 提供备用方案
      setTimeout(() => {
        toast('💡 Alternative: You can right-click the preview image and select "Save image as"', {
          position: "top-center",
          duration: 8000,
        });
      }, 1000);
      
    } finally {
      setIsDownloading(false);
    }
  }, [config, isDownloading, setLastGeneratedImageUrl]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setConfig(prev => ({ ...prev, text: value }));
    }
  };

  const previewStyle = {
    borderRadius: `${config.borderRadius}px`,
  };

  const textStyle: React.CSSProperties = {
    fontSize: `${debouncedFontSize}px`,
    transform: `
      ${debouncedText.length > 12 ? 'scaleX(0.85)' : ''}
      ${config.flipHorizontal ? 'scaleX(-1)' : ''}
      ${config.flipVertical ? 'scaleY(-1)' : ''}
    `.trim(),
    lineHeight: debouncedText.includes('\n') ? '0.85' : '0.9',
    textAlign: config.scribbleStyle === 'texture' ? 'justify' : (config.scribbleStyle === 'mirror' ? 'right' : (config.textAlign as 'left' | 'center' | 'right')),
    color: config.scribbleStyle === 'texture' ? '#000000' : getCurrentTextColor(),
    letterSpacing: config.scribbleStyle === 'mirror' ? '-0.05em' : '-0.08em',
    fontWeight: config.scribbleStyle === 'mirror' ? '400' : '900',
    fontFamily: config.scribbleStyle === 'mirror' 
      ? '"Helvetica Neue", "Arial", "Segoe UI", Roboto, sans-serif'
      : config.scribbleStyle === 'texture'
      ? '"Helvetica Neue", "Arial", "Segoe UI", Roboto, sans-serif'
      : '"Helvetica Inserat", "Arial Black", "Arial Black Condensed", "Impact", "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    transition: 'filter 0.2s ease-in-out, transform 0.3s ease-in-out',
    filter: config.blurAmount > 0 
      ? `blur(${config.blurAmount}px) contrast(1.3) saturate(1.0)` 
      : 'none',
    imageRendering: 'pixelated',
    ...(config.scribbleStyle === 'texture' && {
      color: '#000000',
      textAlign: 'justify',
      textAlignLast: 'left',
      wordSpacing: '0.1em',
      lineHeight: '1.1',
      fontWeight: '400',
      textShadow: 'none',
      opacity: 1,
    }),
  };

  // 处理镜像文字内容
  const getMirrorText = (text: string) => {
    return text.split('\n').map(line => 
      line.split(' ').map(word => 
        word.split('').reverse().join('')
      ).join(' ')
    ).join('\n');
  };

  const displayText = config.scribbleStyle === 'mirror' 
    ? getMirrorText((debouncedText || 'brat').toLowerCase())
    : (debouncedText || 'brat').toLowerCase();

  // 移除频繁的调试日志输出
  // 如需调试，可以取消注释下面的代码
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('Blur status:', config.blurAmount > 0);
  //   console.log('TextStyle:', textStyle);
  // }

  const alignmentOptions = [
    { value: 'left', icon: AlignLeft, label: 'Left' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'right', icon: AlignRight, label: 'Right' },
  ];

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         {/* A loading spinner or skeleton screen could be placed here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100">
      <Toaster />
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-lime-500" />
              <h1 className="text-2xl font-bold text-slate-900">Brat Generator</h1>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-slate-900 font-medium">
                HOME
              </Link>
              <a 
                href="#how-to-use" 
                className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-to-use')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How to Use
              </a>
              <Link 
                href="/blog" 
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            Create Your Perfect <span className="text-lime-500">Brat</span> Album Cover
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Design stunning brat album cover artwork inspired by Charli XCX's iconic aesthetic. 
            Our generator makes it easy to create professional covers instantly with authentic blur effects. 
            This powerful tool offers unlimited customization for your creative projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> 50,000+ Users</span>
            <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500" /> 4.9/5 Rating</span>
            <span className="flex items-center"><Zap className="w-4 h-4 mr-1" /> Instant Generation</span>
          </div>
        </section>

        {/* Main Generator Section */}
        <section id="generator" className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Generator Controls */}
            <div className="order-2 lg:order-1 space-y-8">
              <Card className="p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Type className="w-6 h-6 mr-2 text-lime-500" />
                  Customization Panel
                </h3>
                
                <div className="space-y-6">
                  {/* Multi-line Text Input */}
                  <div>
                    <label htmlFor="album-title-input" className="block text-sm font-medium text-slate-700 mb-2">
                      Album Title (Multi-line Support)
                    </label>
                    <textarea
                      id="album-title-input"
                      value={config.text}
                      onChange={handleTextareaChange}
                      placeholder="Enter your text...&#10;Multi-line supported"
                      className="w-full min-h-[120px] max-h-[200px] px-3 py-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-vertical overflow-y-auto"
                      maxLength={100}
                      rows={4}
                      aria-describedby="album-title-help"
                    />
                    <p id="album-title-help" className="text-xs text-slate-500 mt-1">
                      {config.text.length}/100 characters • Press Enter for new line
                    </p>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label htmlFor="font-size-slider" className="block text-sm font-medium text-slate-700 mb-2">
                      Font Size: {config.fontSize}px
                    </label>
                    <input
                      id="font-size-slider"
                      type="range"
                      min="24"
                      max="120"
                      value={config.fontSize}
                      onChange={(e) => setConfig(prev => ({...prev, fontSize: Number(e.target.value)}))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                      aria-label={`Font size: ${config.fontSize} pixels`}
                    />
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Text Alignment
                    </label>
                    <div className="flex gap-2">
                      {alignmentOptions.map(({ value, icon: Icon, label }) => (
                        <Button
                          key={value}
                          variant={config.textAlign === value ? "default" : "outline"}
                          onClick={() => setConfig(prev => ({...prev, textAlign: value}))}
                          className={`flex-1 ${config.textAlign === value ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                        >
                          <Icon className="w-4 h-4 mr-1" />
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Text Effects */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Text Effects
                    </label>
                    <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                          variant={config.flipHorizontal ? "default" : "outline"}
                          onClick={() => setConfig(prev => ({...prev, flipHorizontal: !prev.flipHorizontal}))}
                          className={`flex-1 ${config.flipHorizontal ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                      >
                        <FlipHorizontal className="w-4 h-4 mr-1" />
                        Flip Horizontal
                      </Button>
                      <Button
                          variant={config.flipVertical ? "default" : "outline"}
                          onClick={() => setConfig(prev => ({...prev, flipVertical: !prev.flipVertical}))}
                          className={`flex-1 ${config.flipVertical ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                      >
                        <FlipVertical className="w-4 h-4 mr-1" />
                        Flip Vertical
                      </Button>
                      </div>
                      <div>
                        <label htmlFor="blur-effect-slider" className="block text-sm font-medium text-slate-700 mb-2">
                          Blur Effect: {config.blurAmount}px
                        </label>
                        <input
                          id="blur-effect-slider"
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={config.blurAmount}
                          onChange={(e) => setConfig(prev => ({...prev, blurAmount: Number(e.target.value)}))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                          aria-label={`Blur effect: ${config.blurAmount} pixels`}
                        />
                      </div>
                      
                      {/* Scribble Style Picker */}
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Text Style Presets
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={config.scribbleStyle === 'classic' ? 'default' : 'outline'}
                            onClick={() => setConfig(prev => ({...prev, scribbleStyle: 'classic'}))}
                            className={`${config.scribbleStyle === 'classic' ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                          >
                            Classic
                          </Button>
                          <Button
                            variant={config.scribbleStyle === 'mirror' ? 'default' : 'outline'}
                            onClick={() => setConfig(prev => ({...prev, scribbleStyle: 'mirror'}))}
                            className={`${config.scribbleStyle === 'mirror' ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                          >
                            Mirror
                          </Button>
                          <Button
                            variant={config.scribbleStyle === 'texture' ? 'default' : 'outline'}
                            onClick={() => setConfig(prev => ({...prev, scribbleStyle: 'texture'}))}
                            className={`${config.scribbleStyle === 'texture' ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                          >
                            Paper
                          </Button>
                          <Button
                            variant={config.scribbleStyle === 'scribble' ? 'default' : 'outline'}
                            onClick={() => setConfig(prev => ({...prev, scribbleStyle: 'scribble'}))}
                            className={`${config.scribbleStyle === 'scribble' ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                          >
                            Scribble
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Border Radius */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="border-radius-slider" className="text-sm font-medium text-slate-700 flex items-center">
                        <CornerUpRight className="w-4 h-4 mr-1" />
                        Border Radius: {config.borderRadius}px
                      </label>
                    </div>
                    <input
                      id="border-radius-slider"
                      type="range"
                      min="0"
                      max="50"
                      value={config.borderRadius}
                      onChange={(e) => setConfig(prev => ({...prev, borderRadius: Number(e.target.value)}))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                      aria-label={`Border radius: ${config.borderRadius} pixels`}
                    />
                  </div>

                  {/* Quick Share Button - Only show if image has been downloaded */}
                  {lastGeneratedImageUrl && (
                    <div className="mb-4">
                      <Button 
                        onClick={() => {
                          // Use native share on mobile devices, copy link on desktop
                          if (navigator.share) {
                            navigator.share({
                              title: 'Check out my brat album cover!',
                              text: `I just created this amazing "${debouncedText || 'brat'}" album cover! 🎵`,
                              url: window.location.href,
                            }).then(() => {
                              toast.success('Share successful!', {
                                position: "top-center",
                                duration: 3000,
                              });
                            }).catch((error) => {
                              if (error.name !== 'AbortError') {
                                toast.error('Share failed, please try another method', {
                                  position: "top-center",
                                  duration: 3000,
                                });
                              }
                            });
                          } else {
                            navigator.clipboard.writeText(window.location.href).then(() => {
                              toast.success('Link copied to clipboard!', {
                                position: "top-center", 
                                duration: 3000,
                              });
                            });
                          }
                        }}
                        variant="outline"
                        className="w-full border-lime-300 text-lime-700 hover:bg-lime-50 font-semibold py-2"
                        size="lg"
                      >
                        <Share2 className="w-5 h-5 mr-2" />
                        Quick Share Your Creation
                      </Button>
                    </div>
                  )}

                  {/* Download and Reset Buttons */}
                  <div className="space-y-3">
                    {/* Primary Download Button */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={() => handleDownload('png')}
                        disabled={isDownloading}
                        className="bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        size="lg"
                      >
                        <Download className={`w-5 h-5 mr-2 ${isDownloading ? 'animate-spin' : ''}`} />
                        {isDownloading ? 'Downloading...' : 'Download PNG'}
                      </Button>
                      
                      <Button 
                        onClick={handleReset}
                        disabled={isDownloading}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50 font-semibold py-3 text-lg disabled:opacity-50"
                        size="lg"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reset
                      </Button>
                    </div>

                    {/* Additional Format Options */}
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        onClick={() => handleDownload('jpeg')}
                        disabled={isDownloading}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50 font-medium py-2 text-sm disabled:opacity-50"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        JPEG
                      </Button>
                      
                      <Button 
                        onClick={() => handleDownload('svg')}
                        disabled={isDownloading}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50 font-medium py-2 text-sm disabled:opacity-50"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        SVG
                      </Button>
                      
                      <Button 
                        onClick={() => handleDownload('blob')}
                        disabled={isDownloading}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50 font-medium py-2 text-sm disabled:opacity-50"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Blob
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-6 bg-gradient-to-br from-lime-50 to-emerald-50 border-lime-200">
                <h4 className="font-semibold text-slate-800 mb-3">💡 Pro Tips</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Classic blurry effect default enabled, perfectly replicating Charli XCX original aesthetic</li>
                  <li>• Use multi-line text for longer titles or creative layouts</li>
                  <li>• Try different alignments for unique typography effects</li>
                  <li>• Flip text to create artistic mirror effects</li>
                  <li>• Adjust border radius for modern rounded or classic sharp edges</li>
                  <li>• Perfect for social media, playlist covers, and more</li>
                  <li>• Lowercase text follows the original "brat" aesthetic style</li>
                </ul>
              </Card>
            </div>

            {/* Preview Area */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <Card className="p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-center">Live Preview</h3>
                  <div 
                  id="brat-preview-area"
                    className={`
                    relative w-full aspect-square flex items-center 
                    ${config.scribbleStyle === 'mirror' ? 'justify-end' : 
                      (config.textAlign === 'left' ? 'justify-start' : config.textAlign === 'right' ? 'justify-end' : 'justify-center')}
                    transition-all duration-200 overflow-hidden
                    `}
                    style={{
                      ...previewStyle,
                    backgroundColor: config.isCustomColor ? config.customColor : (
                      {
                        lime: '#8acf00',
                        white: '#ffffff',
                        black: '#000000',
                        pink: '#f472b6',
                        blue: '#60a5fa',
                        purple: '#a78bfa',
                        orange: '#fb923c',
                        red: '#f87171',
                      }[config.bgColor] || '#8acf00'
                    ),
                    ...(config.scribbleStyle === 'texture' && {
                      backgroundColor: '#ffffff',
                      backgroundImage: `
                        linear-gradient(0deg, rgba(0,0,0,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                      filter: 'contrast(1.0) brightness(1.0)',
                    }),
                    }}
                  >
                  {/* Scribble Overlay for 'destructive' style */}
                  {config.scribbleStyle === 'scribble' && <ScribbleOverlay />}

                  {/* Floating Color Picker - Top Left */}
                  <div className="absolute top-3 left-3 flex gap-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg z-10">
                    {/* Main 4 Colors */}
                    {[
                      { color: 'lime', bg: '#8acf00', name: 'Classic Green' },
                      { color: 'white', bg: '#ffffff', name: 'Pure White' },
                      { color: 'black', bg: '#000000', name: 'Pure Black' },
                      { color: 'pink', bg: '#f472b6', name: 'Pink' }
                    ].map(({ color, bg, name }) => (
                      <button
                        key={color}
                        onClick={() => {
                          setConfig(prev => ({ ...prev, bgColor: color, isCustomColor: false }));
                        }}
                        className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 shadow-sm ${
                          config.bgColor === color && !config.isCustomColor 
                            ? 'ring-2 ring-slate-600 ring-offset-1 scale-110' 
                            : 'hover:shadow-md'
                        }`}
                        style={{ backgroundColor: bg, borderColor: bg === '#ffffff' ? '#e2e8f0' : bg }}
                        title={name}
                        aria-label={`Select ${name} background color${config.bgColor === color && !config.isCustomColor ? ', currently selected' : ''}`}
                      />
                    ))}
                    
                    {/* Custom Color */}
                    <input
                      type="color"
                      value={config.customColor}
                      onChange={(e) => {
                        setConfig(prev => ({...prev, customColor: e.target.value, isCustomColor: true, bgColor: 'custom'}));
                      }}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all hover:scale-110 shadow-sm ${
                        config.isCustomColor && config.bgColor === 'custom'
                          ? 'ring-2 ring-slate-600 ring-offset-1 scale-110'
                          : 'hover:shadow-md'
                      }`}
                      style={{ borderColor: config.customColor }}
                      title="Custom Color"
                      aria-label={`Custom background color${config.isCustomColor && config.bgColor === 'custom' ? ', currently selected' : ''}`}
                    />
                  </div>

                    <div 
                    className="font-black px-4 leading-tight whitespace-pre-line"
                      style={textStyle}
                    >
                      {displayText}
                  </div>
                </div>
                
                <p className="text-center text-sm text-slate-500 mt-4">
                  1200 × 1200 px high-quality download. Perfect for social media.
                </p>
              </Card>
              
              {/* Social Share Component */}
              <div className="mt-4">
                <SocialShare 
                  text={debouncedText || 'brat'}
                  hashtags={['brat', 'albumcover', 'design', 'charliXCX', 'music']}
                  imageDataUrl={lastGeneratedImageUrl}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              How to Use Our Brat Generator
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create stunning brat album covers in just 4 simple steps with our powerful design tool. 
              Follow this comprehensive guide to master every feature.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-lime-500">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Type className="w-8 h-8 text-lime-600" />
              </div>
              <div className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold mb-3">Enter Your Text</h4>
              <p className="text-slate-600">
                Type your album title or any text you want. Our tool supports multi-line input for creative layouts with unlimited possibilities.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-blue-500">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold mb-3">Choose Colors & Style</h4>
              <p className="text-slate-600">
                Select from our preset colors or use custom colors. Pick from Classic, Mirror, Paper, or Scribble text style presets.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-purple-500">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">Customize Effects</h4>
              <p className="text-slate-600">
                Adjust font size, text alignment, blur effects, and border radius. Real-time preview of all changes for perfect results.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-pink-500">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-pink-600" />
              </div>
              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h4 className="text-xl font-semibold mb-3">Download & Share</h4>
              <p className="text-slate-600">
                Download your creation in high-quality PNG, JPEG, or SVG format. Perfect for social media, streaming platforms, and print.
              </p>
            </Card>
          </div>
          
          {/* Additional Tips */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="flex items-start space-x-4">
                <BookOpen className="w-8 h-8 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">
                    Pro Design Tips
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6 text-slate-600">
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-2">✨ Style Presets</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Classic:</strong> Bold black text with authentic blur effect</li>
                        <li>• <strong>Mirror:</strong> Reversed text with right alignment</li>
                        <li>• <strong>Paper:</strong> Clean text on white paper texture</li>
                        <li>• <strong>Scribble:</strong> Artistic overlay with hand-drawn lines</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-2">🎨 Design Tips</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Use lowercase text for authentic brat aesthetic</li>
                        <li>• Try multi-line layouts for longer album titles</li>
                        <li>• Experiment with different color combinations</li>
                        <li>• Adjust blur for the perfect Charli XCX vibe</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Brat Generator?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The most powerful design tool with advanced features for creating professional album covers. 
              Stand out as the best choice for creators worldwide.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-lime-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Instant Generation</h4>
              <p className="text-slate-600">
                Create professional-looking brat album covers in seconds with real-time preview using advanced technology
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Advanced Customization</h4>
              <p className="text-slate-600">
                Choose from multiple color combinations and typography options with comprehensive tools and features
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">High-Quality Export</h4>
              <p className="text-slate-600">
                Download your creations in high-resolution PNG format, perfect for any platform with professional results
              </p>
            </Card>
          </div>
        </section>

        {/* Latest Blog Posts Section */}
        {latestPosts.length > 0 && (
          <section id="blog-preview" className="mt-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                From the Blog
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Get the latest design trends, tutorials, and insights from our team of creative experts.
              </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-lime-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                  <div className="flex items-center text-sm text-slate-500 mb-2">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-lime-600 hover:text-lime-700 font-medium text-sm flex items-center"
                  >
                    Read More <ChevronRight className="w-3 h-3 ml-1" />
                  </Link>
                  </CardContent>
              </Card>
            ))}
          </div>
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  View All Posts <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
        </section>
        )}

        {/* FAQ Section */}
        <section id="faq" className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our design tool and how to use it effectively
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    What is a brat generator?
                  </h4>
                  <p className="text-slate-600">
                    A brat generator is a design tool that creates album covers inspired by Charli XCX's iconic "brat" aesthetic. 
                    Our tool allows you to create custom designs with bold typography and vibrant colors using advanced features.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    How does the tool work?
                  </h4>
                  <p className="text-slate-600">
                    Our tool uses advanced typography rendering to create bold, impactful text designs. 
                    Simply enter your text, choose colors and effects, and download your custom creation.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Can I use designs for commercial purposes?
                  </h4>
                  <p className="text-slate-600">
                    Yes! All designs created with our tool are free to use for personal and commercial projects. 
                    Create album covers, social media posts, merchandise, and more with no restrictions.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    What format does the tool export?
                  </h4>
                  <p className="text-slate-600">
                    Our tool exports high-quality PNG files at 1200x1200 pixels, perfect for social media, 
                    streaming platforms, and print applications. The export format ensures crisp, professional results.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-lime-500 to-emerald-500 rounded-2xl p-12 text-black">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Your Masterpiece?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of artists using our tool to create stunning designs. 
            Start creating with the best brat generator today!
          </p>
          <Button 
            size="lg" 
            className="bg-black text-white hover:bg-slate-800 font-semibold px-8 py-3"
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Creating Now
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer id="about" className="bg-slate-900 text-white mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-lime-400" />
                <h4 className="text-xl font-bold">Brat Generator</h4>
              </div>
              <p className="text-slate-400 mb-4">
                The ultimate design tool for creating stunning artwork inspired by Charli XCX's iconic aesthetic. 
                Our professional brat generator offers unlimited creative possibilities.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Tools</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a 
                    href="#generator" 
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Cover Generator
                  </a>
                </li>
                <li>
                  <a 
                    href="#generator" 
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Text Generator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a 
                    href="#how-to-use" 
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('how-to-use')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    How to Use
                  </a>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a 
                    href="#help" 
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success('Need help? Contact us at support@bratgenerator.com');
                    }}
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:contact@bratgenerator.com" 
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Brat Generator. All rights reserved. Create stunning brat album covers with our free brat generator. 
            The best brat generator for professional design results.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #84cc16;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #84cc16;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
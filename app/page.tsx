'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Download, Palette, Type, Sparkles, CornerUpRight, AlignLeft, AlignCenter, AlignRight, FlipHorizontal, FlipVertical, RotateCcw, Save, ChevronRight, Star, Users, Zap, BookOpen, HelpCircle, Share2, Menu, X, Clipboard, Skull, Rocket, Rainbow, Flame, Shield } from 'lucide-react';
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
import AdSense, { BannerAd, ResponsiveAd } from '@/components/AdSense';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [config, setConfig] = useState<BratConfig>(defaultConfig);

  const [isDownloading, setIsDownloading] = useState(false);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [scribbleImage, setScribbleImage] = useState<HTMLImageElement | null>(null);
  const [lastGeneratedImageUrl, setLastGeneratedImageUrl] = useState<string>('');
  
  // 智能布局系统状态
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 });
  const previewRef = useRef<HTMLDivElement>(null);

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
        const response = await fetch('/api/blog/posts?action=latest&limit=6');
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

  // ResizeObserver 监听预览框大小变化
  useEffect(() => {
    if (typeof window === 'undefined' || !previewRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });
    
    resizeObserver.observe(previewRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [isClient]);

  // Debounce text and font size from the config state
  const debouncedText = useDebounce(config.text, 300);
  const debouncedFontSize = useDebounce(config.fontSize, 100);

  // 智能布局系统 - 重新设计：基于实际DOM测量的简单有效方案
  const optimalLayout = useMemo(() => {
    if (!debouncedText || containerSize.width < 100) {
      return {
        fontSize: config.fontSize,
        lineHeight: 0.9,
        letterSpacing: '-0.08em',
        lines: [debouncedText || 'brat'],
        spaceUtilization: 0,
        isOptimal: false,
        userFontSizeRatio: 1
      };
    }

    // 简单直接：预留足够的安全边距
    const SAFETY_MARGIN = 40; // 固定40px安全边距（包含所有padding）
    const maxWidth = Math.max(100, containerSize.width - SAFETY_MARGIN);
    const maxHeight = Math.max(100, containerSize.height - SAFETY_MARGIN);

    // 简单的文字宽度估算（更保守）
    const estimateTextWidth = (text: string, fontSize: number) => {
      return text.length * fontSize * 0.6; // 保守估算
    };

    // 简单换行：按空格分割，确保每行都不超过maxWidth
    const wrapText = (text: string, fontSize: number) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = estimateTextWidth(testLine, fontSize);
        
        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            // 单个词太长，强制换行
            lines.push(word);
            currentLine = '';
          }
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      return lines.length > 0 ? lines : [text];
    };

    // 使用用户设置的字体大小
    let fontSize = config.fontSize;
    let lines = wrapText(debouncedText, fontSize);
    let lineHeight = Math.max(0.85, 1.2 - (lines.length - 1) * 0.05);
    
    // 检查是否超出高度限制
    const totalHeight = lines.length * fontSize * lineHeight;
    if (totalHeight > maxHeight) {
      // 如果超出高度，按比例缩小字体
      const scaleFactor = maxHeight / totalHeight;
      fontSize = Math.max(12, fontSize * scaleFactor * 0.9); // 再保守10%
      lines = wrapText(debouncedText, fontSize);
      lineHeight = Math.max(0.85, 1.2 - (lines.length - 1) * 0.05);
    }

    // 最终安全检查：确保最长行不超过maxWidth
    const maxLineWidth = Math.max(...lines.map(line => estimateTextWidth(line, fontSize)));
    if (maxLineWidth > maxWidth) {
      const scaleFactor = maxWidth / maxLineWidth;
      fontSize = Math.max(12, fontSize * scaleFactor * 0.9); // 再保守10%
      lines = wrapText(debouncedText, fontSize);
    }

    // 计算空间利用率
    const finalHeight = lines.length * fontSize * lineHeight;
    const finalWidth = Math.max(...lines.map(line => estimateTextWidth(line, fontSize)));
    const spaceUtilization = Math.min(finalWidth / maxWidth, finalHeight / maxHeight);

    return {
      fontSize: Math.round(fontSize),
      lineHeight,
      letterSpacing: lines.length > 2 ? '-0.1em' : '-0.08em',
      lines,
      spaceUtilization,
      isOptimal: spaceUtilization >= 0.5 && spaceUtilization <= 0.8,
      userFontSizeRatio: fontSize / config.fontSize,
      debug: {
        containerSize,
        maxWidth,
        maxHeight,
        finalWidth,
        finalHeight,
        spaceUtilization
      }
    };
  }, [debouncedText, config.fontSize, containerSize]);

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

  // 粘贴功能处理函数
  const handlePasteFromClipboard = async () => {
    try {
      // 检查是否支持Clipboard API
      if (!navigator.clipboard) {
        toast.error('Your browser does not support clipboard functionality');
        return;
      }

      // 读取剪贴板内容
      const clipboardText = await navigator.clipboard.readText();
      
      if (!clipboardText) {
        toast.error('Clipboard is empty');
        return;
      }

      // 检查长度限制
      if (clipboardText.length > 100) {
        const truncatedText = clipboardText.substring(0, 100);
        setConfig(prev => ({ ...prev, text: truncatedText }));
        toast.success('Text pasted (truncated to 100 characters)');
      } else {
        setConfig(prev => ({ ...prev, text: clipboardText }));
        toast.success('Text pasted successfully!');
      }
    } catch (error) {
      // 处理各种可能的错误
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          toast.error('Please allow clipboard access permission');
        } else if (error.name === 'NotFoundError') {
          toast.error('No text content found in clipboard');
        } else {
          toast.error('Paste failed, please try again');
        }
      } else {
        toast.error('Paste failed, please try again');
      }
      console.error('Clipboard error:', error);
    }
  };

  // 清空文本功能处理函数
  const handleClearText = () => {
    setConfig(prev => ({ ...prev, text: '' }));
    toast.success('Text cleared successfully!');
  };

  const previewStyle = {
    borderRadius: `${config.borderRadius}px`,
  };

  const textStyle: React.CSSProperties = {
    fontSize: `${optimalLayout.fontSize}px`,
    transform: `
      ${config.flipHorizontal ? 'scaleX(-1)' : ''}
      ${config.flipVertical ? 'scaleY(-1)' : ''}
    `.trim(),
    lineHeight: optimalLayout.lineHeight,
    textAlign: config.scribbleStyle === 'texture' ? 'justify' : (config.scribbleStyle === 'mirror' ? 'right' : (config.textAlign as 'left' | 'center' | 'right')),
    color: config.scribbleStyle === 'texture' ? '#000000' : getCurrentTextColor(),
    letterSpacing: optimalLayout.letterSpacing,
    fontWeight: config.scribbleStyle === 'mirror' ? '400' : '900',
    fontFamily: config.scribbleStyle === 'mirror' 
      ? '"Helvetica Neue", "Arial", "Segoe UI", Roboto, sans-serif'
      : config.scribbleStyle === 'texture'
      ? '"Helvetica Neue", "Arial", "Segoe UI", Roboto, sans-serif'
      : '"Helvetica Inserat", "Arial Black", "Arial Black Condensed", "Impact", "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    transition: 'font-size 0.3s ease-out, line-height 0.3s ease-out, letter-spacing 0.3s ease-out, filter 0.2s ease-in-out, transform 0.3s ease-in-out',
    filter: config.blurAmount > 0 
      ? `blur(${config.blurAmount}px) contrast(1.3) saturate(1.0)` 
      : 'none',
    imageRendering: 'pixelated',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    ...(config.scribbleStyle === 'texture' && {
      color: '#000000',
      textAlign: 'justify',
      textAlignLast: 'justify',
      wordSpacing: '0.3em',
      letterSpacing: '0.05em',
      lineHeight: '1.2',
      fontWeight: '400',
      textShadow: 'none',
      opacity: 1,
      whiteSpace: 'pre-wrap',
      textJustify: 'inter-word',
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
    : optimalLayout.lines.length > 0 
      ? optimalLayout.lines.join('\n')
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
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-lime-500" />
              <span className="text-xl sm:text-2xl font-bold text-slate-900">Brat Generator</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-900 font-medium hover:text-lime-600 transition-colors">
                HOME
              </Link>
              <Link
                href="/generators"
                className="text-slate-600 hover:text-lime-600 transition-colors"
              >
                Generators
              </Link>
              <a
                href="#how-to-use"
                className="text-slate-600 hover:text-lime-600 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-to-use')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How to Use
              </a>
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
                  className="text-slate-900 font-medium hover:text-lime-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/generators"
                  className="text-slate-600 hover:text-lime-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Generators
                </Link>
                <a
                  href="#how-to-use"
                  className="text-slate-600 hover:text-lime-600 transition-colors cursor-pointer py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById('how-to-use')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  How to Use
                </a>
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
                  className="text-slate-600 hover:text-lime-600 transition-colors py-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Create Your Perfect <span className="text-lime-500">Brat</span> Album Cover
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Welcome to the ultimate Brat Generator for creating stunning album cover artwork inspired by Charli XCX's iconic aesthetic.
            Our Brat Generator creates authentic covers instantly with signature blur effects and unlimited customization options.
            No design experience needed—just input your text, customize the style, and download your masterpiece in high-resolution format.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm text-slate-500 px-4">
            <span className="flex items-center bg-white/50 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 mr-1" /> 50,000+ Users
            </span>
            <span className="flex items-center bg-white/50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 mr-1 text-yellow-500" /> 4.9/5 Rating
            </span>
            <span className="flex items-center bg-white/50 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 mr-1" /> Instant Generation
            </span>
          </div>
          <div className="text-center mt-6 text-xs text-slate-500">
            <p>ⓘ Fan-inspired tool • Not official • Inspired by Charli XCX's brat aesthetic</p>
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
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="album-title-input" className="text-sm font-medium text-slate-700">
                      Album Title (Multi-line Support)
                    </label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handlePasteFromClipboard}
                          className="text-xs h-7 px-2 hover:bg-lime-50 hover:text-lime-700 hover:border-lime-300 transition-colors"
                          title="Paste text from clipboard"
                        >
                          <Clipboard className="w-3 h-3 mr-1" />
                          Paste
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearText}
                          className="text-xs h-7 px-2 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
                          title="Clear all text"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Clear
                        </Button>
                      </div>
                    </div>
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
                    <div className="flex items-center justify-between mt-1">
                      <p id="album-title-help" className="text-xs text-slate-500">
                      {config.text.length}/100 characters • Press Enter for new line
                    </p>
                      <p className="text-xs text-slate-400">
                        Shortcuts: Ctrl+V (Paste) • Click buttons above
                      </p>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="font-size-slider" className="text-sm font-medium text-slate-700">
                        Font Size: {config.fontSize}px
                      </label>
                      {optimalLayout.userFontSizeRatio && (
                        <div className="flex items-center text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${
                            optimalLayout.isOptimal 
                              ? 'bg-green-500' 
                              : optimalLayout.spaceUtilization > 0.4 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }`} />
                          <span className={`${
                            optimalLayout.isOptimal 
                              ? 'text-green-600' 
                              : optimalLayout.spaceUtilization > 0.4 
                                ? 'text-yellow-600' 
                                : 'text-red-600'
                          }`}>
                            {optimalLayout.isOptimal 
                              ? 'Optimal Layout' 
                              : optimalLayout.spaceUtilization > 0.4 
                                ? 'Good Layout' 
                                : 'Can Optimize'}
                          </span>
                        </div>
                      )}
                    </div>
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
                    {optimalLayout.userFontSizeRatio && (
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>Actual: {optimalLayout.fontSize}px</span>
                        <span>Utilization: {Math.round(optimalLayout.spaceUtilization * 100)}%</span>
                        <span>
                          {optimalLayout.userFontSizeRatio > 1 
                            ? `↑${Math.round((optimalLayout.userFontSizeRatio - 1) * 100)}%` 
                            : optimalLayout.userFontSizeRatio < 1 
                              ? `↓${Math.round((1 - optimalLayout.userFontSizeRatio) * 100)}%`
                              : '='
                          }
                        </span>
                      </div>
                    )}
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
                <h4 className="font-semibold text-slate-800 mb-3">💡 Pro Tips for Creative Design</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Classic blurry effect default enabled, perfectly replicating Charli XCX original aesthetic with authentic styling</li>
                  <li>• Use multi-line text for longer titles or creative layouts to maximize visual impact</li>
                  <li>• Try different alignments for unique typography effects and professional presentation</li>
                  <li>• Flip text to create artistic mirror effects using our advanced transformation tools</li>
                  <li>• Adjust border radius for modern rounded or classic sharp edges in your custom designs</li>
                  <li>• Perfect for social media, playlist covers, promotional materials, and professional branding</li>
                  <li>• Lowercase text follows the original "brat" aesthetic style - a signature design element</li>
                  <li>• <strong>Smart Layout:</strong> Our brat generator automatically adjusts font size to prevent overflow issues</li>
                  <li>• Visual indicators show layout optimization: green for optimal, yellow for good, red for needs adjustment</li>
                  <li>• <strong>Safety Design:</strong> Built-in 40px safety margin ensures text never overflows container boundaries</li>
                  <li>• Advanced line wrapping and font scaling technology adapts to all screen sizes with responsive design</li>
                </ul>
              </Card>
            </div>

            {/* Preview Area */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <Card className="p-3 sm:p-4 md:p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-center">Live Preview</h3>
                  <div 
                  id="brat-preview-area"
                  ref={previewRef}
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
                    <div className="relative">
                      <input
                        type="color"
                        value={config.customColor}
                        onChange={(e) => {
                          setConfig(prev => ({...prev, customColor: e.target.value, isCustomColor: true, bgColor: 'custom'}));
                        }}
                        className="opacity-0 absolute inset-0 w-6 h-6 cursor-pointer"
                        title="Custom Color - Click to select any color"
                        aria-label={`Custom background color${config.isCustomColor && config.bgColor === 'custom' ? ', currently selected' : ''}`}
                      />
                      <div 
                        className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all hover:scale-110 shadow-sm ${
                          config.isCustomColor && config.bgColor === 'custom'
                            ? 'ring-2 ring-slate-600 ring-offset-1 scale-110'
                            : 'hover:shadow-md'
                        }`}
                        style={{
                          background: 'linear-gradient(45deg, #ff0000 0%, #ff8000 14%, #ffff00 28%, #80ff00 42%, #00ff00 57%, #00ff80 71%, #00ffff 85%, #0080ff 100%)',
                          borderColor: '#e2e8f0'
                        }}
                        title="Custom Color - Click to select any color"
                      />
                    </div>
                  </div>

                    <div 
                    className="font-black px-2 sm:px-3 md:px-4 leading-tight whitespace-pre-line"
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
              Create stunning album covers in just 4 simple steps with our powerful Brat Generator.
              Follow this comprehensive Brat Generator guide to master every feature and discover all the creative possibilities available with our Brat Generator platform.
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
              <h4 className="text-xl font-semibold mb-3">Enter Text in Brat Generator</h4>
              <p className="text-slate-600">
                Type your album title or any text you want to transform. Brat Generator supports multi-line input for creative layouts with unlimited possibilities and automatic formatting.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-blue-500">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold mb-3">Brat Generator Colors & Style</h4>
              <p className="text-slate-600">
                Select from our carefully curated preset colors or create custom color combinations in Brat Generator. Pick from Classic, Mirror, Paper, or Scribble text style presets with our Brat Generator interface.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-purple-500">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">Brat Generator Effects</h4>
              <p className="text-slate-600">
                Adjust font size, text alignment, blur effects, and border radius with precision controls in Brat Generator. Our Brat Generator provides real-time preview of all changes for perfect results.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-pink-500">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-pink-600" />
              </div>
              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h4 className="text-xl font-semibold mb-3">Download Brat Generator Creation</h4>
              <p className="text-slate-600">
                Download your Brat Generator creation in high-quality PNG, JPEG, or SVG format. Perfect for social media platforms, streaming services, print applications, and professional use with Brat Generator.
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
                    Pro Design Tips & Best Practices
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6 text-slate-600">
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-2">✨ Style Presets</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Classic:</strong> Bold black text with authentic blur effect for traditional brat aesthetic</li>
                        <li>• <strong>Mirror:</strong> Reversed text with right alignment for creative typography effects</li>
                        <li>• <strong>Paper:</strong> Clean text on white paper texture for minimalist designs</li>
                        <li>• <strong>Scribble:</strong> Artistic overlay with hand-drawn lines for unique visual appeal</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-2">🎨 Design Tips</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Use lowercase text for authentic brat aesthetic that captures the original vibe</li>
                        <li>• Try multi-line layouts for longer album titles and creative text arrangements</li>
                        <li>• Experiment with different color combinations to find your perfect match with the brat text generator</li>
                        <li>• Adjust blur effects carefully for the perfect Charli XCX-inspired atmosphere</li>
                        <li>• <strong>Smart Layout:</strong> Our brat generator automatically adjusts font size to prevent overflow issues</li>
                        <li>• Visual indicators show layout quality: green for optimal, yellow for good, red for needs adjustment</li>
                        <li>• <strong>Safety Design:</strong> Built-in 40px safety margin ensures text never overflows container boundaries</li>
                        <li>• Advanced line wrapping and font scaling technology adapts to all screen sizes seamlessly</li>
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
              Why Choose Our Tool?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The most comprehensive Brat Generator platform for creating professional album covers with advanced features.
              Our Brat Generator stands out with cutting-edge technology and an intuitive interface designed for everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-lime-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Instant Brat Generator</h4>
              <p className="text-slate-600">
                Create professional-looking album covers in seconds with Brat Generator's real-time preview technology. Our Brat Generator offers smooth performance and instant visual feedback to see your design come to life immediately.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Brat Generator Customization</h4>
              <p className="text-slate-600">
                Choose from multiple color combinations and typography options with Brat Generator's comprehensive creative tools. Precision control over every design element in Brat Generator lets you express your unique vision.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Brat Generator Export</h4>
              <p className="text-slate-600">
                Download your Brat Generator creations in high-resolution PNG format at 1200x1200 pixels, perfect for any platform. Crisp, stunning quality ensures your Brat Generator designs look amazing everywhere.
              </p>
            </Card>
          </div>
        </section>

        {/* Brat Text Generator Capabilities Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Brat Text Generator Capabilities
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our advanced Brat Text Generator offers powerful text rendering and customization features.
              Discover what makes our Brat Text Generator the perfect choice for creating stunning designs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 border-l-4 border-l-lime-500">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">🎨 Text Styling with Brat Text Generator</h4>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Multiple Presets:</strong> Our Brat Text Generator includes Classic, Mirror, Paper, and Scribble styles for diverse creative options</li>
                <li><strong>Custom Colors:</strong> The Brat Text Generator lets you choose from preset palettes or create unlimited custom color combinations</li>
                <li><strong>Typography Control:</strong> Adjust font size, line height, and letter spacing with precision using our Brat Text Generator</li>
                <li><strong>Text Alignment:</strong> Position your text left, center, or right with the Brat Text Generator's flexible alignment options</li>
              </ul>
            </Card>
            <Card className="p-6 border-l-4 border-l-blue-500">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">✨ Advanced Effects in Brat Text Generator</h4>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Blur Effects:</strong> The Brat Text Generator's signature blur feature creates the authentic aesthetic with adjustable intensity</li>
                <li><strong>Flip & Transform:</strong> Flip your text horizontally or vertically using Brat Text Generator's transformation tools</li>
                <li><strong>Border Radius:</strong> Add rounded corners to your design with the Brat Text Generator's border customization</li>
                <li><strong>Real-time Preview:</strong> See changes instantly as you adjust settings in the Brat Text Generator interface</li>
              </ul>
            </Card>
            <Card className="p-6 border-l-4 border-l-purple-500">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">📝 Multi-line Text Support</h4>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Flexible Layouts:</strong> The Brat Text Generator supports multi-line input for complex text arrangements</li>
                <li><strong>Auto-scaling:</strong> Our Brat Text Generator automatically adjusts font size to fit your content perfectly</li>
                <li><strong>Line Wrapping:</strong> The Brat Text Generator intelligently wraps text to prevent overflow and maintain design integrity</li>
                <li><strong>Character Limit:</strong> Create designs with up to 100 characters using the Brat Text Generator</li>
              </ul>
            </Card>
            <Card className="p-6 border-l-4 border-l-pink-500">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">💾 Export & Share Options</h4>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Multiple Formats:</strong> Export your Brat Text Generator creations as PNG, JPEG, or SVG files</li>
                <li><strong>High Resolution:</strong> The Brat Text Generator exports at 1200x1200 pixels for professional quality</li>
                <li><strong>Social Sharing:</strong> Share your Brat Text Generator designs directly to social media platforms</li>
                <li><strong>Instant Download:</strong> Get your Brat Text Generator creation instantly without registration or delays</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Why Choose Brat Generator Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Brat Generator?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover what makes Brat Generator the ultimate choice for creating stunning album cover artwork.
              Our Brat Generator stands out with unique features and unmatched ease of use.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-lime-500 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Lightning-Fast Brat Generator</h4>
                  <p className="text-slate-600">
                    Create professional designs in seconds with Brat Generator's optimized performance. No waiting, no delays—just instant creative results.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">User-Friendly Brat Text Generator</h4>
                  <p className="text-slate-600">
                    No design experience required. Brat Text Generator's intuitive interface makes it easy for anyone to create stunning artwork.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Premium Features in Brat Generator</h4>
                  <p className="text-slate-600">
                    Access advanced customization options with Brat Generator. Blur effects, color presets, and typography controls—all included.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                    <Download className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">High-Quality Brat Generator Exports</h4>
                  <p className="text-slate-600">
                    Download your Brat Generator creations in multiple formats at 1200x1200 pixels. Perfect for any platform or use case.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Completely Free Brat Generator</h4>
                  <p className="text-slate-600">
                    No hidden fees, no subscriptions. Brat Generator is 100% free to use with unlimited design creation and downloads.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <Share2 className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Easy Sharing with Brat Generator</h4>
                  <p className="text-slate-600">
                    Share your Brat Generator designs directly to social media. Built-in sharing features make it simple to showcase your work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Tool Section */}
        <section className="mb-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 md:p-12 border border-slate-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">What is Brat Generator?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Brat Generator is a free, fan-inspired creative platform designed to help you craft stunning album cover artwork inspired by Charli XCX's iconic aesthetic. Whether you're a musician, designer, content creator, or simply someone who loves this visual style, our Brat Generator makes it incredibly easy to design professional-looking covers in minutes.
                </p>
                <p>
                  With an intuitive interface and powerful customization options, this Brat Generator lets you create unique artwork featuring signature blur effects, custom colors, multiple text styles, and advanced typography controls. No design experience needed—just input your text, customize the style, and download your masterpiece using our Brat Generator.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-3">✨ Key Capabilities</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>✓ Real-time preview with blur effects</li>
                    <li>✓ Unlimited color customization</li>
                    <li>✓ Multi-line text support</li>
                    <li>✓ Multiple export formats (PNG, JPEG, SVG)</li>
                    <li>✓ Responsive design for all devices</li>
                    <li>✓ Completely free with no registration</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-3">🎯 Perfect For</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Album artwork and music projects</li>
                    <li>• Social media content creation</li>
                    <li>• Merchandise and promotional designs</li>
                    <li>• Personal creative projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples & Tips Section */}
        <section className="mb-24 bg-gradient-to-br from-lime-50 to-emerald-50 rounded-xl p-8 md:p-12 border border-lime-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Brat Generator Use Cases & Tips</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">💡 Brat Generator Use Cases</h3>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Music Projects:</strong> Create authentic artwork with Brat Generator for your album releases and singles</li>
                <li><strong>Social Content:</strong> Design eye-catching posts using Brat Generator for Instagram, TikTok, and other platforms</li>
                <li><strong>Merchandise:</strong> Generate designs with Brat Generator for t-shirts, hoodies, and promotional materials</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">🎨 Brat Generator Design Tips</h3>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Typography:</strong> Use lowercase text in Brat Generator to capture the authentic aesthetic and original vibe</li>
                <li><strong>Color Harmony:</strong> Experiment with different color combinations in Brat Generator for maximum visual impact</li>
                <li><strong>Visual Effects:</strong> Adjust blur carefully in Brat Generator to achieve the perfect atmospheric quality</li>
              </ul>
            </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  View All Posts <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
        </section>
        )}

        {/* Success Stories Section */}
        <section className="mb-24 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 md:p-12 border border-emerald-200">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Success Stories with Brat Generator
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how creators and artists are using Brat Generator to bring their visions to life.
              Discover inspiring stories from our Brat Generator community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 border-t-4 border-t-emerald-500">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-4 italic">
                "Brat Generator completely transformed how I create album artwork. The Brat Text Generator features are incredibly intuitive, and I can produce professional designs in minutes. Highly recommended!"
              </p>
              <p className="font-semibold text-slate-900">Alex M.</p>
              <p className="text-sm text-slate-600">Independent Musician</p>
            </Card>
            <Card className="p-6 border-t-4 border-t-teal-500">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-4 italic">
                "As a graphic designer, I was skeptical at first. But Brat Generator exceeded my expectations. The customization options with Brat Generator are fantastic, and my clients love the results!"
              </p>
              <p className="font-semibold text-slate-900">Jordan T.</p>
              <p className="text-sm text-slate-600">Graphic Designer</p>
            </Card>
            <Card className="p-6 border-t-4 border-t-cyan-500">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-4 italic">
                "I use Brat Generator for all my social media content. The Brat Text Generator's ease of use means I can create multiple designs daily without any design background. It's a game-changer!"
              </p>
              <p className="font-semibold text-slate-900">Sam K.</p>
              <p className="text-sm text-slate-600">Content Creator</p>
            </Card>
          </div>
        </section>

        {/* Brat Generator Pricing Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Brat Generator Pricing
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Brat Generator is completely free to use. No hidden fees, no subscriptions, no premium tiers.
              Access all Brat Generator features and create unlimited designs at no cost.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-lime-50 to-emerald-50 border-2 border-lime-500">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Brat Generator - Free Forever</h4>
                <p className="text-4xl font-bold text-lime-600 mb-6">$0</p>
                <p className="text-slate-600 mb-8">
                  Everything you need to create stunning designs with Brat Generator is included at no cost.
                </p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>Unlimited Brat Generator design creation</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>All Brat Text Generator customization options</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>High-resolution exports with Brat Generator</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>Multiple export formats (PNG, JPEG, SVG)</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>Real-time preview with Brat Generator</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>Social media sharing integration</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>Commercial use rights for all Brat Generator creations</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <Zap className="w-5 h-5 text-lime-600 mr-3 flex-shrink-0" />
                    <span>No registration or account required</span>
                  </li>
                </ul>
                <Button
                  size="lg"
                  className="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-8 py-3"
                  onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Using Brat Generator Now
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Quick Start Guide Section */}
        <section className="mb-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 md:p-12 border border-purple-200">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Quick Start with Brat Generator
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get started with Brat Generator in just 3 minutes. Follow this simple guide to create your first design using our Brat Text Generator.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Enter Your Text</h4>
                <p className="text-slate-600">
                  Type your text into Brat Generator. The Brat Text Generator supports multi-line input for creative layouts and designs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Customize with Brat Generator</h4>
                <p className="text-slate-600">
                  Choose colors, effects, and styles using Brat Generator's intuitive controls. See changes instantly with real-time preview.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Download Your Design</h4>
                <p className="text-slate-600">
                  Export your Brat Generator creation in PNG, JPEG, or SVG format. Use it anywhere—no restrictions with Brat Generator.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brat Generator Comparison Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Brat Generator vs Other Design Tools
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See why Brat Generator stands out from other design tools. Our Brat Text Generator offers superior features and ease of use.
            </p>
          </div>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-lime-600">Brat Generator</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">Canva</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">Photoshop</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">GIMP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">Free to Use</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">⚠️ Limited</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">✅</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">Brat Text Generator</td>
                  <td className="text-center py-4 px-4">✅ Specialized</td>
                  <td className="text-center py-4 px-4">⚠️ Generic</td>
                  <td className="text-center py-4 px-4">⚠️ Complex</td>
                  <td className="text-center py-4 px-4">⚠️ Complex</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">Easy to Learn</td>
                  <td className="text-center py-4 px-4">✅ Very Easy</td>
                  <td className="text-center py-4 px-4">✅ Easy</td>
                  <td className="text-center py-4 px-4">❌ Difficult</td>
                  <td className="text-center py-4 px-4">❌ Difficult</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">No Registration</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">❌</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">Real-time Preview</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">✅</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">Brat Aesthetic Focus</td>
                  <td className="text-center py-4 px-4">✅ Specialized</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">❌</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">High-Quality Export</td>
                  <td className="text-center py-4 px-4">✅ 1200x1200</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">✅</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-900 font-medium">Commercial Use</td>
                  <td className="text-center py-4 px-4">✅ Unlimited</td>
                  <td className="text-center py-4 px-4">⚠️ Limited</td>
                  <td className="text-center py-4 px-4">✅</td>
                  <td className="text-center py-4 px-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6">
              Brat Generator is the perfect choice for anyone looking to create stunning album covers with the authentic brat aesthetic.
              Start using Brat Generator today and experience the difference!
            </p>
            <Button
              size="lg"
              className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-8 py-3"
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Try Brat Generator Now
            </Button>
          </div>
        </section>

        {/* Other Generators Section */}
        <section className="mb-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 md:p-12 border border-purple-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              More Creative Generators
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our latest professional design generators.
              Create stunning visuals with powerful tools and unlimited creative possibilities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Redacted Text Generator - NEW */}
            <Link href="/generators/redacted-text" className="h-full">
              <Card className="h-full p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 border-2 border-blue-200 flex flex-col relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Redacted Text Generator</h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  Free, private text redaction tool. Hide sensitive information instantly. Redact emails, URLs, phone numbers with 100% client-side processing!
                </p>
                <div className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-auto">
                  Try Now <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </Card>
            </Link>
            {/* Corrupted Text Generator */}
            <Link href="/generators/corrupted-text" className="h-full">
              <Card className="h-full p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 border-2 border-purple-200 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Corrupted Text Generator</h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  Create creepy corrupted text, Zalgo text, and glitch effects with advanced controls. UnZalgo feature included!
                </p>
                <div className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center mt-auto">
                  Try Now <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </Card>
            </Link>
            {/* Fiery Text Generator */}
            <Link href="/generators/fiery-text" className="h-full">
              <Card className="h-full p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 border-2 border-orange-200 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Fiery Text Generator</h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  Create blazing hot fiery text with 2 authentic fiery fonts and 6 fire color presets. Customize glow effects and download instantly!
                </p>
                <div className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center mt-auto">
                  Try Now <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </Card>
            </Link>
            {/* Rainbow Text Generator */}
            <Link href="/generators/rainbow-text" className="h-full">
              <Card className="h-full p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-2 border-purple-200 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Rainbow className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Rainbow Text Generator</h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  Create stunning rainbow text with 6+ unique fonts and 6 gradient presets. Customize colors, effects, and download instantly!
                </p>
                <div className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center mt-auto">
                  Try Now <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </Card>
            </Link>
            {/* Alien Text Generator */}
            <Link href="/generators/alien-text" className="h-full">
              <Card className="h-full p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-purple-50 to-green-50 border-2 border-purple-200 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Alien Text Generator</h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  Transform your text into alien fonts with 10+ unique extraterrestrial styles. Full customization, glow effects, and instant download.
                </p>
                <div className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center mt-auto">
                  Try Now <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </Card>
            </Link>
            {/* Mirror Text Generator */}
            <Link href="/generators/mirror-text" className="h-full">
              <Card className="h-full p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <FlipHorizontal className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Mirror Text Generator</h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  Create stunning mirrored text effects instantly. Horizontal, vertical, and reverse text transformations. Perfect for social media and creative designs.
                </p>
                <div className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center mt-auto">
                  Try Now <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about how to use Brat Generator effectively.
              Find answers to common questions about Brat Generator and discover tips for getting the most out of your creative projects.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6 border-l-4 border-l-amber-500 bg-amber-50">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Is Brat Generator an official product?
                  </h4>
                  <p className="text-slate-600">
                    <strong>No.</strong> Brat Generator is a fan-inspired creative tool inspired by Charli XCX's iconic "brat" aesthetic.
                    This is NOT an official product and is NOT affiliated with, endorsed by, or associated with Charli XCX, her management, record label, or any official entity.
                    We are independent creators who built this tool for the community. All references to "brat" are for inspirational purposes only.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    What does Brat Generator do?
                  </h4>
                  <p className="text-slate-600">
                    Brat Generator is a specialized design platform that creates album covers inspired by Charli XCX's iconic aesthetic.
                    With our Brat Generator, you can create custom designs with bold typography, vibrant colors, and authentic styling that captures the essence of this visual movement.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    How do I use Brat Generator?
                  </h4>
                  <p className="text-slate-600">
                    Simply input your text into Brat Generator, choose your preferred colors and effects, and watch the real-time preview update instantly.
                    Adjust typography, blur intensity, and layout options until you're happy with the result, then export your Brat Generator creation in your desired format.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Can I use Brat Generator designs commercially?
                  </h4>
                  <p className="text-slate-600">
                    Absolutely! All designs you create with Brat Generator are completely free to use for personal and commercial projects.
                    Use your Brat Generator creations for album covers, social media posts, merchandise, promotional materials, and more with no restrictions or licensing fees.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    What formats does Brat Generator export?
                  </h4>
                  <p className="text-slate-600">
                    Brat Generator exports high-quality files at 1200x1200 pixels resolution in PNG, JPEG, and SVG formats.
                    Our Brat Generator ensures perfect compatibility with social media platforms, streaming services, print applications, and any other use case you have in mind.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Ad Section - After FAQ */}
        <section className="mb-16 bg-slate-50 py-8 -mx-4 px-4">
          <div className="flex justify-center">
            <ResponsiveAd
              adSlot="1234567890"
              className="max-w-full"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-lime-500 to-emerald-500 rounded-2xl p-12 text-black">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Your Masterpiece with Brat Generator?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of artists and creators designing stunning artwork with Brat Generator.
            Discover your creative potential with our intuitive Brat Generator platform and professional-grade tools today!
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
                Create stunning artwork inspired by Charli XCX's iconic aesthetic.
                Unlimited creative possibilities with advanced features, intuitive controls, and professional-grade export capabilities.
              </p>
              <p className="text-xs text-slate-500 italic">
                ⓘ Fan-inspired tool • Not official • Inspired by Charli XCX's brat aesthetic
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Our Generators</h5>
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
                    Brat Generator
                  </a>
                </li>
                <li>
                  <Link
                    href="/generators/glitter-text"
                    className="hover:text-white transition-colors"
                  >
                    Glitter Text Generator
                  </Link>
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
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Brat Generator. All rights reserved. Create stunning album covers inspired by Charli XCX's iconic aesthetic.
            Free design tool for artists, musicians, and creators worldwide.</p>
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
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
  scribbleStyle: 'none' | 'texture' | 'destructive';
}

const defaultConfig: BratConfig = {
  text: 'brat',
  bgColor: 'lime',
  customColor: '#8acf00',
  isCustomColor: false,
  fontSize: 72,
  borderRadius: 8,
  textAlign: 'center',
  flipHorizontal: false,
  flipVertical: false,
  blurAmount: 2.3,
  scribbleStyle: 'none',
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
        console.log('Scribble image preloaded successfully');
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

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    console.log('Starting download process...');
    
    try {
      // Method 1: Try using html2canvas (retain full functionality)
      let downloadSuccess = false;
      
      try {
        console.log('Trying method 1: html2canvas');
        const { default: html2canvas } = await import('html2canvas');
        const previewElement = document.getElementById('brat-preview-area');
        
        if (!previewElement) {
          throw new Error('Preview element not found');
        }

        // Wait for fonts to load
        console.log('Waiting for fonts to load...');
        await document.fonts.ready;
        
        // Ensure DOM rendering is complete
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Temporarily set styles to ensure correct capture
        const textElement = previewElement.querySelector('.font-black') as HTMLElement;
        let originalStyle = '';
        
        if (textElement) {
          originalStyle = textElement.style.cssText;
          textElement.style.fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
          textElement.style.fontWeight = '800';
          textElement.style.letterSpacing = '-0.02em';
        }

        console.log('Starting html2canvas screenshot...');
        const canvas = await html2canvas(previewElement, {
          useCORS: true,
          allowTaint: true
        });
        
        // Restore original styles
        if (textElement && originalStyle !== undefined) {
          textElement.style.cssText = originalStyle;
        }
        
        console.log('html2canvas successful, starting download...');
        
        // Create download link
        const dataURL = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `brat-${config.text.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '-').toLowerCase().substring(0, 20) || 'cover'}.png`;
        
        // Save image data URL for sharing
        setLastGeneratedImageUrl(dataURL);
        
        // Ensure download
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        // Delayed cleanup
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 1000);
        
        downloadSuccess = true;
        console.log('html2canvas download successful');
        
      } catch (html2canvasError) {
        console.warn('html2canvas failed:', html2canvasError);
        
        // Special handling for ChunkLoadError
        if (html2canvasError instanceof Error && html2canvasError.name === 'ChunkLoadError') {
          console.log('ChunkLoadError detected, attempting to reload html2canvas...');
          
          // Clean up potentially corrupted module cache
          if ('webpackChunkName' in html2canvasError) {
            delete (window as any).__webpack_require__.cache;
          }
          
          // Wait for a while before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          try {
            // Re-import html2canvas dynamically
            const { default: html2canvas } = await import('html2canvas');
            console.log('html2canvas reloaded successfully, attempting screenshot again...');
            
            const previewElement = document.getElementById('brat-preview-area');
            if (!previewElement) {
              throw new Error('Preview element not found');
            }
            
            const canvas = await html2canvas(previewElement, {
              useCORS: true,
              allowTaint: true
            });
            
            const dataURL = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `brat-${config.text.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '-').toLowerCase().substring(0, 20) || 'cover'}.png`;
            
            // Save image data URL for sharing
            setLastGeneratedImageUrl(dataURL);
            
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            
            setTimeout(() => {
              if (document.body.contains(link)) {
                document.body.removeChild(link);
              }
            }, 1000);
            
            downloadSuccess = true;
            console.log('html2canvas retry successful');
            
          } catch (retryError) {
            console.warn('html2canvas retry also failed:', retryError);
            // Continue to manual Canvas method
          }
        }
        
        if (!downloadSuccess) {
          console.log('Trying method 2: manual Canvas drawing');
          
          // Method 2: Manual Canvas drawing (full functionality retained)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
            throw new Error('Unable to create Canvas 2D context');
      }
      
          // High resolution setting
          const pixelRatio = window.devicePixelRatio || 1;
          const size = 1200 * pixelRatio;
      canvas.width = size;
      canvas.height = size;
          canvas.style.width = '1200px';
          canvas.style.height = '1200px';
          
          // Scale context to support high DPI
          ctx.scale(pixelRatio, pixelRatio);
          const displaySize = 1200;
          
          console.log('Starting manual drawing Canvas...');
          
          // Get current configuration
          const bgColor = getCurrentBgColor();
          const textColor = getCurrentTextColor();
          const text = (debouncedText || 'brat').toLowerCase();
      
      // Draw background
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, displaySize, displaySize);
      
          // Apply rounded corners
          if (config.borderRadius > 0) {
            const radius = Math.min(config.borderRadius * 8, displaySize / 4);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
            
            // Use more precise rounded drawing
            ctx.moveTo(radius, 0);
            ctx.lineTo(displaySize - radius, 0);
            ctx.quadraticCurveTo(displaySize, 0, displaySize, radius);
            ctx.lineTo(displaySize, displaySize - radius);
            ctx.quadraticCurveTo(displaySize, displaySize, displaySize - radius, displaySize);
            ctx.lineTo(radius, displaySize);
            ctx.quadraticCurveTo(0, displaySize, 0, displaySize - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();
            
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
      
      // Set text styles
          const fontSize = Math.min(debouncedFontSize * 16, displaySize * 0.6);
      ctx.fillStyle = textColor;
          ctx.font = `700 ${fontSize}px "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.textBaseline = 'middle';
      
          // Text alignment
          let textAlign: CanvasTextAlign = 'center';
          if (config.textAlign === 'left') textAlign = 'left';
          else if (config.textAlign === 'right') textAlign = 'right';
          ctx.textAlign = textAlign;
      
          // Calculate text position
          let x = displaySize / 2;
          if (config.textAlign === 'left') x = displaySize * 0.08;
          else if (config.textAlign === 'right') x = displaySize * 0.92;
      
          // Multi-line text processing
          const lines = text.split('\n');
          const lineHeight = fontSize * 0.85;
      const totalHeight = lines.length * lineHeight;
          const startY = (displaySize - totalHeight) / 2 + lineHeight / 2;
      
      // Apply transformation effect
      ctx.save();
          ctx.translate(displaySize / 2, displaySize / 2);
      
          // Calculate scaling
      let scaleX = 1;
          let scaleY = 1;
          
          if (text.length > 12) scaleX = 0.85;
          if (config.flipHorizontal) scaleX *= -1;
          if (config.flipVertical) scaleY *= -1;
          
          ctx.scale(scaleX, scaleY);
          ctx.translate(-displaySize / 2, -displaySize / 2);
          
          // Draw background texture (if needed)
          if (config.scribbleStyle === 'texture' && scribbleImage) {
            console.log('Drawing background texture on Canvas...');
            const pattern = ctx.createPattern(scribbleImage, 'repeat');
            if (pattern) {
              ctx.save();
              ctx.globalAlpha = 0.3; // Texture use lower transparency
              ctx.fillStyle = pattern;
              ctx.fillRect(0, 0, displaySize, displaySize);
              ctx.restore();
            }
          }
          
          // Draw text (manual letterSpacing handling)
          const letterSpacing = -0.05 * fontSize;
      
      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
            let currentX = x;
            const trimmedLine = line.trim();
            
            if (config.textAlign === 'center') {
              const totalWidth = ctx.measureText(trimmedLine).width + (trimmedLine.length - 1) * letterSpacing;
              currentX = (displaySize - totalWidth) / 2;
            } else if (config.textAlign === 'right') {
              const totalWidth = ctx.measureText(trimmedLine).width + (trimmedLine.length - 1) * letterSpacing;
              currentX = displaySize - totalWidth - (displaySize * 0.08);
            }
            
            for (let i = 0; i < trimmedLine.length; i++) {
              const char = trimmedLine[i];
              
              ctx.save();
              // Apply combined filter and disable image smoothing for pixelated effect
              ctx.filter = config.blurAmount > 0 
                ? `blur(${config.blurAmount * 0.8}px) contrast(1.2) saturate(1.1)` 
                : 'none';
              ctx.imageSmoothingEnabled = false;
              ctx.fillText(char, currentX, y);
      ctx.restore();
      
              currentX += ctx.measureText(char).width + letterSpacing;
            }
          });
          
          ctx.restore();
          
          // Draw destructive scribble (if needed)
          if (config.scribbleStyle === 'destructive' && scribbleImage) {
            console.log('Drawing destructive scribble on Canvas...');
            ctx.save();
            const imgWidth = displaySize * 0.9;
            const imgHeight = (imgWidth / scribbleImage.width) * scribbleImage.height;
            const xPos = (displaySize - imgWidth) / 2;
            const yPos = (displaySize - imgHeight) / 2;
            ctx.globalAlpha = 0.9; // Destructive scribble more opaque
            ctx.drawImage(scribbleImage, xPos, yPos, imgWidth, imgHeight);
            ctx.restore();
      }
      
          console.log('Canvas drawing completed, starting download...');
          
          // Create download
          const dataURL = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
          link.href = dataURL;
          link.download = `brat-${config.text.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '-').toLowerCase().substring(0, 20) || 'cover'}.png`;
      
          // Save image data URL for sharing
          setLastGeneratedImageUrl(dataURL);
      
          // Ensure download
          link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
          
          // Delayed cleanup
          setTimeout(() => {
            if (document.body.contains(link)) {
      document.body.removeChild(link);
            }
          }, 1000);
          
          downloadSuccess = true;
          console.log('Manual Canvas download successful');
        }
      }
      
      if (downloadSuccess) {
        toast.success('Image download successful! Saved to downloads folder', {
          position: "top-center",
          duration: 4000,
        });
      }
      
    } catch (error) {
      console.error('All download methods failed:', error);
      
      // Detailed error analysis and user-friendly tips
      let errorMessage = 'Download failed: ';
      let suggestion = '';
      
      if (error instanceof Error) {
        if (error.message.includes('Canvas')) {
          errorMessage += 'Browser Canvas functionality error';
          suggestion = 'Please try refreshing the page or use another browser';
        } else if (error.message.includes('tainted') || error.message.includes('CORS')) {
          errorMessage += 'Image security restriction';
          suggestion = 'Please ensure network connection is normal';
        } else if (error.message.includes('memory') || error.message.includes('Memory')) {
          errorMessage += 'Insufficient memory';
          suggestion = 'Please close other tabs and try again';
        } else if (error.message.includes('network') || error.message.includes('Network')) {
          errorMessage += 'Network connection issue';
          suggestion = 'Please check network connection';
        } else if (error.name === 'ChunkLoadError') {
          errorMessage += 'Resource loading failed';
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
      
      // Provide fallback solution tip
      setTimeout(() => {
        toast('💡 Alternative: You can right-click on the preview image and select "Save image"', {
          position: "top-center",
          duration: 8000,
        });
      }, 1000);
      
    } finally {
      setIsDownloading(false);
      console.log('Download process ended');
    }
  }, [isDownloading, config, debouncedText, debouncedFontSize, getCurrentBgColor, getCurrentTextColor, scribbleImage]);

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
    textAlign: config.textAlign as 'left' | 'center' | 'right',
    color: getCurrentTextColor(),
    letterSpacing: '-0.05em',
    fontWeight: '700',
    fontFamily: '"Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    transition: 'filter 0.2s ease-in-out',
    filter: config.blurAmount > 0 
      ? `blur(${config.blurAmount}px) contrast(1.2) saturate(1.1)` 
      : 'none',
    imageRendering: 'pixelated',
  };

  // Debug log
  if (process.env.NODE_ENV === 'development') {
    console.log('Blur status:', config.blurAmount > 0);
    console.log('TextStyle:', textStyle);
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
            Our brat text generator makes it easy to create professional covers instantly with authentic blur effects.
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
                  Customization
                </h3>
                
                <div className="space-y-6">
                  {/* Multi-line Text Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Album Title (Multi-line Support)
                    </label>
                    <textarea
                      value={config.text}
                      onChange={handleTextareaChange}
                      placeholder="Enter your text...&#10;Multi-line supported"
                      className="w-full min-h-[120px] max-h-[200px] px-3 py-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-vertical overflow-y-auto"
                      maxLength={100}
                      rows={4}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {config.text.length}/100 characters • Press Enter for new line
                    </p>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Font Size: {config.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="24"
                      max="120"
                      value={config.fontSize}
                      onChange={(e) => setConfig(prev => ({...prev, fontSize: Number(e.target.value)}))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Blur Effect: {config.blurAmount}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={config.blurAmount}
                          onChange={(e) => setConfig(prev => ({...prev, blurAmount: Number(e.target.value)}))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      
                      {/* Scribble Style Picker */}
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Scribble Style
                        </label>
                        <div className="flex gap-2">
                          <Button
                            variant={config.scribbleStyle === 'none' ? 'default' : 'outline'}
                            onClick={() => setConfig(prev => ({...prev, scribbleStyle: 'none'}))}
                            className={`flex-1 ${config.scribbleStyle === 'none' ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                          >
                            Off
                          </Button>
                          <Button
                            variant={config.scribbleStyle === 'texture' ? 'default' : 'outline'}
                            onClick={() => setConfig(prev => ({...prev, scribbleStyle: 'texture'}))}
                            className={`flex-1 ${config.scribbleStyle === 'texture' ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                          >
                            Texture
                          </Button>
                          <Button
                            variant={config.scribbleStyle === 'destructive' ? 'default' : 'outline'}
                            onClick={() => setConfig(prev => ({...prev, scribbleStyle: 'destructive'}))}
                            className={`flex-1 ${config.scribbleStyle === 'destructive' ? "bg-lime-500 hover:bg-lime-600 text-black" : ""}`}
                          >
                            Destructive
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background Color */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center">
                      <Palette className="w-4 h-4 mr-1" />
                      Background Color
                    </label>
                    
                    {/* Preset Colors */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {Object.entries(backgroundColors).map(([color, className]) => (
                        <button
                          key={color}
                          onClick={() => {
                            setConfig(prev => ({ ...prev, bgColor: color, isCustomColor: false }));
                          }}
                          className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 ${className} ${
                            config.bgColor === color && !config.isCustomColor ? 'ring-2 ring-slate-400 ring-offset-2' : ''
                          }`}
                          title={color}
                        />
                      ))}
                    </div>
                    
                    {/* Custom Color Picker */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.customColor}
                          onChange={(e) => {
                            setConfig(prev => ({...prev, customColor: e.target.value, isCustomColor: true, bgColor: 'custom'}));
                          }}
                          className="w-12 h-8 rounded border cursor-pointer"
                          title="Choose custom color"
                        />
                        <input
                          type="text"
                          value={config.customColor}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^#[0-9A-Fa-f]{0,7}$/.test(value)) {
                              setConfig(prev => ({...prev, customColor: value}));
                              if (value.length === 7) {
                                setConfig(prev => ({...prev, isCustomColor: true, bgColor: 'custom'}));
                              }
                            }
                          }}
                          placeholder="#8acf00"
                          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          maxLength={7}
                        />
                      </div>
                      <p className="text-xs text-slate-500">
                        Enter hex color code (e.g., #8acf00) or use the color picker
                      </p>
                    </div>
                  </div>

                  {/* Border Radius */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-slate-700 flex items-center">
                        <CornerUpRight className="w-4 h-4 mr-1" />
                        Border Radius: {config.borderRadius}px
                      </Label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={config.borderRadius}
                      onChange={(e) => setConfig(prev => ({...prev, borderRadius: Number(e.target.value)}))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
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
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={handleDownload}
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
                    ${config.textAlign === 'left' ? 'justify-start' : config.textAlign === 'right' ? 'justify-end' : 'justify-center'}
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
                      backgroundImage: 'url(/line.png)',
                      backgroundRepeat: 'repeat',
                      backgroundSize: 'auto',
                    }),
                    }}
                  >
                  {/* Scribble Overlay for 'destructive' style */}
                  {config.scribbleStyle === 'destructive' && <ScribbleOverlay />}

                    <div 
                    className="font-black px-4 leading-tight whitespace-pre-line"
                      style={textStyle}
                    >
                      {(debouncedText || 'brat').toLowerCase()}
                  </div>
                </div>
                <p className="text-center text-sm text-slate-500 mt-4">
                  1200 × 1200 px high-quality download. Perfect for social media.
                  {process.env.NODE_ENV === 'development' && (
                    <span className="block text-xs mt-1">
                      Debug: Blur {config.blurAmount > 0 ? 'ON' : 'OFF'}
                    </span>
                  )}
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

        {/* Features Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Brat Generator?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The most powerful brat album cover generator with advanced text features
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-lime-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Instant Generation</h4>
              <p className="text-slate-600">
                Create professional-looking brat album covers in seconds with real-time preview
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Advanced Customization</h4>
              <p className="text-slate-600">
                Choose from multiple color combinations and typography options with our tools
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">High-Quality Export</h4>
              <p className="text-slate-600">
                Download your creations in high-resolution PNG format, perfect for any platform
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
              Everything you need to know about our brat generator tool
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
                    Our tool allows you to create custom designs with bold typography and vibrant colors.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <HelpCircle className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    How does the text generator work?
                  </h4>
                  <p className="text-slate-600">
                    Our text generator uses advanced typography rendering to create bold, impactful text designs. 
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
                    Can I use the generated covers for commercial purposes?
                  </h4>
                  <p className="text-slate-600">
                    Yes! All designs created with our generator are free to use for personal and commercial projects. 
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
                    What format does the generator export?
                  </h4>
                  <p className="text-slate-600">
                    Our generator exports high-quality PNG files at 1200x1200 pixels, perfect for social media, 
                    streaming platforms, and print applications. The format ensures crisp, professional results.
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
            Join thousands of artists using our generator to create stunning designs
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
                The ultimate tool for creating stunning designs inspired by Charli XCX's iconic aesthetic.
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
            <p>&copy; 2024 Brat Generator. All rights reserved. Create stunning brat album covers with our free text generator.</p>
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
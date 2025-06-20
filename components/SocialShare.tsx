'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, Twitter, Facebook, Instagram, MessageSquare, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SocialShareProps {
  text: string;
  url?: string;
  hashtags?: string[];
  imageDataUrl?: string;
}

export default function SocialShare({ 
  text, 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  hashtags = ['brat', 'albumcover', 'design'],
  imageDataUrl 
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    // Check if native share API is supported
    setHasNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  // Format share text
  const formatShareText = (platform: string) => {
    const baseText = `Check out my ${text} brat album cover! 🎵`;
    const hashtagsText = hashtags.map(tag => `#${tag}`).join(' ');
    
    switch (platform) {
      case 'twitter':
        return `${baseText} ${hashtagsText}`;
      case 'facebook':
        return baseText;
      case 'whatsapp':
        return `${baseText} ${url}`;
      default:
        return baseText;
    }
  };

  // Twitter share
  const shareToTwitter = () => {
    const shareText = formatShareText('twitter');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    
    toast.success('Twitter share page opened!', {
      position: "top-center",
      duration: 3000,
    });
  };

  // Facebook share
  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(formatShareText('facebook'))}`;
    window.open(facebookUrl, '_blank', 'width=555,height=555');
    
    toast.success('Facebook share page opened!', {
      position: "top-center",
      duration: 3000,
    });
  };

  // WhatsApp share
  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(formatShareText('whatsapp'))}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('WhatsApp share opened!', {
      position: "top-center",
      duration: 3000,
    });
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!', {
        position: "top-center",
        duration: 3000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link, please copy manually', {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  // Native share API (mobile)
  const nativeShare = async () => {
    if (hasNativeShare && navigator.share) {
      try {
        const shareData: ShareData = {
          title: 'Brat Album Cover Generator',
          text: formatShareText('native'),
          url: url,
        };

        // If image data exists, try to share the image
        if (imageDataUrl) {
          try {
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();
            const file = new File([blob], `brat-${text.toLowerCase().replace(/\s+/g, '-')}.png`, {
              type: 'image/png',
            });
            shareData.files = [file];
          } catch (imageError) {
            console.warn('Unable to share image, sharing link only:', imageError);
          }
        }

        await navigator.share(shareData);
        toast.success('Share successful!', {
          position: "top-center",
          duration: 3000,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Share failed, please try another method', {
            position: "top-center",
            duration: 3000,
          });
        }
      }
    } else {
      // Fallback to copy link
      copyToClipboard();
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-lime-50 to-emerald-50 border-lime-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-slate-800 flex items-center">
          <Share2 className="w-4 h-4 mr-2" />
          Share Your Creation
        </h4>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Twitter */}
        <Button
          onClick={shareToTwitter}
          variant="outline"
          size="sm"
          className="flex items-center justify-center bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-300 text-blue-600"
        >
          <Twitter className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>

        {/* Facebook */}
        <Button
          onClick={shareToFacebook}
          variant="outline"
          size="sm"
          className="flex items-center justify-center bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-300 text-blue-700"
        >
          <Facebook className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>

        {/* WhatsApp */}
        <Button
          onClick={shareToWhatsApp}
          variant="outline"
          size="sm"
          className="flex items-center justify-center bg-white hover:bg-green-50 border-green-200 hover:border-green-300 text-green-600"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>

        {/* Copy link/Native share */}
        <Button
          onClick={hasNativeShare ? nativeShare : copyToClipboard}
          variant="outline"
          size="sm"
          className="flex items-center justify-center bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600"
        >
          {copied ? (
            <Check className="w-4 h-4 mr-1 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 mr-1" />
          )}
          <span className="hidden sm:inline">
            {hasNativeShare ? 'Share' : copied ? 'Copied' : 'Copy Link'}
          </span>
        </Button>
      </div>
      
      <p className="text-xs text-slate-500 mt-2 text-center">
        Share your creation and let others see your brat-style design!
      </p>
    </Card>
  );
} 
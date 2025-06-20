'use client';

import { Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  text: string;
}

export default function ShareButtons({ url, text }: ShareButtonsProps) {
  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  return (
    <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border">
      <span className="text-sm font-medium text-slate-700 flex items-center">
        <Share2 className="w-4 h-4 mr-2" />
        Share Article:
      </span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleTwitterShare}>
          <Twitter className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleFacebookShare}>
          <Facebook className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleLinkedInShare}>
          <Linkedin className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
} 
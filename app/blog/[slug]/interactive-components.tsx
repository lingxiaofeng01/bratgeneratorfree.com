'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from 'react-hot-toast';
import SocialShare from '@/components/SocialShare';

function ToasterProvider() {
  return <Toaster position="top-center" />;
}

interface ShareButtonsProps {
  shareUrl: string;
  shareText: string;
}

function BackToTopCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top
        </Button>
      </CardContent>
    </Card>
  );
}

// A single wrapper component for all interactive elements
export function PostInteractions({ shareUrl, shareText }: ShareButtonsProps) {
  return (
    <>
      <ToasterProvider />
      
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Share this post</h3>
        <SocialShare 
          text={shareText}
          url={shareUrl}
          hashtags={['brat', 'design', 'blog', 'tutorial', 'creative']}
        />
      </div>

      <div className="lg:col-span-1 sticky top-24 space-y-8 mt-8">
        <BackToTopCard />
      </div>
    </>
  );
} 
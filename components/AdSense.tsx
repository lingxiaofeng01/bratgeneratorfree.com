'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adLayout?: string;
  adLayoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  style = { display: 'block' },
  className = '',
  responsive = true
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3701727349784910"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
    </div>
  );
}

// 预定义的广告组件类型
export function BannerAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="auto"
      style={{ display: 'block', width: '100%', height: '90px' }}
      className={`banner-ad ${className}`}
    />
  );
}

export function SquareAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="rectangle"
      style={{ display: 'block', width: '300px', height: '250px' }}
      className={`square-ad ${className}`}
    />
  );
}

export function SidebarAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="vertical"
      style={{ display: 'block', width: '160px', height: '600px' }}
      className={`sidebar-ad ${className}`}
    />
  );
}

export function ResponsiveAd({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="auto"
      style={{ display: 'block' }}
      className={`responsive-ad ${className}`}
      responsive={true}
    />
  );
}

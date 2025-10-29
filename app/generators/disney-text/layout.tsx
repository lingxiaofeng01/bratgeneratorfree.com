import { Metadata } from 'next';

export const metadata: Metadata = {
  // Title: 50-60 characters optimal, includes primary keyword
  title: 'Disney Text Generator - Free 11 Disney Fonts & Styles Online',

  // Description: 150-160 characters optimal, includes primary & secondary keywords
  description: 'Free Disney Text Generator with 11 authentic Disney fonts & 6 magical styles. Create stunning Disney-style text, customize colors, download HD PNG instantly. No watermark!',

  // Keywords: Focus on long-tail and semantic keywords
  keywords: [
    // Primary keywords
    'disney text generator',
    'disney font generator',
    'disney text generator free',

    // Secondary keywords
    'disney font',
    'disney fonts free',
    'waltograph font',
    'disney style text',
    'disney logo generator',
    'disney text maker',
    'disney font online',

    // Long-tail keywords
    'free disney text generator online',
    'disney text creator no watermark',
    'disney birthday text generator',
    'disney party invitation maker',
    'disney scrapbook fonts free',
    'disney font generator with download',

    // Specific font names
    'waltograph font generator',
    'disney dreams font',
    'lion king font generator',
    'enchanted land font',

    // Use case keywords
    'disney birthday invitations',
    'disney party decorations text',
    'disney social media graphics',
    'disney diy projects fonts',
  ],

  // OpenGraph for social sharing
  openGraph: {
    title: 'Disney Text Generator - 11 Free Disney Fonts & 6 Magical Styles',
    description: 'Create magical Disney-style text with 11 authentic fonts and 6 stunning presets. Customize colors, sizes, and download HD PNG instantly. 100% free, no watermark!',
    type: 'website',
    url: 'https://www.bratgeneratorfree.com/generators/disney-text',
    siteName: 'Brat Generator Free',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Disney Text Generator - Free Disney Font Generator with 11 Fonts',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Text Generator - 11 Free Disney Fonts Online',
    description: 'Create magical Disney-style text with 11 authentic fonts & 6 presets. Free HD download, no watermark! Perfect for parties & DIY projects.',
    images: ['/twitter-image.svg'],
    creator: '@bratgenerator',
  },

  // Canonical URL
  alternates: {
    canonical: 'https://www.bratgeneratorfree.com/generators/disney-text',
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional metadata
  authors: [{ name: 'Brat Generator Free' }],
  creator: 'Brat Generator Free',
  publisher: 'Brat Generator Free',
  category: 'Design Tools',

  // Verification and other meta tags
  other: {
    'application-name': 'Disney Text Generator',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Disney Text Generator',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
  },
};

export default function DisneyTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corrupted Text Generator - Free Zalgo & Glitch Text Creator Online',
  description: 'Create creepy corrupted text, Zalgo text, and glitch effects online for free. Advanced controls for top, middle, bottom corruption. UnZalgo feature to clean text. Perfect for social media, gaming, and creative projects.',
  keywords: 'corrupted text generator, zalgo text, glitch text, creepy text, scary text, corrupted font, zalgo generator, glitch text generator, unicode text, diacritics generator, text corrupter, halloween text, horror text, distorted text, broken text',
  authors: [{ name: 'Brat Generator Team' }],
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.bratgeneratorfree.com'),
  alternates: {
    canonical: '/generators/corrupted-text',
  },
  openGraph: {
    title: 'Corrupted Text Generator - Create Zalgo & Glitch Text Free',
    description: 'Free online corrupted text generator with advanced controls. Create creepy Zalgo text, glitch effects, and distorted fonts. UnZalgo feature included. Perfect for social media!',
    url: 'https://www.bratgeneratorfree.com/generators/corrupted-text',
    siteName: 'Brat Generator',
    images: [
      {
        url: 'https://www.bratgeneratorfree.com/og-corrupted-text.png',
        width: 1200,
        height: 630,
        alt: 'Corrupted Text Generator - Create Zalgo & Glitch Text',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corrupted Text Generator - Free Zalgo & Glitch Text Creator',
    description: 'Create creepy corrupted text and Zalgo effects online. Advanced controls, UnZalgo feature, instant copy. 100% free!',
    images: ['https://www.bratgeneratorfree.com/twitter-corrupted-text.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CorruptedTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


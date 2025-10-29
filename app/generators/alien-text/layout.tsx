import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bratgeneratorfree.com';

export const metadata: Metadata = {
  title: 'Alien Text Generator - Free Alien Font Converter & Text Maker',
  description: 'Transform your text into alien fonts with 10+ unique styles. Free alien text generator with instant preview, copy & download. Perfect for sci-fi designs and creative projects.',
  keywords: [
    'alien text generator',
    'alien font',
    'alien symbols',
    'alien language',
    'alien text converter',
    'extraterrestrial font',
    'sci-fi text',
    'alien writing',
    'alien alphabet',
    'alien font generator',
    'alien text maker',
    'alien symbol generator',
    'free alien font',
    'alien text copy paste',
    'alien language generator'
  ],
  authors: [{ name: 'Brat Generator' }],
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/generators/alien-text',
  },
  openGraph: {
    title: 'Alien Text Generator - Free Alien Font Converter & Text Maker',
    description: 'Transform your text into alien fonts with 10+ unique styles. Free alien text generator with instant preview, copy & download.',
    url: `${baseUrl}/generators/alien-text`,
    siteName: 'Brat Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'Alien Text Generator - Transform Text into Alien Fonts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alien Text Generator - Free Alien Font Converter',
    description: 'Transform your text into alien fonts with 10+ unique styles. Instant preview, copy & download.',
    images: [`${baseUrl}/twitter-image.svg`],
    creator: '@bratgenerator',
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Text Generator',
};

export default function AlienTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


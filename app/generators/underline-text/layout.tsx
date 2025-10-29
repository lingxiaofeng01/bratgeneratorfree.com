import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Underline Text Generator - Free Online Underline Text Maker | 20+ Styles',
  },
  description: 'Free underline text generator with 20+ styles. Create underlined text for Instagram, Twitter, Discord & more. Generate underline text instantly with one-click copy & paste. Best underline text maker online!',
  keywords: [
    'underline text generator',
    'underline text',
    'text underline generator',
    'underlined text',
    'underline font generator',
    'underline text maker',
    'underline text online',
    'underline text copy paste',
    'underline text for instagram',
    'underline text for discord',
    'underline text for twitter',
    'free underline text generator',
    'unicode underline text',
    'underline text styles',
    'decorative underline text',
    'fancy underline text',
    'underline text creator',
    'underline text tool',
    'social media underline text',
    'underline text effects',
  ].join(', '),
  authors: [{ name: 'Brat Generator Team' }],
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  openGraph: {
    title: 'Free Underline Text Generator - Create Underlined Text Online | 20+ Styles',
    description: 'Generate underline text with our free underline text generator. Create beautiful underlined text for Instagram, Twitter & more. 20+ underline text styles. Best underline generator online!',
    url: 'https://www.bratgeneratorfree.com/generators/underline-text',
    siteName: 'Brat Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Free Underline Text Generator - Create Underlined Text Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Underline Text Generator - 20+ Underline Text Styles',
    description: 'Create stunning underline text for social media. Generate underlined text with 20+ unique styles. Free underline text maker with one-click copy!',
    images: ['/twitter-image.svg'],
  },
  alternates: {
    canonical: 'https://www.bratgeneratorfree.com/generators/underline-text',
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

export default function UnderlineTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


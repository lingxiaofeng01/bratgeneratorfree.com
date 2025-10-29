import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bratgeneratorfree.com';

export const metadata: Metadata = {
  title: 'SpongeBob Text Generator - Free Mocking Text Converter | SpongeBob Meme Generator',
  description: 'Create hilarious SpongeBob mocking text instantly! Free online generator with 6 conversion modes including random case, alternating case, bold, and italic. Perfect for memes and social media. No sign-up required.',
  keywords: [
    'spongebob text generator',
    'spongebob mocking text',
    'mocking spongebob meme',
    'sarcastic text generator',
    'alternating case text',
    'random case generator',
    'spongebob meme generator',
    'mocking text converter',
    'spongebob font generator',
    'taunt text generator',
    'free text generator',
    'unicode text converter',
    'bold text generator',
    'italic text generator',
    'social media text',
    'meme text generator'
  ],
  authors: [{ name: 'Brat Generator Team' }],
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}/generators/spongebob-text`,
  },
  openGraph: {
    title: 'SpongeBob Text Generator - Free Mocking Text Converter',
    description: 'Create hilarious SpongeBob mocking text instantly! Free online generator with 6 conversion modes. Perfect for memes and social media.',
    url: `${baseUrl}/generators/spongebob-text`,
    siteName: 'Brat Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'SpongeBob Text Generator - Create Mocking Text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpongeBob Text Generator - Free Mocking Text Converter',
    description: 'Create hilarious SpongeBob mocking text instantly! 6 conversion modes, perfect for memes and social media.',
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

export default function SpongeBobTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


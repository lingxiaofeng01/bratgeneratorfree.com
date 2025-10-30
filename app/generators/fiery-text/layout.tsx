import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bratgenerator.com';

export const metadata: Metadata = {
  title: 'Fiery Text Generator - Free Fire Text & Flame Font Generator',
  description: 'Create stunning fiery text effects with our free fiery text generator. Choose from 2+ unique flame fonts, customize colors and glow effects, and download instantly. Perfect for gaming, social media, and creative projects.',
  keywords: [
    'fiery text generator',
    'fire text generator',
    'flame font generator',
    'fiery font',
    'burning text generator',
    'flame text effect',
    'fire text effect',
    'flaming letters',
    'fiery typography',
    'fire font',
    'flame text maker',
    'burning letters',
    'hot text generator',
    'blazing text',
    'fire font generator free',
    'flame font online',
    'fiery text maker',
    'fire text design',
    'flame effect text',
    'free fiery text generator'
  ],
  authors: [{ name: 'Brat Generator' }],
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/generators/fiery-text',
  },
  openGraph: {
    title: 'Fiery Text Generator - Free Fire Text & Flame Font Generator',
    description: 'Create stunning fiery text effects with our free fiery text generator. Choose from 2+ unique flame fonts, customize colors and glow effects, and download instantly.',
    url: `${baseUrl}/generators/fiery-text`,
    siteName: 'Brat Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'Fiery Text Generator - Create Fire Text Online'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiery Text Generator - Free Fire Text & Flame Font Generator',
    description: 'Create stunning fiery text effects with our free fiery text generator. Choose from 2+ unique flame fonts, customize colors and glow effects.',
    images: [`${baseUrl}/twitter-image.svg`],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function FieryTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

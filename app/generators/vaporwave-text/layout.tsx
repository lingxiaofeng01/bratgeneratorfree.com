import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaporwave Text Generator - Free Aesthetic Vaporwave Font Generator',
  description: 'Create stunning vaporwave aesthetic text with our free online generator. Choose from 8+ authentic color schemes, multiple fonts, neon glow effects, and retro backgrounds. Perfect for social media, artwork, and design projects. No signup required, instant download.',
  keywords: [
    'vaporwave text generator',
    'vaporwave font generator',
    'aesthetic text generator',
    'vaporwave aesthetic',
    'neon text generator',
    'retro text generator',
    '80s text generator',
    'synthwave text',
    'vaporwave typography',
    'aesthetic font generator',
    'free vaporwave text',
    'vaporwave design tool',
    'neon glow text',
    'gradient text generator',
    'retro aesthetic text',
  ],
  openGraph: {
    title: 'Vaporwave Text Generator - Free Aesthetic Vaporwave Font Generator',
    description: 'Create stunning vaporwave aesthetic text with 8+ color schemes, multiple fonts, and retro effects. Free online tool with instant download.',
    type: 'website',
    url: 'https://www.bratgeneratorfree.com/generators/vaporwave-text',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Vaporwave Text Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaporwave Text Generator - Free Aesthetic Vaporwave Font Generator',
    description: 'Create stunning vaporwave aesthetic text with 8+ color schemes, multiple fonts, and retro effects. Free online tool with instant download.',
    images: ['/twitter-image.svg'],
  },
  alternates: {
    canonical: 'https://www.bratgeneratorfree.com/generators/vaporwave-text',
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

export default function VaporwaveTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


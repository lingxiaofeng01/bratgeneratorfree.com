import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Super Mario Text Generator - Free Mario Font Creator | 5 Authentic Fonts',
  description: 'Create authentic Super Mario-style text with 5 iconic fonts from the Mushroom Kingdom. Free Mario text generator with custom colors, effects, and instant PNG download. No signup required!',
  keywords: [
    'mario text generator',
    'super mario font',
    'mario font generator',
    'super mario text',
    'mario bros font',
    'mario 64 font',
    'mario world font',
    'free mario text',
    'mario text maker',
    'nintendo font generator',
    'gaming text generator',
    'mario style text',
    'super mario bros font',
    'mario text creator',
    'mushroom kingdom font'
  ],
  openGraph: {
    title: 'Super Mario Text Generator - Free Mario Font Creator',
    description: 'Create authentic Super Mario-style text with 5 iconic fonts. Free, instant download, no watermarks!',
    type: 'website',
    url: 'https://bratgenerator.com/generators/mario-text',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Super Mario Text Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Mario Text Generator - Free Mario Font Creator',
    description: 'Create authentic Super Mario-style text with 5 iconic fonts. Free, instant download!',
    images: ['/twitter-image.svg']
  },
  alternates: {
    canonical: 'https://bratgenerator.com/generators/mario-text'
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

export default function MarioTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


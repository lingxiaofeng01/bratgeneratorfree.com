import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rainbow Text Generator - Free Rainbow Font Generator with 6+ Fonts | Brat Generator',
  description: 'Create stunning rainbow text with our free rainbow font generator. Choose from 6+ unique rainbow fonts, customize gradients, add effects, and download instantly. No signup required!',
  keywords: 'rainbow text generator, rainbow font generator, rainbow text maker, colorful text, gradient text, free rainbow fonts, rainbow typography, text effects',
  openGraph: {
    title: 'Rainbow Text Generator - Free Rainbow Font Generator',
    description: 'Create stunning rainbow text with 6+ unique fonts. Free, instant download, no signup required.',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Rainbow Text Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rainbow Text Generator - Free Rainbow Font Generator',
    description: 'Create stunning rainbow text with 6+ unique fonts. Free, instant download.',
    images: ['/twitter-image.svg'],
  },
  alternates: {
    canonical: 'https://www.bratgeneratorfree.com/generators/rainbow-text',
  },
};

export default function RainbowTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


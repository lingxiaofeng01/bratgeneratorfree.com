import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Glitter Text Generator - Free 176+ Effects Online',
  },
  description: 'Create stunning glitter text free with 176+ effects. Customize fonts, sizes, angles, shadows & borders. Download high-quality PNG instantly. Perfect for social media & branding!',
  keywords: [
    'glitter text generator',
    'free glitter text generator',
    'glitter text maker',
    'sparkle text generator',
    'glitter font generator',
    'online glitter text',
    'glitter text creator',
    'animated glitter text',
    'glitter text online free',
    'create glitter text',
    'glitter text design',
    'sparkling text generator',
    'shimmer text generator',
    'glitter text for social media',
    'glitter text png',
  ].join(', '),
  authors: [{ name: 'Glitter Text Generator Team' }],
  creator: 'Glitter Text Generator',
  publisher: 'Glitter Text Generator',
  openGraph: {
    title: 'Glitter Text Generator - Free 176+ Effects Online',
    description: 'Create stunning glitter text free with 176+ effects. Customize fonts, sizes, angles & download PNG instantly. No signup required!',
    type: 'website',
    url: 'https://www.bratgeneratorfree.com/generators/glitter-text',
    siteName: 'Glitter Text Generator',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glitter Text Generator - Free 176+ Effects',
    description: 'Create dazzling glitter text with 176+ effects. Free online tool with full customization and instant PNG downloads.',
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
  alternates: {
    canonical: 'https://www.bratgeneratorfree.com/generators/glitter-text',
  },
};

export default function GlitterTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


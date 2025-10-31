import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bratgenerator.com';

export const metadata: Metadata = {
  title: 'Bloody Text Generator - Free Horror Blood Dripping Text & Font Generator',
  description: 'Create spine-chilling bloody text effects with our free horror text generator. Choose from multiple blood styles, dripping animations, and scary fonts. Perfect for Halloween, horror games, and creepy designs. Download instantly!',
  keywords: [
    'bloody text generator',
    'blood text generator',
    'horror text generator',
    'dripping blood text',
    'blood font generator',
    'scary text generator',
    'creepy text maker',
    'halloween text generator',
    'gore text effect',
    'blood drip font',
    'horror font generator',
    'bloody letters',
    'blood stain text',
    'dripping font',
    'bloody text effect',
    'horror text effect',
    'blood splatter text',
    'scary font generator',
    'creepy font maker',
    'halloween font generator',
    'blood writing generator',
    'gore font',
    'bloody typography',
    'horror text maker',
    'free bloody text generator'
  ],
  authors: [{ name: 'Brat Generator' }],
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/generators/bloody-text',
  },
  openGraph: {
    title: 'Bloody Text Generator - Free Horror Blood Dripping Text & Font Generator',
    description: 'Create spine-chilling bloody text effects with our free horror text generator. Choose from multiple blood styles, dripping animations, and scary fonts. Download instantly!',
    url: `${baseUrl}/generators/bloody-text`,
    siteName: 'Brat Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'Bloody Text Generator - Create Horror Blood Text Online'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloody Text Generator - Free Horror Blood Dripping Text & Font Generator',
    description: 'Create spine-chilling bloody text effects with our free horror text generator. Multiple blood styles, dripping animations, and scary fonts.',
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

export default function BloodyTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

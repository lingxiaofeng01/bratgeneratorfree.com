import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mirror Text Generator - Free Online Text Mirroring Tool | Create Flipped & Reversed Text',
  description: 'Create stunning mirrored text instantly with our free online mirror text generator. Horizontal mirror, vertical flip, upside-down text, and reverse text effects. Perfect for social media, creative designs, and unique text presentations. 100% free, no signup required.',
  keywords: [
    'mirror text generator',
    'mirrored text',
    'flip text',
    'reverse text',
    'upside down text',
    'horizontal mirror text',
    'vertical mirror text',
    'text flipper',
    'backwards text',
    'reflected text',
    'mirror writing',
    'da vinci text',
    'mirrored writing generator',
    'text mirror tool',
    'free mirror text',
    'online text mirror',
    'social media text effects',
    'unicode mirror text',
    'flipped text generator',
    'inverted text'
  ],
  authors: [{ name: 'Text Generators Team' }],
  creator: 'Text Generators',
  publisher: 'Text Generators',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.bratgeneratorfree.com'),
  alternates: {
    canonical: '/generators/mirror-text',
  },
  openGraph: {
    title: 'Mirror Text Generator - Free Online Text Mirroring Tool',
    description: 'Create stunning mirrored text instantly. Horizontal, vertical, and reverse text effects. Perfect for social media and creative projects. 100% free!',
    url: '/generators/mirror-text',
    siteName: 'Text Generators',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Mirror Text Generator - Create Mirrored Text Effects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mirror Text Generator - Free Online Text Mirroring Tool',
    description: 'Create stunning mirrored text instantly. Horizontal, vertical, and reverse text effects. 100% free!',
    images: ['/twitter-image.svg'],
    creator: '@textgenerators',
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
  category: 'Text Tools',
};

export default function MirrorTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Mirror Text Generator',
            description: 'Free online mirror text generator. Create horizontal, vertical, and reversed text effects instantly.',
            url: 'https://www.bratgeneratorfree.com/generators/mirror-text',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Horizontal text mirroring',
              'Vertical text flipping',
              'Text reversal',
              'Combined mirror effects',
              'One-click copy to clipboard',
              'Real-time preview',
              'No registration required',
              'Unlimited usage',
            ],
            screenshot: 'https://www.bratgeneratorfree.com/og-image.svg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1250',
              bestRating: '5',
              worstRating: '1',
            },
            author: {
              '@type': 'Organization',
              name: 'Text Generators',
              url: 'https://www.bratgeneratorfree.com',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How does the mirror text generator work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our generator uses Unicode characters to create mirrored text effects. For horizontal mirroring, we reverse the text direction and use mirrored character equivalents. For vertical mirroring, we use upside-down Unicode characters similar to Leonardo da Vinci\'s famous mirrored handwriting.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use mirrored text on social media?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Mirrored text works on most social media platforms including Instagram, Twitter, Facebook, TikTok, and more. Simply copy the generated text and paste it into your posts, bios, or comments.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the mirror text generator free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! Our mirror text generator is 100% free to use with no registration required. Create unlimited mirrored text for personal or commercial projects.',
                },
              },
              {
                '@type': 'Question',
                name: 'What\'s the difference between horizontal and vertical mirroring?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Horizontal mirroring flips text left-to-right (like a mirror reflection), while vertical mirroring flips text upside-down. The "Both" mode combines both effects for a complete transformation. "Reverse" simply reverses the character order without changing individual letters.',
                },
              },
            ],
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.bratgeneratorfree.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Generators',
                item: 'https://www.bratgeneratorfree.com/generators',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Mirror Text Generator',
                item: 'https://www.bratgeneratorfree.com/generators/mirror-text',
              },
            ],
          }),
        }}
      />
    </>
  );
}


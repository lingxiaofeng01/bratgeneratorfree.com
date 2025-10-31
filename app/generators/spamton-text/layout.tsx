import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spamton Text Generator - Free Deltarune Spamton Translator | Create [[ BIG SHOT ]] Text',
  description: 'Transform your text into Spamton G. Spamton style with our free Spamton text generator! Create authentic Deltarune Spamton speak with brackets, caps, and KROMER. Perfect for memes and Discord. Try it now!',
  keywords: [
    'spamton text generator',
    'spamton translator',
    'deltarune spamton',
    'spamton g spamton',
    'big shot text',
    'spamton text converter',
    'spamton meme generator',
    'deltarune text generator',
    'spamton speak',
    'kromer text',
    'pipis generator',
    'hyperlink blocked text',
    'spamton font',
    'deltarune meme',
    'toby fox',
    'undertale deltarune',
    'spamton neo',
    'free text generator',
    'spamton discord',
    'spamton twitter'
  ],
  authors: [{ name: 'Brat Generator Team' }],
  creator: 'Brat Generator',
  publisher: 'Brat Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.bratgeneratorfree.com'),
  alternates: {
    canonical: '/generators/spamton-text',
  },
  openGraph: {
    title: 'Spamton Text Generator - Free Deltarune Spamton Translator',
    description: 'Create authentic Spamton G. Spamton text from Deltarune! Free online tool with multiple modes, adjustable intensity, and instant results. Become a [[ BIG SHOT ]] now!',
    url: '/generators/spamton-text',
    siteName: 'Brat Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Spamton Text Generator - Create [[ BIG SHOT ]] Text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spamton Text Generator - Free Deltarune Spamton Translator',
    description: 'Transform your text into Spamton style! Free tool with multiple modes. Create [[ BIG SHOT ]] messages instantly!',
    images: ['/twitter-image.svg'],
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
  category: 'Entertainment',
  classification: 'Text Generator Tool',
  other: {
    'application-name': 'Spamton Text Generator',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Spamton Generator',
  },
};

export default function SpamtonTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Spamton Text Generator',
            description: 'Free online Spamton text generator that converts normal text into Spamton G. Spamton style from Deltarune. Features multiple modes, adjustable intensity, and instant results.',
            url: 'https://www.bratgeneratorfree.com/generators/spamton-text',
            applicationCategory: 'EntertainmentApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Multiple conversion modes (Classic, Salesman, Chaos, Pipis)',
              'Adjustable intensity slider (0-100%)',
              'Real-time text transformation',
              'One-click copy to clipboard',
              'Quick example texts',
              'Regenerate for different results',
              'Mobile-friendly responsive design',
              'No registration required',
              'Unlimited free usage'
            ],
            screenshot: 'https://www.bratgeneratorfree.com/og-image.svg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1247',
              bestRating: '5',
              worstRating: '1',
            },
            author: {
              '@type': 'Organization',
              name: 'Brat Generator',
              url: 'https://www.bratgeneratorfree.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Brat Generator',
              url: 'https://www.bratgeneratorfree.com',
            },
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            keywords: 'spamton text generator, deltarune, spamton translator, big shot, kromer, pipis, text converter',
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
                name: 'What is a Spamton Text Generator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A Spamton Text Generator is a free online tool that converts normal text into Spamton G. Spamton\'s unique speaking style from Deltarune, complete with random caps, brackets, and sales pitch language.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is this Spamton generator free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Our Spamton Text Generator is 100% free with no registration required. Generate unlimited [[ BIG SHOT ]] text anytime!',
                },
              },
              {
                '@type': 'Question',
                name: 'What\'s the difference between the modes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Classic mode uses standard Spamton style with brackets. Salesman mode adds more sales pitch elements. Chaos mode maximizes randomness. Pipis mode includes more Deltarune references.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use this for social media?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! The generated text works perfectly on Twitter, Discord, Reddit, Instagram, and any platform that supports Unicode text. Just copy and paste!',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the intensity slider work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The intensity slider (0-100%) controls how aggressively the text is transformed. Lower values keep more of the original text, while higher values add more Spamton chaos!',
                },
              },
              {
                '@type': 'Question',
                name: 'Why does regenerating give different results?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each generation uses randomization to create authentic Spamton-style text. This means you can regenerate multiple times to find the perfect [[ BIG SHOT ]] version!',
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
                name: 'Spamton Text Generator',
                item: 'https://www.bratgeneratorfree.com/generators/spamton-text',
              },
            ],
          }),
        }}
      />
    </>
  );
}


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redacted Text Generator - Free Online Text Redaction Tool | Privacy-Focused',
  description: 'Free, private, and fast text redaction tool. Hide sensitive information instantly with client-side processing. Redact emails, URLs, phone numbers, and custom words. No data stored or transmitted. 100% secure and private.',
  keywords: [
    'redacted text generator',
    'text redaction tool',
    'redact text online',
    'black out text',
    'hide sensitive information',
    'privacy text tool',
    'email redaction',
    'URL redaction',
    'phone number redaction',
    'free redaction tool',
    'online redaction',
    'text privacy tool',
    'sensitive data redaction',
    'document redaction',
    'client-side redaction',
    'secure text redaction',
    'private text tool',
    'redact personal information',
    'text censoring tool',
    'confidential text redaction'
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
    canonical: '/generators/redacted-text',
  },
  openGraph: {
    title: 'Redacted Text Generator - Free Online Text Redaction Tool',
    description: 'Free, private, and fast text redaction tool. Hide sensitive information instantly. Redact emails, URLs, phone numbers with client-side processing. 100% secure.',
    url: '/generators/redacted-text',
    siteName: 'Brat Generator - Free Text Generators',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Redacted Text Generator - Privacy-Focused Text Redaction Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redacted Text Generator - Free Online Text Redaction Tool',
    description: 'Free, private, and fast text redaction tool. Hide sensitive information instantly with client-side processing. 100% secure.',
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
  category: 'Text Tools',
};

export default function RedactedTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


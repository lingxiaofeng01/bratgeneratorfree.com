import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Brat Generator - Professional Album Cover Maker',
  description: 'Learn the story, mission, and team behind Brat Generator. We are dedicated to providing creators with the best brat-style album cover generation tool, making professional design accessible to everyone.',
  keywords: 'Brat Generator, About Us, Album Cover Generator, Design Tool, Creative Team',
  openGraph: {
    title: 'About Brat Generator - Professional Album Cover Design Tool',
    description: 'Discover our story, mission, and team. Explore how Brat Generator helps creators worldwide produce outstanding album cover designs.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
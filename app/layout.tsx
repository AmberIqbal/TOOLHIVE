import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://toolhive-ruby.vercel.app'),
  title: {
    default: 'ToolHive - Free AI Image Tools | Background Remover & More',
    template: '%s | ToolHive',
  },
  description: 'Free online image tools powered by AI. Remove backgrounds, compress images, resize photos, and convert formats. No signup required, no watermarks.',
  keywords: [
    'background remover',
    'free background remover',
    'remove bg',
    'image compressor',
    'image resizer',
    'format converter',
    'AI image tools',
    'compress images',
    'resize photos',
    'free image editor',
    'no watermark',
    'toolhive'
  ],
  authors: [{ name: 'ToolHive' }],
  creator: 'ToolHive',
  publisher: 'ToolHive',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolhive-ruby.vercel.app',
    title: 'ToolHive - Free AI Image Tools',
    description: 'Remove backgrounds with AI, compress images, resize photos, convert formats. No signup, no watermarks.',
    siteName: 'ToolHive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolHive - Free AI Image Tools',
    description: 'Remove backgrounds, compress & resize images for free. No signup required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "jKVBaQ9EhIsUVP5qLckOUU5UW-6x8Pi6H2y9Ey0kDyI" , // Add after Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Additional SEO tags */}
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://toolhive-ruby.vercel.app" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

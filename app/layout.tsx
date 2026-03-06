import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://imgtoolset.com'),
  title: {
    default: 'ImgToolset- Free AI Image Tools | Background Remover & More',
    template: '%s | ImgToolset',
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
    'ImgToolset'
  ],
  authors: [{ name: 'ImgToolset' }],
  creator: 'ImgToolset',
  publisher: 'ImgToolset',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imgtoolset.com',
    title: 'ImgToolset - Free AI Image Tools',
    description: 'Remove backgrounds with AI, compress images, resize photos, convert formats. No signup, no watermarks.',
    siteName: 'ImgToolset',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImgToolset - Free AI Image Tools',
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
    google: "aPYJHFPRe1PZFsuy0qb30Yvuxiz8H0hrQolKgKory3U" , // Add after Google Search Console
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
        <link rel="canonical" href="https://imgtoolset.com" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BX82221VDM"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BX82221VDM');
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

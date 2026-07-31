import React from 'react';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { AccessibilityProvider } from '@/components/context/AccessibilityContext';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { MobileQuickActions } from '@/components/ui/MobileQuickActions';
import { BackgroundAudioPlayer } from '@/components/ui/BackgroundAudioPlayer';
import { organizationInfo } from '@/content/organization';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sangati Foundation | For People-with-Disability',
  description: organizationInfo.missionLine,
  keywords: [
    'Sangati Foundation',
    'Disability Rights India',
    'Accessibility',
    'Mobility',
    'Inclusivity',
    'Visibility',
    'Sangati Yatra',
    'Project Udaan',
    'Wheelchair Accessible Toilets',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${sourceSerif.variable} ${ibmPlexMono.variable}`}
      data-text-size="normal"
      data-high-contrast="false"
      data-reduce-motion="false"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className="min-h-screen flex flex-col bg-field text-ink selection:bg-marigold selection:text-ink">
        <AccessibilityProvider>
          {/* Top Reading Progress Bar */}
          <ScrollProgressBar />

          {/* First focusable element */}
          <SkipLink />

          {/* Header Navigation */}
          <Header />

          {/* Main Landmark */}
          <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
            {children}
          </main>

          {/* Footer Landmark */}
          <Footer />

          {/* Sticky Mobile Quick Action Bar */}
          <MobileQuickActions />

          {/* Encouraging Background Music Synthesizer & Floating Controller */}
          <BackgroundAudioPlayer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}

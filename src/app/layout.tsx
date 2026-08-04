import React from 'react';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
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

/**
 * Root shell. Deliberately minimal — it only sets up <html>/<body> and fonts so
 * that the admin panel at /studio can render full-screen without the site
 * header, footer and accessibility toolbar around it. All public-facing pages
 * live under the (site) route group, which adds that chrome back.
 */
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
        {children}
      </body>
    </html>
  );
}

import React from 'react';
import { AccessibilityProvider } from '@/components/context/AccessibilityContext';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { MobileQuickActions } from '@/components/ui/MobileQuickActions';
import { BackgroundAudioPlayer } from '@/components/ui/BackgroundAudioPlayer';
import { getPrograms } from '@/sanity/lib/content';
import { REVALIDATE_SECONDS } from '@/sanity/lib/fetch';

export const revalidate = REVALIDATE_SECONDS;

/**
 * Chrome shared by every public page. The (site) folder is a route group, so it
 * does NOT appear in URLs — /about is still /about.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keeps the Programmes dropdown in step with the admin panel.
  const programs = await getPrograms();

  return (
    <AccessibilityProvider>
      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* First focusable element */}
      <SkipLink />

      {/* Header Navigation */}
      <Header programs={programs} />

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
  );
}

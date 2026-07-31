import React from 'react';
import { homeContent } from '@/content/home';
import { StatCounter } from '@/components/ui/StatCounter';
import { HeroTraditionalSlider } from '@/components/ui/HeroTraditionalSlider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-10 pb-12">
      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* 1. TRADITIONAL FULL-BLEED HERO SLIDER AT TOP OF HOMEPAGE (DIRECT PROGRAM SLIDE LINKS) */}
      <section className="w-full">
        <HeroTraditionalSlider />
      </section>

      {/* 2. NGO AUTHENTICITY STAT COUNTER BAND */}
      <ScrollReveal variant="fade-up" delay={150}>
        <StatCounter stats={homeContent.stats} />
      </ScrollReveal>
    </div>
  );
}

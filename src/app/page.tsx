import React from 'react';
import { HeroTraditionalSlider } from '@/components/ui/HeroTraditionalSlider';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* TRADITIONAL FULL-BLEED HERO SLIDER AT TOP OF HOMEPAGE */}
      <section className="w-full">
        <HeroTraditionalSlider />
      </section>
    </div>
  );
}

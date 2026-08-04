import React from 'react';
import { HeroTraditionalSlider } from '@/components/ui/HeroTraditionalSlider';
import { PhotoGallery } from '@/components/ui/PhotoGallery';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getHomeContent } from '@/sanity/lib/content';
import { REVALIDATE_SECONDS } from '@/sanity/lib/fetch';

export const revalidate = REVALIDATE_SECONDS;

export default async function HomePage() {
  const home = await getHomeContent();

  return (
    <div className="w-full">
      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* TRADITIONAL FULL-BLEED HERO SLIDER AT TOP OF HOMEPAGE */}
      <section className="w-full">
        <HeroTraditionalSlider slides={home.heroSlides} />
      </section>

      {/* PHOTO GALLERY */}
      {home.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <ScrollReveal variant="fade-up">
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink/10 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-road uppercase tracking-wider">
                    Our work
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-display text-ink tracking-tight">
                    Moments from the Ground
                  </h2>
                  <p className="font-body text-sm sm:text-base text-ink/70 max-w-2xl">
                    Health camps, skill centres, para sports and accessible livelihoods across
                    India. Select any photo to view it full screen.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase shrink-0">
                  {home.gallery.length} photos
                </span>
              </div>

              <PhotoGallery photos={home.gallery} label="Sangati Foundation photo gallery" />
            </div>
          </ScrollReveal>
        </section>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { yatraCampaign } from '@/content/yatra';
import { RouteLine } from '@/components/ui/RouteLine';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { YatraStop } from '@/content/types';
import { Flag, MapPin, Calendar, Heart, Shield, CheckCircle } from 'lucide-react';

export default function YatraPage() {
  const [selectedStop, setSelectedStop] = useState<YatraStop>(yatraCampaign.stops[0]);

  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* 1. YATRA HERO BANNER */}
      <section className="relative w-full min-h-[300px] sm:min-h-[420px] md:min-h-[520px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={yatraCampaign.heroImage}
          alt="Sangati Yatra modified vehicles convoy driving across long-distance highway"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-16 w-full space-y-4 sm:space-y-6">
          <ScrollReveal variant="fade-down">
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                FLAGSHIP NATIONWIDE CAMPAIGN (2024–25)
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold bg-road text-field px-3.5 py-1 rounded-full uppercase tracking-wider">
                6,500 KM • 20 DAYS
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field max-w-4xl leading-tight">
              {yatraCampaign.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              The longest cross-country ride ever driven entirely by persons with disability in modified hand-controlled vehicles.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. INTERACTIVE ROUTE MAP & MOTIF */}
      <section className="max-w-7xl mx-auto px-4 space-y-6" aria-labelledby="route-map-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                REAL STOPS ALONG THE 6,500 KM ROUTE
              </span>
              <h2 id="route-map-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
                Interactive Route Map
              </h2>
            </div>
            <span className="font-mono text-xs text-ink/70">
              Click on any station dot to inspect campaign milestones
            </span>
          </div>
        </ScrollReveal>

        {/* Route Line Interactive Component */}
        <ScrollReveal variant="zoom-in" delay={150}>
          <div className="bg-white border border-road/20 rounded-3xl p-4 sm:p-6 shadow-md">
            <RouteLine
              stops={yatraCampaign.stops}
              interactive={true}
              selectedStopId={selectedStop.id}
              onStopClick={(stop) => setSelectedStop(stop)}
            />
          </div>
        </ScrollReveal>

        {/* Selected Station Details Card */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="bg-white border border-road/20 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl" role="region" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-road/15 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-road/10 border border-road/20 rounded-2xl">
                  <MapPin className="w-6 h-6 text-road shrink-0" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-ink">{selectedStop.name}</h3>
                  <span className="font-mono text-xs font-semibold text-ink/70">{selectedStop.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="bg-marigold text-ink font-bold px-3 py-1 rounded-full border border-marigold/40">
                  Mark: {selectedStop.distanceKm} km
                </span>
                <span className="bg-road text-field font-bold px-3 py-1 rounded-full">
                  Date: {selectedStop.date}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg font-body text-ink/90 font-medium leading-relaxed">
              {selectedStop.description}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. FULL YATRA STORY PARAGRAPHS */}
      <section className="max-w-5xl mx-auto px-4 space-y-6" aria-labelledby="yatra-story-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-3">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              CAMPAIGN PHILOSOPHY & IMPACT
            </span>
            <h2 id="yatra-story-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Shifting Public Perception of Disability
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={150}>
          <div className="space-y-4 font-body text-base sm:text-lg text-ink/90 leading-relaxed bg-white border border-road/20 rounded-3xl p-6 sm:p-8 shadow-sm">
            <p>
              {yatraCampaign.storyParagraphs[0]}
            </p>
            <p>
              {yatraCampaign.storyParagraphs[1]}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. DONATE CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-road text-field rounded-3xl border border-road/40 p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-marigold">
              Fuel the Next Sangati Yatra Drive
            </h2>
            <p className="text-base md:text-lg font-body max-w-2xl mx-auto">
              Your contribution sponsors modified vehicle maintenance, highway fuel, and accessibility advocacy stops along the route.
            </p>
            <Button href="/donate" variant="marigold" className="px-8 py-4 text-lg rounded-full shadow-xl">
              <Heart className="w-6 h-6 fill-current text-ink" aria-hidden="true" />
              <span>Sponsor Sangati Yatra (80G Eligible)</span>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}


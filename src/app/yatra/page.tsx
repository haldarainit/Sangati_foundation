'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { yatraCampaign } from '@/content/yatra';
import { RouteLine } from '@/components/ui/RouteLine';
import { Button } from '@/components/ui/Button';
import { YatraStop } from '@/content/types';
import { Flag, MapPin, Calendar, Heart, Shield, CheckCircle } from 'lucide-react';

export default function YatraPage() {
  const [selectedStop, setSelectedStop] = useState<YatraStop>(yatraCampaign.stops[0]);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. YATRA HERO BANNER */}
      <section className="relative w-full min-h-[420px] md:min-h-[520px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={yatraCampaign.heroImage}
          alt="Sangati Yatra modified vehicles convoy driving across long-distance highway"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase">
              FLAGSHIP NATIONWIDE CAMPAIGN (2024–25)
            </span>
            <span className="font-mono text-xs font-bold bg-road text-field px-3 py-1 border border-ink uppercase">
              6,000 KM • 20 DAYS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field max-w-4xl leading-tight">
            {yatraCampaign.headline}
          </h1>

          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            The longest cross-country ride ever driven entirely by persons with disability in modified hand-controlled vehicles.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE ROUTE MAP & MOTIF */}
      <section className="max-w-7xl mx-auto px-4 space-y-6" aria-labelledby="route-map-heading">
        <div className="border-b-2 border-ink pb-3 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              REAL STOPS ALONG THE 6,000 KM ROUTE
            </span>
            <h2 id="route-map-heading" className="text-3xl font-bold font-display text-ink">
              Interactive Route Map
            </h2>
          </div>
          <span className="font-mono text-xs text-ink/70">
            Click on any station dot to inspect campaign milestones
          </span>
        </div>

        {/* Route Line Interactive Component */}
        <div className="bg-field border-2 border-ink p-4">
          <RouteLine
            stops={yatraCampaign.stops}
            interactive={true}
            selectedStopId={selectedStop.id}
            onStopClick={(stop) => setSelectedStop(stop)}
          />
        </div>

        {/* Selected Station Details Card */}
        <div className="bg-mist border-2 border-ink p-6 md:p-8 space-y-4" role="region" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-road shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-bold font-display text-ink">{selectedStop.name}</h3>
                <span className="font-mono text-xs font-semibold text-ink/70">{selectedStop.state}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="bg-marigold text-ink font-bold px-2.5 py-1 border border-ink">
                Mark: {selectedStop.distanceKm} km
              </span>
              <span className="bg-road text-field font-bold px-2.5 py-1 border border-ink">
                Date: {selectedStop.date}
              </span>
            </div>
          </div>

          <p className="text-lg font-body text-ink font-semibold">
            {selectedStop.description}
          </p>
        </div>
      </section>

      {/* 3. FULL YATRA STORY PARAGRAPHS */}
      <section className="max-w-5xl mx-auto px-4 space-y-10" aria-labelledby="yatra-story-heading">
        <div className="border-b-2 border-ink pb-4">
          <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
            THE CHRONICLE OF THE EXPEDITION
          </span>
          <h2 id="yatra-story-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
            From Delhi to Dhanushkodi & Back
          </h2>
        </div>

        {/* Paragraphs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 font-body text-base md:text-lg text-ink/90 leading-relaxed">
            {yatraCampaign.storyParagraphs.map((para, idx) => (
              <p key={idx} className="p-4 bg-field border border-ink/30 border-l-4 border-l-road">
                {para}
              </p>
            ))}
          </div>

          {/* Body Inset Photo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] w-full border-2 border-ink bg-mist overflow-hidden">
              <Image
                src={yatraCampaign.bodyImage}
                alt="Sangati Yatra team members gathered around modified vehicles"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-mist border-2 border-ink text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 font-bold text-road">
                <Flag className="w-4 h-4" aria-hidden="true" />
                <span>FLAG-OFF DETAILS:</span>
              </div>
              <p>Date: {yatraCampaign.flagOffDetails.date}</p>
              <p>Location: {yatraCampaign.flagOffDetails.location}</p>
              <p>Flagged off by: <strong>{yatraCampaign.flagOffDetails.flaggedOffBy}</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPEDITION HIGHLIGHT METRICS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-mist border-2 border-ink p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-field border-2 border-ink p-6 text-center space-y-2">
            <span className="font-mono text-xs font-bold text-road uppercase">TOTAL DISTANCE</span>
            <div className="font-display font-black text-4xl text-marigold">6,000 KM</div>
            <p className="text-xs font-body text-ink/80">Cross-country return loop</p>
          </div>

          <div className="bg-field border-2 border-ink p-6 text-center space-y-2">
            <span className="font-mono text-xs font-bold text-road uppercase">DURATION</span>
            <div className="font-display font-black text-4xl text-marigold">20 DAYS</div>
            <p className="text-xs font-body text-ink/80">15 Dec 2024 to 3 Jan 2025</p>
          </div>

          <div className="bg-field border-2 border-ink p-6 text-center space-y-2">
            <span className="font-mono text-xs font-bold text-road uppercase">DIVYANG DRIVERS</span>
            <div className="font-display font-black text-4xl text-marigold">5 LEADERS</div>
            <p className="text-xs font-body text-ink/80">Led by Founder Sudhir Dhir</p>
          </div>

          <div className="bg-field border-2 border-ink p-6 text-center space-y-2">
            <span className="font-mono text-xs font-bold text-road uppercase">KEY HOST</span>
            <div className="font-display font-black text-2xl text-ink">IDEABYTES</div>
            <p className="text-xs font-body text-ink/80">Hosted Yatra team in Hyderabad</p>
          </div>
        </div>
      </section>

      {/* 5. DONATE CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-clay text-field border-2 border-ink p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black font-display">
            Fuel the Next Sangati Mobility Campaign
          </h2>
          <p className="text-base md:text-lg font-body max-w-xl mx-auto">
            Your contributions help retrofit hand-controls for modified vehicles, audit highway rest stops, and provide folding ramps.
          </p>
          <Button href="/donate" variant="marigold" className="px-8 py-4 text-lg">
            <Heart className="w-6 h-6 fill-current text-ink" aria-hidden="true" />
            <span>Support Sangati Mobility Drive</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

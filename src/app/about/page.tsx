import React from 'react';
import Image from 'next/image';
import { aboutContent } from '@/content/about';
import { organizationInfo } from '@/content/organization';
import { RouteLine } from '@/components/ui/RouteLine';
import { Button } from '@/components/ui/Button';
import { Heart, Quote, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | Sangati Foundation',
  description:
    'Learn about Sangati Foundation, founded 14 February 2019 by Mr Sudhir Dhir. Our brand idea is companionship — walking alongside persons with disability.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* PAGE HEADER BANNER */}
      <section className="relative w-full min-h-[320px] md:min-h-[400px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={aboutContent.heroImage}
          alt="Sangati Foundation team members and supporters in a group photo"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            WHO WE ARE & OUR FOUNDING STORY
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {aboutContent.title}
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            {aboutContent.subtitle}
          </p>
        </div>
      </section>

      {/* BRAND IDEA & COMPANIONSHIP BLOCK */}
      <section className="max-w-7xl mx-auto px-4" aria-labelledby="brand-idea-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs font-bold text-road bg-mist border border-ink px-2.5 py-1">
              THE BRAND IDEA
            </span>
            <h2 id="brand-idea-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              {aboutContent.brandIdea.title}
            </h2>

            <div className="p-4 bg-mist border-l-4 border-marigold border-y border-r border-ink/20 font-mono text-sm font-bold text-ink">
              {aboutContent.brandIdea.quoteHindi}
            </div>

            <p className="text-lg font-body text-ink/90 leading-relaxed">
              {aboutContent.brandIdea.description}
            </p>

            <p className="text-base font-body text-ink/80 leading-relaxed">
              {organizationInfo.brandMeaning}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full border-2 border-ink bg-mist overflow-hidden">
              <Image
                src={aboutContent.insetStoryImage}
                alt="Sangati Foundation members engaging with people with disability during a campaign"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* FOUNDING POEM & MANIFESTO BLOCK */}
      <section className="max-w-5xl mx-auto px-4" aria-labelledby="founding-manifesto-heading">
        <div className="bg-field border-2 border-ink p-8 md:p-12 space-y-8 relative overflow-hidden">
          <Quote className="absolute top-6 right-6 w-24 h-24 text-road/10" aria-hidden="true" />

          <div className="space-y-2 border-b-2 border-ink pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              FOUNDING MANIFESTO
            </span>
            <h2 id="founding-manifesto-heading" className="text-3xl md:text-4xl font-black font-display text-ink">
              {aboutContent.foundingPoem.title}
            </h2>
          </div>

          {/* Poem Verses */}
          <div className="bg-mist border-2 border-ink p-6 md:p-8 space-y-3 font-display text-xl md:text-2xl font-bold text-road text-center">
            {aboutContent.foundingPoem.lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          {/* Invitation Text */}
          <p className="text-lg md:text-xl font-body text-ink/90 leading-relaxed italic border-l-4 border-marigold pl-6 py-2">
            "{aboutContent.foundingPoem.invitation}"
          </p>

          {/* Founder Epigraph */}
          <div className="pt-6 border-t-2 border-ink flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold text-road uppercase">FOUNDER’S EPIGRAPH</span>
              <p className="text-base font-bold text-ink">
                "{aboutContent.foundingPoem.epigraph.quote}"
              </p>
              <p className="text-xs text-ink/70">
                — Attributed to {aboutContent.foundingPoem.epigraph.attribution}
              </p>
            </div>

            <Button href="/yatra" variant="road">
              <span>Read Sangati Yatra Story</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="team-heading">
        <div className="border-b-2 border-ink pb-4">
          <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
            THE PEOPLE BEHIND SANGATI
          </span>
          <h2 id="team-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
            Leadership & Key Authors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutContent.leadership.map((member) => (
            <article key={member.name} className="border-2 border-ink bg-field p-6 space-y-4">
              <div className="relative aspect-[3/4] w-full border-2 border-ink bg-mist overflow-hidden">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-road bg-mist border border-ink px-2 py-0.5 inline-block">
                  {member.role}
                </span>
                <h3 className="text-2xl font-bold font-display text-ink">{member.name}</h3>
                <p className="text-sm font-body text-ink/80 leading-relaxed">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TIMELINE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="timeline-preview-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              2019 TO PRESENT
            </span>
            <h2 id="timeline-preview-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              Milestone Timeline Overview
            </h2>
          </div>
          <Button href="/impact" variant="outline">
            <span>View Full Impact Details</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aboutContent.timelinePreview.map((item) => (
            <div key={item.year} className="border-2 border-ink bg-mist p-5 space-y-2">
              <span className="font-mono text-2xl font-black text-marigold bg-ink px-2 py-0.5 inline-block">
                {item.year}
              </span>
              <p className="text-sm font-body text-ink font-semibold leading-snug">
                {item.event}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DONATE CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-clay text-field border-2 border-ink p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black font-display">
            Support Our Journey Towards Complete Accessibility
          </h2>
          <p className="text-base md:text-lg font-body max-w-2xl mx-auto">
            Your donation directly funds accessible public toilets, rural health camps, and free tech education.
          </p>
          <Button href="/donate" variant="marigold" className="px-8 py-4 text-lg">
            <Heart className="w-6 h-6 fill-current text-ink" aria-hidden="true" />
            <span>Donate to Sangati (80G Receipt)</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

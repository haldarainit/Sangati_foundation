import React from 'react';
import Image from 'next/image';
import { impactContent } from '@/content/impact';
import { RouteLine } from '@/components/ui/RouteLine';
import { StatCounter } from '@/components/ui/StatCounter';
import { homeContent } from '@/content/home';
import { Calendar, CheckCircle2, Award, HeartHandshake, Shield } from 'lucide-react';

export const metadata = {
  title: 'Our Impact & Timeline | Sangati Foundation',
  description:
    'Key impact statistics and complete year-by-year milestone timeline of Sangati Foundation from 2019 to 2025.',
};

export default function ImpactPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[320px] md:min-h-[400px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={impactContent.bannerImage}
          alt="Sangati Foundation impact statistics banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            MEASURABLE CHANGE (2019–2025)
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {impactContent.title}
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            {impactContent.subtitle}
          </p>
        </div>
      </section>

      {/* STAT COUNTER BAND */}
      <StatCounter stats={homeContent.stats} />

      {/* YEAR-BY-YEAR TIMELINE SECTION */}
      <section className="max-w-5xl mx-auto px-4 space-y-12" aria-labelledby="timeline-heading">
        <div className="border-b-2 border-ink pb-4">
          <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
            CHRONOLOGICAL MILESTONES
          </span>
          <h2 id="timeline-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
            Year-by-Year Action Log
          </h2>
        </div>

        <div className="space-y-8 relative">
          {/* Vertical Connecting Line */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 bg-marigold border-x border-ink z-0"></div>

          {impactContent.timeline.map((item) => (
            <article
              key={item.year}
              className="relative z-10 border-2 border-ink bg-field p-6 md:p-8 ml-0 sm:ml-16 space-y-4"
            >
              {/* Year Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl md:text-3xl font-black bg-ink text-marigold px-3 py-1 border border-ink">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-ink">{item.title}</h3>
                </div>
                <span className="font-mono text-xs font-bold text-road bg-mist border border-ink px-2.5 py-1">
                  {item.summary}
                </span>
              </div>

              {/* Detail Bullets */}
              <ul className="space-y-3 pt-2">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-mist p-3.5 border border-ink/40 text-sm font-body font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-road shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink/90 leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* SANGATI STAR AWARDS FEATURE BLOCK */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-road text-field border-2 border-ink p-8 md:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-marigold" aria-hidden="true" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-marigold">
              RECOGNIZING EXCELLENCE
            </span>
          </div>

          <h2 className="text-3xl font-bold font-display text-field">
            Sangati Star Awards (Up to ₹50,000 Grants)
          </h2>

          <p className="text-base md:text-lg font-body text-field/90 leading-relaxed">
            Announced on World Disability Day, the Sangati Star Awards honor outstanding contributions across four categories:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs font-bold">
            <div className="bg-field text-ink p-4 border border-ink">
              1. Innovation & Entrepreneurship
            </div>
            <div className="bg-field text-ink p-4 border border-ink">
              2. Mentorship & Scholarship
            </div>
            <div className="bg-field text-ink p-4 border border-ink">
              3. Designs for Daily Living
            </div>
            <div className="bg-field text-ink p-4 border border-ink">
              4. Sports & Arts
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

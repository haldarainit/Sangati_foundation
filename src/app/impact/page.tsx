import React from 'react';
import Image from 'next/image';
import { impactContent } from '@/content/impact';
import { RouteLine } from '@/components/ui/RouteLine';
import { StatCounter } from '@/components/ui/StatCounter';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { homeContent } from '@/content/home';
import { Calendar, CheckCircle2, Award, HeartHandshake, Shield } from 'lucide-react';

export const metadata = {
  title: 'Our Impact & Timeline | Sangati Foundation',
  description:
    'Key impact statistics and complete year-by-year milestone timeline of Sangati Foundation from 2019 to 2025.',
};

export default function ImpactPage() {
  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={impactContent.bannerImage}
          alt="Sangati Foundation impact statistics banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              MEASURABLE CHANGE (2019–2025)
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              {impactContent.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              {impactContent.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* STAT COUNTER BAND */}
      <ScrollReveal variant="fade-up" delay={150}>
        <StatCounter stats={homeContent.stats} />
      </ScrollReveal>

      {/* YEAR-BY-YEAR TIMELINE SECTION */}
      <section className="max-w-5xl mx-auto px-4 space-y-8" aria-labelledby="timeline-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              CHRONOLOGICAL MILESTONES
            </span>
            <h2 id="timeline-heading" className="text-2xl sm:text-4xl font-bold font-display text-ink">
              Year-by-Year Action Log
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6 sm:space-y-8 relative">
          {/* Vertical Connecting Line */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 bg-marigold/60 rounded-full z-0"></div>

          {impactContent.timeline.map((item, index) => (
            <ScrollReveal key={item.year} variant="fade-up" delay={index * 100}>
              <article className="relative z-10 border border-road/20 bg-white rounded-3xl p-6 md:p-8 ml-0 sm:ml-16 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Year Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-road/15 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl md:text-3xl font-black bg-ink text-marigold px-3.5 py-1 rounded-xl">
                      {item.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-ink">{item.title}</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full">
                    {item.summary}
                  </span>
                </div>

                {/* Detail Bullets */}
                <ul className="space-y-2.5 pt-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-mist/40 p-3 sm:p-4 rounded-2xl border border-road/15 text-xs sm:text-sm font-body font-medium">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-road shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-ink/90 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* SANGATI STAR AWARDS FEATURE BLOCK */}
      <section className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-road text-field rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl border border-emerald-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-marigold/20 rounded-2xl border border-marigold/40">
                <Award className="w-8 h-8 text-marigold" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-marigold uppercase tracking-wider block">
                  COMMUNITY RECOGNITION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-field">
                  Sangati Star Awards & Honors
                </h2>
              </div>
            </div>
            <p className="text-sm sm:text-base font-body text-field/90 leading-relaxed">
              Sangati Foundation honors persons with disability, caregivers, and accessibility champions who drive extraordinary change across society.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

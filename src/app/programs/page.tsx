import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { programsList } from '@/content/programs';
import { Button } from '@/components/ui/Button';
import { RouteLine } from '@/components/ui/RouteLine';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Our Programmes | Sangati Foundation',
  description:
    'Overview of Sangati Foundation’s 6 core programmes: Accessibility, Mobility, Health, Skills, Livelihood, and Sports & Arts.',
};

export default function ProgramsIndexPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="relative w-full min-h-[320px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src="/images/hero/banner-programs.jpg"
          alt="Sangati Foundation programmes overview banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            ACTION AREAS & INITIATIVES
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            Six Core Programmes
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            From making major railway hubs accessible to running rural OPD centers and free coding bootcamps, our programmes address real barriers with dignity.
          </p>
        </div>
      </section>

      {/* PROGRAMMES LIST CARDS */}
      <section className="max-w-7xl mx-auto px-4 space-y-12" aria-labelledby="all-programmes-heading">
        <div className="border-b-2 border-ink pb-4">
          <h2 id="all-programmes-heading" className="text-3xl font-bold font-display text-ink">
            Explore All 6 Action Areas
          </h2>
        </div>

        <div className="space-y-12">
          {programsList.map((program, idx) => (
            <article
              key={program.slug}
              className={`border-2 border-ink bg-field grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-5 relative aspect-[4/3] w-full border-2 border-ink bg-mist overflow-hidden">
                <Image
                  src={program.image}
                  alt={`Photo illustrating Sangati Foundation ${program.title} initiative`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-marigold text-ink px-2.5 py-0.5 border border-ink">
                      PROGRAMME 0{idx + 1}
                    </span>
                    {program.partners && (
                      <span className="font-mono text-xs text-ink/70">
                        Partners: {program.partners.join(', ')}
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-bold font-display text-ink">
                    {program.title}
                  </h3>

                  <blockquote className="text-base md:text-lg font-body text-ink/90 italic border-l-4 border-road pl-4 py-1 bg-mist/50">
                    "{program.fullContent}"
                  </blockquote>

                  {program.highlights && (
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-xs font-bold text-road uppercase">
                        Key Highlights:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-body">
                        {program.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-ink/90">
                            <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-1" aria-hidden="true" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-ink/20">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="bg-road text-field border-2 border-ink py-3 px-6 rounded-full font-bold font-display text-sm hover:bg-marigold hover:text-ink transition-colors inline-flex items-center gap-2 min-h-[44px]"
                  >
                    <span>Read Full Details & Impact</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  {program.keyStats && (
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-road">
                      {program.keyStats.map((stat, i) => (
                        <span key={i} className="bg-mist border border-ink px-2 py-1">
                          {stat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ROUTE LINE DIVIDER */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>
    </div>
  );
}

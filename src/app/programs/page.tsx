import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { programsList } from '@/content/programs';
import { Button } from '@/components/ui/Button';
import { RouteLine } from '@/components/ui/RouteLine';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Our Programmes | Sangati Foundation',
  description:
    'Overview of Sangati Foundation’s 6 core programmes: Accessibility, Mobility, Health, Skills, Livelihood, and Sports & Arts.',
};

export default function ProgramsIndexPage() {
  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* HEADER BANNER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src="/images/hero/banner-programs.jpg"
          alt="Sangati Foundation programmes overview banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              ACTION AREAS & INITIATIVES
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              Six Core Programmes
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              From making major railway hubs accessible to running rural OPD centers and free coding bootcamps, our programmes address real barriers with dignity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PROGRAMMES LIST CARDS */}
      <section className="max-w-7xl mx-auto px-4 space-y-12" aria-labelledby="all-programmes-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-4">
            <h2 id="all-programmes-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Explore All 6 Core Action Areas
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {programsList.map((program, idx) => (
            <ScrollReveal key={program.slug} variant="fade-up" delay={idx * 100}>
              <article
                className={`rounded-3xl border border-road/20 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl border border-road/20 bg-mist overflow-hidden shadow-md">
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
                      <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 rounded-full border border-marigold/30 shadow-2xs">
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

                    <blockquote className="text-base md:text-lg font-body text-ink/90 italic border-l-4 border-road pl-4 py-1 bg-mist/40 rounded-r-xl">
                      &quot;{program.fullContent}&quot;
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

                  <div className="pt-4 border-t border-road/10 flex justify-end">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="bg-road text-field hover:bg-marigold hover:text-ink font-mono text-xs font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 shadow-md"
                    >
                      <span>Read Full Programme Brief</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* DONATE CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-road text-field rounded-3xl border border-road/40 p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-marigold">
              Partner With Us Across Our Core Programmes
            </h2>
            <p className="text-base md:text-lg font-body max-w-2xl mx-auto">
              Whether you represent a CSR foundation, municipal corporation, or volunteer network, your partnership powers real change.
            </p>
            <Button href="/donate" variant="marigold" className="px-8 py-4 text-lg rounded-full shadow-xl">
              <span>Explore Sponsorship & CSR Partnership</span>
              <ArrowRight className="w-5 h-5 text-ink" aria-hidden="true" />
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}


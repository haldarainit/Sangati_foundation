import React from 'react';
import Image from 'next/image';
import { newsList } from '@/content/news';
import { RouteLine } from '@/components/ui/RouteLine';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Calendar, Megaphone, Tag } from 'lucide-react';

export const metadata = {
  title: 'News & Events Archive | Sangati Foundation',
  description:
    'Browse campaign posters, announcements, and news events from Sangati Foundation.',
};

export default function NewsIndexPage() {
  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src="/images/posters/poster-01.jpg"
          alt="Campaign posters archive header"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              CAMPAIGNS & EVENT FLYERS
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              News & Poster Archive
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              Explore official Sangati campaign posters, medical drive flyers, and announcements.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* POSTERS ARCHIVE GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="posters-grid-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-4">
            <h2 id="posters-grid-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Official Posters & Announcements
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newsList.map((poster, index) => (
            <ScrollReveal key={poster.id} variant="fade-up" delay={index * 100}>
              <article className="border border-road/20 bg-white rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] w-full bg-mist/60 border border-road/15 rounded-2xl overflow-hidden p-2">
                    <Image
                      src={poster.image}
                      alt={poster.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="bg-road text-field font-bold px-2.5 py-0.5 rounded-full">
                        {poster.category}
                      </span>
                      <span className="bg-mist text-ink px-2.5 py-0.5 rounded-full border border-road/20 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-road" aria-hidden="true" />
                        <span>{poster.date}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display text-ink leading-snug">
                      {poster.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-body text-ink/80 leading-relaxed">
                      {poster.description}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>
    </div>
  );
}

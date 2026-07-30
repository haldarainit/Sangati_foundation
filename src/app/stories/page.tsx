import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { storiesList } from '@/content/stories';
import { ArrowRight, BookOpen, Quote } from 'lucide-react';
import { RouteLine } from '@/components/ui/RouteLine';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  title: 'Inspirational Stories | Sangati Foundation',
  description:
    'Read inspirational stories of resilience, accessibility achievements, and artistic triumphs from persons with disability.',
};

export default function StoriesIndexPage() {
  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* HEADER BANNER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src="/images/stories/story-01.jpg"
          alt="Inspirational stories header banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              VOICES OF COURAGE & INCLUSION
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              Inspirational Stories
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              Real stories of artists, athletes, software trainees, and advocate families walking alongside Sangati.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* STORIES INDEX GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="stories-grid-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-4 flex justify-between items-end">
            <h2 id="stories-grid-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Featured Narratives
            </h2>
            <span className="font-mono text-xs text-road font-bold uppercase bg-road/10 border border-road/20 px-3 py-1 rounded-full">
              {storiesList.length} Stories Published
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {storiesList.map((story, index) => (
            <ScrollReveal key={story.slug} variant="fade-up" delay={index * 120}>
              <article className="border border-road/20 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] w-full bg-ink/10 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={`Image for ${story.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-road bg-road/10 border border-road/20 px-2.5 py-0.5 rounded-full">
                        {story.category}
                      </span>
                      <span className="font-mono text-xs text-ink/70">{story.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display text-ink group-hover:text-road transition-colors leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-xs font-mono text-ink/70">
                      Sub: {story.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm font-body text-ink/80 line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <Link
                    href={`/stories/${story.slug}`}
                    className="w-full bg-mist/60 text-ink border border-road/20 py-2.5 px-4 rounded-full font-bold font-mono text-xs uppercase hover:bg-road hover:text-field transition-all flex items-center justify-between min-h-[44px]"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
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


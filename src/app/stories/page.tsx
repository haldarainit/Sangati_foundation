import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { storiesList } from '@/content/stories';
import { ArrowRight, BookOpen, Quote } from 'lucide-react';
import { RouteLine } from '@/components/ui/RouteLine';

export const metadata = {
  title: 'Inspirational Stories | Sangati Foundation',
  description:
    'Read inspirational stories of resilience, accessibility achievements, and artistic triumphs from persons with disability.',
};

export default function StoriesIndexPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="relative w-full min-h-[320px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src="/images/stories/story-01.jpg"
          alt="Inspirational stories header banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            VOICES OF COURAGE & INCLUSION
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            Inspirational Stories
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            Real stories of artists, athletes, software trainees, and advocate families walking alongside Sangati.
          </p>
        </div>
      </section>

      {/* STORIES INDEX GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="stories-grid-heading">
        <div className="border-b-2 border-ink pb-4 flex justify-between items-end">
          <h2 id="stories-grid-heading" className="text-3xl font-bold font-display text-ink">
            Featured Narratives
          </h2>
          <span className="font-mono text-xs text-road font-bold uppercase">
            {storiesList.length} Stories Published
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storiesList.map((story) => (
            <article
              key={story.slug}
              className="border-2 border-ink bg-field flex flex-col justify-between group hover:border-road transition-colors"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full border-b-2 border-ink bg-mist overflow-hidden">
                  <Image
                    src={story.image}
                    alt={`Image for ${story.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-road bg-mist border border-ink px-2 py-0.5">
                      {story.category}
                    </span>
                    <span className="font-mono text-[11px] text-ink/70">{story.date}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-ink group-hover:text-road transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs font-mono text-ink/70">
                    Sub: {story.subtitle}
                  </p>

                  <p className="text-sm font-body text-ink/80 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/stories/${story.slug}`}
                  className="w-full bg-mist text-ink border-2 border-ink py-2.5 px-4 rounded-full font-bold font-mono text-xs uppercase hover:bg-road hover:text-field transition-colors flex items-center justify-between min-h-[44px]"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
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

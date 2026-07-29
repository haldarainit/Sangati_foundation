import React from 'react';
import Image from 'next/image';
import { newsList } from '@/content/news';
import { RouteLine } from '@/components/ui/RouteLine';
import { Calendar, Megaphone, Tag } from 'lucide-react';

export const metadata = {
  title: 'News & Events Archive | Sangati Foundation',
  description:
    'Browse campaign posters, announcements, and news events from Sangati Foundation.',
};

export default function NewsIndexPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[320px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src="/images/posters/poster-01.jpg"
          alt="Campaign posters archive header"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            CAMPAIGNS & EVENT FLYERS
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            News & Poster Archive
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            Explore official Sangati campaign posters, medical drive flyers, and announcements.
          </p>
        </div>
      </section>

      {/* POSTERS ARCHIVE GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="posters-grid-heading">
        <div className="border-b-2 border-ink pb-4">
          <h2 id="posters-grid-heading" className="text-3xl font-bold font-display text-ink">
            Official Posters & Announcements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((poster) => (
            <article
              key={poster.id}
              className="border-2 border-ink bg-field flex flex-col justify-between p-6 space-y-6 hover:border-road transition-colors"
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full border-2 border-ink bg-mist overflow-hidden">
                  <Image
                    src={poster.image}
                    alt={poster.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="bg-road text-field font-bold px-2 py-0.5 border border-ink">
                      {poster.category}
                    </span>
                    <span className="bg-mist text-ink px-2 py-0.5 border border-ink flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-road" aria-hidden="true" />
                      <span>{poster.date}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-ink leading-snug">
                    {poster.title}
                  </h3>

                  <p className="text-sm font-body text-ink/80 leading-relaxed">
                    {poster.description}
                  </p>
                </div>
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

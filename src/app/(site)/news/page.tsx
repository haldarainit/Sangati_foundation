import React from 'react';
import Image from 'next/image';
import { getNews, getVideos } from '@/sanity/lib/content';
import { REVALIDATE_SECONDS } from '@/sanity/lib/fetch';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { HeroVideoPlayer } from '@/components/ui/HeroVideoPlayer';
import { RouteLine } from '@/components/ui/RouteLine';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Film, Play, Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, Heart, Award } from 'lucide-react';

export const metadata = {
  title: 'Films & Video Documentaries | Sangati Foundation',
  description:
    'Watch official documentary films, video stories, and explore campaign media flyers from Sangati Foundation.',
};

export const revalidate = REVALIDATE_SECONDS;

export default async function FilmsPage() {
  const [newsList, videos] = await Promise.all([getNews(), getVideos()]);

  // The film marked "featured" leads the page; if none is marked, the first
  // one does. With no videos at all, the original local film still plays.
  const featured = videos.find((v) => v.isFeatured) ?? videos[0] ?? null;
  const others = videos.filter((v) => v.id !== featured?.id);

  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src="/images/posters/poster-01.jpg"
          alt="Films and documentaries archive banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-road text-field px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              SANGATI CINEMA & DOCUMENTARIES
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field flex items-center gap-3">
              <Film className="w-8 h-8 sm:w-12 sm:h-12 text-clay" />
              <span>Films & Video Stories</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-3xl leading-relaxed">
              Experience the visual journey of Sangati Foundation — documentary films, campaign video features, and community impact stories.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURED DOCUMENTARY FILM SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="featured-film-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b-2 border-ink pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                FEATURED DOCUMENTARY FILM
              </span>
              <h2 id="featured-film-heading" className="text-2xl sm:text-4xl font-black font-display text-ink">
                {featured
                  ? featured.title
                  : 'Sangati Foundation: Driving Inclusivity, Mobility & Dignity'}
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold bg-mist text-ink px-3 py-1.5 rounded-full border border-ink/20 shrink-0">
              <Clock className="w-4 h-4 text-road" />
              <span>{featured?.duration ?? 'Duration: 3 min 45 sec • Full HD'}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Video Player Canvas Container */}
        <ScrollReveal variant="zoom-in" delay={100}>
          <div className="bg-ink rounded-3xl border-4 border-ink shadow-2xl overflow-hidden p-2 sm:p-4">
            {featured ? (
              <VideoEmbed video={featured} priority />
            ) : (
              <HeroVideoPlayer src="/hero-video.mp4" variant="hero" />
            )}
          </div>
        </ScrollReveal>

        {/* Video Content & Analysis Details Card */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="bg-white border-2 border-ink rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-clay uppercase tracking-widest block">
                FILM SYNOPSIS & CONTENT OVERVIEW
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                About This Film
              </h3>
              <p className="text-base sm:text-lg font-body text-ink/90 leading-relaxed">
                {featured
                  ? featured.description
                  : 'This flagship documentary film captures Sangati Foundation’s ground-level impact across India. It chronicles our key initiatives — establishing India’s first Sangati Durlabh Shauchalaya wheelchair-accessible public toilets, transforming Hazrat Nizamuddin railway hub for locomotor & visual disability access, deploying Asha Kiran mobile cancer screening vans across rural Himachal Pradesh, empowering Divyang street vendors with retrofitted sangTea e-karts, and completing the historic 6,500 km Sangati Yatra.'}
              </p>
            </div>

            {/* Key Themes Highlighted */}
            <div className="space-y-3 pt-2 border-t-2 border-ink/10">
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                Core Themes Featured in Film:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs font-bold">
                <div className="bg-mist p-3 rounded-xl border border-road/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-road shrink-0" />
                  <span>Universal Accessibility</span>
                </div>
                <div className="bg-mist p-3 rounded-xl border border-road/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-road shrink-0" />
                  <span>Adaptive Wheelchair Mobility</span>
                </div>
                <div className="bg-mist p-3 rounded-xl border border-road/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-road shrink-0" />
                  <span>Rural OPD & Cancer Screening</span>
                </div>
                <div className="bg-mist p-3 rounded-xl border border-road/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-road shrink-0" />
                  <span>Divyang E-Kart Entrepreneurship</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* MORE FILMS */}
      {others.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="more-films-heading">
          <ScrollReveal variant="fade-up">
            <div className="border-b-2 border-ink pb-4">
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                VIDEO LIBRARY
              </span>
              <h2 id="more-films-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
                More Films & Video Stories
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {others.map((v, idx) => (
              <ScrollReveal key={v.id} variant="fade-up" delay={idx * 60}>
                <article className="space-y-3 bg-white border border-road/20 rounded-3xl p-4 shadow-sm h-full">
                  <VideoEmbed video={v} />
                  <div className="space-y-1.5 px-1 pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {v.date && (
                        <span className="font-mono text-[10px] font-bold text-road bg-road/10 border border-road/20 px-2.5 py-0.5 rounded-full uppercase">
                          {v.date}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold font-display text-ink">{v.title}</h3>
                    <p className="font-body text-sm text-ink/80 leading-relaxed">{v.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* MORE DOCUMENTARIES & CAMPAIGN POSTERS ARCHIVE */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="posters-grid-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b-2 border-ink pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              CAMPAIGN MEDIA & PRINTS
            </span>
            <h2 id="posters-grid-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Official Campaign Posters & Media Prints
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newsList.map((poster, index) => (
            <ScrollReveal key={poster.id} variant="fade-up" delay={index * 100}>
              <article className="border-2 border-ink bg-white rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="relative aspect-[4/5] w-full bg-mist border border-road/20 rounded-2xl overflow-hidden shadow-xs group">
                    <Image
                      src={poster.image}
                      alt={poster.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
    </div>
  );
}

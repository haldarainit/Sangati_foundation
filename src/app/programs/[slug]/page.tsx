import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { programsList } from '@/content/programs';
import { Button } from '@/components/ui/Button';
import { RouteLine } from '@/components/ui/RouteLine';
import { InfiniteMarqueeSlider } from '@/components/ui/InfiniteMarqueeSlider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowLeft, CheckCircle2, Heart, Camera, Trophy, Flame, Sparkles, Award, Users } from 'lucide-react';

export function generateStaticParams() {
  return programsList.map((program) => ({
    slug: program.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const program = programsList.find((p) => p.slug === params.slug);
  if (!program) return { title: 'Program Not Found' };

  return {
    title: `${program.title} | Sangati Foundation Programmes`,
    description: program.summary,
  };
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = programsList.find((p) => p.slug === params.slug);

  if (!program) {
    notFound();
  }

  const isParaSports = program.slug === 'para-sports';
  const isAccessibility = program.slug === 'accessibility';

  return (
    <article className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* BANNER HEADER */}
      <section
        className={`relative w-full min-h-[300px] sm:min-h-[380px] md:min-h-[460px] flex items-center overflow-hidden ${
          isParaSports
            ? 'bg-gradient-to-br from-[#0B1E38] via-[#0F284B] to-[#15803D]'
            : 'bg-ink'
        } text-field`}
      >
        <Image
          src={program.image}
          alt={`Banner image for Sangati Foundation ${program.title} programme`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-marigold hover:underline min-h-[44px] focus-visible:outline-marigold"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Programmes</span>
          </Link>

          {isParaSports && (
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3 py-1 rounded-full uppercase tracking-wider animate-pulse-subtle">
                <Flame className="w-3.5 h-3.5 fill-current text-road" />
                <span>MINISTRY OF AYUSH & NATIONAL PARA SPORTS PARTNER</span>
              </span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {program.title}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-3xl">
            {program.summary}
          </p>
        </div>
      </section>

      {/* CONTENT BODY */}
      <section className="max-w-5xl mx-auto px-4 space-y-8 sm:space-y-10">
        {/* Main Quote / Program Summary Block */}
        <ScrollReveal variant="fade-up">
          <div className="bg-white border border-road/20 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              OFFICIAL PROGRAMME RECORD
            </span>
            <blockquote className="text-lg sm:text-2xl font-body text-ink leading-relaxed italic border-l-4 border-marigold pl-4 sm:pl-6 py-2">
              &quot;{program.fullContent}&quot;
            </blockquote>

            {program.keyStats && (
              <div className="pt-4 border-t border-road/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {program.keyStats.map((stat, idx) => (
                  <div key={idx} className="bg-mist/60 border border-road/15 rounded-2xl p-3.5 text-center">
                    <span className="font-mono text-[10px] font-bold text-road block uppercase">KEY METRIC</span>
                    <span className="font-display font-black text-lg sm:text-xl text-ink">{stat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* SPECIAL PARA SPORTS FEATURED NEWSPAPER & ATHLETICS SHOWCASE */}
        {isParaSports && (
          <ScrollReveal variant="zoom-in" delay={100}>
            <div className="bg-gradient-to-br from-ink via-[#0D2444] to-[#15803D] text-field rounded-3xl p-6 sm:p-10 border border-marigold/40 space-y-8 shadow-2xl overflow-hidden relative">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-field/20 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    NATIONAL MEDIA FEATURE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-field tracking-tight mt-2">
                    India Gate Sugamya Yoga & Para Athletics
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-road/30 border border-marigold/30 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-marigold">
                  <Trophy className="w-4 h-4 text-marigold" />
                  <span>Historic 21st June Yoga Event</span>
                </div>
              </div>

              {/* Newspaper Clipping & Story Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 relative aspect-[3/4] w-full rounded-2xl border-2 border-marigold/40 bg-black overflow-hidden shadow-xl group">
                  <Image
                    src="/images/parasports/parasports-yoga-news-clipping.jpg"
                    alt="National Media Clipping: Accessible Yoga on Retrofitted Scooters at India Gate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-top bg-white group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    <p className="font-mono text-xs font-bold text-marigold">
                      📰 &quot;एक नई क्रांति न्यूज़&quot; Front-Page Coverage
                    </p>
                    <p className="font-body text-xs text-white/90">
                      &quot;दिव्यांगजनों द्वारा अटैचमेंट वाली स्कूटी पर सुगम्य योग का प्रदर्शन — इंडिया गेट&quot;
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-5 text-field/90 font-body text-sm sm:text-base leading-relaxed">
                  <p>
                    On International Yoga Day (21st June), Sangati Foundation joined forces with the <strong className="text-marigold">Ministry of Ayush (Govt. of India)</strong>, <strong className="text-marigold">Eagle Specially Abled Riders</strong>, and Kaner Electric Connections to hold India&apos;s first-ever <strong className="text-white">Accessible Yoga (&quot;सुगम्य योग&quot;)</strong> demonstration at India Gate, New Delhi.
                  </p>

                  <div className="space-y-3 bg-white/10 p-4 rounded-2xl border border-white/15">
                    <h3 className="font-display font-bold text-base text-marigold flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Core Para Sports Disciplines
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-field/95">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-marigold shrink-0" />
                        <span><strong>Accessible Yoga (सुगम्य योग)</strong> on retrofitted scooters & wheelchairs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-marigold shrink-0" />
                        <span><strong>Wheelchair Cricket Warriors</strong>: Tournament sponsorship & pitch training</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-marigold shrink-0" />
                        <span><strong>Vedanta Delhi Half-Marathon</strong>: 25+ Divyang Champions distance runners</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* FEATURED SPORTS AND ACTIVITIES PHOTO SHOWCASE GRID */}
        {isParaSports && (
          <ScrollReveal variant="zoom-in" delay={120}>
            <div className="bg-white border-2 border-road/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-ink border-b-2 border-road/15 pb-4">
                Sports and Activities
              </h2>

              {/* Pure Image Showcase Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  '/images/parasports/sports-showcase-01.jpg',
                  '/images/parasports/sports-showcase-02.jpg',
                  '/images/parasports/sports-showcase-03.jpg',
                  '/images/parasports/sports-showcase-04.jpg',
                ].map((src, index) => (
                  <div
                    key={index}
                    className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-road/20 bg-black shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5"
                  >
                    <Image
                      src={src}
                      alt={`Sports and Activities photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* FEATURED ACCESSIBLE TOILETS PHOTO SHOWCASE GRID */}
        {isAccessibility && (
          <ScrollReveal variant="zoom-in" delay={120}>
            <div className="bg-white border-2 border-road/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-ink border-b-2 border-road/15 pb-4">
                Sangati Durlabh Shauchalaya — Accessible Toilets Showcase
              </h2>

              {/* Pure Image Showcase Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  '/images/accessibility/toilet-showcase-01.jpg',
                  '/images/accessibility/toilet-showcase-02.jpg',
                  '/images/accessibility/accessibility-durlabh-shauchalaya.jpg',
                ].map((src, index) => (
                  <div
                    key={index}
                    className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-road/20 bg-black shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5"
                  >
                    <Image
                      src={src}
                      alt={`Accessible Toilet photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* AUTHENTIC PHOTO GALLERY SHOWCASE (Automated Infinite Loop Marquee) */}
        {program.gallery && program.gallery.length > 0 && (
          <ScrollReveal variant="zoom-in" delay={150}>
            <div className="space-y-4 bg-mist/30 border border-road/20 rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b border-road/20 pb-3 px-2">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-road" />
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-ink">
                    On-the-Ground Training & Match Action Photos
                  </h2>
                </div>
                <span className="hidden sm:inline-block font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase">
                  Hover to pause
                </span>
              </div>

              {/* Automated Continuous Infinite Loop Marquee Slider */}
              <InfiniteMarqueeSlider slides={program.gallery} speedSeconds={35} />
            </div>
          </ScrollReveal>
        )}

        {/* Highlights Breakdown */}
        {program.highlights && (
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="bg-white border border-road/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-ink border-b border-road/15 pb-3">
                Key Achievements & Deliverables
              </h2>
              <ul className="space-y-3">
                {program.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-mist/40 p-3.5 sm:p-4 rounded-2xl border border-road/15">
                    <CheckCircle2 className="w-5 h-5 text-road shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-body text-sm sm:text-base text-ink font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* Partners Row */}
        {program.partners && (
          <ScrollReveal variant="fade-up" delay={250}>
            <div className="border border-road/20 bg-white rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm shadow-xs">
              <span className="font-bold text-road uppercase">COLLABORATING PARTNERS:</span>
              <div className="flex flex-wrap gap-2">
                {program.partners.map((partner, i) => (
                  <span key={i} className="bg-marigold text-ink font-bold px-3 py-1 rounded-full border border-marigold/40">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* DONATE CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-road text-field rounded-3xl border border-road/40 p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-field">
              Sponsor Para Athletes & Adaptive Sports Equipment
            </h2>
            <p className="text-base md:text-lg font-body max-w-2xl mx-auto">
              Your donation provides wheelchair sports kits, retrofitted scooter attachments, cricket gear, and competition registration fees.
            </p>
            <Button href="/donate" variant="outline" className="px-8 py-4 text-lg rounded-full shadow-xl bg-field text-ink border-2 border-field hover:bg-ink hover:text-field">
              <Heart className="w-6 h-6 fill-current text-ink" aria-hidden="true" />
              <span>Sponsor Divyang Athletes (80G Eligible)</span>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </article>
  );
}

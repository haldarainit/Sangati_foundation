import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeContent } from '@/content/home';
import { programsList } from '@/content/programs';
import { newsList } from '@/content/news';
import { StatCounter } from '@/components/ui/StatCounter';
import { RouteLine } from '@/components/ui/RouteLine';
import { InfiniteMarqueeSlider } from '@/components/ui/InfiniteMarqueeSlider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeroProgramBookSlider } from '@/components/ui/HeroProgramBookSlider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { ArrowRight, Heart, Shield, CheckCircle, Sparkles, Compass, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* Top Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* 1. HERO SECTION WITH PROGRAMMES BOOK SLIDER */}
      <section className="relative w-full bg-field pt-2 sm:pt-4 overflow-hidden">
        {/* Inspiring Headline & Tagline at Top */}
        <div className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6 pb-6 text-center space-y-4">
          <ScrollReveal variant="fade-up">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold bg-marigold/20 text-ink border border-marigold/50 px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-road shrink-0" />
              <span>REGISTERED CHARITABLE TRUST • EST. 14 FEB 2019</span>
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-ink leading-tight">
              Accessibility. Mobility.{' '}
              <span className="text-road bg-marigold/20 px-2 py-0.5 rounded-lg border border-marigold/30 inline-block mt-1">
                Inclusivity. Visibility.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-base md:text-lg font-body text-ink/90 max-w-2xl mx-auto leading-relaxed">
              {homeContent.hero.subheadline}
            </p>
          </ScrollReveal>
        </div>

        {/* Book-Structured Programmes Showcase Slider */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-6">
          <ScrollReveal variant="zoom-in" delay={150}>
            <HeroProgramBookSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STAT COUNTER BAND WITH NGO AUTHENTICITY & DONATE CTA */}
      <ScrollReveal variant="fade-up" delay={150}>
        <StatCounter stats={homeContent.stats} />
      </ScrollReveal>

      {/* 3. WHO WE ARE SECTION WITH HORIZONTAL SCROLL REVEAL */}
      <section className="max-w-7xl mx-auto px-4 py-4" aria-labelledby="who-we-are-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column Image */}
          <ScrollReveal variant="fade-right" delay={200}>
            <div className="relative aspect-[4/3] w-full rounded-3xl border border-road/20 bg-mist overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <Image
                src={homeContent.whoWeAre.image}
                alt="Sangati Foundation founders and community members gathering at a public accessibility initiative"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </ScrollReveal>

          {/* Right Column Text */}
          <div className="space-y-6">
            <ScrollReveal variant="fade-left" delay={150}>
              <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full inline-block uppercase tracking-wider">
                {homeContent.whoWeAre.eyebrow}
              </span>
              <h2 id="who-we-are-heading" className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight mt-2">
                {homeContent.whoWeAre.title}
              </h2>
            </ScrollReveal>

            <div className="space-y-4 text-base md:text-lg font-body text-ink/90 leading-relaxed">
              {homeContent.whoWeAre.paragraphs.map((para, idx) => (
                <ScrollReveal key={idx} variant="fade-left" delay={200 + idx * 100}>
                  <p>{para}</p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal variant="fade-left" delay={450}>
              <Button href={homeContent.whoWeAre.ctaLink} variant="outline" className="rounded-full">
                <span>{homeContent.whoWeAre.ctaText}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* 4. SIX CORE PROGRAMMES SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-10" aria-labelledby="programmes-heading">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                ACTION AREAS & INITIATIVES
              </span>
              <h2 id="programmes-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
                Our 6 Core Programmes
              </h2>
            </div>
            <Button href="/programs" variant="outline" className="rounded-full">
              <span>View All Programmes</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </ScrollReveal>

        {/* 2x3 Grid of Programme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsList.map((prog, index) => (
            <ScrollReveal key={prog.slug} variant="fade-up" delay={index * 100}>
              <Card
                title={prog.title}
                subtitle={`Programme 0${index + 1}`}
                imageSrc={prog.image}
                href={`/programs/${prog.slug}`}
                ctaText="Read programme brief"
                badgeText={prog.partners ? `Partners: ${prog.partners[0]}` : undefined}
                className="h-full rounded-3xl overflow-hidden border border-road/20 shadow-sm hover:shadow-xl transition-all"
              >
                <p className="line-clamp-3 text-sm text-ink/80 leading-relaxed font-body">
                  {prog.summary}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. SANGATI YATRA CAMPAIGN HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4" aria-labelledby="yatra-highlight-heading">
        <ScrollReveal variant="zoom-in">
          <div className="bg-ink text-field rounded-3xl border border-road/30 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 rounded-full uppercase">
                  {homeContent.yatraTeaser.eyebrow}
                </span>
                <h2 id="yatra-highlight-heading" className="text-3xl md:text-5xl font-black font-display tracking-tight text-field">
                  {homeContent.yatraTeaser.title}
                </h2>
                <blockquote className="text-lg md:text-xl font-body text-field/90 italic border-l-4 border-field/50 pl-4 py-1">
                  &quot;{homeContent.yatraTeaser.headline}&quot;
                </blockquote>
                <p className="text-base md:text-lg font-body text-field/90 leading-relaxed">
                  {homeContent.yatraTeaser.description}
                </p>
                <Button href={homeContent.yatraTeaser.ctaLink} variant="marigold" className="px-8 py-3.5 rounded-full shadow-lg">
                  <span>{homeContent.yatraTeaser.ctaText}</span>
                  <ArrowRight className="w-5 h-5 text-ink" aria-hidden="true" />
                </Button>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl border border-field/20 bg-mist overflow-hidden shadow-xl">
                <Image
                  src={homeContent.yatraTeaser.image}
                  alt="Sangati Yatra modified vehicles convoy driving across long-distance highway"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. GALLERY CAROUSEL SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="gallery-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b-2 border-ink pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              VISUAL CHRONICLE
            </span>
            <h2 id="gallery-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              Sangati Foundation in Action
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="zoom-in" delay={150}>
          <InfiniteMarqueeSlider slides={homeContent.gallery} speedSeconds={32} />
        </ScrollReveal>
      </section>

      {/* 7. LATEST NEWS & EVENTS GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="news-heading">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                UPDATES & ANNOUNCEMENTS
              </span>
              <h2 id="news-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
                Latest News & Events
              </h2>
            </div>
            <Button href="/news" variant="outline" className="rounded-full">
              <span>View All News & Posters</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.slice(0, 3).map((item, index) => (
            <ScrollReveal key={item.id} variant="fade-up" delay={index * 120}>
              <Card
                title={item.title}
                subtitle={`${item.date} • ${item.category}`}
                imageSrc={item.image}
                href="/news"
                ctaText="View event poster"
                className="h-full rounded-3xl overflow-hidden border border-road/20 shadow-sm hover:shadow-xl transition-all"
              >
                <p className="line-clamp-3 text-sm text-ink/80 leading-relaxed font-body">
                  {item.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 8. DONATE CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-road text-field rounded-3xl border border-road/40 p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-field">
              Your Support Drives Inclusivity, Mobility & Dignity
            </h2>
            <p className="text-base md:text-lg font-body max-w-2xl mx-auto text-field/90">
              Sangati Foundation is a registered charitable trust. All donations qualify for 80G tax deduction receipts.
            </p>
            <Button href="/donate" variant="outline" className="px-8 py-4 text-lg rounded-full shadow-xl bg-field text-ink border-2 border-field hover:bg-ink hover:text-field">
              <Heart className="w-6 h-6 fill-current text-ink" aria-hidden="true" />
              <span>Donate Now & Claim 80G Receipt</span>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}


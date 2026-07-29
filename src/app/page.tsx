import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeContent } from '@/content/home';
import { programsList } from '@/content/programs';
import { newsList } from '@/content/news';
import { StatCounter } from '@/components/ui/StatCounter';
import { RouteLine } from '@/components/ui/RouteLine';
import { Carousel } from '@/components/ui/Carousel';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Heart, Shield, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[560px] md:min-h-[640px] flex items-center justify-center bg-ink text-field overflow-hidden">
        {/* Background Banner Image */}
        <Image
          src={homeContent.hero.bgImage}
          alt="Sangati Foundation volunteers and persons with disability in an outdoor mobility campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />

        {/* High-Contrast Overlay for 7:1 Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/80 to-ink/60"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 text-center space-y-6">
          <span className="inline-block font-mono text-xs md:text-sm font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider">
            REGISTERED INDIAN CHARITABLE TRUST • EST. 14 FEB 2019
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field leading-tight">
            {homeContent.hero.headline}
          </h1>

          <p className="text-lg md:text-xl font-body text-field/90 max-w-3xl mx-auto leading-relaxed">
            {homeContent.hero.subheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button href={homeContent.hero.primaryCtaLink} variant="road">
              <span>{homeContent.hero.primaryCtaText}</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>

            <Button href={homeContent.hero.secondaryCtaLink} variant="clay">
              <Heart className="w-5 h-5 fill-current" aria-hidden="true" />
              <span>{homeContent.hero.secondaryCtaText}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. STAT COUNTER BAND */}
      <StatCounter stats={homeContent.stats} />

      {/* 3. WHO WE ARE SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-4" aria-labelledby="who-we-are-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column Image */}
          <div className="relative aspect-[4/3] w-full border-2 border-ink bg-mist overflow-hidden">
            <Image
              src={homeContent.whoWeAre.image}
              alt="Sangati Foundation founders and community members gathering at a public accessibility initiative"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right Column Content */}
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold text-road bg-mist border border-ink px-2.5 py-1">
              {homeContent.whoWeAre.eyebrow}
            </span>

            <h2 id="who-we-are-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              {homeContent.whoWeAre.title}
            </h2>

            <div className="space-y-4 font-body text-base md:text-lg text-ink/90 leading-relaxed">
              {homeContent.whoWeAre.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-2">
              <Button href={homeContent.whoWeAre.ctaLink} variant="road">
                <span>{homeContent.whoWeAre.ctaText}</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER WITH ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* 4. PROGRAMMES OVERVIEW GRID */}
      <section className="max-w-7xl mx-auto px-4 py-4 space-y-8" aria-labelledby="programmes-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              OUR ACTION AREAS
            </span>
            <h2 id="programmes-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              Six Core Programmes
            </h2>
          </div>
          <Link
            href="/programs"
            className="font-mono text-sm font-bold text-road hover:text-marigold underline min-h-[44px] flex items-center"
          >
            Explore Detailed Programmes →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programsList.map((program) => (
            <article
              key={program.slug}
              className="border-2 border-ink bg-field flex flex-col justify-between group hover:border-road transition-colors"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full border-b-2 border-ink bg-mist overflow-hidden">
                  <Image
                    src={program.image}
                    alt={`Photo representing Sangati Foundation's ${program.title} programme`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold font-display text-ink group-hover:text-road transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm font-body text-ink/80 line-clamp-3 leading-relaxed">
                    {program.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/programs/${program.slug}`}
                  className="w-full bg-mist text-ink border-2 border-ink py-2.5 px-4 rounded-full font-bold font-mono text-xs uppercase hover:bg-road hover:text-field transition-colors flex items-center justify-between min-h-[44px]"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. YATRA FEATURE BAND */}
      <section className="bg-road text-field border-y-2 border-ink py-16 px-4" aria-labelledby="yatra-feature-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink">
              {homeContent.yatraTeaser.eyebrow}
            </span>

            <h2 id="yatra-feature-heading" className="text-3xl md:text-5xl font-black font-display text-marigold leading-tight">
              {homeContent.yatraTeaser.headline}
            </h2>

            <p className="text-base md:text-lg font-body text-field/90 leading-relaxed">
              {homeContent.yatraTeaser.description}
            </p>

            <RouteLine />

            <div className="pt-2">
              <Button href={homeContent.yatraTeaser.ctaLink} variant="marigold">
                <span>{homeContent.yatraTeaser.ctaText}</span>
                <ArrowRight className="w-5 h-5 text-ink" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full border-2 border-field bg-ink overflow-hidden">
              <Image
                src={homeContent.yatraTeaser.image}
                alt="Sangati Yatra modified vehicles convoy driving on highway road"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS & POSTERS ARCHIVE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 py-4 space-y-8" aria-labelledby="news-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              CAMPAIGNS & ANNOUNCEMENTS
            </span>
            <h2 id="news-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              Latest Posters & Events
            </h2>
          </div>
          <Link
            href="/news"
            className="font-mono text-sm font-bold text-road hover:text-marigold underline min-h-[44px] flex items-center"
          >
            View Full News Archive →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsList.slice(0, 3).map((item) => (
            <article key={item.id} className="border-2 border-ink bg-mist p-4 space-y-4">
              <div className="relative aspect-[3/4] w-full border-2 border-ink bg-field overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2"
                />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] font-bold text-road bg-field border border-ink px-2 py-0.5 inline-block">
                  {item.category} • {item.date}
                </span>
                <h3 className="text-lg font-bold font-display text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-body text-ink/80 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. ACCESSIBLE PHOTO GALLERY CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 py-4 space-y-6" aria-labelledby="gallery-heading">
        <div className="border-b-2 border-ink pb-4">
          <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
            WORK IN THE FIELD
          </span>
          <h2 id="gallery-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
            Photo Gallery
          </h2>
        </div>

        <Carousel slides={homeContent.gallery} ariaLabel="Sangati Foundation Recent Fieldwork Gallery" />
      </section>

      {/* 8. DONATE BAND */}
      <section className="bg-clay text-field border-y-2 border-ink py-16 px-4" aria-labelledby="donate-band-heading">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 id="donate-band-heading" className="text-3xl md:text-5xl font-black font-display text-field">
            {homeContent.donateBand.title}
          </h2>

          <p className="text-lg md:text-xl font-body text-field/95 leading-relaxed">
            {homeContent.donateBand.description}
          </p>

          <div className="pt-4">
            <Button href={homeContent.donateBand.ctaLink} variant="marigold" className="text-lg px-8 py-4">
              <Heart className="w-6 h-6 fill-current text-ink" aria-hidden="true" />
              <span>{homeContent.donateBand.ctaText}</span>
            </Button>
          </div>

          <div className="pt-4 font-mono text-xs text-field/80 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-marigold" aria-hidden="true" />
            <span>80G Tax Exemption Receipts issued for all contributions</span>
          </div>
        </div>
      </section>
    </div>
  );
}

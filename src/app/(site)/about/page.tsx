import React from 'react';
import Image from 'next/image';
import { getAboutContent } from '@/sanity/lib/content';
import { REVALIDATE_SECONDS } from '@/sanity/lib/fetch';
import { organizationInfo } from '@/content/organization';
import { RouteLine } from '@/components/ui/RouteLine';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PhotoGallery } from '@/components/ui/PhotoGallery';
import { Heart, Quote, ArrowRight, CheckCircle2, ShieldCheck, Award, Briefcase, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Us & Leadership | Sangati Foundation',
  description:
    'Learn about Sangati Foundation, founded by Mr Sudhir Dhir and Alka Selot Asthana. Our brand idea is companionship — walking alongside persons with disability.',
};

export const revalidate = REVALIDATE_SECONDS;

export default async function AboutPage() {
  const aboutContent = await getAboutContent();

  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* PAGE HEADER BANNER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={aboutContent.heroImage}
          alt="Sangati Foundation team members and supporters in a group photo"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-road text-field px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              WHO WE ARE & OUR FOUNDING STORY
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              {aboutContent.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              {aboutContent.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* BRAND IDEA & COMPANIONSHIP BLOCK */}
      <section className="max-w-7xl mx-auto px-4" aria-labelledby="brand-idea-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal variant="fade-right">
              <span className="font-mono text-xs font-bold text-road bg-mist border border-ink px-2.5 py-1">
                THE BRAND IDEA
              </span>
              <h2 id="brand-idea-heading" className="text-3xl md:text-4xl font-bold font-display text-ink mt-2">
                {aboutContent.brandIdea.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={100}>
              <div className="p-4 bg-mist border-l-4 border-clay border-y border-r border-ink/20 font-mono text-sm font-bold text-ink rounded-r-xl">
                {aboutContent.brandIdea.quoteHindi}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200}>
              <p className="text-lg font-body text-ink/90 leading-relaxed">
                {aboutContent.brandIdea.description}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300}>
              <p className="text-base font-body text-ink/80 leading-relaxed">
                {organizationInfo.brandMeaning}
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal variant="zoom-in" delay={200}>
              <div className="relative aspect-[4/3] w-full rounded-2xl border-2 border-ink bg-mist overflow-hidden shadow-xl">
                <Image
                  src={aboutContent.insetStoryImage}
                  alt="Sangati Foundation members engaging with people with disability during a campaign"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* FOUNDER TRUSTEE PROFILE: ALKA SELOT ASTHANA */}
      <section className="max-w-7xl mx-auto px-4 space-y-10" aria-labelledby="founder-trustees-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b-2 border-ink pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              GOVERNANCE & STRATEGIC LEADERSHIP
            </span>
            <h2 id="founder-trustees-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              Founder Trustees Profile
            </h2>
          </div>
        </ScrollReveal>

        {aboutContent.trustees.map((trustee) => (
          <ScrollReveal key={trustee.name} variant="fade-up">
            <div className="bg-white border-2 border-ink rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl space-y-8 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Profile Image Frame */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="relative aspect-[4/5] w-full rounded-2xl border-2 border-ink bg-mist overflow-hidden shadow-lg group">
                    <Image
                      src={trustee.image}
                      alt={`Portrait of ${trustee.name}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-road text-field text-xs font-mono font-bold px-3 py-1 rounded-full shadow-md border border-road">
                      Founder Trustee
                    </div>
                  </div>
                </div>

                {/* Right Bio & Core Details */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <span className="font-mono text-xs font-bold text-clay uppercase tracking-widest block">
                      {trustee.role}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black font-display text-ink mt-1">
                      {trustee.name}
                    </h3>
                    {trustee.subtitle && (
                      <p className="text-sm sm:text-base font-mono font-bold text-road mt-1 leading-snug">
                        {trustee.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Bio Paragraphs */}
                  <div className="space-y-4 text-base md:text-lg font-body text-ink/90 leading-relaxed">
                    {trustee.bio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Leadership Philosophy Quote Box */}
                  {trustee.quote && (
                    <div className="bg-mist/70 border-l-4 border-road border-y border-r border-ink/20 p-5 rounded-r-2xl space-y-2">
                      <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                        LEADERSHIP PHILOSOPHY
                      </span>
                      <p className="text-base sm:text-lg font-body text-ink font-semibold italic">
                        &quot;{trustee.quote}&quot;
                      </p>
                    </div>
                  )}

                  {/* Core Expertise Tags */}
                  {trustee.expertise && trustee.expertise.length > 0 && (
                    <div className="space-y-3 pt-2 border-t-2 border-ink/10">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-road" />
                        <span>Core Expertise & Domain Leadership:</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {trustee.expertise.map((exp, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-road/30 text-ink font-mono text-xs font-semibold px-3 py-1.5 rounded-full shadow-2xs hover:bg-mist transition-colors flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-road shrink-0" />
                            <span>{exp}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* FOUNDING POEM & MANIFESTO BLOCK */}
      <section className="max-w-5xl mx-auto px-4" aria-labelledby="founding-manifesto-heading">
        <ScrollReveal variant="zoom-in">
          <div className="bg-field border border-road/20 rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden shadow-xl">
            <Quote className="absolute top-6 right-6 w-24 h-24 text-road/10" aria-hidden="true" />

            <div className="space-y-2 border-b-2 border-ink pb-4">
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                FOUNDING MANIFESTO
              </span>
              <h2 id="founding-manifesto-heading" className="text-3xl md:text-4xl font-black font-display text-ink">
                {aboutContent.foundingPoem.title}
              </h2>
            </div>

            {/* Poem Verses */}
            <div className="bg-mist/70 border border-road/20 rounded-2xl p-6 md:p-8 space-y-3 font-display text-xl md:text-2xl font-bold text-road text-center shadow-inner">
              {aboutContent.foundingPoem.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {/* Invitation Text */}
            <p className="text-lg md:text-xl font-body text-ink/90 leading-relaxed italic border-l-4 border-clay pl-6 py-2">
              &quot;{aboutContent.foundingPoem.invitation}&quot;
            </p>

            {/* Founder Epigraph */}
            <div className="pt-6 border-t-2 border-ink flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-road uppercase">FOUNDER’S EPIGRAPH</span>
                <p className="text-base font-bold text-ink">
                  &quot;{aboutContent.foundingPoem.epigraph.quote}&quot;
                </p>
                <p className="text-xs text-ink/70">
                  — Attributed to {aboutContent.foundingPoem.epigraph.attribution}
                </p>
              </div>

              <Button href="/yatra" variant="road" className="rounded-full shadow-md">
                <span>Read Sangati Yatra Story</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* LEADERSHIP & KEY AUTHORS TEAM GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="team-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b-2 border-ink pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              THE PEOPLE BEHIND SANGATI
            </span>
            <h2 id="team-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
              Executive Leadership & Advisory Board
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutContent.leadership.map((member, index) => (
            <ScrollReveal key={member.name} variant="fade-up" delay={index * 120}>
              <article className="rounded-3xl border border-road/20 bg-white p-6 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="relative aspect-[3/4] w-full rounded-2xl border border-road/20 bg-mist overflow-hidden shadow-md">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full inline-block">
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-ink">{member.name}</h3>
                  <p className="text-sm font-body text-ink/80 leading-relaxed">{member.bio}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* TIMELINE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="timeline-preview-heading">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                2019 TO PRESENT
              </span>
              <h2 id="timeline-preview-heading" className="text-3xl md:text-4xl font-bold font-display text-ink">
                Milestone Timeline Overview
              </h2>
            </div>
            <Button href="/impact" variant="outline" className="rounded-full">
              <span>View Full Impact Details</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aboutContent.timelinePreview.map((item, index) => (
            <ScrollReveal key={item.year} variant="fade-up" delay={index * 100}>
              <div className="rounded-2xl border border-road/20 bg-white p-5 space-y-2 shadow-xs hover:shadow-md transition-all">
                <span className="font-mono text-xl font-black text-clay bg-ink px-3 py-1 rounded-full inline-block">
                  {item.year}
                </span>
                <p className="text-sm font-body text-ink font-semibold leading-snug">
                  {item.event}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* DONATE CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-clay text-field rounded-3xl border border-ink p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black font-display">
              Support Our Journey Towards Complete Accessibility
            </h2>
            <p className="text-base md:text-lg font-body max-w-2xl mx-auto">
              Your donation directly funds accessible public toilets, rural health camps, and free tech education.
            </p>
            <Button href="/donate" variant="outline" className="px-8 py-4 text-lg rounded-full shadow-xl bg-field text-ink border-2 border-field hover:bg-ink hover:text-field">
              <Heart className="w-6 h-6 fill-current text-ink" aria-hidden="true" />
              <span>Donate to Sangati (80G Receipt)</span>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* PHOTO GALLERY */}
      {aboutContent.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <ScrollReveal variant="fade-up">
            <div className="space-y-5 bg-mist/30 border border-road/20 rounded-3xl p-4 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-road/20 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-road uppercase tracking-wider">
                    Our work
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-ink">
                    Accessibility, Livelihoods & Sport
                  </h2>
                  <p className="font-body text-sm text-ink/70 max-w-xl">
                    Select any photo to view it full screen.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase shrink-0">
                  {aboutContent.gallery.length} photos
                </span>
              </div>

              <PhotoGallery photos={aboutContent.gallery} label="About Sangati photo gallery" />
            </div>
          </ScrollReveal>
        </section>
      )}
    </div>
  );
}

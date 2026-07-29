import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { programsList } from '@/content/programs';
import { Button } from '@/components/ui/Button';
import { RouteLine } from '@/components/ui/RouteLine';
import { ArrowLeft, CheckCircle2, Heart, Phone } from 'lucide-react';

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

  return (
    <article className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[360px] md:min-h-[440px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={program.image}
          alt={`Banner image for Sangati Foundation ${program.title} programme`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-marigold hover:underline min-h-[44px] focus-visible:outline-marigold"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Programmes</span>
          </Link>

          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-3xl">
            {program.summary}
          </p>
        </div>
      </section>

      {/* CONTENT BODY */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Main Quote Block */}
        <div className="bg-field border-2 border-ink p-8 md:p-12 space-y-6">
          <span className="font-mono text-xs font-bold text-road bg-mist border border-ink px-2.5 py-1">
            EXACT PROGRAMME RECORD
          </span>
          <blockquote className="text-xl md:text-2xl font-body text-ink leading-relaxed italic border-l-4 border-marigold pl-6 py-2">
            "{program.fullContent}"
          </blockquote>

          {program.keyStats && (
            <div className="pt-4 border-t-2 border-ink grid grid-cols-1 sm:grid-cols-3 gap-4">
              {program.keyStats.map((stat, idx) => (
                <div key={idx} className="bg-mist border-2 border-ink p-4 text-center">
                  <span className="font-mono text-xs font-bold text-road block">KEY METRIC</span>
                  <span className="font-display font-black text-xl text-ink">{stat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highlights Breakdown */}
        {program.highlights && (
          <div className="bg-mist border-2 border-ink p-8 space-y-6">
            <h2 className="text-2xl font-bold font-display text-ink border-b-2 border-ink pb-3">
              Key Achievements & Deliverables
            </h2>
            <ul className="space-y-4">
              {program.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-field p-4 border border-ink">
                  <CheckCircle2 className="w-5 h-5 text-road shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-body text-base text-ink font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Partners Row */}
        {program.partners && (
          <div className="border-2 border-ink bg-field p-6 flex flex-wrap items-center justify-between gap-4 font-mono text-sm">
            <span className="font-bold text-road uppercase">COLLABORATING PARTNERS:</span>
            <div className="flex flex-wrap gap-2">
              {program.partners.map((partner, i) => (
                <span key={i} className="bg-marigold text-ink font-bold px-3 py-1 border border-ink">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-road text-field border-2 border-ink p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold font-display text-marigold">
            Support the {program.title} Programme
          </h2>
          <p className="text-base md:text-lg font-body max-w-xl mx-auto">
            Help us expand our reach across India. Your contribution funds equipment, accessible infrastructure, and medical screening.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/donate" variant="clay">
              <Heart className="w-5 h-5 fill-current" aria-hidden="true" />
              <span>Donate to {program.title}</span>
            </Button>
            <Button href="/contact" variant="outline" className="border-field text-field hover:bg-mist hover:text-ink">
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span>Request Assistance</span>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}

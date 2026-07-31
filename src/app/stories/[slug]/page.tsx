import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { storiesList } from '@/content/stories';
import { Button } from '@/components/ui/Button';
import { RouteLine } from '@/components/ui/RouteLine';
import { ArrowLeft, Quote, Heart } from 'lucide-react';

export function generateStaticParams() {
  return storiesList.map((story) => ({
    slug: story.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const story = storiesList.find((s) => s.slug === params.slug);
  if (!story) return { title: 'Story Not Found' };

  return {
    title: `${story.title} | Sangati Stories`,
    description: story.excerpt,
  };
}

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = storiesList.find((s) => s.slug === params.slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[360px] md:min-h-[440px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={story.image}
          alt={`Header photo for ${story.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-marigold hover:underline min-h-[44px] focus-visible:outline-marigold"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Stories</span>
          </Link>

          <div className="flex flex-wrap gap-2">
            <span className="font-mono text-xs font-bold bg-marigold text-ink px-2.5 py-0.5 border border-ink uppercase">
              {story.category}
            </span>
            {story.author && (
              <span className="font-mono text-xs bg-road text-field px-2.5 py-0.5 border border-ink">
                By {story.author}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-field max-w-4xl">
            {story.title}
          </h1>

          <p className="text-base md:text-lg font-body text-field/90 max-w-2xl">
            {story.subtitle}
          </p>
        </div>
      </section>

      {/* STORY BODY */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Quote Callout */}
        {story.quote && (
          <div className="bg-mist border-2 border-ink p-6 md:p-8 space-y-2 relative">
            <Quote className="w-8 h-8 text-road mb-2" aria-hidden="true" />
            <blockquote className="text-xl md:text-2xl font-display font-bold text-ink italic leading-snug">
              "{story.quote}"
            </blockquote>
          </div>
        )}

        {/* Story Paragraphs */}
        <div className="space-y-6 font-body text-lg text-ink/90 leading-relaxed bg-field border-2 border-ink p-6 md:p-10">
          {story.fullStory.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* FOOTER CTA */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-road text-field border-2 border-ink p-8 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-field">
            Help Us Write More Stories of Inclusion
          </h2>
          <p className="text-sm md:text-base font-body max-w-lg mx-auto">
            Your support provides adaptive tools, skill certifications, and legal advocacy for persons with disability across India.
          </p>
          <Button href="/donate" variant="clay">
            <Heart className="w-5 h-5 fill-current" aria-hidden="true" />
            <span>Donate to Sangati</span>
          </Button>
        </div>
      </section>
    </article>
  );
}

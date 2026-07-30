'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface MarqueeSlide {
  id: string;
  title: string;
  src: string;
  caption?: string;
  link?: string;
}

interface InfiniteMarqueeSliderProps {
  slides: MarqueeSlide[];
  speedSeconds?: number;
}

export const InfiniteMarqueeSlider: React.FC<InfiniteMarqueeSliderProps> = ({
  slides,
  speedSeconds = 32,
}) => {
  if (!slides || slides.length === 0) return null;

  // Helper to determine destination link if not explicitly provided
  const getDestinationLink = (slide: MarqueeSlide) => {
    if (slide.link) return slide.link;
    const lower = (slide.title + ' ' + (slide.caption || '')).toLowerCase();
    if (lower.includes('health') || lower.includes('cancer') || lower.includes('opd') || lower.includes('winter') || lower.includes('blanket') || lower.includes('sweater') || lower.includes('relief')) {
      return '/programs/health';
    }
    if (lower.includes('shoppe') || lower.includes('ekart') || lower.includes('sangtea') || lower.includes('livelihood')) {
      return '/programs/livelihood';
    }
    if (lower.includes('sport') || lower.includes('yoga') || lower.includes('cricket') || lower.includes('para')) {
      return '/programs/para-sports';
    }
    if (lower.includes('toilet') || lower.includes('shauchalaya') || lower.includes('accessibility') || lower.includes('nizamuddin')) {
      return '/programs/accessibility';
    }
    if (lower.includes('skill') || lower.includes('bakery') || lower.includes('udaan') || lower.includes('training')) {
      return '/programs/skills';
    }
    return '/programs';
  };

  // Duplicate slides array 3 times for a seamless, glitch-free 100% infinite loop
  const duplicatedSlides = [...slides, ...slides, ...slides];

  return (
    <div className="relative w-full overflow-hidden py-4 group">
      {/* Subtle Gradient Edge Fades for Luxury Aesthetics */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-field via-field/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-field via-field/80 to-transparent z-10 pointer-events-none" />

      {/* Continuous Infinite Marquee Track */}
      <div
        className="flex gap-4 sm:gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {duplicatedSlides.map((slide, idx) => {
          const href = getDestinationLink(slide);
          return (
            <Link
              key={`${slide.id}-${idx}`}
              href={href}
              className="w-[280px] sm:w-[360px] md:w-[420px] shrink-0 bg-white border border-road/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group/card cursor-pointer"
            >
              <div className="relative aspect-[16/10] w-full bg-ink/10 overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 640px) 280px, 420px"
                  className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-4 sm:p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-road bg-road/10 border border-road/20 px-2.5 py-0.5 rounded-full w-fit uppercase">
                    {slide.title}
                  </span>
                  <span className="text-xs font-bold text-marigold group-hover/card:underline">
                    View Brief →
                  </span>
                </div>
                {slide.caption && (
                  <p className="font-body text-xs sm:text-sm text-ink/90 leading-snug font-medium line-clamp-2">
                    {slide.caption}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

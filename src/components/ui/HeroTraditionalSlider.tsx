'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

import { DEFAULT_HERO_SLIDES, type HeroSlideItem } from '@/content/heroSlides';

export type { HeroSlideItem };


export interface HeroTraditionalSliderProps {
  /**
   * Slides managed in the admin panel. The logo intro slide is prepended
   * automatically. When empty, DEFAULT_HERO_SLIDES is used instead.
   */
  slides?: Omit<HeroSlideItem, 'id' | 'slug' | 'isIntro'>[];
}

export const HeroTraditionalSlider: React.FC<HeroTraditionalSliderProps> = ({ slides: fromCms }) => {
  const { reduceMotion } = useAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides: HeroSlideItem[] = fromCms?.length
    ? [
        DEFAULT_HERO_SLIDES[0],
        ...fromCms.map((slide, idx) => ({
          ...slide,
          id: `slide-${idx + 1}`,
          slug: `slide-${idx + 1}`,
        })),
      ]
    : DEFAULT_HERO_SLIDES;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const skipIntro = () => {
    setCurrentIndex(1);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 30) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  // Slide Timing & Zoom Animation trigger
  useEffect(() => {
    if (reduceMotion) return;

    if (currentIndex === 0) {
      // Trigger logo zoom-in animation
      setZoomActive(false);
      const zoomStartTimer = setTimeout(() => {
        setZoomActive(true);
      }, 50);

      // Intro slide lasts 3.8 seconds before transitioning to Slide 1
      const introTimer = setTimeout(() => {
        setCurrentIndex(1);
      }, 3800);

      return () => {
        clearTimeout(zoomStartTimer);
        clearTimeout(introTimer);
      };
    } else {
      setZoomActive(false);
      // Regular 5-second slide rotation for program slides
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [currentIndex, reduceMotion, slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Sangati Foundation Programmes Full-Bleed Hero Slider"
      className="relative w-full h-[75vh] min-h-[480px] max-h-[700px] bg-ink overflow-hidden focus:outline-none select-none group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;

        // Slide #0: Animated White Screen Intro Logo
        if (slide.isIntro) {
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out flex flex-col items-center justify-center p-6 ${
                isActive ? 'opacity-100 z-20' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Skip Intro Button */}
              <button
                onClick={skipIntro}
                className="absolute top-6 right-6 z-30 px-4 py-2 bg-ink/5 hover:bg-ink/10 text-ink rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border border-ink/10 cursor-pointer shadow-sm"
              >
                <span>Skip Intro</span>
                <ChevronRight className="w-4 h-4 text-road" />
              </button>

              {/* White Screen Zooming Sangati Text Logo Image */}
              <div
                className={`flex flex-col items-center justify-center space-y-6 transition-all duration-[3600ms] ease-out transform ${
                  zoomActive && isActive
                    ? 'scale-110 opacity-100'
                    : 'scale-90 opacity-0'
                }`}
              >
                {/* Circular Emblem Logo */}
                <div className="relative w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] shrink-0 rounded-full overflow-hidden border-4 border-marigold/50 shadow-lg bg-white">
                  <Image
                    src="/sangati-logo.jpg"
                    alt=""
                    fill
                    priority
                    sizes="170px"
                    className="object-contain p-1"
                  />
                </div>

                {/* Sangati Writing Logo Image */}
                <div className="relative w-[320px] sm:w-[480px] md:w-[600px] h-[140px] sm:h-[200px] md:h-[250px] shrink-0">
                  <Image
                    src="/sangati-text-logo.png"
                    alt="Sangati Foundation"
                    fill
                    priority
                    className="object-contain filter drop-shadow-md"
                  />
                </div>

              </div>
            </div>
          );
        }

        // Program Slides (#1..6)
        return (
          <Link
            key={slide.id}
            href={slide.ctaLink}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-label={`View ${slide.title} Programme Details`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[5000ms] ease-out ${
                isActive ? 'scale-115' : 'scale-100'
              }`}
            />
            {/* Dark Vignette Overlay for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-black/40" />
          </Link>
        );
      })}

      {/* Hero Overlay Content Container for Program Slides (#1..6) */}
      {!currentSlide.isIntro && (
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-end pb-12 sm:pb-16 items-center text-center pointer-events-none">
          <Link
            key={currentSlide.id}
            href={currentSlide.ctaLink}
            className="max-w-3xl space-y-3 animate-fade-up pointer-events-auto group/title inline-block cursor-pointer"
          >
            {/* Category Tag */}
            <span className="px-3.5 py-1.5 bg-road text-field text-xs font-mono font-bold uppercase tracking-wider rounded-full shadow-md inline-block mb-1">
              {currentSlide.category}
            </span>

            {/* Main Slide Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.15] drop-shadow-xl px-2 transition-all transform group-hover/title:scale-105 group-hover/title:text-marigold">
              {currentSlide.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-sans drop-shadow-md">
              {currentSlide.subtitle}
            </p>

            <p className="text-xs sm:text-sm font-mono font-bold text-marigold uppercase tracking-wider block pt-1 opacity-90 group-hover/title:underline">
              Click to View Details →
            </p>
          </Link>
        </div>
      )}

      {/* Bottom Horizontal Slide Indicator Dots */}
      <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2 sm:gap-2.5">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          if (slide.isIntro) {
            return (
              <button
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label="Replay Intro Animation"
                aria-current={isActive ? 'true' : 'false'}
                className={`h-3 px-2.5 rounded-full transition-all duration-300 flex items-center gap-1 text-[10px] font-bold ${
                  isActive
                    ? 'bg-road text-field shadow-md scale-105 ring-2 ring-white/50'
                    : 'bg-white/40 text-white hover:bg-white/80'
                }`}
                title="Intro Animation"
              >
                <span>Intro</span>
              </button>
            );
          }

          return (
            <button
              key={slide.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx}: ${slide.title}`}
              aria-current={isActive ? 'true' : 'false'}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-8 sm:w-10 bg-road shadow-md'
                  : 'w-2.5 bg-white/50 hover:bg-white/90'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};



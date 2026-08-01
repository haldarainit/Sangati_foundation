'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export interface HeroSlideItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  isIntro?: boolean;
  ctaLink: string;
  ctaText: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-intro',
    slug: 'intro',
    category: 'SANGATI FOUNDATION INTRO',
    title: 'Sangati Foundation',
    subtitle: 'Empowering Persons with Disability',
    image: '/sangati-logo.jpg',
    isIntro: true,
    ctaLink: '/about',
    ctaText: 'About Sangati',
  },
  {
    id: 'slide-accessibility',
    slug: 'accessibility',
    category: 'ACCESSIBILITY & DURLABH SHAUCHALAYA',
    title: 'Dignified & Wheelchair Accessible Public Spaces',
    subtitle: 'Sangati Durlabh Shauchalaya accessible toilets, railway station transformations, and public accessibility audits across India.',
    image: '/images/accessibility/accessibility-inauguration-ceremony.jpg',
    ctaLink: '/programs/accessibility',
    ctaText: 'Explore Accessibility',
  },
  {
    id: 'slide-parasports',
    slug: 'para-sports',
    category: 'PARA SPORTS & ADAPTIVE YOGA',
    title: 'Breaking Barriers Through Inclusive Sports',
    subtitle: 'Accessible Yoga at India Gate with Ministry of Ayush, Wheelchair Cricket Warriors, and Delhi Half-Marathon runners.',
    image: '/images/parasports/parasports-india-gate-yoga.jpg',
    ctaLink: '/programs/para-sports',
    ctaText: 'Explore Para Sports',
  },
  {
    id: 'slide-livelihood',
    slug: 'livelihood',
    category: 'LIVELIHOOD & SANGATI SHOPPE',
    title: 'Empowering Divyang Micro-Entrepreneurs',
    subtitle: 'संगTea custom retrofitted e-karts and mobile vendor carts unlocking financial independence and dignity for persons with disability.',
    image: '/images/livelihood/ekart-shoppe-sidecar.jpg',
    ctaLink: '/programs/livelihood',
    ctaText: 'Explore Sangati Shoppe',
  },
  {
    id: 'slide-skills',
    slug: 'skills',
    category: 'SKILL DEVELOPMENT & JOBS',
    title: 'Free Vocational Training & Job Placement',
    subtitle: 'Project Udaan: Bakery & Pastry Arts, RPL Pump Operator, Laptop Repair, Web Dev, Python, & dedicated job mentorship.',
    image: '/images/skills/skill-bakery-mandi-group.jpg',
    ctaLink: '/programs/skills',
    ctaText: 'Explore Skill Training',
  },
  {
    id: 'slide-health',
    slug: 'health',
    category: 'HEALTH & CRITICAL CARE',
    title: 'Mobile Cancer Screening & OPD Healthcare',
    subtitle: 'Asha Kiran mobile cancer detection van drives, rural OPD care in Dalhousie HP, and winter warmth relief distributions.',
    image: '/images/health/health-cancer-van-team.jpg',
    ctaLink: '/programs/health',
    ctaText: 'Explore Health Drives',
  },
  {
    id: 'slide-yatra',
    slug: 'yatra',
    category: 'SANGATI YATRA 2024-25',
    title: '6,500 KM Nationwide Accessibility Expedition',
    subtitle: 'Flagged off by Dr. Deepa Malik — travelling across India with retrofitted scooters to audit travel hubs and drive inclusion.',
    image: '/images/yatra/yatra-flagoff-deepa-malik.jpg',
    ctaLink: '/yatra',
    ctaText: 'Discover Sangati Yatra',
  },
];

export const HeroTraditionalSlider: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
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
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [currentIndex, reduceMotion]);

  const currentSlide = HERO_SLIDES[currentIndex];

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
      {HERO_SLIDES.map((slide, idx) => {
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

              {/* White Screen Zooming Sangati Logo */}
              <div
                className={`relative w-full max-w-md sm:max-w-lg md:max-w-xl h-48 sm:h-64 md:h-80 transition-all duration-[3600ms] ease-out transform ${
                  zoomActive && isActive
                    ? 'scale-110 opacity-100'
                    : 'scale-90 opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt="Sangati Foundation Logo"
                  fill
                  priority
                  className="object-contain filter drop-shadow-md"
                />
              </div>

              {/* Tagline Reveal */}
              <div
                className={`mt-6 text-center space-y-2 transition-all duration-1000 delay-300 transform ${
                  zoomActive && isActive
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-road/10 text-road text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-full shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Empowering Persons with Disability</span>
                </div>
                <p className="text-base sm:text-lg text-gray-700 font-bold max-w-lg mx-auto pt-1">
                  Empowering Persons with Disability
                </p>
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
        {HERO_SLIDES.map((slide, idx) => {
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



'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export interface HeroSlideItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  ctaLink: string;
  ctaText: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
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
    subtitle: 'Travelling across states to audit travel hubs, engage communities, and drive policy for full disability inclusion.',
    image: '/images/programs/program-mobility.jpg',
    ctaLink: '/yatra',
    ctaText: 'Discover Sangati Yatra',
  },
];

export const HeroTraditionalSlider: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
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

    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || reduceMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, reduceMotion, currentIndex]);

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Sangati Foundation Programmes Full-Bleed Hero Slider"
      className="relative w-full h-[82vh] min-h-[540px] max-h-[720px] bg-ink overflow-hidden focus:outline-none group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images Slider with Smooth Transitions */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[7000ms] ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Cinematic Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent md:w-3/4" />
          </div>
        );
      })}

      {/* Hero Overlay Content Container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-16 md:pb-20">
        <div className="max-w-2xl space-y-3 sm:space-y-4 animate-fade-up">
          {/* Eyebrow Category Pill */}
          <div className="inline-flex items-center gap-2 bg-road/90 text-field border border-road px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-field" />
            <span>{currentSlide.category}</span>
          </div>

          {/* Main Slide Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.1] drop-shadow-lg">
            {currentSlide.title}
          </h1>

          {/* Slide Subtitle Description */}
          <p className="text-sm sm:text-lg font-body text-white/90 line-clamp-3 leading-relaxed drop-shadow">
            {currentSlide.subtitle}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-4">
            <Link
              href={currentSlide.ctaLink}
              className="bg-road text-field hover:bg-clay font-display font-bold text-sm sm:text-base py-3 px-6 sm:px-8 rounded-full transition-all duration-300 flex items-center gap-2 border-2 border-road shadow-xl hover:scale-105 min-h-[48px]"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/donate"
              className="bg-clay text-field hover:bg-road font-display font-bold text-sm sm:text-base py-3 px-6 sm:px-8 rounded-full transition-all duration-300 flex items-center gap-2 border-2 border-clay shadow-xl hover:scale-105 min-h-[48px]"
            >
              <Heart className="w-5 h-5 fill-current text-white" />
              <span>Donate (80G Receipt)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Navigation Flip Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/80 text-white border border-white/30 p-3 rounded-full backdrop-blur-md transition-all shadow-xl hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/80 text-white border border-white/30 p-3 rounded-full backdrop-blur-md transition-all shadow-xl hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Horizontal Slide Indicator Dots (Just like reference image) */}
      <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2 sm:gap-2.5">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
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

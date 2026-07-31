'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
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

    if (Math.abs(diff) > 30) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  // Guaranteed 2-Second Automatic Slide Interval
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000); // Fast 2-second interval

    return () => clearInterval(timer);
  }, [reduceMotion]);

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Sangati Foundation Programmes Full-Bleed Hero Slider"
      className="relative w-full h-[75vh] min-h-[460px] max-h-[680px] bg-ink overflow-hidden focus:outline-none select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images Slider with Zoom-In Animation */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[2000ms] ease-out ${
                isActive ? 'scale-115' : 'scale-100'
              }`}
            />
            {/* Dark Vignette Overlay for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-black/40" />
          </div>
        );
      })}

      {/* Hero Overlay Content Container: Title & Donate Button with Entry Animation */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-end pb-12 sm:pb-16 items-center text-center">
        <div key={currentSlide.id} className="max-w-3xl space-y-5 animate-fade-up">
          {/* Main Slide Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.15] drop-shadow-xl px-2 transition-all transform">
            {currentSlide.title}
          </h1>

          {/* Primary Action CTA: Donate (80G Receipt) */}
          <div className="pt-2 flex justify-center">
            <Link
              href="/donate"
              className="bg-clay text-field hover:bg-road font-display font-black text-base sm:text-lg py-3.5 px-8 sm:px-10 rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 border-2 border-clay shadow-2xl hover:scale-105 min-h-[50px]"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white shrink-0" />
              <span>Donate Now (80G Receipt)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Slide Indicator Dots */}
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

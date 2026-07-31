'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { programsList } from '@/content/programs';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  ArrowRight, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  Pause, 
  Play,
  Layers,
  Award
} from 'lucide-react';

export const HeroProgramBookSlider: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const programs = programsList;
  const currentProgram = programs[currentIndex];

  const handleNext = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setCurrentIndex((prev) => (prev + 1) % programs.length);
    setTimeout(() => setIsFlipping(false), 400);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setCurrentIndex((prev) => (prev - 1 + programs.length) % programs.length);
    setTimeout(() => setIsFlipping(false), 400);
  };

  const handleSelectTab = (index: number) => {
    if (index === currentIndex || isFlipping) return;
    setIsFlipping(true);
    setCurrentIndex(index);
    setTimeout(() => setIsFlipping(false), 400);
  };

  // Keyboard accessibility navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  // Auto-play timer (slides every 6 seconds if not paused)
  useEffect(() => {
    if (!isAutoPlaying || reduceMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, reduceMotion, currentIndex]);

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Sangati Foundation Programmes Book Slider"
      className="relative w-full max-w-7xl mx-auto focus:outline-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* TOP CHAPTER BOOKMARKS / TABS NAVBAR */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-3 px-1 no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {programs.map((prog, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={prog.slug}
                onClick={() => handleSelectTab(idx)}
                aria-label={`Switch to Chapter ${idx + 1}: ${prog.title}`}
                aria-current={isActive ? 'true' : 'false'}
                className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-t-xl font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border-t-2 border-x-2 ${
                  isActive
                    ? 'bg-white text-ink border-ink shadow-md -translate-y-1 z-10'
                    : 'bg-mist/70 text-ink/70 border-ink/20 hover:bg-white hover:text-ink'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-road animate-pulse' : 'bg-ink/30'
                  }`}
                />
                <span className="hidden sm:inline text-[10px] opacity-70">CH 0{idx + 1}</span>
                <span>{prog.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Play/Pause & Counter Controls */}
        <div className="flex items-center gap-2 shrink-0 bg-white border-2 border-ink rounded-full px-3 py-1 shadow-2xs">
          <span className="font-mono text-xs font-extrabold text-ink">
            {currentIndex + 1} / {programs.length}
          </span>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? 'Pause program slider' : 'Play program slider'}
            className="p-1 hover:text-road text-ink transition-colors"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D BOOK STRUCTURE CONTAINER */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative bg-white text-ink border-4 border-ink rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 min-h-[500px] md:min-h-[520px]"
      >
        {/* Decorative Book Spine Shadow (Center Line on Desktop) */}
        <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-black/15 via-black/5 to-black/15 z-20 pointer-events-none border-x border-ink/10" />

        {/* BOOK SPREAD GRID (Left Page & Right Page) */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 min-h-[500px] md:min-h-[520px] transition-opacity duration-300 ${
            isFlipping ? 'opacity-40 scale-[0.995]' : 'opacity-100 scale-100'
          }`}
        >
          {/* LEFT PAGE: PROGRAMME BOOK COVER / IMAGE DISPLAY */}
          <div className="lg:col-span-6 relative bg-ink text-field p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b-4 lg:border-b-0 lg:border-r-2 border-ink group">
            {/* Background Program Image with Zoom Effect */}
            <div className="absolute inset-0 z-0">
              <Image
                src={currentProgram.image}
                alt={currentProgram.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            </div>

            {/* Top Bookmark Ribbon */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="bg-road text-field border border-field/30 px-3 py-1 rounded-full font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chapter 0{currentIndex + 1}</span>
              </div>

              {currentProgram.partners && (
                <div className="bg-ink/80 backdrop-blur-md text-field/90 border border-field/20 px-3 py-1 rounded-full font-mono text-[11px] font-semibold">
                  Partner: {currentProgram.partners[0]}
                </div>
              )}
            </div>

            {/* Bottom Program Overlay Title on Left Page */}
            <div className="relative z-10 space-y-3 mt-32 lg:mt-44">
              <span className="font-mono text-xs font-bold text-clay uppercase tracking-widest bg-field/90 text-ink px-3 py-0.5 rounded-md inline-block shadow-2xs">
                PROGRAMME BRIEF 0{currentIndex + 1}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-field leading-tight drop-shadow-md">
                {currentProgram.title}
              </h3>
              <p className="text-xs sm:text-sm font-body text-field/80 line-clamp-2 leading-relaxed">
                {currentProgram.summary}
              </p>
            </div>
          </div>

          {/* RIGHT PAGE: PROGRAMME DETAILS, HIGHLIGHTS & ACTION CTAS */}
          <div className="lg:col-span-6 bg-field p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 relative z-10">
            {/* Top Right Header & Badges */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-ink/10 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-road" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-road">
                    Sangati Core Initiative
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-ink/60">
                  Page {currentIndex + 1} of {programs.length}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display text-ink leading-snug">
                {currentProgram.title}
              </h2>

              <p className="text-sm sm:text-base font-body text-ink/90 leading-relaxed">
                {currentProgram.summary}
              </p>

              {/* Highlights Bullet List */}
              {currentProgram.highlights && currentProgram.highlights.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 block">
                    Key Impact Highlights:
                  </span>
                  <ul className="space-y-2">
                    {currentProgram.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-body text-ink">
                        <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Stats Chips */}
            {currentProgram.keyStats && (
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProgram.keyStats.map((stat, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] font-bold bg-mist border border-road/20 text-ink px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-road" />
                    <span>{stat}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Action CTAs */}
            <div className="pt-4 border-t-2 border-ink/10 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/programs/${currentProgram.slug}`}
                className="bg-road text-field hover:bg-ink hover:text-field font-display font-bold text-xs sm:text-sm py-3 px-5 rounded-full transition-all duration-300 flex items-center gap-2 border-2 border-ink shadow-sm hover:shadow-md min-h-[44px]"
              >
                <span>Read Full Programme Brief</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/donate"
                className="bg-clay text-field hover:bg-road font-display font-bold text-xs sm:text-sm py-3 px-5 rounded-full transition-all duration-300 flex items-center gap-2 border-2 border-ink shadow-sm hover:shadow-md min-h-[44px]"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>Support This Initiative</span>
              </Link>
            </div>
          </div>
        </div>

        {/* FLOATING BOOK NAVIGATION FLIP ARROWS */}
        <button
          onClick={handlePrev}
          aria-label="Flip to Previous Program Page"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-ink border-2 border-ink p-2.5 rounded-full shadow-xl transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Flip to Next Program Page"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-ink border-2 border-ink p-2.5 rounded-full shadow-xl transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

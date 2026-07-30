'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export interface CarouselSlide {
  id: string;
  src: string;
  title: string;
  caption?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  ariaLabel?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  ariaLabel = 'Sangati Photo Gallery Carousel',
}) => {
  const { reduceMotion } = useAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Never autoplay by default
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Autoplay timer ONLY if explicitly played and reduced motion is false
  useEffect(() => {
    if (!isPlaying || reduceMotion) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, reduceMotion, currentIndex]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div
      ref={carouselRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
      className="relative w-full bg-field border-2 border-ink p-4 space-y-4 focus-visible:outline-road"
    >
      {/* Top Header Controls Bar */}
      <div className="flex flex-wrap justify-between items-center gap-3 border-b-2 border-ink pb-3">
        <div className="font-mono text-xs font-bold uppercase text-road">
          Image {currentIndex + 1} of {slides.length}: <span className="text-ink">{currentSlide.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={reduceMotion}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="flex items-center gap-1 text-xs font-mono font-bold bg-mist border-2 border-ink px-3 py-1.5 min-h-[44px] hover:bg-marigold hover:text-ink focus-visible:outline-marigold"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Prev / Next Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="bg-mist border-2 border-ink p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-marigold focus-visible:outline-marigold"
          >
            <ChevronLeft className="w-5 h-5 text-ink" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="bg-mist border-2 border-ink p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-marigold focus-visible:outline-marigold"
          >
            <ChevronRight className="w-5 h-5 text-ink" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Slide Image Display */}
      <div className="relative aspect-[16/9] w-full bg-ink border-2 border-ink overflow-hidden group">
        <Image
          src={currentSlide.src}
          alt={currentSlide.title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        {currentSlide.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-ink/90 text-field p-4 border-t-2 border-marigold">
            <p className="text-sm md:text-base font-body font-semibold">
              {currentSlide.caption}
            </p>
          </div>
        )}
      </div>

      {/* Slide Thumbnails & Dots Indicator */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            aria-current={currentIndex === idx ? 'true' : 'false'}
            className={`min-h-[44px] min-w-[44px] p-1 border-2 transition-all ${
              currentIndex === idx
                ? 'border-road bg-marigold text-ink scale-105'
                : 'border-ink/40 bg-mist hover:border-ink'
            }`}
          >
            <span className="font-mono text-xs font-bold">{idx + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};


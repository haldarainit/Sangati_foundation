'use client';

import React, { useEffect, useState, useRef } from 'react';
import { StatItem } from '@/content/types';
import { useAccessibility } from '../context/AccessibilityContext';

interface StatCounterProps {
  stats: StatItem[];
}

export const StatCounter: React.FC<StatCounterProps> = ({ stats }) => {
  const { reduceMotion } = useAccessibility();
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If reduced motion is set, display final numbers immediately
    if (reduceMotion) {
      const finalCounts: { [key: string]: number } = {};
      stats.forEach((s) => {
        finalCounts[s.id] = s.numberValue;
      });
      setCounts(finalCounts);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500; // 1.5 seconds animation
          const steps = 40;
          const intervalTime = duration / steps;

          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const newCounts: { [key: string]: number } = {};

            stats.forEach((stat) => {
              newCounts[stat.id] = Math.round(stat.numberValue * progress);
            });

            setCounts(newCounts);

            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, intervalTime);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [stats, reduceMotion, hasAnimated]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-mist border-y-2 border-ink py-12 px-4"
      aria-label="Sangati Foundation Impact Statistics"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const displayedValue = hasAnimated
            ? `${counts[stat.id] || stat.numberValue}${stat.unit}`
            : `0${stat.unit}`;

          return (
            <div
              key={stat.id}
              className="bg-field border-2 border-ink p-6 rounded-none space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-road block">
                  {stat.label}
                </span>
                <div
                  className="font-display font-black text-4xl md:text-5xl text-marigold tracking-tight my-2"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {displayedValue}
                </div>
              </div>
              <p className="text-sm text-ink/80 font-body leading-snug border-t border-ink/10 pt-3">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { StatItem } from '@/content/types';
import { useAccessibility } from '../context/AccessibilityContext';
import { ShieldCheck, Heart, MapPin, Activity, ArrowRight, Award } from 'lucide-react';

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

  // Icon mapping for each stat item
  const getStatIcon = (id: string) => {
    switch (id) {
      case 'yatra-distance':
        return <MapPin className="w-5 h-5 text-road" aria-hidden="true" />;
      case 'covid-fed':
        return <Heart className="w-5 h-5 text-clay" aria-hidden="true" />;
      case 'cancer-camp':
        return <ShieldCheck className="w-5 h-5 text-road" aria-hidden="true" />;
      case 'opd-daily':
        return <Activity className="w-5 h-5 text-road" aria-hidden="true" />;
      default:
        return <Award className="w-5 h-5 text-marigold" aria-hidden="true" />;
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-gradient-to-b from-mist/50 via-field to-mist/30 border-y border-road/15 py-8 md:py-12 px-4 relative overflow-hidden"
      aria-label="Sangati Foundation Authenticity & Impact Statistics"
    >
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Authentic NGO Trust & Mission Header */}
        <div className="bg-white/95 backdrop-blur-md border border-road/20 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="font-mono text-[10px] md:text-xs font-black bg-road text-field px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-marigold" /> Govt Registered NGO (Est. 2019)
              </span>
              <span className="font-mono text-[10px] md:text-xs font-bold bg-marigold/20 text-ink border border-marigold/40 px-2.5 py-0.5 rounded-full uppercase">
                80G Tax Exemption Receipt Eligible
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-display text-ink pt-1">
              Real Impact • Transparent Governance • Dignity for All
            </h2>
            <p className="text-xs md:text-sm font-body text-ink/80 max-w-3xl">
              Sangati Foundation is a 100% verified charitable trust dedicated to accessibility, mobility, health, and skill empowerment for persons with disability across India.
            </p>
          </div>

          <Link
            href="/donate"
            className="shrink-0 bg-clay hover:bg-road text-field font-display font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 border border-clay"
          >
            <Heart className="w-4 h-4 fill-current text-marigold" aria-hidden="true" />
            <span>Donate (80G Receipt)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Impact Stats Grid - Compact 2x2 on Mobile for zero scroll bloat */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat) => {
            const displayedValue = hasAnimated
              ? `${counts[stat.id] || stat.numberValue}${stat.unit}`
              : `0${stat.unit}`;

            return (
              <div
                key={stat.id}
                className="bg-white/95 backdrop-blur-md border border-road/20 p-3.5 sm:p-5 rounded-2xl shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-road line-clamp-1">
                      {stat.label}
                    </span>
                    <div className="p-1.5 bg-mist/60 rounded-lg group-hover:scale-110 transition-transform">
                      {getStatIcon(stat.id)}
                    </div>
                  </div>

                  <div
                    className="font-display font-black text-2xl sm:text-4xl text-ink group-hover:text-road tracking-tight my-1 transition-colors duration-300"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {displayedValue}
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-ink/80 font-body leading-snug border-t border-road/10 pt-2 mt-1">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


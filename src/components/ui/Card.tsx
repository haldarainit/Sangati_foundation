'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  bgColor?: 'field' | 'mist' | 'road' | 'ink';
  as?: 'div' | 'article' | 'section';
  // Rich-card optional props (used in programme cards, news cards, etc.)
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  href?: string;
  ctaText?: string;
  badgeText?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  bgColor = 'field',
  as: Component = 'div',
  title,
  subtitle,
  imageSrc,
  href,
  ctaText,
  badgeText,
}) => {
  const bgClasses = {
    field: 'bg-white text-ink',
    mist: 'bg-mist text-ink',
    road: 'bg-road text-field',
    ink: 'bg-ink text-field',
  };

  // If rich-card props are provided, render a feature-rich card layout
  if (title || imageSrc) {
    const cardContent = (
      <div className={`group flex flex-col border border-road/20 rounded-3xl overflow-hidden bg-white text-ink shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}>
        {imageSrc && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={imageSrc}
              alt={title ?? ''}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {badgeText && (
              <span className="absolute top-3 left-3 bg-ink/80 text-field text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {badgeText}
              </span>
            )}
          </div>
        )}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {subtitle && (
            <span className="text-xs font-mono uppercase tracking-widest text-ink/50">{subtitle}</span>
          )}
          {title && (
            <h3 className="text-lg font-bold font-display text-ink leading-snug">{title}</h3>
          )}
          {children && <div className="flex-1">{children}</div>}
          {ctaText && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-road group-hover:gap-2 transition-all mt-auto">
              {ctaText}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-road rounded-3xl">
          {cardContent}
        </Link>
      );
    }
    return cardContent;
  }

  // Simple wrapper card (backward compatible)
  return (
    <Component
      className={`border border-road/20 rounded-3xl p-4 sm:p-6 ${bgClasses[bgColor]} ${className}`}
    >
      {children}
    </Component>
  );
};

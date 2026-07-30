'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Heart } from 'lucide-react';
import { organizationInfo } from '@/content/organization';

export const MobileQuickActions: React.FC = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-ink/95 backdrop-blur-md border-t border-marigold/40 p-2.5 px-4 shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Helpline Quick Call */}
        <a
          href={`tel:${organizationInfo.helpline.replace(/\s+/g, '')}`}
          className="flex-1 bg-road hover:bg-ink text-field font-mono font-bold text-xs py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 border border-road/30 shadow-md min-h-[44px]"
          aria-label="Call Helpline: 1800 102 1622"
        >
          <Phone className="w-3.5 h-3.5 text-marigold shrink-0" />
          <span>Helpline 1800-102-1622</span>
        </a>

        {/* 80G Donate Quick CTA */}
        <Link
          href="/donate"
          className="flex-1 bg-clay hover:bg-road text-field font-display font-bold text-xs py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 border border-clay/40 shadow-md min-h-[44px]"
        >
          <Heart className="w-3.5 h-3.5 fill-current text-marigold shrink-0" />
          <span>Donate (80G)</span>
        </Link>
      </div>
    </div>
  );
};


'use client';

import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-road focus:text-white focus:font-bold focus:border-2 focus:border-marigold focus:shadow-xl focus:rounded-none"
    >
      Skip to main content
    </a>
  );
};


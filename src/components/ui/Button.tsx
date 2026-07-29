'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'road' | 'clay' | 'marigold' | 'outline';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'road',
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  disabled = false,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] min-w-[44px] rounded-full border-2 border-ink font-display font-bold text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    road: 'bg-road text-field hover:bg-marigold hover:text-ink',
    clay: 'bg-clay text-field hover:bg-marigold hover:text-ink',
    marigold: 'bg-marigold text-ink hover:bg-road hover:text-field',
    outline: 'bg-field text-ink hover:bg-mist',
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

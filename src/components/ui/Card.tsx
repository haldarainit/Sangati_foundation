'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: 'field' | 'mist' | 'road' | 'ink';
  as?: 'div' | 'article' | 'section';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  bgColor = 'field',
  as: Component = 'div',
}) => {
  const bgClasses = {
    field: 'bg-field text-ink',
    mist: 'bg-mist text-ink',
    road: 'bg-road text-field',
    ink: 'bg-ink text-field',
  };

  return (
    <Component
      className={`border-2 border-ink rounded-none p-6 ${bgClasses[bgColor]} ${className}`}
    >
      {children}
    </Component>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade';
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.15,
  once = true,
}) => {
  const { reduceMotion } = useAccessibility();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, reduceMotion]);

  // Initial hidden transform styles based on variant
  const getVariantStyles = () => {
    if (isVisible || reduceMotion) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (variant) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 36px, 0)',
        };
      case 'fade-down':
        return {
          opacity: 0,
          transform: 'translate3d(0, -36px, 0)',
        };
      case 'fade-left':
        return {
          opacity: 0,
          transform: 'translate3d(36px, 0, 0)',
        };
      case 'fade-right':
        return {
          opacity: 0,
          transform: 'translate3d(-36px, 0, 0)',
        };
      case 'zoom-in':
        return {
          opacity: 0,
          transform: 'scale(0.92)',
        };
      case 'fade':
      default:
        return {
          opacity: 0,
          transform: 'translate3d(0, 0, 0)',
        };
    }
  };

  const style: React.CSSProperties = {
    ...getVariantStyles(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};


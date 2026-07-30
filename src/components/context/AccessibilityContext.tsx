'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type TextSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (active: boolean) => void;
  toggleHighContrast: () => void;
  reduceMotion: boolean;
  setReduceMotion: (active: boolean) => void;
  toggleReduceMotion: () => void;
  resetAll: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>('normal');
  const [highContrast, setHighContrastState] = useState<boolean>(false);
  const [reduceMotion, setReduceMotionState] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedSize = localStorage.getItem('sangati_text_size') as TextSize;
    if (savedSize && ['normal', 'large', 'xlarge'].includes(savedSize)) {
      setTextSizeState(savedSize);
    }

    const savedContrast = localStorage.getItem('sangati_high_contrast');
    if (savedContrast !== null) {
      setHighContrastState(savedContrast === 'true');
    }

    const savedMotion = localStorage.getItem('sangati_reduce_motion');
    if (savedMotion !== null) {
      setReduceMotionState(savedMotion === 'true');
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;

    root.setAttribute('data-text-size', textSize);
    localStorage.setItem('sangati_text_size', textSize);

    root.setAttribute('data-high-contrast', String(highContrast));
    localStorage.setItem('sangati_high_contrast', String(highContrast));

    root.setAttribute('data-reduce-motion', String(reduceMotion));
    localStorage.setItem('sangati_reduce_motion', String(reduceMotion));
  }, [textSize, highContrast, reduceMotion, isMounted]);

  const setTextSize = (size: TextSize) => setTextSizeState(size);
  const setHighContrast = (active: boolean) => setHighContrastState(active);
  const toggleHighContrast = () => setHighContrastState((prev) => !prev);
  const setReduceMotion = (active: boolean) => setReduceMotionState(active);
  const toggleReduceMotion = () => setReduceMotionState((prev) => !prev);

  const resetAll = () => {
    setTextSizeState('normal');
    setHighContrastState(false);
    setReduceMotionState(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        reduceMotion,
        setReduceMotion,
        toggleReduceMotion,
        resetAll,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};


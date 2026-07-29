'use client';

import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Eye, Type, RotateCcw, ChevronUp, ChevronDown, Check, Zap } from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const {
    textSize,
    setTextSize,
    highContrast,
    toggleHighContrast,
    reduceMotion,
    toggleReduceMotion,
    resetAll,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed bottom-4 left-4 z-50 font-sans"
      aria-label="Accessibility Options Widget"
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-expanded={false}
          aria-controls="accessibility-panel"
          className="flex items-center gap-1.5 sm:gap-2 bg-road text-field border-2 border-ink px-3 py-2 sm:px-4 sm:py-3 min-h-[44px] min-w-[44px] shadow-lg hover:bg-marigold hover:text-ink font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold"
        >
          <span className="text-lg sm:text-xl font-mono font-black" aria-hidden="true">
            A⚡
          </span>
          <span className="text-xs sm:text-sm font-semibold">Accessibility</span>
          <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" aria-hidden="true" />
        </button>
      ) : (
        <div
          id="accessibility-panel"
          className="bg-field text-ink border-2 border-ink p-4 w-72 md:w-80 shadow-2xl space-y-4"
          role="region"
          aria-label="Accessibility Tools"
        >
          <div className="flex items-center justify-between border-b-2 border-ink pb-2">
            <h2 className="text-base font-bold font-mono uppercase tracking-wider flex items-center gap-2">
              <span aria-hidden="true">♿</span> Accessibility Controls
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Accessibility Controls Panel"
              className="text-sm font-bold border-2 border-ink px-2 py-1 hover:bg-mist min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              ✕ <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Text Size Control */}
          <div className="space-y-2">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-ink/80">
              Text Size (A / A+ / A++)
            </span>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Text Size Selection">
              <button
                onClick={() => setTextSize('normal')}
                aria-pressed={textSize === 'normal'}
                className={`py-2 px-3 min-h-[44px] font-bold border-2 border-ink text-sm flex items-center justify-center gap-1 ${
                  textSize === 'normal'
                    ? 'bg-road text-field'
                    : 'bg-mist hover:bg-marigold hover:text-ink'
                }`}
              >
                A 100%
              </button>

              <button
                onClick={() => setTextSize('large')}
                aria-pressed={textSize === 'large'}
                className={`py-2 px-3 min-h-[44px] font-bold border-2 border-ink text-base flex items-center justify-center gap-1 ${
                  textSize === 'large'
                    ? 'bg-road text-field'
                    : 'bg-mist hover:bg-marigold hover:text-ink'
                }`}
              >
                A+ 115%
              </button>

              <button
                onClick={() => setTextSize('xlarge')}
                aria-pressed={textSize === 'xlarge'}
                className={`py-2 px-3 min-h-[44px] font-bold border-2 border-ink text-lg flex items-center justify-center gap-1 ${
                  textSize === 'xlarge'
                    ? 'bg-road text-field'
                    : 'bg-mist hover:bg-marigold hover:text-ink'
                }`}
              >
                A++ 130%
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="pt-2 border-t border-ink/20">
            <button
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
              className={`w-full py-3 px-4 min-h-[44px] font-bold border-2 border-ink text-sm flex items-center justify-between transition-colors ${
                highContrast
                  ? 'bg-marigold text-ink font-black'
                  : 'bg-mist text-ink hover:bg-road hover:text-field'
              }`}
            >
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" aria-hidden="true" />
                High Contrast Mode
              </span>
              <span className="font-mono text-xs uppercase px-2 py-0.5 bg-ink text-field border border-ink">
                {highContrast ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Reduce Motion Toggle */}
          <div>
            <button
              onClick={toggleReduceMotion}
              aria-pressed={reduceMotion}
              className={`w-full py-3 px-4 min-h-[44px] font-bold border-2 border-ink text-sm flex items-center justify-between transition-colors ${
                reduceMotion
                  ? 'bg-marigold text-ink font-black'
                  : 'bg-mist text-ink hover:bg-road hover:text-field'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs border border-ink px-1 font-bold">||</span>
                Disable Animations
              </span>
              <span className="font-mono text-xs uppercase px-2 py-0.5 bg-ink text-field border border-ink">
                {reduceMotion ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Reset All */}
          <div className="pt-2 border-t border-ink/20 flex justify-between items-center">
            <button
              onClick={resetAll}
              className="text-xs font-mono font-bold text-ink/80 hover:text-clay underline min-h-[44px] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" /> Reset Defaults
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold bg-road text-field border-2 border-ink px-3 py-1.5 min-h-[44px] hover:bg-marigold hover:text-ink"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

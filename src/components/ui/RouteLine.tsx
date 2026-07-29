'use client';

import React from 'react';
import { YatraStop } from '@/content/types';

interface RouteLineProps {
  stops?: YatraStop[];
  className?: string;
  interactive?: boolean;
  onStopClick?: (stop: YatraStop) => void;
  selectedStopId?: string;
}

export const RouteLine: React.FC<RouteLineProps> = ({
  stops,
  className = '',
  interactive = false,
  onStopClick,
  selectedStopId,
}) => {
  // Simple divider motif if no stops provided
  if (!stops || stops.length === 0) {
    return (
      <div className={`w-full py-6 flex items-center justify-center ${className}`} aria-hidden="true">
        <div className="w-full relative flex items-center">
          <div className="w-full border-t-2 border-marigold"></div>
          <div className="absolute left-0 w-3 h-3 bg-marigold border-2 border-ink rounded-full"></div>
          <div className="absolute left-1/3 w-3 h-3 bg-marigold border-2 border-ink rounded-full"></div>
          <div className="absolute left-2/3 w-3 h-3 bg-marigold border-2 border-ink rounded-full"></div>
          <div className="absolute right-0 w-3 h-3 bg-marigold border-2 border-ink rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full py-8 overflow-x-auto ${className}`} aria-label="Sangati Yatra 6,000 km Interactive Route Map">
      <div className="min-w-[700px] relative px-6 py-10">
        {/* Connecting Marigold Line */}
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-marigold -translate-y-1/2 z-0 border-t border-b border-ink/40"></div>

        {/* Station Dots Row */}
        <div className="relative z-10 flex justify-between items-center">
          {stops.map((stop, index) => {
            const isSelected = selectedStopId === stop.id;
            return (
              <div key={stop.id} className="flex flex-col items-center group relative">
                {/* Station Dot Button */}
                <button
                  type="button"
                  onClick={() => interactive && onStopClick && onStopClick(stop)}
                  disabled={!interactive}
                  aria-label={`${stop.name}, ${stop.state} - ${stop.date}. ${stop.distanceKm} kilometers mark.`}
                  aria-pressed={isSelected}
                  className={`w-6 h-6 rounded-full border-2 border-ink transition-transform flex items-center justify-center ${
                    stop.isKeyStop ? 'bg-marigold w-8 h-8' : 'bg-field hover:bg-marigold'
                  } ${isSelected ? 'ring-4 ring-road bg-road text-field' : ''} ${
                    interactive ? 'cursor-pointer hover:scale-125 focus-visible:outline-marigold' : 'cursor-default'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-ink"></span>
                </button>

                {/* Date & Distance Label */}
                <div className="mt-3 text-center space-y-0.5">
                  <span className="block font-mono text-[11px] font-bold text-road bg-mist border border-ink px-1.5 py-0.5 rounded-none">
                    {stop.distanceKm} km
                  </span>
                  <span className="block font-display font-bold text-xs text-ink max-w-[90px] leading-tight">
                    {stop.name}
                  </span>
                  <span className="block font-mono text-[10px] text-ink/70">
                    {stop.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

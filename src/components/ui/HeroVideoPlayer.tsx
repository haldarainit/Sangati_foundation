'use client';

import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Maximize } from 'lucide-react';

interface HeroVideoPlayerProps {
  src?: string;
  variant?: 'card' | 'hero';
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  src = '/hero-video.mp4',
  variant = 'hero',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const isHero = variant === 'hero';

  return (
    <div
      className={`relative w-full overflow-hidden bg-black shadow-2xl group ${
        isHero
          ? 'rounded-b-3xl sm:rounded-3xl border-b-4 border-marigold'
          : 'rounded-3xl border border-road/20'
      }`}
    >
      {/* HTML5 Video Element - Clean, Pure & Engaging Video Display */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className={`w-full object-cover cursor-pointer ${
          isHero
            ? 'h-[280px] sm:h-[420px] md:h-[520px]'
            : 'h-auto min-h-[220px] max-h-[560px]'
        }`}
        onClick={toggleMute}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Audio & Video Controls (No Text Clutter) */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/20 transition-all shadow-lg cursor-pointer"
          aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Mute/Unmute Audio Button with Animated Pulse Indicator */}
        <button
          onClick={toggleMute}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg cursor-pointer border flex items-center gap-1.5 ${
            isMuted
              ? 'bg-clay/90 hover:bg-clay text-field border-marigold/50 animate-pulse'
              : 'bg-road/90 hover:bg-road text-field border-white/20'
          }`}
          aria-label={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-marigold" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="hidden sm:flex p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/20 transition-all shadow-lg cursor-pointer"
          aria-label="Expand Fullscreen"
          title="Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export const BackgroundAudioPlayer: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65); // Louder inspiring 65% volume
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMutedRef = useRef(false);
  const volumeRef = useRef(0.65);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Motivational Triumphant Harmony Synthesizer (Zero external file dependencies, 100% reliable)
  const playMotivationalChord = (ctx: AudioContext, frequencies: number[], duration = 2.8) => {
    if (isMutedRef.current || !isPlayingRef.current) return;

    const masterGain = ctx.createGain();
    // Louder Master Gain: 0.55 * volumeRef
    masterGain.gain.setValueAtTime(volumeRef.current * 0.55, ctx.currentTime);
    masterGain.connect(ctx.destination);

    frequencies.forEach((freq, idx) => {
      // Warm Sine oscillator for rich core tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Bright Harmonic Triangle oscillator for motivational resonance
      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();
      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);

      // Dynamic attack & decay envelope for an uplifting rhythmic pulse
      const attackTime = 0.05 + idx * 0.03;

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      gainHarmonic.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + attackTime);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 0.7);

      osc.connect(gain);
      oscHarmonic.connect(gainHarmonic);
      gain.connect(masterGain);
      gainHarmonic.connect(masterGain);

      // Arpeggiated note entrance for uplifting rhythm
      const noteDelay = idx * 0.08;
      osc.start(ctx.currentTime + noteDelay);
      oscHarmonic.start(ctx.currentTime + noteDelay);

      osc.stop(ctx.currentTime + duration + 0.3);
      oscHarmonic.stop(ctx.currentTime + duration + 0.3);
    });
  };

  const startMotivationalSequence = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    // Uplifting & Motivational Progression: Cadd9 -> G/B -> Am7 -> Fadd9 (Bright, inspiring tempo)
    const motivationalChords = [
      [261.63, 329.63, 392.0, 587.33, 659.25], // Cadd9 (C4, E4, G4, D5, E5)
      [246.94, 293.66, 392.0, 493.88, 587.33], // G/B (B3, D4, G4, B4, D5)
      [220.0, 261.63, 329.63, 392.0, 523.25],  // Am7 (A3, C4, E4, G4, C5)
      [174.61, 261.63, 329.63, 392.0, 440.0],  // Fadd9 (F3, C4, E4, G4, A4)
    ];

    let chordIdx = 0;

    const playLoop = () => {
      if (!isPlayingRef.current) return;
      playMotivationalChord(ctx, motivationalChords[chordIdx], 2.6);
      chordIdx = (chordIdx + 1) % motivationalChords.length;
      timerRef.current = setTimeout(playLoop, 2500); // Energetic 2.5s loop pulse
    };

    playLoop();
  };

  const stopMotivationalSequence = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMotivationalSequence();
    } else {
      startMotivationalSequence();
      setHasInteracted(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Auto-start sound on first click/interaction anywhere on page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && !isPlayingRef.current) {
        setHasInteracted(true);
        startMotivationalSequence();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating Interactive Music Widget */}
      <div className="glass-card bg-ink/95 text-field border-2 border-marigold p-2.5 sm:p-3 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-105 group">
        {/* Animated Sound Wave Bars when Playing */}
        {isPlaying && !isMuted ? (
          <div className="flex items-end gap-1 h-5 px-1" aria-hidden="true">
            <span className="w-1 bg-marigold h-full animate-bounce rounded-full" />
            <span className="w-1 bg-road h-3/4 animate-pulse rounded-full" />
            <span className="w-1 bg-clay h-full animate-bounce rounded-full" />
          </div>
        ) : (
          <div className="p-1 text-marigold">
            <Music className="w-4 h-4" />
          </div>
        )}

        <div className="hidden md:flex flex-col text-left pr-1">
          <span className="text-[10px] font-mono font-bold text-marigold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-marigold" /> Motivational Music
          </span>
          <span className="text-[11px] font-mono text-field/90 font-bold">
            {isPlaying ? (isMuted ? 'Muted' : 'Inspiring Theme Playing (65% Volume)') : 'Click to Play'}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2.5 bg-marigold hover:bg-clay text-ink hover:text-field font-bold rounded-full transition-all shadow-md cursor-pointer border border-ink"
          aria-label={isPlaying ? 'Pause motivational background music' : 'Play motivational background music'}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Mute/Unmute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-2.5 bg-road hover:bg-ink text-field rounded-full transition-all shadow-md cursor-pointer border border-field/30"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-marigold" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

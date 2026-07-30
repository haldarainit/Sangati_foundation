'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export const BackgroundAudioPlayer: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.25); // Soft encouraging 25% background volume
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMutedRef = useRef(false);
  const volumeRef = useRef(0.25);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Soft piano chord synthesizer using Web Audio API (Zero external file dependencies, 100% reliable)
  const playSoftPianoChord = (ctx: AudioContext, frequencies: number[], duration = 3.5) => {
    if (isMutedRef.current || !isPlayingRef.current) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volumeRef.current * 0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    frequencies.forEach((freq, idx) => {
      // Primary soft sine wave
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Warm harmonic (sine)
      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();
      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      // Soft piano envelope (gentle attack, long decay)
      const attackTime = 0.08 + idx * 0.02;
      const releaseTime = duration * 0.8;

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      gainHarmonic.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + attackTime);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 0.6);

      osc.connect(gain);
      oscHarmonic.connect(gainHarmonic);
      gain.connect(masterGain);
      gainHarmonic.connect(masterGain);

      osc.start(ctx.currentTime + idx * 0.04);
      oscHarmonic.start(ctx.currentTime + idx * 0.04);

      osc.stop(ctx.currentTime + duration + 0.5);
      oscHarmonic.stop(ctx.currentTime + duration + 0.5);
    });
  };

  const startPianoSequence = () => {
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

    // Encouraging Soft Piano Progression: Cmaj9 -> Am7 -> Fmaj7 -> G6
    const pianoChords = [
      [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9 (C4, E4, G4, B4, D5)
      [220.0, 261.63, 329.63, 392.0, 523.25],  // Am7 (A3, C4, E4, G4, C5)
      [174.61, 261.63, 329.63, 349.23, 440.0], // Fmaj7 (F3, C4, E4, F4, A4)
      [196.0, 246.94, 293.66, 392.0, 493.88],  // G6 (G3, B3, D4, G4, B4)
    ];

    let chordIdx = 0;

    const playLoop = () => {
      if (!isPlayingRef.current) return;
      playSoftPianoChord(ctx, pianoChords[chordIdx], 3.8);
      chordIdx = (chordIdx + 1) % pianoChords.length;
      timerRef.current = setTimeout(playLoop, 3600);
    };

    playLoop();
  };

  const stopPianoSequence = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPianoSequence();
    } else {
      startPianoSequence();
      setHasInteracted(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Attempt auto-start on first user interaction anywhere on the website
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && !isPlayingRef.current) {
        setHasInteracted(true);
        startPianoSequence();
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
      <div className="glass-card bg-ink/90 text-field border border-marigold/40 p-2.5 sm:p-3 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-105 group">
        {/* Animated Sound Wave Bars when Playing */}
        {isPlaying && !isMuted ? (
          <div className="flex items-end gap-0.5 h-4 px-1" aria-hidden="true">
            <span className="w-1 bg-marigold h-full animate-bounce rounded-full" />
            <span className="w-1 bg-road h-3/4 animate-pulse rounded-full" />
            <span className="w-1 bg-marigold h-full animate-bounce rounded-full" />
          </div>
        ) : (
          <div className="p-1 text-marigold">
            <Music className="w-4 h-4" />
          </div>
        )}

        <div className="hidden md:flex flex-col text-left pr-1">
          <span className="text-[10px] font-mono font-bold text-marigold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-marigold" /> Soft Piano Music
          </span>
          <span className="text-[11px] font-mono text-field/80 font-medium">
            {isPlaying ? (isMuted ? 'Muted' : 'Encouraging Background Piano') : 'Click to Play'}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2 bg-marigold hover:bg-clay text-field rounded-full transition-all shadow-md cursor-pointer border border-ink"
          aria-label={isPlaying ? 'Pause background piano music' : 'Play encouraging background piano music'}
          title={isPlaying ? 'Pause Piano Music' : 'Play Piano Music'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Mute/Unmute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-2 bg-road hover:bg-ink text-field rounded-full transition-all shadow-md cursor-pointer border border-field/30"
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


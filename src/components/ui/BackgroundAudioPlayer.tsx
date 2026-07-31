'use client';

import React, { useEffect, useRef, useState } from 'react';

export const BackgroundAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const volumeRef = useRef(0.65); // Louder inspiring 65% volume

  // Motivational Triumphant Harmony Synthesizer (Zero external file dependencies, 100% reliable)
  const playMotivationalChord = (ctx: AudioContext, frequencies: number[], duration = 2.8) => {
    if (!isPlayingRef.current) return;

    const masterGain = ctx.createGain();
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

  // Auto-start sound on first click/touch/interaction anywhere on page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && !isPlayingRef.current) {
        setHasInteracted(true);
        startMotivationalSequence();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Completely hidden visually on screen while audio plays seamlessly in background
  return <div className="hidden pointer-events-none" aria-hidden="true" />;
};

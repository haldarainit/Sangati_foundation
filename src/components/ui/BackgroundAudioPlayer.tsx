'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AUDIO_SRC = '/audio/sangati-theme.mp3';
const STORAGE_KEY = 'sangati_audio_muted';

/**
 * Background theme music for the homepage.
 *
 * Notes on the choices here:
 *  - There is a visible, keyboard-reachable play/pause button. WCAG 2.2 SC 1.4.2
 *    requires a way to stop audio that runs for more than three seconds, and
 *    this site is built for persons with disability. The previous version had
 *    no control at all.
 *  - Playback only begins after the visitor interacts with the page, because
 *    browsers block autoplay with sound and it is rude besides.
 *  - The choice is remembered, so someone who turns it off does not have to do
 *    it again on every visit.
 *  - The file is not downloaded until it is actually needed, which keeps the
 *    homepage light on mobile data.
 */
export const BackgroundAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Restore the visitor's previous choice before doing anything noisy.
  const mutedByChoice = useRef(true);

  useEffect(() => {
    mutedByChoice.current = localStorage.getItem(STORAGE_KEY) !== 'false';
    setReady(true);
  }, []);

  // Start on the first interaction, unless they previously turned it off.
  useEffect(() => {
    if (!ready || mutedByChoice.current) return;

    const start = () => {
      void audioRef.current?.play().then(
        () => setIsPlaying(true),
        () => {
          /* Browser refused; the button still works. */
        }
      );
    };

    window.addEventListener('click', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    window.addEventListener('touchstart', start, { once: true });

    return () => {
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
      window.removeEventListener('touchstart', start);
    };
  }, [ready]);

  // Pause when the tab is hidden — nobody wants audio from a tab they left.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(
        () => {
          setIsPlaying(true);
          mutedByChoice.current = false;
          localStorage.setItem(STORAGE_KEY, 'false');
        },
        () => setIsPlaying(false)
      );
    } else {
      audio.pause();
      setIsPlaying(false);
      mutedByChoice.current = true;
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Turn background music off' : 'Turn background music on'}
        title={isPlaying ? 'Turn background music off' : 'Turn background music on'}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 inline-flex items-center gap-2 pl-3 pr-4 py-2.5 min-h-[44px] bg-field text-ink border-2 border-ink rounded-full shadow-lg hover:bg-marigold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marigold transition-colors"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-road" aria-hidden="true" />
        ) : (
          <VolumeX className="w-5 h-5 text-ink/70" aria-hidden="true" />
        )}
        <span className="font-mono text-[11px] font-bold uppercase tracking-wide">
          {isPlaying ? 'Music on' : 'Music off'}
        </span>
      </button>
    </>
  );
};

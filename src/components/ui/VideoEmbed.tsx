'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  description: string;
  date?: string;
  duration?: string;
  thumbnail?: string | null;
  isFeatured?: boolean;
}

/** Pull the video ID out of the usual YouTube and Vimeo link formats. */
export function parseVideoUrl(
  url: string
): { provider: 'youtube' | 'vimeo'; id: string } | null {
  if (!url) return null;

  const yt =
    url.match(/youtube\.com\/watch\?v=([\w-]{6,})/i) ??
    url.match(/youtu\.be\/([\w-]{6,})/i) ??
    url.match(/youtube\.com\/embed\/([\w-]{6,})/i) ??
    url.match(/youtube\.com\/shorts\/([\w-]{6,})/i);
  if (yt) return { provider: 'youtube', id: yt[1] };

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return { provider: 'vimeo', id: vimeo[1] };

  return null;
}

/**
 * A video that only loads the player once the visitor presses play.
 *
 * Until then it is just an image and a button, so the page stays fast and
 * YouTube's cookies and tracking scripts are never loaded for people who do
 * not watch. The embed uses youtube-nocookie for the same reason.
 */
export const VideoEmbed: React.FC<{ video: VideoItem; priority?: boolean }> = ({
  video,
  priority = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const parsed = parseVideoUrl(video.url);

  if (!parsed) {
    // Bad link saved in the admin panel — show a plain link rather than break.
    return (
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 bg-mist border-2 border-ink rounded-2xl font-body underline"
      >
        Watch: {video.title}
      </a>
    );
  }

  const embedSrc =
    parsed.provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${parsed.id}?autoplay=1`;

  const poster =
    video.thumbnail ??
    (parsed.provider === 'youtube'
      ? `https://i.ytimg.com/vi/${parsed.id}/hqdefault.jpg`
      : null);

  return (
    <div className="relative w-full aspect-video bg-ink rounded-2xl overflow-hidden border-2 border-ink">
      {playing ? (
        <iframe
          src={embedSrc}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${video.title}`}
          className="group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marigold"
        >
          {poster ? (
            <Image
              src={poster}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <span className="absolute inset-0 bg-gradient-to-br from-road to-ink" aria-hidden="true" />
          )}

          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-clay text-field shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current ml-1" aria-hidden="true" />
            </span>
          </span>

          {video.duration && (
            <span className="absolute bottom-3 right-3 font-mono text-[11px] font-bold bg-ink/85 text-field px-2 py-1 rounded">
              {video.duration}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

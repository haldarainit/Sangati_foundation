import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react';

import { imageUrl, type SanityImage } from '@/sanity/lib/image';

/**
 * Renders rich text written in the admin panel, styled to match the rest of
 * the site. Falls back to plain paragraphs when a page still uses the original
 * content files.
 */

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-ink pt-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-ink pt-1">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-marigold pl-5 italic font-display text-xl text-ink/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = (value?.href as string) ?? '#';
      const isInternal = href.startsWith('/');

      if (isInternal) {
        return (
          <Link href={href} className="underline decoration-marigold decoration-2 hover:text-road">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-marigold decoration-2 hover:text-road"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = imageUrl(value as SanityImage, { width: 1400 });
      if (!src) return null;

      return (
        <figure className="space-y-2 not-prose">
          <div className="relative w-full aspect-[16/10] border-2 border-ink overflow-hidden">
            <Image
              src={src}
              alt={(value?.alt as string) ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {value?.caption && (
            <figcaption className="font-mono text-xs text-ink/70">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function RichText({
  value,
  fallback,
}: {
  value?: PortableTextBlock[] | null;
  /** Plain paragraphs used when nothing has been written in the admin panel. */
  fallback?: string[];
}) {
  if (value?.length) {
    return <PortableText value={value} components={components} />;
  }

  return (
    <>
      {(fallback ?? []).map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </>
  );
}

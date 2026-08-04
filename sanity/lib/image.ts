import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { dataset, isSanityConfigured, projectId } from '../env';

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** A Sanity image field, once fetched. */
export type SanityImage = Image & { alt?: string; caption?: string };

/**
 * Turn a Sanity image into a plain URL string.
 *
 * The rest of the site works with `/images/...` style strings, so this keeps
 * the page components unchanged: they still receive a `src` they can drop into
 * an <img> tag or a CSS background.
 *
 * Cropping set in the Studio ("hotspot") is respected whenever a width and
 * height are given.
 */
export function imageUrl(
  source: SanityImage | null | undefined,
  opts: { width?: number; height?: number } = {}
): string | null {
  if (!builder || !source?.asset) return null;

  let url = builder.image(source).auto('format').fit('max');

  if (opts.width) url = url.width(opts.width);
  if (opts.height) url = url.height(opts.height);
  if (opts.width && opts.height) url = url.fit('crop');

  return url.url();
}

/**
 * Same as `imageUrl` but falls back to a path from the original content files,
 * so a page still renders if an image has not been uploaded to Sanity yet.
 */
export function imageUrlOr(
  source: SanityImage | null | undefined,
  fallback: string,
  opts?: { width?: number; height?: number }
): string {
  return imageUrl(source, opts) ?? fallback;
}

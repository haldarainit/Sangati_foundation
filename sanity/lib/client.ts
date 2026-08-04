import { createClient, type SanityClient } from 'next-sanity';

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env';

/**
 * Read-only client used by the website at build/request time.
 *
 * `null` until a Sanity project is configured, which lets every page fall back
 * to the original content files in `content/`.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Served from Sanity's CDN — fast and cheap. Published changes appear
      // within seconds, and the webhook in /api/revalidate refreshes the page.
      useCdn: true,
      perspective: 'published',
    })
  : null;

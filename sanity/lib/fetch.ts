import { client } from './client';

/** How long a page may serve cached content before checking Sanity again. */
export const REVALIDATE_SECONDS = 60;

/**
 * Fetch from Sanity, but never let a CMS problem take the website down.
 *
 * Returns `null` when Sanity is not configured yet, when the network call
 * fails, or when the document simply does not exist. Every caller treats
 * `null` as "use the original content from the `content/` folder instead".
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T | null> {
  if (!client) return null;

  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });
    return result ?? null;
  } catch (error) {
    console.error('[sanity] fetch failed, falling back to local content:', error);
    return null;
  }
}

/** Same as above but for lists — an empty result also counts as "no data". */
export async function sanityFetchList<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T[] | null> {
  const result = await sanityFetch<T[]>(query, params, tags);
  if (!result || !Array.isArray(result) || result.length === 0) return null;
  return result;
}

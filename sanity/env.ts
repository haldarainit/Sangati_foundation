/**
 * Sanity connection settings.
 *
 * These come from environment variables so the same code works locally, on
 * Vercel, and inside the Studio. See `.env.local.example` for the values to
 * fill in after creating the Sanity project.
 *
 * Nothing here throws when the variables are missing. That is deliberate: until
 * Sanity is set up, the website still builds and renders from the original
 * files in `content/`. Only the Studio itself hard-requires them.
 */

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

/** Path the Studio is served from. Keep in sync with src/app/studio/. */
export const studioBasePath = '/studio';

/** True once a Sanity project has actually been configured. */
export const isSanityConfigured = Boolean(projectId && dataset);

/** Used by the Studio, which cannot run without real credentials. */
export function assertSanityConfigured(): { projectId: string; dataset: string } {
  if (!projectId) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Copy .env.local.example to .env.local and fill it in.'
    );
  }
  if (!dataset) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_DATASET. Copy .env.local.example to .env.local and fill it in.'
    );
  }
  return { projectId, dataset };
}

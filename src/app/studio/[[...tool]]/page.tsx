/**
 * The admin panel, served at /studio.
 *
 * This is the Sanity Studio embedded directly into the site — one deploy, one
 * domain, one login. The catch-all `[[...tool]]` segment lets the Studio own
 * every URL beneath /studio for its own internal navigation.
 */

import { NextStudio } from 'next-sanity/studio';

import { isSanityConfigured } from '../../../../sanity/env';
import config from '../../../../sanity.config';
import { StudioSetupNotice } from './StudioSetupNotice';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  // Without a Sanity project the Studio cannot load, so show the setup steps
  // rather than a server error.
  if (!isSanityConfigured) {
    return <StudioSetupNotice />;
  }

  return <NextStudio config={config} />;
}

import React from 'react';
import { getYatraCampaign } from '@/sanity/lib/content';
import { REVALIDATE_SECONDS } from '@/sanity/lib/fetch';
import YatraPageClient from './YatraPageClient';

export const revalidate = REVALIDATE_SECONDS;

export const metadata = {
  title: 'Sangati Yatra 2024–25 | Sangati Foundation',
  description:
    'The 6,500 km cross-country ride from Delhi to Dhanushkodi, driven entirely by persons with disability.',
};

/**
 * Server wrapper: fetches the campaign from the admin panel and hands it to the
 * interactive route map, which needs to run in the browser.
 */
export default async function YatraPage() {
  const yatraCampaign = await getYatraCampaign();

  return <YatraPageClient yatraCampaign={yatraCampaign} />;
}

import React from 'react';
import { getDonateContent } from '@/sanity/lib/content';
import { REVALIDATE_SECONDS } from '@/sanity/lib/fetch';
import DonatePageClient from './DonatePageClient';

export const revalidate = REVALIDATE_SECONDS;

export const metadata = {
  title: 'Donate | Sangati Foundation',
  description:
    'Support accessibility, rural health camps, and independent livelihood for persons with disability. All donations are eligible for 80G tax exemption.',
};

/**
 * Server wrapper: fetches donation tiers from the admin panel and hands them to
 * the interactive donation form.
 */
export default async function DonatePage() {
  const donateContent = await getDonateContent();

  return <DonatePageClient donateContent={donateContent} />;
}

import { DonationTier } from './types';

export const donateContent = {
  title: 'Support Sangati Foundation',
  subtitle: 'Your donation directly funds accessibility, rural health camps, and independent livelihood.',
  bannerImage: '/images/hero/banner-donate.jpg',
  featuredImage: '/images/featured/featured-03.jpg',
  taxInfo:
    'Sangati Foundation is a registered Charitable Trust. All donations are eligible for 80G Tax Exemption receipts under the Income Tax Act, India. 80G receipt details will be emailed immediately after confirmation.',
  tiers: [
    {
      amount: 500,
      label: '₹500',
      fundsDescription: 'Funds 1 rural medical kit with thermometer, masks, sanitiser, zinc & pain relief.',
      isPopular: false,
    },
    {
      amount: 1000,
      label: '₹1,000',
      fundsDescription: 'Sponsors 1 candidate’s technical skill assessment & study materials for Project Udaan.',
      isPopular: false,
    },
    {
      amount: 2500,
      label: '₹2,500',
      fundsDescription: 'Funds 1 full cancer detection screening (mammography, Pap smear, ENT) for a rural woman.',
      isPopular: true,
    },
    {
      amount: 5000,
      label: '₹5,000',
      fundsDescription: 'Covers building & installing 1 portable folding ramp for a public building or vendor cart.',
      isPopular: false,
    },
  ] as DonationTier[],
  bankDetails: {
    accountName: 'Sangati Foundation',
    accountNumber: '919010012345678 (Placeholder)',
    ifscCode: 'UTIB0000123',
    bankName: 'Axis Bank Ltd',
    branch: 'Sector 49, Gurgaon',
    upiId: 'sangati@upi',
  },
};

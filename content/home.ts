import { StatItem } from './types';

export const homeContent = {
  hero: {
    headline: 'Accessibility. Mobility. Inclusivity. Visibility.',
    subheadline:
      'Sangati Foundation has walked alongside persons with disability across India since 2019 — building ramps, running health camps, teaching skills, and driving 6,500 km to prove a point.',
    primaryCtaText: 'See our work',
    primaryCtaLink: '/programs',
    secondaryCtaText: 'Donate',
    secondaryCtaLink: '/donate',
    bgImage: '/images/hero/hero-home-main.jpg',
  },
  stats: [
    {
      id: 'yatra-distance',
      value: '6,500 km',
      numberValue: 6500,
      unit: 'km',
      label: 'Sangati Yatra',
      description: 'Delhi to Dhanushkodi cross-country ride driven by Divyang leaders.',
    },
    {
      id: 'covid-fed',
      value: '500+',
      numberValue: 500,
      unit: '+',
      label: 'Fed Daily',
      description: 'Cooked meals provided daily during COVID lockdowns in Delhi & Gurgaon.',
    },
    {
      id: 'cancer-camp',
      value: '140',
      numberValue: 140,
      unit: '',
      label: 'Screened at Camp',
      description: 'Screened at one comprehensive cancer-detection camp (80% women).',
    },
    {
      id: 'opd-daily',
      value: '300',
      numberValue: 300,
      unit: '',
      label: 'OPD Patients Daily',
      description: 'Served daily at our rural critical care centre in Bathri, Dalhousie.',
    },
  ] as StatItem[],
  whoWeAre: {
    eyebrow: 'WHO WE ARE',
    title: 'Companionship, Not Charity',
    image: '/images/featured/featured-01.jpg',
    paragraphs: [
      'Founded on 14 February 2019 by Mr Sudhir Dhir, Sangati Foundation is a registered Indian charitable trust working on accessibility, mobility, inclusivity and visibility for persons with disability.',
      'The Hindi word sangati means companionship — the brand idea is walking alongside, not charity handed down. We partner with individuals, government bodies, and grassroots communities to tear down physical, systemic, and social barriers.',
      'Whether making major railway hubs accessible, operating rural critical care centers, delivering tech skill training, or driving 6,500 km across India, Sangati works to ensure every individual lives with dignity and independence.',
    ],
    ctaText: 'Learn our story',
    ctaLink: '/about',
  },
  yatraTeaser: {
    eyebrow: 'FLAGSHIP CAMPAIGN',
    title: 'Sangati Yatra 2024–25',
    headline: '6,500 kilometres. Twenty days. Driven entirely by persons with disability.',
    description:
      'Starting 15 December 2024 from Modern School, New Delhi to Dhanushkodi, Rameshwaram, founder Sudhir Dhir led a team of five drivers with disability in modified vehicles to prove that roads belong to everyone.',
    image: '/images/yatra/yatra-flagoff-deepa-malik.jpg',
    ctaText: 'Explore the Yatra Route',
    ctaLink: '/yatra',
  },
  gallery: [
    {
      id: 'gal-1',
      title: 'Health & Critical Care: Asha Kiran Mobile Cancer Detection Van',
      src: '/images/health/health-cancer-van-team.jpg',
      caption: 'Sangati Foundation doctors and team with the Asha Kiran Mobile Cancer Screening Van (EIL & Indian Cancer Society).',
    },
    {
      id: 'gal-2',
      title: 'Sangati Shoppe E-Karts: Electric Vendor Sidecar Cart',
      src: '/images/livelihood/ekart-shoppe-sidecar.jpg',
      caption: 'Divyang micro-entrepreneurs operating their Sangati Shoppe custom retrofitted electric sidecar vendor cart.',
    },
    {
      id: 'gal-3',
      title: 'Skill Development: Bakery Training Graduation (Mandi, HP)',
      src: '/images/skills/skill-bakery-mandi-group.jpg',
      caption: 'Sangati Skill Center trainees holding Bakery & Culinary Arts Certificates under Project Udaan in Mandi (HP).',
    },
    {
      id: 'gal-4',
      title: 'Sangati Shoppe E-Karts: संगTea Keys Handover Ceremony',
      src: '/images/livelihood/ekart-sangtea-key-handover.png',
      caption: 'Official keys handover ceremony of the sangTea motorized cart to an empowered female entrepreneur with disability.',
    },
    {
      id: 'gal-5',
      title: 'Health & Critical Care: Free OPD Medical Examination Camp',
      src: '/images/health/health-opd-checkup.jpg',
      caption: 'Doctor examining a patient during the free rural OPD health check-up camp.',
    },
    {
      id: 'gal-6',
      title: 'Skill Development: Wheelchair Beneficiary Certification',
      src: '/images/skills/skill-bakery-wheelchair.jpg',
      caption: 'Wheelchair beneficiary proudly holding his Bakery Training Certificate at Sangati Skill Center, Mandi.',
    },
    {
      id: 'gal-7',
      title: 'Para Sports: Accessible Yoga at India Gate (Ministry of Ayush)',
      src: '/images/parasports/parasports-india-gate-yoga.jpg',
      caption: 'Divyang athletes and wheelchair participants performing Accessible Yoga at India Gate on International Yoga Day.',
    },
    {
      id: 'gal-8',
      title: 'Para Sports: Wheelchair Cricket Warriors Tournament',
      src: '/images/parasports/parasports-wheelchair-cricket.jpg',
      caption: 'Divyang wheelchair cricket players shaking hands on the pitch during an official tournament match.',
    },
  ],
};

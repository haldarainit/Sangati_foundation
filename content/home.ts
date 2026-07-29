import { StatItem } from './types';

export const homeContent = {
  hero: {
    headline: 'Accessibility. Mobility. Inclusivity. Visibility.',
    subheadline:
      'Sangati Foundation has walked alongside persons with disability across India since 2019 — building ramps, running health camps, teaching skills, and driving 6,000 km to prove a point.',
    primaryCtaText: 'See our work',
    primaryCtaLink: '/programs',
    secondaryCtaText: 'Donate',
    secondaryCtaLink: '/donate',
    bgImage: '/images/hero/hero-home-main.jpg',
  },
  stats: [
    {
      id: 'yatra-distance',
      value: '6,000 km',
      numberValue: 6000,
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
      'Whether making major railway hubs accessible, operating rural critical care centers, delivering tech skill training, or driving 6,000 km across India, Sangati works to ensure every individual lives with dignity and independence.',
    ],
    ctaText: 'Learn our story',
    ctaLink: '/about',
  },
  yatraTeaser: {
    eyebrow: 'FLAGSHIP CAMPAIGN',
    title: 'Sangati Yatra 2024–25',
    headline: '6,000 kilometres. Twenty days. Driven entirely by persons with disability.',
    description:
      'Starting 15 December 2024 from Modern School, New Delhi to Dhanushkodi, Rameshwaram, founder Sudhir Dhir led a team of five drivers with disability in modified vehicles to prove that roads belong to everyone.',
    image: '/images/hero/hero-yatra.jpg',
    ctaText: 'Explore the Yatra Route',
    ctaLink: '/yatra',
  },
  gallery: [
    { id: 'g1', src: '/images/gallery/gallery-01.jpg', title: 'Accessible Ramp & Rail Station Audit', caption: 'Nizamuddin Railway Station accessibility drive.' },
    { id: 'g2', src: '/images/gallery/gallery-02.jpg', title: 'Community Health Camp', caption: 'Free health screening in New Delhi.' },
    { id: 'g3', src: '/images/gallery/gallery-03.jpg', title: 'Sangati Yatra Convoy', caption: 'Modified vehicles driving across states.' },
    { id: 'g4', src: '/images/gallery/gallery-04.jpg', title: 'Skill Development Session', caption: 'Project Udaan tech class in action.' },
    { id: 'g5', src: '/images/gallery/gallery-05.jpg', title: 'Wheelchair Mobility Workshop', caption: 'Empowering independent road navigation.' },
    { id: 'g6', src: '/images/gallery/gallery-06.jpg', title: 'Rural Care Center Bathri', caption: 'Daily OPD & medical support in Himachal.' },
    { id: 'g7', src: '/images/gallery/gallery-07.jpg', title: 'Sangati Shoppe Cart', caption: 'संगTea mobile vendor cart for self-employment.' },
    { id: 'g8', src: '/images/gallery/gallery-08.jpg', title: 'Delhi Half-Marathon Team', caption: '25 Sangati runners at Champions with Disability.' },
  ],
  donateBand: {
    title: 'Walk alongside us. Fuel real accessibility.',
    description:
      'Every contribution helps construct accessible toilets, supply rural medical kits, train youth in software development, and keep modified vehicles on the road.',
    ctaText: 'Donate Now',
    ctaLink: '/donate',
  },
};

/**
 * Slides for the big rotating banner at the top of the homepage.
 *
 * These are the fallback slides, used when nothing has been set in the admin
 * panel — and the seed data for the initial Sanity import.
 *
 * The first entry is the animated Sangati logo intro. It is part of the brand
 * animation rather than editable content, so it is always kept as slide 0.
 */

export interface HeroSlideItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  isIntro?: boolean;
  ctaLink: string;
  ctaText: string;
}

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-intro',
    slug: 'intro',
    category: 'SANGATI FOUNDATION INTRO',
    title: 'Sangati Foundation',
    subtitle: 'Empowering Persons with Disabilities',
    image: '/sangati-text-logo.png',
    isIntro: true,
    ctaLink: '/about',
    ctaText: 'About Sangati',
  },
  {
    id: 'slide-accessibility',
    slug: 'accessibility',
    category: 'ACCESSIBILITY & DURLABH SHAUCHALAYA',
    title: 'Dignified & Wheelchair Accessible Public Spaces',
    subtitle: 'Sangati Durlabh Shauchalaya accessible toilets, railway station transformations, and public accessibility audits across India.',
    image: '/images/accessibility/accessibility-inauguration-ceremony.jpg',
    ctaLink: '/programs/accessibility',
    ctaText: 'Explore Accessibility',
  },
  {
    id: 'slide-parasports',
    slug: 'para-sports',
    category: 'PARA SPORTS & ADAPTIVE YOGA',
    title: 'Breaking Barriers Through Inclusive Sports',
    subtitle: 'Accessible Yoga at India Gate with Ministry of Ayush, Wheelchair Cricket Warriors, and Delhi Half-Marathon runners.',
    image: '/images/parasports/parasports-india-gate-yoga.jpg',
    ctaLink: '/programs/para-sports',
    ctaText: 'Explore Para Sports',
  },
  {
    id: 'slide-livelihood',
    slug: 'livelihood',
    category: 'LIVELIHOOD & SANGATI SHOPPE',
    title: 'Empowering Divyang Micro-Entrepreneurs',
    subtitle: 'संगTea custom retrofitted e-karts and mobile vendor carts unlocking financial independence and dignity for persons with disability.',
    image: '/images/livelihood/ekart-shoppe-sidecar.jpg',
    ctaLink: '/programs/livelihood',
    ctaText: 'Explore Sangati Shoppe',
  },
  {
    id: 'slide-skills',
    slug: 'skills',
    category: 'SKILL DEVELOPMENT & JOBS',
    title: 'Free Vocational Training & Job Placement',
    subtitle: 'Project Udaan: Bakery & Pastry Arts, RPL Pump Operator, Laptop Repair, Web Dev, Python, & dedicated job mentorship.',
    image: '/images/skills/skill-bakery-mandi-group.jpg',
    ctaLink: '/programs/skills',
    ctaText: 'Explore Skill Training',
  },
  {
    id: 'slide-health',
    slug: 'health',
    category: 'HEALTH & CRITICAL CARE',
    title: 'Mobile Cancer Screening & OPD Healthcare',
    subtitle: 'Asha Kiran mobile cancer detection van drives, rural OPD care in Dalhousie HP, and winter warmth relief distributions.',
    image: '/images/health/health-cancer-van-team.jpg',
    ctaLink: '/programs/health',
    ctaText: 'Explore Health Drives',
  },
  {
    id: 'slide-yatra',
    slug: 'yatra',
    category: 'SANGATI YATRA 2024-25',
    title: '6,500 KM Nationwide Accessibility Expedition',
    subtitle: 'Flagged off by Dr. Deepa Malik — travelling across India with retrofitted scooters to audit travel hubs and drive inclusion.',
    image: '/images/yatra/yatra-flagoff-deepa-malik.jpg',
    ctaLink: '/yatra',
    ctaText: 'Discover Sangati Yatra',
  },
];

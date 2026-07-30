export interface OrganizationInfo {
  name: string;
  legalType: string;
  foundedDate: string;
  founder: string;
  leadAuthor: string;
  sangatiDay: string;
  helpline: string;
  existingSite: string;
  twitter: string;
  tagline: string;
  brandMeaning: string;
  missionLine: string;
  address: {
    gurgaon: string;
    jodhpur: string;
    dalhousie: string;
  };
}

export interface StatItem {
  id: string;
  value: string;
  numberValue: number;
  unit: string;
  label: string;
  description: string;
}

export interface ProgramItem {
  slug: string;
  title: string;
  image: string;
  summary: string;
  fullContent: string;
  highlights: string[];
  keyStats?: string[];
  partners?: string[];
  gallery?: { id: string; title: string; src: string; caption: string }[];
}

export interface YatraStop {
  id: string;
  name: string;
  state: string;
  distanceKm: number;
  date: string;
  description: string;
  isKeyStop: boolean;
}

export interface YatraCampaign {
  headline: string;
  distance: string;
  duration: string;
  driverCount: number;
  storyParagraphs: string[];
  stops: YatraStop[];
  heroImage: string;
  bodyImage: string;
  flagOffDetails: {
    date: string;
    location: string;
    flaggedOffBy: string;
  };
  conclusionDetails: {
    date: string;
    location: string;
  };
}

export interface ImpactMilestone {
  year: number;
  title: string;
  summary: string;
  details: string[];
}

export interface StoryItem {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author?: string;
  image: string;
  excerpt: string;
  fullStory: string[];
  quote?: string;
}

export interface NewsPosterItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  linkText?: string;
}

export interface DonationTier {
  amount: number;
  label: string;
  fundsDescription: string;
  isPopular?: boolean;
}

import type { PortableTextBlock } from '@portabletext/react';

import { aboutContent as localAbout } from '@/content/about';
import { donateContent as localDonate } from '@/content/donate';
import { homeContent as localHome } from '@/content/home';
import { impactContent as localImpact } from '@/content/impact';
import { newsList as localNews } from '@/content/news';
import { programsList as localPrograms } from '@/content/programs';
import { storiesList as localStories } from '@/content/stories';
import { yatraCampaign as localYatra } from '@/content/yatra';

import { imageUrlOr, type SanityImage } from './image';
import { sanityFetch, sanityFetchList } from './fetch';
import {
  ABOUT_QUERY,
  DONATE_QUERY,
  HOME_QUERY,
  IMPACT_QUERY,
  NEWS_QUERY,
  PROGRAMS_QUERY,
  PROGRAM_BY_SLUG_QUERY,
  PROGRAM_SLUGS_QUERY,
  STORIES_QUERY,
  STORY_BY_SLUG_QUERY,
  STORY_SLUGS_QUERY,
  TEAM_QUERY,
  YATRA_QUERY,
} from './queries';

/**
 * The bridge between Sanity and the page components.
 *
 * Every function here returns the SAME shape the site already used from the
 * `content/` folder — images arrive as plain URL strings, lists in the same
 * order. That means page components barely changed, and if Sanity is
 * unreachable or not yet set up, the original content renders instead.
 */

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

type RawGalleryItem = { title?: string; caption?: string; image?: SanityImage };

/** The shape every gallery on the site is rendered from. */
export type GalleryEntry = { id: string; title: string; src: string; caption: string };

function mapGallery(
  items: RawGalleryItem[] | undefined,
  prefix: string,
  fallback: { id: string; title: string; src: string; caption: string }[] = []
) {
  if (!items?.length) return fallback;
  return items.map((item, idx) => ({
    id: `${prefix}-${idx + 1}`,
    title: item.title ?? '',
    src: imageUrlOr(item.image, '', { width: 1200, height: 900 }),
    caption: item.caption ?? '',
  }));
}

/** Flatten rich text to plain paragraphs, for meta descriptions and fallbacks. */
export function blocksToPlainText(blocks: PortableTextBlock[] | undefined | null): string[] {
  if (!blocks?.length) return [];
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) =>
      ((block.children as { text?: string }[] | undefined) ?? [])
        .map((child) => child.text ?? '')
        .join('')
    )
    .filter((text) => text.trim().length > 0);
}

/* ------------------------------------------------------------------ *
 * Homepage
 * ------------------------------------------------------------------ */

export type HeroSlide = {
  category: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
};

type RawHome = {
  heroSlides?: {
    category: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    image?: SanityImage;
  }[];
  heroHeadline?: string;
  heroSubheadline?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaLink?: string;
  heroImage?: SanityImage;
  stats?: typeof localHome.stats;
  whoWeAreEyebrow?: string;
  whoWeAreTitle?: string;
  whoWeAreParagraphs?: string[];
  whoWeAreCtaText?: string;
  whoWeAreCtaLink?: string;
  whoWeAreImage?: SanityImage;
  yatraEyebrow?: string;
  yatraTitle?: string;
  yatraHeadline?: string;
  yatraDescription?: string;
  yatraCtaText?: string;
  yatraCtaLink?: string;
  yatraImage?: SanityImage;
  gallery?: RawGalleryItem[];
};

export type HomeContent = typeof localHome & { heroSlides: HeroSlide[] };

export async function getHomeContent(): Promise<HomeContent> {
  const data = await sanityFetch<RawHome>(HOME_QUERY, {}, ['homePage']);
  if (!data) return { ...localHome, heroSlides: [] };

  return {
    heroSlides:
      data.heroSlides?.map((slide) => ({
        category: slide.category,
        title: slide.title,
        subtitle: slide.subtitle,
        ctaText: slide.ctaText,
        ctaLink: slide.ctaLink,
        image: imageUrlOr(slide.image, '', { width: 2000, height: 1200 }),
      })) ?? [],
    hero: {
      headline: data.heroHeadline ?? localHome.hero.headline,
      subheadline: data.heroSubheadline ?? localHome.hero.subheadline,
      primaryCtaText: data.heroPrimaryCtaText ?? localHome.hero.primaryCtaText,
      primaryCtaLink: data.heroPrimaryCtaLink ?? localHome.hero.primaryCtaLink,
      secondaryCtaText: data.heroSecondaryCtaText ?? localHome.hero.secondaryCtaText,
      secondaryCtaLink: data.heroSecondaryCtaLink ?? localHome.hero.secondaryCtaLink,
      bgImage: imageUrlOr(data.heroImage, localHome.hero.bgImage, { width: 2000 }),
    },
    stats: data.stats?.length ? data.stats : localHome.stats,
    whoWeAre: {
      eyebrow: data.whoWeAreEyebrow ?? localHome.whoWeAre.eyebrow,
      title: data.whoWeAreTitle ?? localHome.whoWeAre.title,
      image: imageUrlOr(data.whoWeAreImage, localHome.whoWeAre.image, { width: 1400 }),
      paragraphs: data.whoWeAreParagraphs?.length
        ? data.whoWeAreParagraphs
        : localHome.whoWeAre.paragraphs,
      ctaText: data.whoWeAreCtaText ?? localHome.whoWeAre.ctaText,
      ctaLink: data.whoWeAreCtaLink ?? localHome.whoWeAre.ctaLink,
    },
    yatraTeaser: {
      eyebrow: data.yatraEyebrow ?? localHome.yatraTeaser.eyebrow,
      title: data.yatraTitle ?? localHome.yatraTeaser.title,
      headline: data.yatraHeadline ?? localHome.yatraTeaser.headline,
      description: data.yatraDescription ?? localHome.yatraTeaser.description,
      image: imageUrlOr(data.yatraImage, localHome.yatraTeaser.image, { width: 1400 }),
      ctaText: data.yatraCtaText ?? localHome.yatraTeaser.ctaText,
      ctaLink: data.yatraCtaLink ?? localHome.yatraTeaser.ctaLink,
    },
    gallery: mapGallery(data.gallery, 'gal', localHome.gallery),
  };
}

/* ------------------------------------------------------------------ *
 * News & posters
 * ------------------------------------------------------------------ */

type RawNews = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  linkText?: string;
  image?: SanityImage;
};

export async function getNews(): Promise<typeof localNews> {
  const data = await sanityFetchList<RawNews>(NEWS_QUERY, {}, ['newsPoster']);
  if (!data) return localNews;

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    category: item.category,
    description: item.description,
    linkText: item.linkText,
    image: imageUrlOr(item.image, '', { width: 1000 }),
  }));
}

/* ------------------------------------------------------------------ *
 * Stories
 * ------------------------------------------------------------------ */

export type Story = (typeof localStories)[number] & {
  /** Rich text from Sanity. When absent, `fullStory` is used instead. */
  body?: PortableTextBlock[] | null;
};

type RawStory = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author?: string;
  excerpt: string;
  quote?: string;
  body?: PortableTextBlock[];
  image?: SanityImage;
};

function mapStory(raw: RawStory): Story {
  return {
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle,
    category: raw.category,
    date: raw.date,
    author: raw.author,
    excerpt: raw.excerpt,
    quote: raw.quote,
    image: imageUrlOr(raw.image, '', { width: 1600 }),
    fullStory: blocksToPlainText(raw.body),
    body: raw.body ?? null,
  };
}

export async function getStories(): Promise<Story[]> {
  const data = await sanityFetchList<RawStory>(STORIES_QUERY, {}, ['story']);
  if (!data) return localStories;
  return data.map(mapStory);
}

export async function getStory(slug: string): Promise<Story | null> {
  const data = await sanityFetch<RawStory>(STORY_BY_SLUG_QUERY, { slug }, ['story']);
  if (data) return mapStory(data);
  return localStories.find((s) => s.slug === slug) ?? null;
}

export async function getStorySlugs(): Promise<string[]> {
  const data = await sanityFetchList<string>(STORY_SLUGS_QUERY, {}, ['story']);
  if (!data) return localStories.map((s) => s.slug);
  return data;
}

/* ------------------------------------------------------------------ *
 * Programmes
 * ------------------------------------------------------------------ */

export type Program = (typeof localPrograms)[number] & {
  /** Rich text from Sanity. When absent, `fullContent` is used instead. */
  body?: PortableTextBlock[] | null;
};

type RawProgram = {
  slug: string;
  title: string;
  summary: string;
  fullContent?: PortableTextBlock[];
  highlights?: string[];
  keyStats?: string[];
  partners?: string[];
  image?: SanityImage;
  gallery?: RawGalleryItem[];
};

function mapProgram(raw: RawProgram): Program {
  return {
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    fullContent: blocksToPlainText(raw.fullContent).join('\n\n'),
    highlights: raw.highlights ?? [],
    keyStats: raw.keyStats,
    partners: raw.partners,
    image: imageUrlOr(raw.image, '', { width: 1600 }),
    gallery: raw.gallery?.length ? mapGallery(raw.gallery, raw.slug) : undefined,
    body: raw.fullContent ?? null,
  };
}

export async function getPrograms(): Promise<Program[]> {
  const data = await sanityFetchList<RawProgram>(PROGRAMS_QUERY, {}, ['program']);
  if (!data) return localPrograms;
  return data.map(mapProgram);
}

export async function getProgram(slug: string): Promise<Program | null> {
  const data = await sanityFetch<RawProgram>(PROGRAM_BY_SLUG_QUERY, { slug }, ['program']);
  if (data) return mapProgram(data);
  return localPrograms.find((p) => p.slug === slug) ?? null;
}

export async function getProgramSlugs(): Promise<string[]> {
  const data = await sanityFetchList<string>(PROGRAM_SLUGS_QUERY, {}, ['program']);
  if (!data) return localPrograms.map((p) => p.slug);
  return data;
}

/* ------------------------------------------------------------------ *
 * About page (including trustees and leadership)
 * ------------------------------------------------------------------ */

type RawTeamMember = {
  name: string;
  section?: 'trustee' | 'leadership';
  role: string;
  subtitle?: string;
  bio?: string[];
  expertise?: string[];
  careerHighlights?: string[];
  quote?: string;
  image?: SanityImage;
};

type RawAbout = {
  title?: string;
  subtitle?: string;
  heroImage?: SanityImage;
  insetStoryImage?: SanityImage;
  brandIdeaTitle?: string;
  brandIdeaQuoteHindi?: string;
  brandIdeaDescription?: string;
  poemTitle?: string;
  poemLines?: string[];
  poemInvitation?: string;
  epigraphQuote?: string;
  epigraphAttribution?: string;
  timelinePreview?: { year: number; event: string }[];
  gallery?: RawGalleryItem[];
};

export type AboutContent = typeof localAbout & { gallery: GalleryEntry[] };

export async function getAboutContent(): Promise<AboutContent> {
  const [data, team] = await Promise.all([
    sanityFetch<RawAbout>(ABOUT_QUERY, {}, ['aboutPage']),
    sanityFetchList<RawTeamMember>(TEAM_QUERY, {}, ['teamMember']),
  ]);

  if (!data && !team) return { ...localAbout, gallery: [] };

  const trustees = team?.filter((m) => m.section === 'trustee') ?? [];
  const leadership = team?.filter((m) => m.section === 'leadership') ?? [];

  const mapMember = (m: RawTeamMember) => ({
    name: m.name,
    role: m.role,
    subtitle: m.subtitle,
    bio: m.bio ?? [],
    image: imageUrlOr(m.image, '', { width: 800, height: 800 }),
    expertise: m.expertise,
    careerHighlights: m.careerHighlights,
    quote: m.quote,
  });

  return {
    title: data?.title ?? localAbout.title,
    subtitle: data?.subtitle ?? localAbout.subtitle,
    heroImage: imageUrlOr(data?.heroImage, localAbout.heroImage, { width: 2000 }),
    insetStoryImage: imageUrlOr(data?.insetStoryImage, localAbout.insetStoryImage, { width: 1200 }),
    brandIdea: {
      title: data?.brandIdeaTitle ?? localAbout.brandIdea.title,
      quoteHindi: data?.brandIdeaQuoteHindi ?? localAbout.brandIdea.quoteHindi,
      description: data?.brandIdeaDescription ?? localAbout.brandIdea.description,
    },
    foundingPoem: {
      title: data?.poemTitle ?? localAbout.foundingPoem.title,
      lines: data?.poemLines?.length ? data.poemLines : localAbout.foundingPoem.lines,
      invitation: data?.poemInvitation ?? localAbout.foundingPoem.invitation,
      epigraph: {
        quote: data?.epigraphQuote ?? localAbout.foundingPoem.epigraph.quote,
        attribution: data?.epigraphAttribution ?? localAbout.foundingPoem.epigraph.attribution,
      },
    },
    trustees: trustees.length
      ? (trustees.map(mapMember) as typeof localAbout.trustees)
      : localAbout.trustees,
    leadership: leadership.length
      ? (leadership.map((m) => ({
          name: m.name,
          role: m.role,
          // The leadership cards show a single paragraph.
          bio: (m.bio ?? []).join(' '),
          image: imageUrlOr(m.image, '', { width: 800, height: 800 }),
        })) as typeof localAbout.leadership)
      : localAbout.leadership,
    timelinePreview: data?.timelinePreview?.length
      ? data.timelinePreview
      : localAbout.timelinePreview,
    gallery: mapGallery(data?.gallery, 'about'),
  };
}

/* ------------------------------------------------------------------ *
 * Impact page
 * ------------------------------------------------------------------ */

type RawImpact = {
  title?: string;
  subtitle?: string;
  bannerImage?: SanityImage;
  keyStats?: { number: string; label: string }[];
  timeline?: typeof localImpact.timeline;
  gallery?: RawGalleryItem[];
};

export type ImpactContent = typeof localImpact & { gallery: GalleryEntry[] };

export async function getImpactContent(): Promise<ImpactContent> {
  const data = await sanityFetch<RawImpact>(IMPACT_QUERY, {}, ['impactPage']);
  if (!data) return { ...localImpact, gallery: [] };

  return {
    title: data.title ?? localImpact.title,
    subtitle: data.subtitle ?? localImpact.subtitle,
    bannerImage: imageUrlOr(data.bannerImage, localImpact.bannerImage, { width: 2000 }),
    keyStats: data.keyStats?.length ? data.keyStats : localImpact.keyStats,
    timeline: data.timeline?.length ? data.timeline : localImpact.timeline,
    gallery: mapGallery(data.gallery, 'impact'),
  };
}

/* ------------------------------------------------------------------ *
 * Yatra page
 * ------------------------------------------------------------------ */

type RawYatra = {
  headline?: string;
  distance?: string;
  duration?: string;
  driverCount?: number;
  storyParagraphs?: string[];
  heroImage?: SanityImage;
  bodyImage?: SanityImage;
  flagOffDate?: string;
  flagOffLocation?: string;
  flaggedOffBy?: string;
  conclusionDate?: string;
  conclusionLocation?: string;
  stops?: {
    name: string;
    state: string;
    distanceKm: number;
    date: string;
    description: string;
    isKeyStop?: boolean;
  }[];
  gallery?: RawGalleryItem[];
};

export type YatraContent = typeof localYatra & { gallery: GalleryEntry[] };

export async function getYatraCampaign(): Promise<YatraContent> {
  const data = await sanityFetch<RawYatra>(YATRA_QUERY, {}, ['yatraPage']);
  if (!data) return { ...localYatra, gallery: [] };

  return {
    headline: data.headline ?? localYatra.headline,
    distance: data.distance ?? localYatra.distance,
    duration: data.duration ?? localYatra.duration,
    driverCount: data.driverCount ?? localYatra.driverCount,
    storyParagraphs: data.storyParagraphs?.length
      ? data.storyParagraphs
      : localYatra.storyParagraphs,
    heroImage: imageUrlOr(data.heroImage, localYatra.heroImage, { width: 2000 }),
    bodyImage: imageUrlOr(data.bodyImage, localYatra.bodyImage, { width: 1400 }),
    flagOffDetails: {
      date: data.flagOffDate ?? localYatra.flagOffDetails.date,
      location: data.flagOffLocation ?? localYatra.flagOffDetails.location,
      flaggedOffBy: data.flaggedOffBy ?? localYatra.flagOffDetails.flaggedOffBy,
    },
    conclusionDetails: {
      date: data.conclusionDate ?? localYatra.conclusionDetails.date,
      location: data.conclusionLocation ?? localYatra.conclusionDetails.location,
    },
    stops: data.stops?.length
      ? data.stops.map((stop, idx) => ({
          id: `stop-${idx + 1}`,
          name: stop.name,
          state: stop.state,
          distanceKm: stop.distanceKm,
          date: stop.date,
          description: stop.description,
          isKeyStop: Boolean(stop.isKeyStop),
        }))
      : localYatra.stops,
    gallery: mapGallery(data.gallery, 'yatra'),
  };
}

/* ------------------------------------------------------------------ *
 * Donate page
 * ------------------------------------------------------------------ */

type RawDonate = {
  title?: string;
  subtitle?: string;
  bannerImage?: SanityImage;
  featuredImage?: SanityImage;
  tiers?: typeof localDonate.tiers;
};

export type DonateContent = typeof localDonate;

export async function getDonateContent(): Promise<DonateContent> {
  const data = await sanityFetch<RawDonate>(DONATE_QUERY, {}, ['donatePage']);
  if (!data) return localDonate;

  return {
    ...localDonate, // taxInfo and bankDetails deliberately stay in code
    title: data.title ?? localDonate.title,
    subtitle: data.subtitle ?? localDonate.subtitle,
    bannerImage: imageUrlOr(data.bannerImage, localDonate.bannerImage, { width: 2000 }),
    featuredImage: imageUrlOr(data.featuredImage, localDonate.featuredImage, { width: 1400 }),
    tiers: data.tiers?.length ? data.tiers : localDonate.tiers,
  };
}

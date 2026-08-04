/**
 * One-time import: copies everything currently in `content/` and `public/images/`
 * into Sanity, so the client opens the admin panel and finds the real website
 * already there rather than a blank slate.
 *
 * Run once, after creating the Sanity project:
 *
 *   npm run seed
 *
 * Safe to re-run: every document has a fixed ID and is replaced, and Sanity
 * de-duplicates uploaded images by file hash.
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local — see README.
 */

import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { aboutContent } from '../content/about';
import { donateContent } from '../content/donate';
import { aboutGallery, impactGallery, yatraGallery } from '../content/galleries';
import { DEFAULT_HERO_SLIDES } from '../content/heroSlides';
import { homeContent } from '../content/home';
import { impactContent } from '../content/impact';
import { newsList } from '../content/news';
import { programsList } from '../content/programs';
import { storiesList } from '../content/stories';
import { yatraCampaign } from '../content/yatra';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

/* ------------------------------------------------------------------ *
 * Environment
 * ------------------------------------------------------------------ */

await loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    '\nMissing configuration. Your .env.local needs all three of:\n' +
      '  NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
      '  NEXT_PUBLIC_SANITY_DATASET\n' +
      '  SANITY_API_WRITE_TOKEN   (sanity.io/manage → API → Tokens, with Editor rights)\n'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
});

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

type ImageRef = { _type: 'image'; asset: { _type: 'reference'; _ref: string } };

const uploadCache = new Map<string, ImageRef | undefined>();
let uploaded = 0;
let missing = 0;

/**
 * Upload a file from /public into Sanity and return an image reference.
 * Returns undefined when the file is missing, so the import keeps going.
 */
async function uploadImage(publicPath?: string): Promise<ImageRef | undefined> {
  if (!publicPath) return undefined;
  if (uploadCache.has(publicPath)) return uploadCache.get(publicPath);

  const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''));

  if (!existsSync(filePath)) {
    console.warn(`  ! missing file, skipped: ${publicPath}`);
    missing += 1;
    uploadCache.set(publicPath, undefined);
    return undefined;
  }

  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: path.basename(filePath),
  });

  const ref: ImageRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  uploadCache.set(publicPath, ref);
  uploaded += 1;
  console.log(`  → ${publicPath}`);
  return ref;
}

let keyCounter = 0;
/** Sanity needs a stable `_key` on every array item. */
function key(): string {
  keyCounter += 1;
  return `seed${keyCounter.toString(36)}`;
}

/** Add `_key` (and optionally `_type`) to each item of an array of objects. */
function keyed<T extends object>(items: readonly T[] = [], type?: string) {
  return items.map((item) => ({ ...item, _key: key(), ...(type ? { _type: type } : {}) }));
}

/** Turn plain paragraphs into the rich-text format the Studio edits. */
function toBlocks(paragraphs: string | readonly string[]) {
  const list = Array.isArray(paragraphs) ? paragraphs : [paragraphs as string];
  return list
    .filter((text) => typeof text === 'string' && text.trim().length > 0)
    .map((text) => ({
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: key(), text, marks: [] }],
    }));
}

type GallerySource = { title: string; src: string; caption: string };

/** Build a gallery array, dropping entries whose image file is missing. */
async function buildGallery(items: readonly GallerySource[] = []) {
  const out = [];
  for (const item of items) {
    const image = await uploadImage(item.src);
    if (!image) continue;
    out.push({ _type: 'galleryItem', _key: key(), title: item.title, caption: item.caption, image });
  }
  return out;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Minimal .env.local reader, so the script needs no extra dependency. */
async function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  if (!existsSync(envPath)) return;

  const raw = await readFile(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const name = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!(name in process.env)) process.env[name] = value;
  }
}

/* ------------------------------------------------------------------ *
 * Build the documents
 * ------------------------------------------------------------------ */

console.log(`\nImporting into Sanity project ${projectId}, dataset "${dataset}"\n`);
console.log('Uploading images…');

const docs: Record<string, unknown>[] = [];

/* --- Homepage ----------------------------------------------------- */

const heroSlides = [];
for (const slide of DEFAULT_HERO_SLIDES.filter((s) => !s.isIntro)) {
  const image = await uploadImage(slide.image);
  if (!image) continue;
  heroSlides.push({
    _type: 'heroSlide',
    _key: key(),
    category: slide.category,
    title: slide.title,
    subtitle: slide.subtitle,
    ctaText: slide.ctaText,
    ctaLink: slide.ctaLink,
    image,
  });
}

docs.push({
  _id: 'homePage',
  _type: 'homePage',
  heroSlides,
  heroHeadline: homeContent.hero.headline,
  heroSubheadline: homeContent.hero.subheadline,
  heroPrimaryCtaText: homeContent.hero.primaryCtaText,
  heroPrimaryCtaLink: homeContent.hero.primaryCtaLink,
  heroSecondaryCtaText: homeContent.hero.secondaryCtaText,
  heroSecondaryCtaLink: homeContent.hero.secondaryCtaLink,
  heroImage: await uploadImage(homeContent.hero.bgImage),
  stats: keyed(homeContent.stats, 'statItem'),
  whoWeAreEyebrow: homeContent.whoWeAre.eyebrow,
  whoWeAreTitle: homeContent.whoWeAre.title,
  whoWeAreImage: await uploadImage(homeContent.whoWeAre.image),
  whoWeAreParagraphs: homeContent.whoWeAre.paragraphs,
  whoWeAreCtaText: homeContent.whoWeAre.ctaText,
  whoWeAreCtaLink: homeContent.whoWeAre.ctaLink,
  yatraEyebrow: homeContent.yatraTeaser.eyebrow,
  yatraTitle: homeContent.yatraTeaser.title,
  yatraHeadline: homeContent.yatraTeaser.headline,
  yatraDescription: homeContent.yatraTeaser.description,
  yatraImage: await uploadImage(homeContent.yatraTeaser.image),
  yatraCtaText: homeContent.yatraTeaser.ctaText,
  yatraCtaLink: homeContent.yatraTeaser.ctaLink,
  gallery: await buildGallery(homeContent.gallery),
});

/* --- News & posters ----------------------------------------------- */

for (const [idx, poster] of newsList.entries()) {
  docs.push({
    _id: `newsPoster-${poster.id}`,
    _type: 'newsPoster',
    title: poster.title,
    date: poster.date,
    category: poster.category,
    description: poster.description,
    linkText: poster.linkText,
    image: await uploadImage(poster.image),
    order: idx + 1,
  });
}

/* --- Stories ------------------------------------------------------- */

for (const [idx, story] of storiesList.entries()) {
  docs.push({
    _id: `story-${story.slug}`,
    _type: 'story',
    title: story.title,
    slug: { _type: 'slug', current: story.slug },
    subtitle: story.subtitle,
    category: story.category,
    date: story.date,
    author: story.author,
    excerpt: story.excerpt,
    quote: story.quote,
    body: toBlocks(story.fullStory),
    image: await uploadImage(story.image),
    order: idx + 1,
  });
}

/* --- Programmes ---------------------------------------------------- */

for (const [idx, program] of programsList.entries()) {
  docs.push({
    _id: `program-${program.slug}`,
    _type: 'program',
    title: program.title,
    slug: { _type: 'slug', current: program.slug },
    summary: program.summary,
    fullContent: toBlocks(program.fullContent.split(/\n\s*\n/)),
    highlights: program.highlights,
    keyStats: program.keyStats,
    partners: program.partners,
    image: await uploadImage(program.image),
    gallery: await buildGallery(program.gallery),
    order: idx + 1,
  });
}

/* --- Team & trustees ------------------------------------------------ */

for (const [idx, trustee] of aboutContent.trustees.entries()) {
  docs.push({
    _id: `team-trustee-${slugify(trustee.name)}`,
    _type: 'teamMember',
    name: trustee.name,
    section: 'trustee',
    role: trustee.role,
    subtitle: trustee.subtitle,
    bio: trustee.bio,
    expertise: trustee.expertise,
    quote: trustee.quote,
    image: await uploadImage(trustee.image),
    order: idx + 1,
  });
}

for (const [idx, member] of aboutContent.leadership.entries()) {
  docs.push({
    _id: `team-leadership-${slugify(member.name)}`,
    _type: 'teamMember',
    name: member.name,
    section: 'leadership',
    role: member.role,
    bio: [member.bio],
    image: await uploadImage(member.image),
    order: idx + 1,
  });
}

/* --- About page ----------------------------------------------------- */

docs.push({
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: aboutContent.title,
  subtitle: aboutContent.subtitle,
  heroImage: await uploadImage(aboutContent.heroImage),
  insetStoryImage: await uploadImage(aboutContent.insetStoryImage),
  brandIdeaTitle: aboutContent.brandIdea.title,
  brandIdeaQuoteHindi: aboutContent.brandIdea.quoteHindi,
  brandIdeaDescription: aboutContent.brandIdea.description,
  poemTitle: aboutContent.foundingPoem.title,
  poemLines: aboutContent.foundingPoem.lines,
  poemInvitation: aboutContent.foundingPoem.invitation,
  epigraphQuote: aboutContent.foundingPoem.epigraph.quote,
  epigraphAttribution: aboutContent.foundingPoem.epigraph.attribution,
  timelinePreview: keyed(aboutContent.timelinePreview, 'timelineEntry'),
  gallery: await buildGallery(aboutGallery),
});

/* --- Impact page ----------------------------------------------------- */

docs.push({
  _id: 'impactPage',
  _type: 'impactPage',
  title: impactContent.title,
  subtitle: impactContent.subtitle,
  bannerImage: await uploadImage(impactContent.bannerImage),
  keyStats: keyed(impactContent.keyStats, 'keyStat'),
  timeline: keyed(impactContent.timeline, 'milestone'),
  gallery: await buildGallery(impactGallery),
});

/* --- Yatra page ------------------------------------------------------ */

docs.push({
  _id: 'yatraPage',
  _type: 'yatraPage',
  headline: yatraCampaign.headline,
  distance: yatraCampaign.distance,
  duration: yatraCampaign.duration,
  driverCount: yatraCampaign.driverCount,
  storyParagraphs: yatraCampaign.storyParagraphs,
  heroImage: await uploadImage(yatraCampaign.heroImage),
  bodyImage: await uploadImage(yatraCampaign.bodyImage),
  flagOffDate: yatraCampaign.flagOffDetails.date,
  flagOffLocation: yatraCampaign.flagOffDetails.location,
  flaggedOffBy: yatraCampaign.flagOffDetails.flaggedOffBy,
  conclusionDate: yatraCampaign.conclusionDetails.date,
  conclusionLocation: yatraCampaign.conclusionDetails.location,
  // `id` is dropped: Sanity generates its own keys for array items.
  stops: keyed(
    yatraCampaign.stops.map(({ id, ...stop }) => stop),
    'yatraStop'
  ),
  gallery: await buildGallery(yatraGallery),
});

/* --- Donate page ------------------------------------------------------ */

docs.push({
  _id: 'donatePage',
  _type: 'donatePage',
  title: donateContent.title,
  subtitle: donateContent.subtitle,
  bannerImage: await uploadImage(donateContent.bannerImage),
  featuredImage: await uploadImage(donateContent.featuredImage),
  tiers: keyed(donateContent.tiers, 'donationTier'),
});

/* ------------------------------------------------------------------ *
 * Write everything
 * ------------------------------------------------------------------ */

console.log(`\nUploaded ${uploaded} images${missing ? `, ${missing} missing and skipped` : ''}.`);

/*
 * Safety guard.
 *
 * This script overwrites documents wholesale. Running it after the foundation
 * has started editing would silently destroy their work, so once content
 * already exists it refuses unless --force is passed.
 */
const force = process.argv.includes('--force');
const existing = await client.fetch<number>('count(*[_type in $types])', {
  types: ['homePage', 'aboutPage', 'impactPage', 'yatraPage', 'donatePage', 'story', 'program', 'newsPoster', 'teamMember'],
});

if (existing > 0 && !force) {
  console.error(
    `\n⚠  Refusing to run: ${existing} documents already exist in this dataset.\n\n` +
      '   This script REPLACES documents wholesale. If the foundation has edited\n' +
      '   anything in /studio, running it would destroy that work.\n\n' +
      '   If you are certain you want to overwrite everything, re-run with:\n' +
      '       npm run seed -- --force\n'
  );
  process.exit(1);
}

console.log(`Writing ${docs.length} documents…`);

await docs
  .reduce((tx, doc) => tx.createOrReplace(doc as never), client.transaction())
  .commit();

console.log('\nDone. Start the site and open /studio to see the content.\n');

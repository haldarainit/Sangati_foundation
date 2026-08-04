/**
 * Bulk-add photos from a folder into one of the site's galleries.
 *
 * Faster than dragging 30 files into the admin panel one at a time, and unlike
 * the seed script it only APPENDS — it never replaces existing content, so it
 * is safe to run after the foundation has started editing.
 *
 *   npm run add-photos -- --folder "C:/path/to/yatra-photos" --to yatra
 *
 * --to accepts:
 *   yatra | impact | about | home     append to that page's gallery
 *   program:<slug>                    append to one programme's gallery,
 *                                     e.g. --to program:para-sports
 *   posters                           create one News & Posters entry per image
 *
 * Captions are left blank on purpose. Open /studio afterwards and write a
 * one-line description for each photo — it is read aloud to blind visitors.
 */

import { createClient } from '@sanity/client';
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TARGETS = {
  yatra: { id: 'yatraPage', label: 'Yatra Page' },
  impact: { id: 'impactPage', label: 'Impact Page' },
  about: { id: 'aboutPage', label: 'About Page' },
  home: { id: 'homePage', label: 'Homepage' },
} as const;

type TargetKey = keyof typeof TARGETS;

/** Turn "yatra-day-3_flag-off.jpg" into "Yatra Day 3 Flag Off". */
function titleFromFilename(file: string): string {
  return path
    .basename(file, path.extname(file))
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ------------------------------------------------------------------ *
 * Arguments
 * ------------------------------------------------------------------ */

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const folder = arg('folder');
const target = arg('to') ?? 'yatra';

const USAGE =
  '\nUsage:\n  npm run add-photos -- --folder "C:/path/to/photos" --to yatra\n\n' +
  '  --to accepts:\n' +
  `    ${Object.keys(TARGETS).join(' | ')}   append to that page's gallery\n` +
  '    program:<slug>              e.g. --to program:para-sports\n' +
  '    posters                     one News & Posters entry per image\n';

if (!folder) {
  console.error(USAGE);
  process.exit(1);
}

const isProgram = target.startsWith('program:');
const isPosters = target === 'posters';

if (!isProgram && !isPosters && !TARGETS[target as TargetKey]) {
  console.error(`\nUnknown --to "${target}".\n${USAGE}`);
  process.exit(1);
}

if (!existsSync(folder) || !statSync(folder).isDirectory()) {
  console.error(`\nFolder not found: ${folder}\n`);
  process.exit(1);
}

/* ------------------------------------------------------------------ *
 * Environment
 * ------------------------------------------------------------------ */

await loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    '\nMissing configuration in .env.local:\n' +
      '  NEXT_PUBLIC_SANITY_PROJECT_ID\n  NEXT_PUBLIC_SANITY_DATASET\n  SANITY_API_WRITE_TOKEN\n'
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-10-01', useCdn: false });

/* ------------------------------------------------------------------ *
 * Upload and append
 * ------------------------------------------------------------------ */

const files = readdirSync(folder)
  .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (!files.length) {
  console.error(`\nNo image files found in ${folder}\n`);
  process.exit(1);
}

/* Resolve the destination document. */
let docId: string;
let label: string;

if (isProgram) {
  const slug = target.slice('program:'.length);
  // `!(_id in path("drafts.**"))` skips unpublished drafts. Without it the
  // photos could land on a draft the client has open and never reach the site.
  const found = await client.fetch<{ _id: string; title: string } | null>(
    '*[_type == "program" && slug.current == $slug && !(_id in path("drafts.**"))][0]{_id, title}',
    { slug }
  );
  if (!found) {
    const all = await client.fetch<string[]>(
      '*[_type == "program" && !(_id in path("drafts.**"))].slug.current'
    );
    console.error(`\nNo programme with slug "${slug}".\n  Available: ${all.join(', ')}\n`);
    process.exit(1);
  }
  docId = found._id;
  label = `Programme: ${found.title}`;
} else if (isPosters) {
  docId = '';
  label = 'News & Posters';
} else {
  ({ id: docId, label } = TARGETS[target as TargetKey]);
}

console.log(`\nAdding ${files.length} photos to ${label}\n`);

const items = [];
const posterDocs = [];
let n = 0;

// Posters need a starting `order`; continue from the highest already in use.
const posterStart = isPosters
  ? ((await client.fetch<number>('math::max(*[_type == "newsPoster"].order)')) ?? 0)
  : 0;

for (const file of files) {
  const full = path.join(folder, file);
  const asset = await client.assets.upload('image', createReadStream(full), { filename: file });
  n += 1;
  console.log(`  ${String(n).padStart(3)}/${files.length}  ${file}`);

  const image = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  const title = titleFromFilename(file);

  if (isPosters) {
    posterDocs.push({
      _type: 'newsPoster',
      title,
      // Required fields need *something* or the document cannot be published.
      // These are obvious placeholders so nothing ships by accident.
      date: 'TO BE FILLED IN',
      category: 'Uncategorised',
      description: '',
      image,
      order: posterStart + n,
    });
  } else {
    items.push({
      _type: 'galleryItem',
      _key: `add${Date.now().toString(36)}${n.toString(36)}`,
      title,
      caption: '',
      image,
    });
  }
}

if (isPosters) {
  await posterDocs
    .reduce((tx, doc) => tx.create(doc as never), client.transaction())
    .commit();

  console.log(
    `\nDone. ${posterDocs.length} poster entries created.\n\n` +
      '⚠  Each one needs a Date, Category and Description before it reads well.\n' +
      '   Open /studio → News & Posters. The Date currently says "TO BE FILLED IN"\n' +
      '   so unfinished entries are easy to spot.\n'
  );
} else {
  await client.patch(docId).setIfMissing({ gallery: [] }).append('gallery', items).commit();

  console.log(
    `\nDone. ${items.length} photos appended to ${label}.\n\n` +
      '⚠  Captions are blank. Open /studio → ' +
      `${label} → Photo gallery and write one line per photo —\n` +
      '   that text is what blind visitors hear instead of the image.\n'
  );
}

/* ------------------------------------------------------------------ */

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

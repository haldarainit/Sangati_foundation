/**
 * Bulk-add photos from a folder into one of the site's galleries.
 *
 * Faster than dragging 30 files into the admin panel one at a time, and unlike
 * the seed script it only APPENDS — it never replaces existing content, so it
 * is safe to run after the foundation has started editing.
 *
 *   npm run add-photos -- --folder "C:/path/to/yatra-photos" --to yatra
 *
 * --to accepts: yatra | impact | about | home
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

/* ------------------------------------------------------------------ *
 * Arguments
 * ------------------------------------------------------------------ */

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const folder = arg('folder');
const target = (arg('to') ?? 'yatra') as TargetKey;

if (!folder) {
  console.error(
    '\nUsage:\n  npm run add-photos -- --folder "C:/path/to/photos" --to yatra\n\n' +
      `  --to accepts: ${Object.keys(TARGETS).join(' | ')}\n`
  );
  process.exit(1);
}

if (!TARGETS[target]) {
  console.error(`\nUnknown --to "${target}". Use one of: ${Object.keys(TARGETS).join(', ')}\n`);
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

const { id: docId, label } = TARGETS[target];

console.log(`\nAdding ${files.length} photos to ${label} (${docId})\n`);

const items = [];
let n = 0;

for (const file of files) {
  const full = path.join(folder, file);
  const asset = await client.assets.upload('image', createReadStream(full), { filename: file });
  n += 1;
  console.log(`  ${String(n).padStart(3)}/${files.length}  ${file}`);

  items.push({
    _type: 'galleryItem',
    _key: `add${Date.now().toString(36)}${n.toString(36)}`,
    // A readable starting point from the filename; edit these in the Studio.
    title: path
      .basename(file, path.extname(file))
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    caption: '',
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  });
}

await client
  .patch(docId)
  .setIfMissing({ gallery: [] })
  .append('gallery', items)
  .commit();

console.log(
  `\nDone. ${items.length} photos appended to ${label}.\n\n` +
    '⚠  Captions are blank. Open /studio → ' +
    `${label} → Photo gallery and write one line per photo —\n` +
    '   that text is what blind visitors hear instead of the image.\n'
);

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

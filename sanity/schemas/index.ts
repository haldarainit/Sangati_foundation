import type { SchemaTypeDefinition } from 'sanity';

import { blockContent } from './objects/blockContent';
import { galleryItem } from './objects/galleryItem';
import { statItem } from './objects/statItem';

import { newsPoster } from './documents/newsPoster';
import { program } from './documents/program';
import { story } from './documents/story';
import { teamMember } from './documents/teamMember';

import { aboutPage } from './singletons/aboutPage';
import { donatePage } from './singletons/donatePage';
import { homePage } from './singletons/homePage';
import { impactPage } from './singletons/impactPage';
import { yatraPage } from './singletons/yatraPage';

/** Document types that exist exactly once and must not be created or deleted. */
export const SINGLETON_TYPES = [
  'homePage',
  'aboutPage',
  'impactPage',
  'yatraPage',
  'donatePage',
] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable building blocks
  blockContent,
  galleryItem,
  statItem,
  // Collections the client adds to
  newsPoster,
  story,
  program,
  teamMember,
  // One-off pages
  homePage,
  aboutPage,
  impactPage,
  yatraPage,
  donatePage,
];

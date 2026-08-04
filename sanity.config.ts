'use client';

/**
 * Sanity Studio configuration — this powers the admin panel at /studio.
 *
 * To point it at a different Sanity project, change the values in `.env.local`
 * (see `.env.local.example`); nothing in this file needs editing.
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId, studioBasePath } from './sanity/env';
import { schemaTypes } from './sanity/schemas';
import { singletonActions, singletonTypes, structure } from './sanity/structure';

// When the environment variables are missing, /studio shows setup instructions
// instead of loading this config — see src/app/studio/[[...tool]]/page.tsx.
export default defineConfig({
  name: 'sangati-admin',
  title: 'Sangati Foundation — Website Admin',
  basePath: studioBasePath,
  projectId: projectId || 'not-configured',
  dataset: dataset || 'production',

  schema: {
    types: schemaTypes,
    // Hide one-off page types from the global "create new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Remove delete/duplicate/unpublish from one-off pages so they can't be
    // accidentally removed — they can only be edited and published.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },

  plugins: [
    structureTool({ structure }),
    // Query playground — useful for the developer, harmless for the client.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

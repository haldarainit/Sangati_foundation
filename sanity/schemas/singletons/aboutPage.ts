import { defineField, defineType } from 'sanity';

/**
 * The About page. Trustees and leadership members are separate documents
 * under "Team & Trustees" — this covers everything else on the page.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Page header', default: true },
    { name: 'brand', title: 'Brand idea' },
    { name: 'poem', title: 'Founding poem' },
    { name: 'timeline', title: 'Timeline preview' },
    { name: 'gallery', title: 'Photo gallery' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      group: 'intro',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page subtitle',
      type: 'text',
      rows: 3,
      group: 'intro',
    }),
    defineField({
      name: 'heroImage',
      title: 'Banner photo',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
    }),
    defineField({
      name: 'insetStoryImage',
      title: 'Inset story photo',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
    }),

    defineField({
      name: 'brandIdeaTitle',
      title: 'Title',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'brandIdeaQuoteHindi',
      title: 'Hindi meaning line',
      type: 'text',
      rows: 2,
      group: 'brand',
    }),
    defineField({
      name: 'brandIdeaDescription',
      title: 'Description',
      type: 'text',
      rows: 6,
      group: 'brand',
    }),

    defineField({
      name: 'poemTitle',
      title: 'Poem title',
      type: 'string',
      group: 'poem',
    }),
    defineField({
      name: 'poemLines',
      title: 'Poem lines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One item per line of the poem.',
      group: 'poem',
    }),
    defineField({
      name: 'poemInvitation',
      title: 'Invitation paragraph',
      type: 'text',
      rows: 5,
      group: 'poem',
    }),
    defineField({
      name: 'epigraphQuote',
      title: 'Epigraph quote',
      type: 'text',
      rows: 2,
      group: 'poem',
    }),
    defineField({
      name: 'epigraphAttribution',
      title: 'Epigraph author',
      type: 'string',
      group: 'poem',
    }),

    defineField({
      name: 'gallery',
      title: 'Photo gallery',
      type: 'array',
      of: [{ type: 'galleryItem' }],
      group: 'gallery',
      description:
        'Photos shown near the bottom of the About page. Visitors see the first 12 and can press "Show all" for the rest. Drag to reorder.',
    }),

    defineField({
      name: 'timelinePreview',
      title: 'Timeline preview',
      type: 'array',
      group: 'timeline',
      description: 'The short year-by-year list on the About page. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'timelineEntry',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule) => Rule.required().integer(),
            },
            {
              name: 'event',
              title: 'What happened',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: { select: { title: 'year', subtitle: 'event' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});

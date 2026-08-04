import { defineField, defineType } from 'sanity';

/**
 * The Impact page: headline numbers plus the year-by-year timeline.
 */
export const impactPage = defineType({
  name: 'impactPage',
  title: 'Impact Page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Page header', default: true },
    { name: 'stats', title: 'Key numbers' },
    { name: 'timeline', title: 'Timeline' },
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
      name: 'bannerImage',
      title: 'Banner photo',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
    }),

    defineField({
      name: 'keyStats',
      title: 'Key numbers',
      type: 'array',
      group: 'stats',
      description: 'The grid of headline figures. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'keyStat',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'Shown exactly as typed, e.g. "6,500 km" or "₹50,000".',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        },
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Photo gallery',
      type: 'array',
      of: [{ type: 'galleryItem' }],
      group: 'gallery',
      description:
        'Photos from across the foundation’s work. Visitors see the first 12 and can press "Show all" for the rest. Drag to reorder.',
    }),

    defineField({
      name: 'timeline',
      title: 'Year-by-year timeline',
      type: 'array',
      group: 'timeline',
      description: 'Add a new entry each year. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'milestone',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule) => Rule.required().integer(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'summary',
              title: 'One-line summary',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'details',
              title: 'Details',
              type: 'array',
              of: [{ type: 'text', rows: 3 }],
              description: 'One item per bullet point.',
            },
          ],
          preview: { select: { title: 'title', subtitle: 'summary' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Impact Page' }),
  },
});

import { defineField, defineType } from 'sanity';

/**
 * The Sangati Yatra campaign page, including the route map stops.
 */
export const yatraPage = defineType({
  name: 'yatraPage',
  title: 'Yatra Page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Headline & story', default: true },
    { name: 'details', title: 'Flag-off & conclusion' },
    { name: 'route', title: 'Route stops' },
    { name: 'gallery', title: 'Photo gallery' },
  ],
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      group: 'intro',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distance',
      title: 'Total distance',
      type: 'string',
      description: 'e.g. "6,500 km".',
      group: 'intro',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "20 Days".',
      group: 'intro',
    }),
    defineField({
      name: 'driverCount',
      title: 'Number of drivers',
      type: 'number',
      group: 'intro',
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'One item per paragraph.',
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
      name: 'bodyImage',
      title: 'In-story photo',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
    }),

    defineField({
      name: 'flagOffDate',
      title: 'Flag-off date',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'flagOffLocation',
      title: 'Flag-off location',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'flaggedOffBy',
      title: 'Flagged off by',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'conclusionDate',
      title: 'Conclusion date',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'conclusionLocation',
      title: 'Conclusion location',
      type: 'string',
      group: 'details',
    }),

    defineField({
      name: 'gallery',
      title: 'Yatra photo gallery',
      type: 'array',
      of: [{ type: 'galleryItem' }],
      group: 'gallery',
      description:
        'Photos from the journey. Add as many as you like — visitors see the first 12 and can press "Show all" for the rest. Drag to reorder.',
    }),

    defineField({
      name: 'stops',
      title: 'Route stops',
      type: 'array',
      group: 'route',
      description: 'The stops shown on the route map, in travel order. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'yatraStop',
          fields: [
            {
              name: 'name',
              title: 'Place name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'state',
              title: 'State',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'distanceKm',
              title: 'Distance so far (km)',
              type: 'number',
              description: 'Total kilometres covered by the time the team reached this stop.',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'date',
              title: 'Date',
              type: 'string',
              description: 'e.g. "17 Dec 2024".',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'What happened here',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isKeyStop',
              title: 'Major stop?',
              type: 'boolean',
              description: 'Major stops are highlighted on the route map.',
              initialValue: false,
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'state', key: 'isKeyStop' },
            prepare: ({ title, subtitle, key }: { title?: string; subtitle?: string; key?: boolean }) => ({
              title: key ? `★ ${title}` : title,
              subtitle,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Yatra Page' }),
  },
});

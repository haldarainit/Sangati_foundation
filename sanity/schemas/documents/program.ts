import { defineField, defineType } from 'sanity';

/**
 * One of the foundation's programmes. Listed on /programs and gets its own
 * page at /programs/<slug>.
 */
export const program = defineType({
  name: 'program',
  title: 'Programmes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Programme name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description:
        'Click "Generate" to build this from the name. It becomes the page link, e.g. /programs/accessibility.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      description: 'One or two lines shown on the programmes listing page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullContent',
      title: 'Full description',
      type: 'blockContent',
      description: 'The main text on the programme page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
      description:
        'Bullet points shown on the programme page. Click "Add item" for each one; drag to reorder.',
    }),
    defineField({
      name: 'keyStats',
      title: 'Key figures',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short badges, e.g. "100+ Toilet Drive".',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo gallery',
      type: 'array',
      of: [{ type: 'galleryItem' }],
      description: 'Photos shown at the bottom of the programme page. Drag to reorder.',
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers appear first on the programmes page.',
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: 'Position on page',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'image' },
  },
});

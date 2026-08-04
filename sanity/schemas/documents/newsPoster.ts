import { defineField, defineType } from 'sanity';

/**
 * A poster / media clipping in the News & Posters archive.
 * This is the quickest thing to publish: a title, a date, a photo, a line of text.
 */
export const newsPoster = defineType({
  name: 'newsPoster',
  title: 'News & Posters',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Poster image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Shown exactly as you type it, e.g. "December 2022" or "2023–2024".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Small tag shown on the card, e.g. "Media Coverage".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'One or two sentences describing the poster. Also used as the alt text.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkText',
      title: 'Link text (optional)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers appear first. Use 1, 2, 3… to control the order on the page.',
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
    select: { title: 'title', subtitle: 'date', media: 'image' },
  },
});

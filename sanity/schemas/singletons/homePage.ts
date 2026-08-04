import { defineField, defineType } from 'sanity';

/**
 * Everything on the homepage. There is only ever one of these documents.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'slides', title: 'Homepage slider', default: true },
    { name: 'hero', title: 'Top banner' },
    { name: 'stats', title: 'Statistics' },
    { name: 'whoWeAre', title: 'Who We Are' },
    { name: 'yatra', title: 'Yatra teaser' },
    { name: 'gallery', title: 'Photo gallery' },
  ],
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Slides',
      type: 'array',
      group: 'slides',
      description:
        'The big rotating banner at the very top of the homepage. The Sangati logo intro slide always plays first and is not listed here — these are the slides that follow it. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'heroSlide',
          fields: [
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              description:
                'Use a wide, high-resolution photo. Set the crop point so the subject stays visible on phones.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Small label',
              type: 'string',
              description: 'The little heading above the title, e.g. "PARA SPORTS & ADAPTIVE YOGA".',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'ctaText',
              title: 'Button text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'ctaLink',
              title: 'Button link',
              type: 'string',
              description: 'A page on this site, e.g. /programs/para-sports',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
        },
      ],
    }),

    defineField({
      name: 'heroHeadline',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Sub-headline',
      type: 'text',
      rows: 4,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Background photo',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Main button text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Main button link',
      type: 'string',
      description: 'A page on this site, e.g. /programs',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Second button text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Second button link',
      type: 'string',
      group: 'hero',
    }),

    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'statItem' }],
      group: 'stats',
      description: 'The four big numbers that count up on the homepage. Drag to reorder.',
    }),

    defineField({
      name: 'whoWeAreEyebrow',
      title: 'Small label above the title',
      type: 'string',
      group: 'whoWeAre',
    }),
    defineField({
      name: 'whoWeAreTitle',
      title: 'Section title',
      type: 'string',
      group: 'whoWeAre',
    }),
    defineField({
      name: 'whoWeAreImage',
      title: 'Section photo',
      type: 'image',
      options: { hotspot: true },
      group: 'whoWeAre',
    }),
    defineField({
      name: 'whoWeAreParagraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'One item per paragraph.',
      group: 'whoWeAre',
    }),
    defineField({
      name: 'whoWeAreCtaText',
      title: 'Button text',
      type: 'string',
      group: 'whoWeAre',
    }),
    defineField({
      name: 'whoWeAreCtaLink',
      title: 'Button link',
      type: 'string',
      group: 'whoWeAre',
    }),

    defineField({
      name: 'yatraEyebrow',
      title: 'Small label above the title',
      type: 'string',
      group: 'yatra',
    }),
    defineField({
      name: 'yatraTitle',
      title: 'Section title',
      type: 'string',
      group: 'yatra',
    }),
    defineField({
      name: 'yatraHeadline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      group: 'yatra',
    }),
    defineField({
      name: 'yatraDescription',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'yatra',
    }),
    defineField({
      name: 'yatraImage',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'yatra',
    }),
    defineField({
      name: 'yatraCtaText',
      title: 'Button text',
      type: 'string',
      group: 'yatra',
    }),
    defineField({
      name: 'yatraCtaLink',
      title: 'Button link',
      type: 'string',
      group: 'yatra',
    }),

    defineField({
      name: 'gallery',
      title: 'Photo gallery',
      type: 'array',
      of: [{ type: 'galleryItem' }],
      group: 'gallery',
      description:
        'The scrolling photo strip on the homepage. Click "Add item" to add a photo, drag to reorder.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});

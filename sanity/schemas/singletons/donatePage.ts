import { defineField, defineType } from 'sanity';

/**
 * The Donate page copy and donation tiers.
 *
 * Note: bank account details and 80G text live in `content/donate.ts` in the
 * code, not here — they change rarely and are safer to keep out of the panel.
 */
export const donatePage = defineType({
  name: 'donatePage',
  title: 'Donate Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tiers',
      title: 'Donation amounts',
      type: 'array',
      description: 'The suggested donation amounts and what each one funds. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'donationTier',
          fields: [
            {
              name: 'amount',
              title: 'Amount (number only)',
              type: 'number',
              description: 'e.g. 2500 — no ₹ sign, no commas.',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'label',
              title: 'Display label',
              type: 'string',
              description: 'How it appears on the button, e.g. "₹2,500".',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'fundsDescription',
              title: 'What this funds',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isPopular',
              title: 'Highlight as "most popular"?',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: { select: { title: 'label', subtitle: 'fundsDescription' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Donate Page' }),
  },
});

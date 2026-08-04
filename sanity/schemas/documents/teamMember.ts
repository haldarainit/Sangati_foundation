import { defineField, defineType } from 'sanity';

/**
 * A trustee or leadership team member shown on the About page.
 */
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team & Trustees',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Show in',
      type: 'string',
      options: {
        list: [
          { title: 'Trustees (detailed profile cards)', value: 'trustee' },
          { title: 'Leadership (short summary cards)', value: 'leadership' },
        ],
        layout: 'radio',
      },
      description:
        'A person can appear in both sections — in that case add them twice, once per section.',
      initialValue: 'leadership',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. "Founder Trustee | Sangati Foundation".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (optional)',
      type: 'string',
      description: 'Second line under the role, e.g. their professional description.',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'A square or portrait photo works best.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'One item per paragraph. Click "Add item" to add another paragraph.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of expertise (optional)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Shown as tags on trustee profile cards.',
    }),
    defineField({
      name: 'careerHighlights',
      title: 'Career highlights (optional)',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
    }),
    defineField({
      name: 'quote',
      title: 'Quote (optional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers appear first within their section.',
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
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
});

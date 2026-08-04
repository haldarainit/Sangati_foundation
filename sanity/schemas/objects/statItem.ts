import { defineField, defineType } from 'sanity';

/**
 * One of the big animated numbers on the homepage / impact page.
 */
export const statItem = defineType({
  name: 'statItem',
  title: 'Statistic',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Short caption under the number, e.g. "Fed Daily".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'numberValue',
      title: 'Number',
      type: 'number',
      description: 'Just the number, no commas or symbols — e.g. 6500. This is what counts up on screen.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Suffix',
      type: 'string',
      description: 'Anything shown right after the number, e.g. "km" or "+". Leave blank if none.',
    }),
    defineField({
      name: 'value',
      title: 'Display text',
      type: 'string',
      description: 'How the full number should read once the animation finishes, e.g. "6,500 km".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'One line explaining what this number means.',
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
});

import { defineField, defineType } from 'sanity';

/**
 * A single photo in any photo strip or gallery on the site.
 * Used by the homepage gallery and by each programme's gallery.
 */
export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Click the crop icon after uploading to choose which part stays visible on mobile.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Photo title',
      type: 'string',
      description: 'Short title shown above the caption.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption / alt text',
      type: 'text',
      rows: 2,
      description:
        'Describe the photo in one sentence. This is read aloud to blind visitors using screen readers, so please always fill it in.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'caption', media: 'image' },
  },
});

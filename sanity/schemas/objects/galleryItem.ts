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
      title: 'Photo title (optional)',
      type: 'string',
      description: 'Short label shown over the photo. Leave blank for no label.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption / alt text (optional)',
      type: 'text',
      rows: 2,
      description:
        'One sentence describing the photo. Screen readers read this aloud to blind visitors, so it is worth adding when you know what the photo shows — but you can upload first and fill it in later.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'caption', media: 'image' },
  },
});

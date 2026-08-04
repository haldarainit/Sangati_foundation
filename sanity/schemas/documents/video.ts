import { defineField, defineType } from 'sanity';

/**
 * A film or video, shown on the Films page.
 *
 * Videos are NOT uploaded here — you paste a YouTube or Vimeo link instead.
 * That keeps them free to host, lets them adjust quality automatically on slow
 * mobile connections, and gives you subtitles, which matter for viewers who are
 * deaf or hard of hearing.
 */
export const video = defineType({
  name: 'video',
  title: 'Films & Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'YouTube or Vimeo link',
      type: 'url',
      description:
        'Paste the normal link from your browser’s address bar, e.g. https://www.youtube.com/watch?v=XXXXXXX or https://youtu.be/XXXXXXX',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['http', 'https'] })
          .custom((value) => {
            if (!value) return true;
            const ok = /youtube\.com|youtu\.be|vimeo\.com/i.test(value);
            return ok || 'Please paste a YouTube or Vimeo link.';
          }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'A short summary of what the film covers.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Shown exactly as you type it, e.g. "March 2024".',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (optional)',
      type: 'string',
      description: 'e.g. "3 min 45 sec".',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Cover image (optional)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Leave blank for YouTube — the video’s own thumbnail is used automatically. Vimeo links need one set here.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show first in the video library?',
      type: 'boolean',
      description:
        'Pins this video to the front of the list. The documentary trailer at the very top of the Films page is fixed and is not affected by this.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers appear first.',
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  orderings: [
    { title: 'Position on page', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'thumbnail', featured: 'isFeatured' },
    prepare: ({ title, subtitle, media, featured }: Record<string, unknown>) => ({
      title: featured ? `★ ${title}` : (title as string),
      subtitle: subtitle as string,
      media: media as never,
    }),
  },
});

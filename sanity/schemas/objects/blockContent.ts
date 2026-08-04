import { defineArrayMember, defineType } from 'sanity';

/**
 * Rich text: paragraphs, headings, bold/italic, links, bullet lists and inline photos.
 * Used for long-form writing like story bodies and programme descriptions.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Sub-heading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'Web address',
                type: 'url',
                validation: (Rule) =>
                  Rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text (optional)',
          type: 'string',
          description:
            'Describe the photo for blind visitors using screen readers. Worth adding when you know what the photo shows.',
        },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
    }),
  ],
});

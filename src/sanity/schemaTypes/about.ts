import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  initialValue: {
    eyebrow: 'About Me',
    heading: 'Introduce yourself with a warm, accessible layout.',
    bio: 'Share your story, your style, and what people can expect when they work with you.',
    secondaryCopy: 'Use this space for your approach, experience, and the kind of sessions or projects you love most.',
    imageAlt: 'Portrait of the photographer',
    imageCaption: 'Replace with your final portrait and caption.',
  },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      description: 'Short label shown above the heading.',
    }),
    defineField({
      name: 'heading',
      title: 'Main heading',
      type: 'string',
      description: 'The main title shown on the About page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Primary paragraph',
      type: 'text',
      rows: 4,
      description: 'Main introductory paragraph for your About page.',
    }),
    defineField({
      name: 'secondaryCopy',
      title: 'Secondary paragraph',
      type: 'text',
      rows: 4,
      description: 'Optional second paragraph for additional context.',
    }),
    defineField({
      name: 'image',
      title: 'Portrait image',
      type: 'image',
      description: 'Main About page portrait. This appears next to the text.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Portrait alt text',
      type: 'string',
      description: 'Required for accessibility when a portrait image is present.',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.document?.image && !value) {
          return 'Add alt text when portrait image is set.'
        }
        return true
      }),
    }),
    defineField({
      name: 'imageCaption',
      title: 'Portrait caption',
      type: 'string',
      description: 'Optional caption shown below your portrait.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'About page',
        subtitle: subtitle || 'About page content',
        media,
      }
    },
  },
})

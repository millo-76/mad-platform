import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Portfolio Card',
  type: 'document',
  icon: ImageIcon,
  initialValue: {
    category: 'Featured work',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Card title',
      type: 'string',
      description: 'The main name shown for this gallery entry.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Gallery label',
      type: 'string',
      description: 'A short tag or category shown above the card title.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Supporting text',
      type: 'text',
      description: 'A short paragraph that describes the project or image set.',
    }),
    defineField({
      name: 'image',
      title: 'Primary card image',
      type: 'image',
      description: 'This is the cover image used on the gallery grid and in the popup viewer.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Popup image set',
      type: 'array',
      description: 'Add extra images that appear in the scrolling popup viewer when someone clicks the card.',
      of: [
        defineField({
          name: 'galleryImageItem',
          title: 'Gallery image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Popup image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Required for accessibility. Describe the photo clearly and specifically.',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              description: 'Optional note that appears below the image in the popup.',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Gallery image',
                subtitle: subtitle || 'Alt text not set',
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
      fallbackMedia: 'images.0.image',
    },
    prepare({title, subtitle, media, fallbackMedia}) {
      return {
        title: title || 'Portfolio card',
        subtitle: subtitle || 'Gallery card',
        media: media || fallbackMedia,
      }
    },
  },
})

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
      title: 'Label',
      type: 'string',
      description: 'A short tag or category for the card.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Supporting text',
      type: 'text',
      description: 'A short paragraph that describes the piece.',
    }),
    defineField({
      name: 'image',
      title: 'Card image',
      type: 'image',
      description: 'Choose the image that represents this card.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Portfolio card',
        subtitle: subtitle || 'Uncategorized',
        media,
      }
    },
  },
})

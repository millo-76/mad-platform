import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Photo',
  type: 'document',
  icon: ImageIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'galleryItem'}),
    defineField({
      name: 'image',
      title: 'Photo upload',
      type: 'image',
      description: 'Upload the image to show in the gallery grid.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gridSize',
      title: 'Gallery size',
      type: 'string',
      description: 'Choose how much space this photo should take in the gallery grid.',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Wide', value: 'wide' },
          { title: 'Tall', value: 'tall' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isArchived',
      title: 'Archive this photo',
      type: 'boolean',
      description: 'Archived photos stay in Studio for later reuse but are hidden from the public gallery.',
    }),
  ],
  preview: {
    select: {
      title: 'image.asset.originalFilename',
      createdAt: '_createdAt',
      media: 'image',
      isArchived: 'isArchived',
      gridSize: 'gridSize',
    },
    prepare({title, createdAt, media, isArchived, gridSize}) {
      const dateLabel = createdAt ? new Date(createdAt).toLocaleDateString() : 'New upload'

      return {
        title: title || 'Uploaded photo',
        subtitle: `${gridSize || 'medium'} • ${dateLabel}${isArchived ? ' • Archived' : ''}`,
        media,
      }
    },
  },
})

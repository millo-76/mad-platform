import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Photo',
  type: 'document',
  icon: ImageIcon,
  initialValue: {
    isArchived: false,
  },
  fields: [
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
    },
    prepare({title, createdAt, media, isArchived}) {
      const dateLabel = createdAt ? new Date(createdAt).toLocaleDateString() : 'New upload'

      return {
        title: title || 'Uploaded photo',
        subtitle: `${dateLabel}${isArchived ? ' • Archived' : ''}`,
        media,
      }
    },
  },
})

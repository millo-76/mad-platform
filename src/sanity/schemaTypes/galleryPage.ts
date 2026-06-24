import {defineField, defineType} from 'sanity'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  initialValue: {
    eyebrow: 'Gallery',
    heading: 'A growing collection of recent work',
    sectionCopy: 'Add new images to the end of the grid and archive older ones whenever you want to rotate the collection.',
  },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      description: 'Short line shown above the main heading.',
    }),
    defineField({
      name: 'heading',
      title: 'Main heading',
      type: 'string',
      description: 'Headline shown at the top of the gallery page.',
    }),
    defineField({
      name: 'sectionCopy',
      title: 'Supporting text',
      type: 'text',
      description: 'Optional paragraph shown below the heading.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Gallery page',
        subtitle: subtitle || 'Gallery intro copy',
      }
    },
  },
})
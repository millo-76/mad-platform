import {defineField, defineType} from 'sanity'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  initialValue: {
    galleryStyle: 'grid',
    eyebrow: 'Gallery',
    heading: 'A growing collection of recent work',
    sectionCopy: 'Add new images to the end of the grid and archive older ones whenever you want to rotate the collection.',
  },
  fields: [
    defineField({
      name: 'galleryStyle', title: 'Default gallery style', type: 'string',
      description: 'Preview styles in Gallery photos, then publish this setting to choose the view visitors see first.',
      initialValue: 'grid',
      options: {layout: 'radio', list: [{title: 'Grid', value: 'grid'}, {title: 'Carousel', value: 'carousel'}, {title: 'Albums', value: 'albums'}]},
    }),
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
import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      description: 'Small text above the main heading',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading on hero section',
    }),
    defineField({
      name: 'heroCopy',
      title: 'Hero Copy',
      type: 'text',
      description: 'Descriptive text in hero section',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        defineField({
          name: 'highlightItem',
          title: 'Highlight Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
      description: 'Features/highlights to display in card grid',
    }),
  ],
})

import {defineField, defineType} from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the heading',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for contact section',
    }),
    defineField({
      name: 'sectionCopy',
      title: 'Section Copy',
      type: 'text',
      description: 'Introductory text for contact section',
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Form Success Message',
      type: 'text',
      description: 'Message shown after form submission',
    }),
  ],
})

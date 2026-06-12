import {defineField, defineType} from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  initialValue: {
    eyebrow: 'Let’s talk',
    heading: 'Start the conversation',
    sectionCopy:
      'Tell visitors what you want them to do next, whether that is booking a project or sending an introduction.',
    formSuccessMessage: 'Thanks for reaching out. We will get back to you soon.',
  },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      description: 'Short line above the main heading.',
    }),
    defineField({
      name: 'heading',
      title: 'Main heading',
      type: 'string',
      description: 'The largest headline on the page.',
    }),
    defineField({
      name: 'sectionCopy',
      title: 'Supporting text',
      type: 'text',
      description: 'A short paragraph that explains how to get in touch.',
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Success message',
      type: 'text',
      description: 'Message shown after a form is submitted successfully.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Contact page',
        subtitle: subtitle || 'Contact details and form copy',
      }
    },
  },
})

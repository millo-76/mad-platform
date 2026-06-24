import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ Page',
  type: 'document',
  initialValue: {
    heading: 'Frequently Asked Questions',
    faqItems: [
      {
        _type: 'faqItem',
        question: 'How can I customize this site?',
        answer:
          'You can edit content through the Sanity Studio, which is accessible from the admin section. The site structure and styling can be modified by editing the code in the repository.',
      },
      {
        _type: 'faqItem',
        question: 'Can I add more gallery items?',
        answer:
          'Yes. You can add, edit, and organize gallery items directly from the Sanity Studio. Each item can include multiple images, descriptions, and categories.',
      },
      {
        _type: 'faqItem',
        question: 'How do I set up the contact form?',
        answer:
          'The contact form is pre-configured and ready to use. You can customize the form fields and email settings through the Sanity configuration.',
      },
      {
        _type: 'faqItem',
        question: 'Is this site mobile-friendly?',
        answer:
          'Yes, this site is designed to be fully responsive and works seamlessly on mobile devices, tablets, and desktops.',
      },
      {
        _type: 'faqItem',
        question: 'How do I track visitor statistics?',
        answer:
          'You can integrate analytics tools like Google Analytics or Vercel Analytics to track visitor data and engagement metrics.',
      },
    ],
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Main heading',
      type: 'string',
      description: 'The title shown at the top of the FAQ page.',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ items',
      type: 'array',
      description: 'Add, remove, and reorder questions and answers.',
      of: [
        defineField({
          name: 'faqItem',
          title: 'FAQ item',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'FAQ item',
                subtitle: subtitle || 'Add an answer for this question',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      items: 'faqItems',
    },
    prepare({title, items}) {
      return {
        title: title || 'FAQ page',
        subtitle: `${items?.length || 0} question${items?.length === 1 ? '' : 's'}`,
      }
    },
  },
})
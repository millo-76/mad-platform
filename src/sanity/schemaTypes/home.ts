import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  initialValue: {
    sections: [
      {
        _type: 'heroSection',
        eyebrow: 'Welcome to the studio',
        title: 'Build a homepage without touching code.',
        copy: 'Add, remove, and rearrange sections from the Studio. Each block can be tailored to your brand, projects, and calls to action.',
        primaryActionLabel: 'View Gallery',
        primaryActionHref: '/gallery',
        secondaryActionLabel: 'Contact',
        secondaryActionHref: '/contact',
      },
      {
        _type: 'cardGridSection',
        eyebrow: 'Homepage cards',
        title: 'Change cards freely',
        copy: 'Use this section for featured work, services, announcements, or anything else you want to highlight.',
        cards: [
          {
            _type: 'homeCard',
            eyebrow: 'Featured',
            title: 'Curated Work',
            description: 'Showcase projects, campaigns, or stories that matter most.',
            linkLabel: 'Open gallery',
            linkHref: '/gallery',
          },
          {
            _type: 'homeCard',
            eyebrow: 'Process',
            title: 'Simple Flow',
            description: 'Guide visitors toward the next step with a clear path.',
            linkLabel: 'Contact us',
            linkHref: '/contact',
          },
        ],
      },
      {
        _type: 'ctaSection',
        eyebrow: 'Next step',
        title: 'Need a custom section?',
        copy: 'Add another block and tailor it to match the content you want on the page.',
        buttonLabel: 'Open Studio',
        buttonHref: '/studio',
      },
    ],
  },
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Add, remove, and reorder homepage sections. Think of each item as a building block on the page.',
      options: {
        layout: 'grid',
      },
      of: [
        defineField({
          name: 'heroSection',
          title: 'Hero Banner',
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Small label',
              type: 'string',
              description: 'Short line above the main heading.',
            }),
            defineField({
              name: 'title',
              title: 'Main heading',
              type: 'string',
              description: 'The largest text in this section.',
            }),
            defineField({
              name: 'copy',
              title: 'Supporting text',
              type: 'text',
              description: 'A short paragraph that explains the section.',
            }),
            defineField({
              name: 'primaryActionLabel',
              title: 'Primary button text',
              type: 'string',
            }),
            defineField({
              name: 'primaryActionHref',
              title: 'Primary button link',
              type: 'string',
            }),
            defineField({
              name: 'secondaryActionLabel',
              title: 'Secondary button text',
              type: 'string',
            }),
            defineField({
              name: 'secondaryActionHref',
              title: 'Secondary button link',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'eyebrow',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Hero banner',
                subtitle: subtitle ? `Eyebrow: ${subtitle}` : 'Top-of-page intro block',
              }
            },
          },
        }),
        defineField({
          name: 'cardGridSection',
          title: 'Card Grid',
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Small label',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Section heading',
              type: 'string',
              description: 'Heading shown above the cards.',
            }),
            defineField({
              name: 'copy',
              title: 'Supporting text',
              type: 'text',
              description: 'Short intro for the card group.',
            }),
            defineField({
              name: 'cards',
              title: 'Cards in this section',
              type: 'array',
              description: 'Add, remove, and reorder the cards shown in this block.',
              of: [
                defineField({
                  name: 'homeCard',
                  title: 'Card',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'eyebrow',
                      title: 'Small label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'title',
                      title: 'Card title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Card description',
                      type: 'text',
                    }),
                    defineField({
                      name: 'linkLabel',
                      title: 'Button text',
                      type: 'string',
                    }),
                    defineField({
                      name: 'linkHref',
                      title: 'Button link',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'eyebrow',
                    },
                    prepare({title, subtitle}) {
                      return {
                        title: title || 'Card',
                        subtitle: subtitle ? `Label: ${subtitle}` : 'Reusable homepage card',
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
              cards: 'cards',
            },
            prepare({title, cards}) {
              return {
                title: title || 'Card grid',
                subtitle: `${cards?.length || 0} card${cards?.length === 1 ? '' : 's'}`,
              }
            },
          },
        }),
        defineField({
          name: 'textSection',
          title: 'Text Block',
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Small label',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Section heading',
              type: 'string',
            }),
            defineField({
              name: 'copy',
              title: 'Supporting text',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'eyebrow',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Text block',
                subtitle: subtitle ? `Label: ${subtitle}` : 'Simple content block',
              }
            },
          },
        }),
        defineField({
          name: 'ctaSection',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Small label',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Section heading',
              type: 'string',
            }),
            defineField({
              name: 'copy',
              title: 'Supporting text',
              type: 'text',
            }),
            defineField({
              name: 'buttonLabel',
              title: 'Button text',
              type: 'string',
            }),
            defineField({
              name: 'buttonHref',
              title: 'Button link',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'eyebrow',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Call to action',
                subtitle: subtitle ? `Label: ${subtitle}` : 'Action block',
              }
            },
          },
        }),
      ],
    }),
  ],
})

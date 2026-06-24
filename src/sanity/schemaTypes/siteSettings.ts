import {defineField, defineType} from 'sanity'

const defaultNavigationItems = [
  {label: 'About', href: '/about'},
  {label: 'Gallery', href: '/gallery'},
  {label: 'FAQ', href: '/faq'},
  {label: 'Contact', href: '/contact'},
]

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  initialValue: {
    navigationItems: defaultNavigationItems,
    socialLinks: [],
  },
  fields: [
    defineField({
      name: 'navigationItems',
      title: 'Header navigation',
      type: 'array',
      description: 'Reorder the main pages shown in the site header.',
      of: [
        defineField({
          name: 'navigationItem',
          title: 'Navigation item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link path',
              type: 'string',
              description: 'Use internal paths such as /about or /contact.',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
      validation: Rule => Rule.min(1),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Footer social links',
      type: 'array',
      description: 'Add, remove, and reorder social icons shown in the footer.',
      of: [
        defineField({
          name: 'socialLink',
          title: 'Social link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'Pinterest', value: 'pinterest'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'X / Twitter', value: 'x'},
                ],
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: Rule => Rule.required().uri({allowRelative: false, scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Social link',
                subtitle,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site settings',
        subtitle: 'Navigation order and footer social links',
      }
    },
  },
})
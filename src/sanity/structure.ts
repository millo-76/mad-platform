import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Site content')
    .items([
      S.documentTypeListItem('home').title('Home page'),
      S.documentTypeListItem('about').title('About page'),
      S.documentTypeListItem('galleryPage').title('Gallery page'),
      S.documentTypeListItem('contact').title('Contact page'),
      S.documentTypeListItem('siteSettings').title('Site settings'),
      S.documentTypeListItem('faq').title('FAQ page'),
      S.divider(),
      orderableDocumentListDeskItem({type: 'galleryItem', title: 'Gallery photos', S, context}),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['home', 'about', 'galleryPage', 'contact', 'faq', 'siteSettings', 'galleryItem'].includes(item.getId()!),
      ),
    ])

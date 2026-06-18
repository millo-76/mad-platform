import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Site content')
    .items([
      S.documentTypeListItem('home').title('Home page'),
      S.documentTypeListItem('about').title('About page'),
      S.documentTypeListItem('contact').title('Contact page'),
      S.documentTypeListItem('faq').title('FAQ page'),
      S.divider(),
      S.documentTypeListItem('galleryItem').title('Portfolio cards'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['home', 'about', 'contact', 'faq', 'galleryItem'].includes(item.getId()!),
      ),
    ])


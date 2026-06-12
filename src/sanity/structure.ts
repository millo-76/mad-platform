import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('home').title('Home Page'),
      S.documentTypeListItem('contact').title('Contact Page'),
      S.divider(),
      S.documentTypeListItem('galleryItem').title('Gallery Items'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['home', 'contact', 'galleryItem'].includes(item.getId()!),
      ),
    ])


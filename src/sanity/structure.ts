import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Site content')
    .items([
      S.documentTypeListItem('home').title('Home page'),
      S.documentTypeListItem('about').title('About page'),
      S.documentTypeListItem('galleryPage').title('Gallery page'),
      S.documentTypeListItem('contact').title('Contact page'),
      S.documentTypeListItem('siteSettings').title('Site settings'),
      S.divider(),
      S.documentTypeListItem('galleryItem').title('Gallery photos'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['home', 'about', 'galleryPage', 'contact', 'siteSettings', 'galleryItem'].includes(item.getId()!),
      ),
    ])


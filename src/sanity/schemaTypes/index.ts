import { type SchemaTypeDefinition } from 'sanity'
import { home } from './home'
import { galleryItem } from './galleryItem'
import { contact } from './contact'
import { about } from './about'
import { faq } from './faq'
import { galleryPage } from './galleryPage'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, galleryItem, galleryPage, about, contact, faq, siteSettings],
}

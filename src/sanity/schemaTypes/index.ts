import { type SchemaTypeDefinition } from 'sanity'
import { home } from './home'
import { galleryItem } from './galleryItem'
import { contact } from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, galleryItem, contact],
}

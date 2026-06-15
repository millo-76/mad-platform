import { type SchemaTypeDefinition } from 'sanity'
import { home } from './home'
import { galleryItem } from './galleryItem'
import { contact } from './contact'
import { about } from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, galleryItem, about, contact],
}

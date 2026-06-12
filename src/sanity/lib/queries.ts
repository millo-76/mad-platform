import { client } from './client'

// Fetch home page content
export async function getHomeContent() {
  const query = `*[_type == "home"][0]`
  return client.fetch(query)
}

// Fetch all gallery items
export async function getGalleryItems() {
  const query = `*[_type == "galleryItem"] | order(_createdAt desc)`
  return client.fetch(query)
}

// Fetch contact page content
export async function getContactContent() {
  const query = `*[_type == "contact"][0]`
  return client.fetch(query)
}

// Fetch a single gallery item
export async function getGalleryItemById(id: string) {
  const query = `*[_type == "galleryItem" && _id == $id][0]`
  return client.fetch(query, { id })
}

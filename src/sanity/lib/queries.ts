import { client } from './client'

export type SiteNavigationItem = {
  label: string
  href: string
}

export type SiteSocialLink = {
  platform: string
  url: string
}

export type SiteSettings = {
  navigationItems?: SiteNavigationItem[]
  socialLinks?: SiteSocialLink[]
}

export type GalleryPageContent = {
  eyebrow?: string
  heading?: string
  sectionCopy?: string
}

// Fetch home page content
export async function getHomeContent() {
  const query = `*[_type == "home"][0]`
  return client.fetch(query)
}

// Fetch site-wide navigation and footer links
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0]`
  return client.fetch(query)
}

// Fetch gallery page text content
export async function getGalleryPageContent(): Promise<GalleryPageContent | null> {
  const query = `*[_type == "galleryPage"][0]`
  return client.fetch(query)
}

// Fetch all gallery items
export async function getGalleryItems() {
  const query = `*[_type == "galleryItem" && !coalesce(isArchived, false)] | order(_createdAt asc)`
  return client.fetch(query)
}

// Fetch about page content
export async function getAboutContent() {
  const query = `*[_type == "about"][0]`
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

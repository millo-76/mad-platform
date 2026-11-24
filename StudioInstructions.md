# Studio User Guide

This Studio is the content editor for the MAD Platform site. The live site is split across three main routes:

- Home: `/`
- Gallery: `/gallery`
- Contact: `/contact`
- Studio: `/studio`

If a document is missing, the site falls back to built-in placeholder content so the page still renders.

## Screenshots

These screenshots show the current live routes and help you see where each Studio entry appears on the site.

### Home page

![Home page screenshot](public/studio-guide/home-page.png)

### Gallery page

![Gallery page screenshot](public/studio-guide/gallery-page.png)

### Contact page

![Contact page screenshot](public/studio-guide/contact-page.png)

## What each entry controls

### Home Page

The `Home Page` document controls the content on `/`.

The page is built from a `Sections` array, and the order in the Studio is the order shown on the page.

Section placement on the page:

- `Hero Banner` appears as the large opening section at the top of the page.
- `Card Grid` appears as a grid of cards below the hero.
- `Text Block` appears as a simple text-only content section.
- `Call to Action` appears as a closing CTA panel.

#### Hero Banner fields

| Field | What it controls | Example content |
| --- | --- | --- |
| `eyebrow` | Small label above the headline | `Welcome to the studio` |
| `title` | Main hero heading | `Build a homepage without touching code.` |
| `copy` | Supporting paragraph | `Add, remove, and rearrange sections from the Studio. Each block can be tailored to your brand, projects, and calls to action.` |
| `contentAlignment` | Aligns the hero text and buttons left, center, or right | `left` |
| `image` | Optional hero image beside the text | A portrait or branded detail shot |
| `imageAlt` | Accessible alt text for the hero image | `Portrait of the photographer in warm studio light` |
| `primaryActionLabel` | Main button text | `View Gallery` |
| `primaryActionHref` | Main button link | `/gallery` |
| `secondaryActionLabel` | Secondary button text | `Contact` |
| `secondaryActionHref` | Secondary button link | `/contact` |

#### Card Grid fields

| Field | What it controls | Example content |
| --- | --- | --- |
| `eyebrow` | Small label above the section title | `Homepage cards` |
| `title` | Section heading shown above the cards | `Change cards freely` |
| `copy` | Short intro paragraph for the card group | `Use this section for featured work, services, announcements, or anything else you want to highlight.` |
| `cards` | The list of homepage cards | Two cards in the default content |

#### Card fields inside `cards`

| Field | What it controls | Example content |
| --- | --- | --- |
| `eyebrow` | Small tag on each card | `Featured` |
| `title` | Card title | `Curated Work` |
| `description` | Card body copy | `Showcase projects, campaigns, or stories that matter most.` |
| `linkLabel` | Card button text | `Open gallery` |
| `linkHref` | Card button link | `/gallery` |

| Field | What it controls | Example content |
| --- | --- | --- |
| `eyebrow` | Small tag on the second card | `Process` |
| `title` | Second card title | `Simple Flow` |
| `description` | Second card body copy | `Guide visitors toward the next step with a clear path.` |
| `linkLabel` | Second card button text | `Contact us` |
| `linkHref` | Second card button link | `/contact` |

#### Text Block fields

| Field | What it controls | Example content |
| --- | --- | --- |
| `eyebrow` | Small label above the block | `Studio notes` |
| `title` | Text block heading | `A simple content section` |
| `copy` | Paragraph text for the block | `Use this area for supporting copy, about text, or a short announcement.` |

#### Call to Action fields

| Field | What it controls | Example content |
| --- | --- | --- |
| `eyebrow` | Small label above the CTA | `Next step` |
| `title` | CTA heading | `Need a custom section?` |
| `copy` | CTA supporting text | `Add another block and tailor it to match the content you want on the page.` |
| `buttonLabel` | CTA button text | `Open Studio` |
| `buttonHref` | CTA button link | `/studio` |

The homepage code also supports reordering sections, so you can change the narrative flow without changing code.

### Gallery photos and layouts

Open **Gallery photos** for a visual grid. Choose **Add photo** to upload, or **Edit photo** on a card to change its image, crop/hotspot, size, description, album, or archive setting. Publish photo edits to update the website.

Choose **Preview gallery** to see active photos, including draft changes. Try **Grid**, **Carousel**, and **Albums** in Studio. Set **Default Studio preview style** under **Gallery page** to choose which layout opens in Studio. Visitors always see the album layout.

Give photos the same **Album** name to group them in Albums view. Photos without an album appear under Uncategorized. Use **Gallery photo order** to drag photos into order across the gallery.

To hide a photo temporarily, enable **Archive this photo** and publish. In the visual grid, **Show archived photos** includes hidden entries so you can edit or restore them. To remove an entry permanently, choose **Delete photo**, then **Permanently delete photo** in the confirmation. This removes both the published entry and its draft immediately. The uploaded image asset remains in the media library so other content using it is unaffected. Your Sanity account must have delete permission.

On the website or Studio preview, select any photo to enlarge it. Use the arrows beside the enlarged photo, swipe horizontally, or use the left/right arrow keys to browse. Photos scroll smoothly, respecting reduced-motion preferences. The × button, Escape, or clicking the backdrop closes the viewer. Carousel photos can also be swiped or scrolled horizontally.

| Field | What it controls |
| --- | --- |
| Photo title | Optional name, shown in the enlarged viewer |
| Image description | Accessible description for screen readers |
| Album | Grouping in Albums view |
| Photo upload | Image and crop/hotspot |
| Gallery size | Photo proportions in the grid |
| Archive this photo | Hides the photo while retaining its entry |

### Contact Page

The `Contact Page` document controls the copy at the top of `/contact`.

| Field | What it controls | Example content |
| --- | --- | --- |
| `eyebrow` | Small label above the heading | `Contact` |
| `heading` | Large page title | `Start a project conversation` |
| `sectionCopy` | Intro paragraph above the form | `This form is set up for validation and user feedback. Connect it to your API route` |
| `formSuccessMessage` | Message shown after a successful submission | `Thanks for reaching out. We'll get back to you soon!` |

The form fields themselves are built into the site code, so the Studio only controls the page copy and success state text.

## Suggested editing workflow

1. Edit the relevant document type in Preview Studio (dataset: `staging`).
2. Save the entry.
3. Check the matching Preview deployment page:
   - Home content on `/`
   - Gallery content on `/gallery`
   - Contact content on `/contact`
4. Use the preview/title in the Studio to confirm you edited the right document.
5. After approval, publish via Sanity Content Release so the change moves to production.

## Environment guardrails

- `main` branch maps to Vercel Production and Sanity dataset `production`.
- `dev` branch maps to Vercel Preview and Sanity dataset `staging`.
- All content edits must be validated in Preview before intentional release to Production.

## Quick reference

- Homepage sections are managed in one `Home Page` document.
- Gallery cards are managed one document per card.
- Contact page text is managed in one `Contact Page` document.
- The site has placeholder fallbacks, so missing content will not break the page.

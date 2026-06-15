import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const isPreviewDataset = dataset === 'staging'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Fetch directly from Sanity so published edits appear as quickly as possible.
  useCdn: false,
})

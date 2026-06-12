import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const isPreviewDataset = dataset === 'staging'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Preview/staging should show freshest edits quickly, production can use CDN caching.
  useCdn: !isPreviewDataset,
})

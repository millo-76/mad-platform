export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-12'

const allowedDatasets = ['production', 'staging'] as const

export const dataset = assertDataset(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

function assertDataset(v: string | undefined, errorMessage: string) {
  const value = assertValue(v, errorMessage)

  if (!allowedDatasets.includes(value as (typeof allowedDatasets)[number])) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SANITY_DATASET: ${value}. Expected one of: ${allowedDatasets.join(', ')}`
    )
  }

  return value
}

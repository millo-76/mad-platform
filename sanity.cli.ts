/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const allowedDatasets = ['production', 'staging'] as const

if (!dataset || !allowedDatasets.includes(dataset as (typeof allowedDatasets)[number])) {
	throw new Error(
		`Invalid NEXT_PUBLIC_SANITY_DATASET in Sanity CLI config. Expected one of: ${allowedDatasets.join(', ')}`
	)
}

export default defineCliConfig({ api: { projectId, dataset } })

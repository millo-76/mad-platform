# Mad Made

Mad Made Platform is a Next.js application with Sanity Studio integration and Supabase-backed data access.

## Tech Stack

- Next.js
- React
- TypeScript
- Sanity Studio
- Supabase

## Requirements

- Node.js 20+
- npm

## Local Setup

1. Install dependencies:

	npm install

2. Create a local environment file:

	touch .env.local

3. Set the required environment variables in .env.local:

	NEXT_PUBLIC_SANITY_PROJECT_ID=
	NEXT_PUBLIC_SANITY_DATASET=staging
	NEXT_PUBLIC_SANITY_API_VERSION=2026-06-12
	NEXT_PUBLIC_SUPABASE_URL=
	NEXT_PUBLIC_SUPABASE_ANON_KEY=

4. Start development:

	npm run dev

## Available Scripts

- npm run dev: Start development server
- npm run build: Create production build
- npm run start: Start production server
- npm run lint: Run lint checks

## Sanity Studio

- Studio route: /studio
- Studio config: sanity.config.ts
- Schema files: src/sanity/schemaTypes/

## Branch And Dataset Rules

This repository follows a strict branch-to-environment model:

| Environment | Vercel branch | Sanity dataset |
| --- | --- | --- |
| Production | `main` | `production` |
| Preview/Staging | `dev` (Preview deployments) | `staging` |

Use these Vercel environment variables:

### Vercel Production (main)

`NEXT_PUBLIC_SANITY_DATASET=production`

### Vercel Preview (dev)

`NEXT_PUBLIC_SANITY_DATASET=staging`

Safety rule:

- Preview is where edits are tested.
- Production only updates after an intentional publish/release action.

## Sanity Content Releases Workflow

Use Sanity Content Releases as the default publishing flow:

1. Edit content in Preview Studio (dataset: `staging`).
2. Let the Preview Vercel deployment rebuild.
3. Review and approve content changes.
4. Run the Content Release to publish approved changes.
5. Production site rebuilds from production content.

This keeps production stable and ensures all content is validated first.

See the operational checklist: `RELEASE_CHECKLIST.md`.

## Production Rebuild Webhook

Configure a Sanity webhook so production rebuilds when production content changes:

1. In Sanity project settings, create a webhook scoped to dataset `production`.
2. Set the webhook URL to your Vercel Deploy Hook URL for the production project.
3. Trigger on create/update/delete as needed.
4. Save and test the webhook.

Result: production rebuilds automatically only when production dataset content is published.

## Database Files

SQL resources are in db/:

- schema.sql
- policies.sql
- seed.sql

## Fixing GitHub Push Rejection (Large Files)

If a push fails with errors like:

- File .next/cache/... exceeds GitHub file size limit
- File node_modules/... exceeds GitHub file size limit

the large files are already in commit history and must be removed from history (not only deleted locally).

### 1) Confirm ignored build/dependency paths

.gitignore should include:

- node_modules/
- .next/

### 2) Install git-filter-repo

Use your system package manager or pipx/pip to install git-filter-repo.

### 3) Rewrite history to remove the large paths

Run from repo root:

git filter-repo --path-glob '.next/**' --path-glob 'node_modules/**' --invert-paths

### 4) Re-add remote if needed

Some filter-repo runs remove remotes:

git remote add origin <your-repo-url>

### 5) Force-push cleaned history

git push --force origin main

Important:

- This rewrites commit history.
- Anyone else with a clone must re-clone or hard reset to the new history.

## Notes

- Do not commit generated folders like node_modules/ or .next/.
- If large binaries are intentionally required, use Git LFS.

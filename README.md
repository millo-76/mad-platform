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
	NEXT_PUBLIC_SANITY_DATASET=
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

# Release Checklist

This checklist enforces the workflow:

- `main` = production
- `dev` = preview/staging
- Studio edits happen in preview first

## Environment Mapping (Do Not Change)

| Environment | Vercel branch | Sanity dataset |
| --- | --- | --- |
| Production | `main` | `production` |
| Preview/Staging | `dev` (Preview) | `staging` |

Required Vercel variables:

- Production (`main`): `NEXT_PUBLIC_SANITY_DATASET=production`
- Preview (`dev`): `NEXT_PUBLIC_SANITY_DATASET=staging`

## Standard Content Release Flow

1. Make content edits in Preview Studio (`staging` dataset).
2. Confirm Preview deployment rebuilds and loads correctly.
3. Review changed pages visually and verify no console/runtime errors.
4. Validate schema/content consistency (no missing required fields).
5. Create/run a Sanity Content Release for approved changes.
6. Confirm production dataset receives the approved content.
7. Confirm production deploy/rebuild completes successfully.
8. Smoke test production routes (`/`, `/gallery`, `/contact`, `/studio`).

## Guardrails

- Never edit production content directly for unreviewed changes.
- Never merge unfinished content work to `main`.
- Production updates only happen through intentional publish/release action.

## Webhook Requirement

Ensure a Sanity webhook exists for dataset `production` that triggers the Vercel production deploy hook on create/update/delete.

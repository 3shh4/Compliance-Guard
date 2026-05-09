# Architecture

ShipTrust is a local Vite + React + TypeScript SPA. The current prototype has no backend, database, authentication or external AI dependency.

## Flow

1. User starts on the guided ShipTrust home screen.
2. User chooses Light Check, Deep Research or Demo Scan.
3. The app builds a `TrustProfile`.
4. The local rules engine creates `TrustFinding` items.
5. Scoring, developer tasks, trust page sections and markdown report output are generated locally.
6. The user reviews results, opens finding details, previews a trust page draft or exports markdown.

## Core modules

- `src/models/trust.ts` defines the ShipTrust domain model.
- `src/data/trustOptions.ts` contains wizard options, labels and profile helpers.
- `src/data/demoScenarios.ts` contains public demo scenarios.
- `src/engine/trustRules.ts` detects customer-facing trust gaps.
- `src/engine/trustScore.ts` calculates the trust readiness score.
- `src/engine/trustTasks.ts` turns findings into developer tasks.
- `src/engine/trustPageGenerator.ts` drafts public trust page sections.
- `src/engine/trustReportGenerator.ts` creates markdown output.
- `src/components/*` contains feature-focused UI components.
- `src/pages/*` contains screen-level composition.

## Scoring

The score uses simple weighted checks for visible trust basics:
- Privacy Policy
- Terms of Service
- security contact
- data deletion process
- subprocessor list
- backup process
- admin audit logs
- cookie notice
- incident response note
- AI data usage explanation when AI is relevant

The scoring is intentionally lightweight. It supports product feedback, not certification.

## Current constraints

- no backend
- no auth
- no database
- no real AI API
- no legal document generation
- no formal certification

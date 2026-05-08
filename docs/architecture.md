# Architecture

Regulato is a local React + TypeScript SPA. It has no backend, database, authentication or external API dependency in the first-view demo version.

## Flow

1. User opens the risk dashboard.
2. User selects a service or starts a sample audit.
3. The wizard builds an `AuditContext`.
4. The local rules engine evaluates TypeScript rules.
5. The app creates findings, remediation task metadata and a compliance score.
6. Reports can be exported as Markdown.

## Core Modules

- `src/types.ts` defines the domain model.
- `src/data/rules.ts` contains starter compliance rules.
- `src/data/mock.ts` contains dashboard and wizard demo data.
- `src/data/patterns.ts` contains industry patterns.
- `src/lib/rulesEngine.ts` evaluates rules and scores audits.
- `src/lib/report.ts` generates Markdown reports.
- `src/lib/labels.ts` centralizes UI labels.
- `src/components/*` contains UI components grouped by feature.

## Scoring

The score starts at 100 and subtracts penalties for failed findings.

| Severity | Penalty |
| --- | ---: |
| Low | 5 |
| Medium | 10 |
| High | 20 |
| Critical | 35 |

## Next Phase Ideas

- Persistence and audit history
- Authentication and team workspaces
- Remediation status updates
- GitHub/Jira issue export
- PDF reports

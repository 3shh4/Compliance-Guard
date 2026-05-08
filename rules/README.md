# Rule Packs

The MVP stores executable starter rules in `src/data/rules.ts` so the frontend can run without a backend.

Future versions can split rules into public rule packs:

```text
rules/
  gdpr/
    data-minimization.ts
    consent-history.ts
    erasure.ts
  pci-dss/
    card-storage.ts
    tokenization.ts
    access-logging.ts
  hipaa/
    health-data-access.ts
  ccpa/
    deletion-requests.ts
  security-baseline/
    rbac.ts
    audit-logs.ts
```

Each rule should preserve the core product mapping:

```text
Regulatory requirement -> Technical control -> Developer task
```

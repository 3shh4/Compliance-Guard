# Trust Rule Packs

The current MVP stores ShipTrust rules in `src/engine/trustRules.ts` so the frontend can run without a backend.

Future versions may split rules into product-focused packs:

```text
rules/
  saas-basics/
    privacy-policy.ts
    deletion-process.ts
    security-contact.ts
  ai-tools/
    prompt-data-usage.ts
    generated-content.ts
  vendor-transparency/
    subprocessors.ts
    analytics-notice.ts
```

Each rule should preserve the core product mapping:

```text
Customer-facing trust gap -> Suggested fix -> Developer task
```

ShipTrust rules are educational guidance only. They do not provide legal advice or compliance certification.

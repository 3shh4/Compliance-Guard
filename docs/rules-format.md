# Rules Format

ShipTrust rules are local TypeScript checks that turn a `TrustProfile` into customer-facing `TrustFinding` items.

```ts
type TrustFinding = {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  category:
    | "privacy"
    | "security"
    | "data-handling"
    | "vendor-transparency"
    | "ai-transparency"
    | "customer-readiness";
  summary: string;
  whyItMatters: string;
  customerQuestion: string;
  suggestedFix: string[];
  developerTask: string;
  generatedCopy?: string;
  relatedTrustPageSection?: string;
};
```

## Rule example

```ts
if (profile.thirdParties.length > 0 && !profile.hasSubprocessorList) {
  findings.push({
    id: "missing-subprocessor-list",
    title: "Missing Subprocessor List",
    priority: "high",
    category: "vendor-transparency",
    summary: "Your product uses third-party services, but customers do not have a clear provider list.",
    customerQuestion: "Which third-party providers process our data?",
    suggestedFix: ["Create a public provider list.", "Explain what each provider is used for."],
    developerTask: "TL-103 Add subprocessor list to Trust Page"
  });
}
```

## Contribution rules

- Keep rules narrow and explainable.
- Prefer customer-facing trust gaps over abstract policy language.
- Use practical wording: missing trust signal, suggested fix, developer task.
- Avoid claims of legal status, certification or formal approval.

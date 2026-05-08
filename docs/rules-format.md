# Rules Format

Rules are plain TypeScript objects. Each rule connects a compliance concern with a technical control and developer remediation work.

```ts
type ComplianceRule = {
  id: string;
  regulation: "GDPR" | "PCI_DSS" | "HIPAA" | "CCPA" | "SECURITY_BASELINE";
  title: string;
  description: string;
  legalReference: string;
  appliesWhen: RuleCondition[];
  question: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  engineeringControl: string;
  riskExplanation: string;
  businessImpact: string;
  remediationTasks: string[];
  evidenceExamples?: string[];
  answerKey: AnswerKey;
  failWhen: boolean;
};
```

## Condition Example

```ts
appliesWhen: [
  { field: "process", operator: "equals", value: "user_registration" },
  { field: "dataTypes", operator: "includes", value: "location_data" }
]
```

`answerKey` selects the architecture answer used by the rule. `failWhen` defines which answer turns the rule into a failed finding.

## Contribution Rules

- Keep rules narrow and testable.
- Include a legal or industry reference.
- Write recommendations as engineering actions.
- Add evidence examples that a reviewer could inspect.
- Avoid claiming full legal compliance.

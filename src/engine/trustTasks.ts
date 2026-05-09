import type { TrustFinding, TrustTask } from "../models/trust";

const effortByPriority = {
  high: "medium",
  medium: "low",
  low: "low"
} as const;

const ownerByCategory = {
  privacy: "Founder / product",
  security: "Engineering",
  "data-handling": "Engineering",
  "vendor-transparency": "Founder / product",
  "ai-transparency": "Product / engineering",
  "customer-readiness": "Founder"
} as const;

export function createTrustTasks(findings: TrustFinding[]): TrustTask[] {
  return findings.map((finding) => {
    const [id, ...titleParts] = finding.developerTask.split(" ");

    return {
      id,
      title: titleParts.join(" ") || finding.title,
      priority: finding.priority,
      area: finding.category,
      estimatedEffort: effortByPriority[finding.priority],
      suggestedOwner: ownerByCategory[finding.category],
      status: "open"
    };
  });
}

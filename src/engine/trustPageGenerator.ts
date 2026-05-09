import type { TrustFinding, TrustPageSection, TrustProfile } from "../models/trust";

function listOrFallback(items: string[], fallback: string) {
  return items.length > 0 ? items.join(", ") : fallback;
}

function vendorPurpose(vendor: string) {
  const purposes: Record<string, string> = {
    Vercel: "hosting",
    Netlify: "hosting",
    Supabase: "authentication/database",
    Firebase: "authentication/database",
    AWS: "cloud infrastructure",
    Stripe: "payments",
    OpenAI: "AI processing",
    Sentry: "error monitoring",
    PostHog: "product analytics",
    "Google Analytics": "web analytics",
    Resend: "transactional email",
    Mailgun: "transactional email",
    Clerk: "authentication",
    Auth0: "authentication"
  };

  return purposes[vendor] ?? "product operations";
}

function hasFinding(findings: TrustFinding[], id: string) {
  return findings.some((finding) => finding.id === id);
}

export function generateTrustPageSections(profile: TrustProfile, findings: TrustFinding[]): TrustPageSection[] {
  const vendors = [...profile.infrastructure, ...profile.thirdParties];
  const vendorLines = vendors.length
    ? vendors.map((vendor) => `- ${vendor} - ${vendorPurpose(vendor)}`).join("\n")
    : "No third-party providers were listed yet.";

  const aiRelevant = profile.usesAiPrompts || profile.thirdParties.includes("OpenAI");

  return [
    {
      id: "product-overview",
      title: "Product Overview",
      status: "ready",
      content: `${profile.productName} is ${profile.description.toLowerCase()} It is currently at the ${profile.stage.replaceAll("-", " ")} stage and is being prepared for clearer customer trust conversations.`
    },
    {
      id: "security-overview",
      title: "Security Overview",
      status:
        hasFinding(findings, "missing-admin-audit-logs") ||
        hasFinding(findings, "missing-backup-process") ||
        hasFinding(findings, "missing-incident-response-note")
          ? "needs-review"
          : "ready",
      content: `The product runs on ${listOrFallback(profile.infrastructure, "infrastructure still being documented")}. Connections are expected to be protected over HTTPS. Consider documenting access controls, backups, admin activity logging and incident response behavior as the product matures.`
    },
    {
      id: "data-we-process",
      title: "Data We Process",
      status: profile.collectedData.length > 0 ? "needs-review" : "ready",
      content: `ShipTrust detected these data categories for the product: ${listOrFallback(profile.collectedData, "no customer data categories listed yet")}. Keep this section aligned with the actual product, onboarding forms and integrations.`
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      status: profile.infrastructure.length > 0 ? "ready" : "missing",
      content: profile.infrastructure.length
        ? `${profile.productName} uses ${profile.infrastructure.join(", ")} for core infrastructure. Add more detail here as hosting, authentication, storage and database decisions become stable.`
        : "Infrastructure providers have not been documented yet."
    },
    {
      id: "third-party-providers",
      title: "Third-Party Providers",
      status: profile.thirdParties.length > 0 && !profile.hasSubprocessorList ? "needs-review" : "ready",
      content: `Current provider draft:\n${vendorLines}\n\nList providers publicly once you are ready for customer review, and explain what each provider is used for.`
    },
    {
      id: "privacy-user-rights",
      title: "Privacy & User Rights",
      status:
        hasFinding(findings, "missing-privacy-policy") || hasFinding(findings, "missing-data-deletion")
          ? "missing"
          : "ready",
      content: profile.hasPrivacyPolicy
        ? "A Privacy Policy is available. Keep it aligned with the data categories, vendors and deletion process described here."
        : "A Privacy Policy and deletion request process should be added before this section is shared with serious customers."
    },
    {
      id: "ai-data-usage",
      title: "AI Data Usage",
      status: aiRelevant ? (profile.hasAiDataUsageNote ? "ready" : "missing") : "ready",
      content: aiRelevant
        ? "AI features may process prompts, messages or generated content to deliver product functionality. Add a plain-language explanation of what is sent to AI providers, how long it is retained and whether it is used for training."
        : "No AI prompt or AI processing workflow was listed for this product."
    },
    {
      id: "security-contact",
      title: "Security Contact",
      status: profile.hasSecurityContact ? "ready" : "missing",
      content: profile.hasSecurityContact
        ? "A security contact is available for questions or issue reports."
        : "Add a public security contact such as security@yourdomain.com or a support route for vulnerability and trust questions."
    },
    {
      id: "current-trust-gaps",
      title: "Current Trust Gaps",
      status: findings.length > 0 ? "needs-review" : "ready",
      content:
        findings.length > 0
          ? findings
              .slice(0, 6)
              .map((finding) => `- ${finding.title}: ${finding.summary}`)
              .join("\n")
          : "No major trust gaps were detected by the current rules."
    }
  ];
}

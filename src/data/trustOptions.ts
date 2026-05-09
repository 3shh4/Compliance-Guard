import type { ProductStage, ProductType, TrustProfile } from "../models/trust";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export type TrustBasicKey =
  | "hasPrivacyPolicy"
  | "hasTerms"
  | "hasCookieNotice"
  | "hasSecurityContact"
  | "hasDataDeletionProcess"
  | "hasBackupProcess"
  | "hasAdminAuditLogs"
  | "hasSubprocessorList"
  | "hasIncidentResponseNote"
  | "hasAiDataUsageNote";

export const productTypeOptions: SelectOption<ProductType>[] = [
  { value: "saas", label: "SaaS", description: "A hosted software product for users or teams." },
  { value: "ai-tool", label: "AI tool", description: "A product that processes prompts, files or generated content." },
  { value: "marketplace", label: "Marketplace", description: "A platform connecting customers, providers or sellers." },
  { value: "ecommerce", label: "E-commerce", description: "A checkout-led product or online store." },
  { value: "client-mvp", label: "Client MVP", description: "A custom app or first build for a client." },
  { value: "internal-tool", label: "Internal tool", description: "A private operational app for a team." }
];

export const stageOptions: SelectOption<ProductStage>[] = [
  { value: "prototype", label: "Prototype", description: "Still validating the core idea." },
  { value: "mvp", label: "MVP", description: "Usable product with early testers or users." },
  { value: "public-beta", label: "Public beta", description: "Publicly available and collecting feedback." },
  { value: "first-paying-users", label: "First paying users", description: "Early revenue and real customer questions." },
  { value: "selling-to-b2b", label: "Selling to B2B", description: "Preparing for team, procurement or security reviews." }
];

export const dataOptions = [
  "Email",
  "Name",
  "Company data",
  "Payment metadata",
  "Uploaded files",
  "AI prompts/messages",
  "Generated content",
  "Analytics events",
  "Customer records",
  "Sensitive data"
];

export const infrastructureOptions = ["Vercel", "Netlify", "Supabase", "Firebase", "AWS"];

export const thirdPartyOptions = [
  "Stripe",
  "OpenAI",
  "PostHog",
  "Google Analytics",
  "Sentry",
  "Resend",
  "Mailgun",
  "Clerk",
  "Auth0"
];

export const trustBasics: Array<{
  key: TrustBasicKey;
  label: string;
  description: string;
}> = [
  {
    key: "hasPrivacyPolicy",
    label: "Privacy Policy",
    description: "A public page explaining what data you collect and how it is used."
  },
  {
    key: "hasTerms",
    label: "Terms of Service",
    description: "Basic customer-facing rules for using the product."
  },
  {
    key: "hasSecurityContact",
    label: "Security contact",
    description: "A visible way for people to report security issues."
  },
  {
    key: "hasSubprocessorList",
    label: "Subprocessor list",
    description: "A public list of third-party providers that may process data."
  },
  {
    key: "hasDataDeletionProcess",
    label: "Data deletion process",
    description: "A simple path for users to request account or data deletion."
  },
  {
    key: "hasBackupProcess",
    label: "Backup process",
    description: "A documented approach for restoring important product data."
  },
  {
    key: "hasAdminAuditLogs",
    label: "Admin audit logs",
    description: "Internal logs for sensitive admin actions."
  },
  {
    key: "hasCookieNotice",
    label: "Cookie notice",
    description: "A notice for analytics or tracking tools where needed."
  },
  {
    key: "hasAiDataUsageNote",
    label: "AI data usage explanation",
    description: "Plain-language explanation for prompts, files or generated content."
  },
  {
    key: "hasIncidentResponseNote",
    label: "Incident response note",
    description: "A short public note on how security events are handled."
  }
];

export const productTypeLabels: Record<ProductType, string> = Object.fromEntries(
  productTypeOptions.map((option) => [option.value, option.label])
) as Record<ProductType, string>;

export const stageLabels: Record<ProductStage, string> = Object.fromEntries(
  stageOptions.map((option) => [option.value, option.label])
) as Record<ProductStage, string>;

export function createEmptyProfile(): TrustProfile {
  return {
    productName: "",
    description: "",
    productType: "saas",
    stage: "mvp",
    targetCustomers: "",
    collectedData: [],
    infrastructure: [],
    thirdParties: [],
    hasUserAccounts: true,
    hasUploadedFiles: false,
    usesAiPrompts: false,
    usesPayments: false,
    hasAdminRoles: true,
    hasPrivacyPolicy: false,
    hasTerms: false,
    hasCookieNotice: false,
    hasSecurityContact: false,
    hasDataDeletionProcess: false,
    hasBackupProcess: false,
    hasAdminAuditLogs: false,
    hasSubprocessorList: false,
    hasIncidentResponseNote: false,
    hasAiDataUsageNote: false
  };
}

export function normalizeProfile(profile: TrustProfile): TrustProfile {
  const usesAiPrompts =
    profile.usesAiPrompts ||
    profile.productType === "ai-tool" ||
    profile.collectedData.includes("AI prompts/messages") ||
    profile.thirdParties.includes("OpenAI");

  const usesPayments = profile.usesPayments || profile.collectedData.includes("Payment metadata") || profile.thirdParties.includes("Stripe");
  const hasUploadedFiles = profile.hasUploadedFiles || profile.collectedData.includes("Uploaded files");

  return {
    ...profile,
    productName: profile.productName.trim() || "Untitled SaaS",
    description: profile.description.trim() || "An early-stage app preparing for customer trust conversations.",
    usesAiPrompts,
    usesPayments,
    hasUploadedFiles
  };
}

export type ProductType = "saas" | "ai-tool" | "marketplace" | "ecommerce" | "client-mvp" | "internal-tool";

export type ProductStage = "prototype" | "mvp" | "public-beta" | "first-paying-users" | "selling-to-b2b";

export type TrustProfile = {
  productName: string;
  description: string;
  productType: ProductType;
  stage: ProductStage;
  targetCustomers?: string;
  collectedData: string[];
  infrastructure: string[];
  thirdParties: string[];
  hasUserAccounts: boolean;
  hasUploadedFiles: boolean;
  usesAiPrompts: boolean;
  usesPayments: boolean;
  hasAdminRoles: boolean;
  hasPrivacyPolicy: boolean;
  hasTerms: boolean;
  hasCookieNotice: boolean;
  hasSecurityContact: boolean;
  hasDataDeletionProcess: boolean;
  hasBackupProcess: boolean;
  hasAdminAuditLogs: boolean;
  hasSubprocessorList: boolean;
  hasIncidentResponseNote: boolean;
  hasAiDataUsageNote: boolean;
};

export type TrustFindingPriority = "high" | "medium" | "low";

export type TrustFindingCategory =
  | "privacy"
  | "security"
  | "data-handling"
  | "vendor-transparency"
  | "ai-transparency"
  | "customer-readiness";

export type TrustFinding = {
  id: string;
  title: string;
  priority: TrustFindingPriority;
  category: TrustFindingCategory;
  summary: string;
  whyItMatters: string;
  customerQuestion: string;
  suggestedFix: string[];
  developerTask: string;
  generatedCopy?: string;
  relatedTrustPageSection?: string;
};

export type TrustTaskStatus = "open" | "planned" | "done" | "accepted-for-later";

export type TrustTask = {
  id: string;
  title: string;
  priority: TrustFindingPriority;
  area: string;
  estimatedEffort: "low" | "medium" | "high";
  suggestedOwner: string;
  status: TrustTaskStatus;
};

export type TrustScore = {
  total: number;
  level: string;
  categories: {
    privacyBasics: number;
    securitySignals: number;
    dataHandling: number;
    vendorTransparency: number;
    customerReadiness: number;
    aiTransparency?: number;
  };
};

export type TrustPageSection = {
  id: string;
  title: string;
  status: "ready" | "needs-review" | "missing";
  content: string;
};

export type TrustReport = {
  profile: TrustProfile;
  score: TrustScore;
  findings: TrustFinding[];
  tasks: TrustTask[];
  trustPageSections: TrustPageSection[];
  markdown: string;
};

export type AppScreen = "home" | "light-check" | "deep-research" | "analysis" | "results" | "trust-page" | "report";

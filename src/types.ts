export type Regulation = "GDPR" | "PCI_DSS" | "HIPAA" | "CCPA" | "SECURITY_BASELINE";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type FindingStatus = "passed" | "failed" | "not_applicable";

export type AuditStatus = "low-risk" | "medium-risk" | "high-risk" | "critical-risk";

export type AppView = "dashboard" | "new-audit" | "projects" | "rules" | "reports" | "settings";

export type ReportMode = "executive" | "dev" | "auditor";

export type FindingWorkflowStatus = "open" | "in_progress" | "done" | "accepted_risk";

export type BusinessProcess =
  | "user_registration"
  | "payment_processing"
  | "newsletter_signup"
  | "account_deletion"
  | "customer_support"
  | "analytics_tracking"
  | "health_data_intake"
  | "identity_verification";

export type DataType =
  | "personal_data"
  | "payment_data"
  | "location_data"
  | "biometric_data"
  | "health_data"
  | "authentication_data"
  | "marketing_consent_data"
  | "technical_logs"
  | "children_data";

export type ServiceStatus = AuditStatus;

export type RuleConditionField = "process" | "regulations" | "dataTypes" | `answers.${AnswerKey}`;

export type RuleCondition = {
  field: RuleConditionField;
  operator: "equals" | "includes" | "is_true" | "is_false";
  value?: string | boolean;
};

export type AnswerKey =
  | "storesData"
  | "encryptedAtRest"
  | "encryptedInTransit"
  | "accountDeletion"
  | "dataExport"
  | "consentLog"
  | "thirdPartySharing"
  | "roleBasedAccess"
  | "retentionPolicy"
  | "rawCardStorage"
  | "paymentTokenization"
  | "marketingOptIn"
  | "unsubscribeFlow"
  | "preciseLocationAtSignup"
  | "auditLogs"
  | "healthAccessLogs"
  | "secretsManaged"
  | "serviceAccountReview"
  | "incidentResponseContact"
  | "backupRecovery"
  | "privacyNotice"
  | "childrenConsent";

export type ArchitectureAnswers = Record<AnswerKey, boolean>;

export type AuditContext = {
  serviceName: string;
  process: BusinessProcess;
  regulations: Regulation[];
  dataTypes: DataType[];
  answers: ArchitectureAnswers;
};

export type ComplianceRule = {
  id: string;
  regulation: Regulation;
  title: string;
  description: string;
  legalReference: string;
  appliesWhen: RuleCondition[];
  question: string;
  riskLevel: RiskLevel;
  engineeringControl: string;
  riskExplanation: string;
  businessImpact: string;
  remediationTasks: string[];
  evidenceExamples?: string[];
  answerKey: AnswerKey;
  failWhen: boolean;
};

export type Finding = {
  id: string;
  ruleId: string;
  title: string;
  regulation: Regulation;
  legalReference: string;
  status: FindingStatus;
  riskLevel: RiskLevel;
  question: string;
  projectAnswer: boolean;
  problem: string;
  riskExplanation: string;
  businessImpact: string;
  engineeringControl: string;
  remediationTasks: string[];
  evidenceExamples: string[];
  relatedRules: string[];
};

export type FindingTask = {
  taskId: string;
  owner: string;
  dueDate: string;
  workflowStatus: FindingWorkflowStatus;
  evidenceRequired: string[];
  issueTitle: string;
  issueBody: string;
};

export type WorkflowFinding = Finding & {
  task: FindingTask;
};

export type AuditResult = {
  id: string;
  name: string;
  context: AuditContext;
  findings: WorkflowFinding[];
  score: number;
  status: AuditStatus;
  createdAt: string;
};

export type PersistedAuditRun = {
  id: string;
  userId: string;
  audit: AuditResult;
  serviceName: string;
  score: number;
  status: AuditStatus;
  createdAt: string;
};

export type MockService = {
  id: string;
  name: string;
  area: string;
  regulations: Regulation[];
  score: number;
  criticalFindings: number;
  status: ServiceStatus;
  lastAudit: string;
  owner: string;
  technologies: string[];
};

export type Option<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export type IndustryPattern = {
  id: string;
  name: string;
  description: string;
  audience: string;
  recommendedProcesses: BusinessProcess[];
  recommendedRegulations: Regulation[];
  recommendedDataTypes: DataType[];
  riskFocus: string[];
};

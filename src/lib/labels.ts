import type {
  AppView,
  BusinessProcess,
  DataType,
  FindingStatus,
  FindingWorkflowStatus,
  Regulation,
  RiskLevel,
  AuditStatus
} from "../types";

export const regulationLabel: Record<Regulation, string> = {
  GDPR: "GDPR",
  PCI_DSS: "PCI DSS",
  HIPAA: "HIPAA",
  CCPA: "CCPA",
  SECURITY_BASELINE: "Security Baseline"
};

export const riskLabel: Record<RiskLevel, string> = {
  low: "Niskie",
  medium: "Średnie",
  high: "Wysokie",
  critical: "Krytyczne"
};

export const auditStatusLabel: Record<AuditStatus, string> = {
  "low-risk": "Niskie ryzyko",
  "medium-risk": "Średnie ryzyko",
  "high-risk": "Wysokie ryzyko",
  "critical-risk": "Krytyczne ryzyko"
};

export const findingStatusLabel: Record<FindingStatus, string> = {
  passed: "Zgodne",
  failed: "Niezgodne",
  not_applicable: "Nie dotyczy"
};

export const workflowStatusLabel: Record<FindingWorkflowStatus, string> = {
  open: "Open Finding",
  in_progress: "W trakcie",
  done: "Zamknięte",
  accepted_risk: "Ryzyko zaakceptowane"
};

export const processLabel: Record<BusinessProcess, string> = {
  user_registration: "Rejestracja użytkownika",
  payment_processing: "Przetwarzanie płatności",
  newsletter_signup: "Newsletter i zgody marketingowe",
  account_deletion: "Usuwanie konta",
  customer_support: "Obsługa zgłoszeń supportu",
  analytics_tracking: "Analityka i tracking",
  health_data_intake: "Przetwarzanie danych zdrowotnych",
  identity_verification: "Weryfikacja tożsamości"
};

export const dataTypeLabel: Record<DataType, string> = {
  personal_data: "Dane osobowe",
  payment_data: "Dane płatnicze",
  location_data: "Dane lokalizacyjne",
  biometric_data: "Dane biometryczne",
  health_data: "Dane zdrowotne",
  authentication_data: "Dane uwierzytelniające",
  marketing_consent_data: "Dane marketingowe i zgody",
  technical_logs: "Logi techniczne",
  children_data: "Dane dzieci"
};

export const viewLabel: Record<AppView, string> = {
  dashboard: "Panel ryzyka",
  "new-audit": "Nowy audyt",
  projects: "Projekty",
  rules: "Biblioteka reguł",
  reports: "Raporty",
  settings: "Ustawienia"
};

export function riskTone(level: RiskLevel | AuditStatus) {
  if (level === "critical" || level === "critical-risk") {
    return "critical";
  }

  if (level === "high" || level === "high-risk") {
    return "high";
  }

  if (level === "medium" || level === "medium-risk") {
    return "medium";
  }

  return "low";
}

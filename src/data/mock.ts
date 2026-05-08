import type {
  ArchitectureAnswers,
  AuditContext,
  BusinessProcess,
  DataType,
  MockService,
  Option,
  Regulation
} from "../types";

export const mockServices: MockService[] = [
  {
    id: "svc-checkout",
    name: "Checkout API",
    area: "Płatności",
    regulations: ["PCI_DSS", "GDPR"],
    score: 62,
    criticalFindings: 3,
    status: "high-risk",
    lastAudit: "2 dni temu",
    owner: "Payments Platform",
    technologies: ["Node.js", "PostgreSQL", "Stripe", "Redis"]
  },
  {
    id: "svc-registration",
    name: "User Registration",
    area: "Tożsamość użytkownika",
    regulations: ["GDPR", "SECURITY_BASELINE"],
    score: 81,
    criticalFindings: 1,
    status: "medium-risk",
    lastAudit: "5 godzin temu",
    owner: "Identity Team",
    technologies: ["React", "Auth.js", "PostgreSQL"]
  },
  {
    id: "svc-newsletter",
    name: "Newsletter Service",
    area: "Marketing",
    regulations: ["GDPR", "CCPA"],
    score: 91,
    criticalFindings: 0,
    status: "low-risk",
    lastAudit: "7 dni temu",
    owner: "Growth Systems",
    technologies: ["Customer.io", "Segment", "React"]
  },
  {
    id: "svc-support",
    name: "Support Desk",
    area: "Obsługa klienta",
    regulations: ["GDPR", "SECURITY_BASELINE"],
    score: 58,
    criticalFindings: 2,
    status: "high-risk",
    lastAudit: "1 dzień temu",
    owner: "Customer Operations",
    technologies: ["Zendesk", "Internal API", "Snowflake"]
  },
  {
    id: "svc-analytics",
    name: "Analytics Pipeline",
    area: "Analityka",
    regulations: ["GDPR", "CCPA"],
    score: 69,
    criticalFindings: 1,
    status: "medium-risk",
    lastAudit: "3 dni temu",
    owner: "Data Platform",
    technologies: ["Kafka", "BigQuery", "dbt"]
  },
  {
    id: "svc-identity",
    name: "Identity Service",
    area: "IAM",
    regulations: ["GDPR", "SECURITY_BASELINE"],
    score: 74,
    criticalFindings: 1,
    status: "medium-risk",
    lastAudit: "6 dni temu",
    owner: "Platform Security",
    technologies: ["Go", "OIDC", "Vault"]
  }
];

export const topRisks = [
  "Checkout API przechowuje dane płatnicze bez jasnej polityki retencji.",
  "User Registration zbiera dane lokalizacyjne zbyt wcześnie.",
  "Newsletter Service nie zapisuje historii zgód marketingowych.",
  "Support Desk nie ogranicza dostępu do danych osobowych według ról."
];

export const riskMap = [
  { regulation: "GDPR" as Regulation, score: 81 },
  { regulation: "PCI_DSS" as Regulation, score: 62 },
  { regulation: "HIPAA" as Regulation, score: 48 },
  { regulation: "CCPA" as Regulation, score: 74 },
  { regulation: "SECURITY_BASELINE" as Regulation, score: 69 }
];

export const defaultAnswers: ArchitectureAnswers = {
  storesData: true,
  encryptedAtRest: true,
  encryptedInTransit: true,
  accountDeletion: false,
  dataExport: false,
  consentLog: false,
  thirdPartySharing: false,
  roleBasedAccess: true,
  retentionPolicy: false,
  rawCardStorage: false,
  paymentTokenization: true,
  marketingOptIn: true,
  unsubscribeFlow: true,
  preciseLocationAtSignup: true,
  auditLogs: true,
  healthAccessLogs: false,
  secretsManaged: true,
  serviceAccountReview: false,
  incidentResponseContact: true,
  backupRecovery: true,
  privacyNotice: true,
  childrenConsent: false
};

export const demoAuditContext: AuditContext = {
  serviceName: "User Registration",
  process: "user_registration",
  regulations: ["GDPR", "SECURITY_BASELINE"],
  dataTypes: ["personal_data", "location_data", "marketing_consent_data", "authentication_data"],
  answers: {
    ...defaultAnswers,
    retentionPolicy: false,
    consentLog: false,
    dataExport: false,
    preciseLocationAtSignup: true,
    serviceAccountReview: false
  }
};

export const processOptions: Option<BusinessProcess>[] = [
  {
    value: "user_registration",
    label: "Rejestracja użytkownika",
    description: "Formularze, zgody, dane osobowe, hasła i profil użytkownika."
  },
  {
    value: "payment_processing",
    label: "Przetwarzanie płatności",
    description: "Checkout, tokeny płatnicze, faktury, billing i historia zamówień."
  },
  {
    value: "newsletter_signup",
    label: "Newsletter i zgody marketingowe",
    description: "Zapisy mailingowe, opt-in, opt-out, tracking i historia zgód."
  },
  {
    value: "account_deletion",
    label: "Usuwanie konta",
    description: "Żądania usunięcia danych, wyjątki retencyjne i ślad audytowy."
  },
  {
    value: "customer_support",
    label: "Obsługa zgłoszeń supportu",
    description: "Dostęp agentów do danych klienta, eksporty i eskalacje."
  },
  {
    value: "analytics_tracking",
    label: "Analityka i tracking",
    description: "Zdarzenia produktowe, identyfikatory, integracje i opt-out."
  },
  {
    value: "identity_verification",
    label: "Weryfikacja tożsamości",
    description: "Dokumenty, identyfikatory, dane biometryczne i dostawcy zewnętrzni."
  },
  {
    value: "health_data_intake",
    label: "Przetwarzanie danych zdrowotnych",
    description: "Dane medyczne, dostęp według ról, logi i zasada minimum necessary."
  }
];

export const regulationOptions: Option<Regulation>[] = [
  {
    value: "GDPR",
    label: "Unia Europejska - GDPR",
    description: "Dane osobowe, zgody, retencja, eksport i usunięcie danych."
  },
  {
    value: "PCI_DSS",
    label: "Płatności - PCI DSS",
    description: "Tokenizacja, dane kart, dostęp, logi i konta serwisowe."
  },
  {
    value: "CCPA",
    label: "Kalifornia - CCPA / CPRA",
    description: "Prawo do informacji, usunięcia, eksportu i opt-out."
  },
  {
    value: "HIPAA",
    label: "Dane zdrowotne - HIPAA",
    description: "Dostęp do PHI, logi, szyfrowanie i minimalny zakres danych."
  },
  {
    value: "SECURITY_BASELINE",
    label: "Ogólna baza bezpieczeństwa - Security Baseline",
    description: "RBAC, logi, szyfrowanie, sekrety, backup i incident response."
  }
];

export const dataTypeOptions: Option<DataType>[] = [
  { value: "personal_data", label: "Dane osobowe" },
  { value: "location_data", label: "Dane lokalizacyjne" },
  { value: "payment_data", label: "Dane płatnicze" },
  { value: "authentication_data", label: "Dane uwierzytelniające" },
  { value: "marketing_consent_data", label: "Dane marketingowe i zgody" },
  { value: "health_data", label: "Dane zdrowotne" },
  { value: "biometric_data", label: "Dane biometryczne" },
  { value: "technical_logs", label: "Logi techniczne" },
  { value: "children_data", label: "Dane dzieci" }
];

export const architectureQuestions: { key: keyof ArchitectureAnswers; label: string }[] = [
  { key: "storesData", label: "Czy dane są zapisywane w bazie?" },
  { key: "encryptedAtRest", label: "Czy dane są szyfrowane w spoczynku?" },
  { key: "encryptedInTransit", label: "Czy dane są szyfrowane w transmisji?" },
  { key: "accountDeletion", label: "Czy użytkownik może usunąć konto?" },
  { key: "dataExport", label: "Czy użytkownik może pobrać swoje dane?" },
  { key: "consentLog", label: "Czy system zapisuje historię zgód?" },
  { key: "roleBasedAccess", label: "Czy dostęp do danych jest ograniczony rolami?" },
  { key: "retentionPolicy", label: "Czy istnieje polityka retencji danych?" },
  { key: "thirdPartySharing", label: "Czy dane są wysyłane do zewnętrznych dostawców?" },
  { key: "auditLogs", label: "Czy istnieją logi dostępu do danych wrażliwych?" },
  { key: "rawCardStorage", label: "Czy system przechowuje surowe dane kart?" },
  { key: "paymentTokenization", label: "Czy płatności są tokenizowane?" },
  { key: "marketingOptIn", label: "Czy marketing wymaga aktywnej zgody?" },
  { key: "unsubscribeFlow", label: "Czy marketing ma mechanizm wypisania?" },
  { key: "preciseLocationAtSignup", label: "Czy lokalizacja jest zbierana przy rejestracji?" },
  { key: "secretsManaged", label: "Czy sekrety są zarządzane poza kodem?" },
  { key: "serviceAccountReview", label: "Czy konta serwisowe są przeglądane?" },
  { key: "incidentResponseContact", label: "Czy istnieje kontakt incident response?" },
  { key: "backupRecovery", label: "Czy backup i recovery są testowane?" },
  { key: "privacyNotice", label: "Czy pokazujesz cel przetwarzania danych?" },
  { key: "childrenConsent", label: "Czy dane dzieci mają właściwą zgodę/opiekuna?" }
];

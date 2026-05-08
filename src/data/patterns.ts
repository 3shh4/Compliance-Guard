import type { IndustryPattern } from "../types";

export const industryPatterns: IndustryPattern[] = [
  {
    id: "pattern-gaming-gdpr",
    name: "GDPR dla produktów gamingowych",
    description: "Gracze, identyfikatory kont, lokalizacja, czat, zgody marketingowe i dane nieletnich.",
    audience: "Gaming / consumer apps",
    recommendedProcesses: ["user_registration", "analytics_tracking", "newsletter_signup"],
    recommendedRegulations: ["GDPR", "SECURITY_BASELINE"],
    recommendedDataTypes: ["personal_data", "location_data", "technical_logs", "children_data"],
    riskFocus: ["Dane dzieci", "Profilowanie graczy", "Lokalizacja", "Retencja eventów"]
  },
  {
    id: "pattern-fintech-checkout",
    name: "PCI DSS dla checkoutu SaaS",
    description: "Płatności, tokenizacja, billing, dostęp supportu i logi danych płatniczych.",
    audience: "Fintech / subscription SaaS",
    recommendedProcesses: ["payment_processing", "customer_support"],
    recommendedRegulations: ["PCI_DSS", "GDPR", "SECURITY_BASELINE"],
    recommendedDataTypes: ["payment_data", "personal_data", "technical_logs"],
    riskFocus: ["Surowe dane kart", "Tokenizacja", "Konta serwisowe", "Logi dostępu"]
  },
  {
    id: "pattern-health-intake",
    name: "HIPAA intake dla danych zdrowotnych",
    description: "Formularze zdrowotne, role kliniczne, logi dostępu, szyfrowanie i minimum necessary.",
    audience: "Healthtech",
    recommendedProcesses: ["health_data_intake", "customer_support"],
    recommendedRegulations: ["HIPAA", "SECURITY_BASELINE"],
    recommendedDataTypes: ["health_data", "personal_data", "technical_logs"],
    riskFocus: ["PHI", "Break-glass access", "Audit logs", "Minimum necessary"]
  }
];

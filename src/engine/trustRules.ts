import type { TrustFinding, TrustProfile } from "../models/trust";

function collectsPersonalData(profile: TrustProfile) {
  return profile.collectedData.some((item) =>
    ["Email", "Name", "Company data", "Customer records", "Payment metadata", "Sensitive data"].includes(item)
  );
}

function usesAnalytics(profile: TrustProfile) {
  return profile.thirdParties.includes("Google Analytics") || profile.thirdParties.includes("PostHog");
}

function usesAi(profile: TrustProfile) {
  return profile.usesAiPrompts || profile.thirdParties.includes("OpenAI") || profile.collectedData.includes("AI prompts/messages");
}

export function createTrustFindings(profile: TrustProfile): TrustFinding[] {
  const findings: TrustFinding[] = [];

  if (collectsPersonalData(profile) && !profile.hasPrivacyPolicy) {
    findings.push({
      id: "missing-privacy-policy",
      title: "Missing Privacy Policy",
      priority: "high",
      category: "privacy",
      summary: "Your product collects user or customer data, but there is no visible Privacy Policy yet.",
      whyItMatters:
        "A Privacy Policy is often the first customer-facing signal that you have thought about data collection, usage and retention.",
      customerQuestion: "What data do you collect and how do you use it?",
      suggestedFix: [
        "Create a simple public Privacy Policy page.",
        "Explain what data is collected and why.",
        "Link the policy from your footer, signup flow and trust page.",
        "Review the content with a qualified professional before relying on it."
      ],
      developerTask: "TL-101 Add Privacy Policy page",
      generatedCopy:
        "We collect the information needed to create accounts, operate the product and support customer requests. We explain the categories of data we process and how customers can contact us about privacy questions.",
      relatedTrustPageSection: "Privacy & User Rights"
    });
  }

  if (profile.collectedData.length > 0 && !profile.hasDataDeletionProcess) {
    findings.push({
      id: "missing-data-deletion",
      title: "Missing Data Deletion Process",
      priority: "high",
      category: "data-handling",
      summary: "Users do not have a clear path to request deletion of their account or product data.",
      whyItMatters:
        "Customers are more likely to trust a young product when it explains how people can leave and request deletion of their data.",
      customerQuestion: "Can we delete our account and customer data if we stop using the product?",
      suggestedFix: [
        "Create a support flow or email alias for deletion requests.",
        "Document what data can be deleted and what may need to be retained briefly.",
        "Add the process to your Privacy Policy and Trust Page."
      ],
      developerTask: "TL-102 Add data deletion request process",
      generatedCopy:
        "Customers can request account or workspace deletion by contacting our support team. We review deletion requests and remove product data that is no longer needed to operate the service.",
      relatedTrustPageSection: "Privacy & User Rights"
    });
  }

  if (profile.thirdParties.length > 0 && !profile.hasSubprocessorList) {
    findings.push({
      id: "missing-subprocessor-list",
      title: "Missing Subprocessor List",
      priority: "high",
      category: "vendor-transparency",
      summary: "Your product uses third-party services, but customers do not have a clear list of providers that may process data.",
      whyItMatters:
        "If your product uses tools like Stripe, Supabase, OpenAI or Sentry, customers may ask who receives or processes their data.",
      customerQuestion: "Which third-party providers process our data?",
      suggestedFix: [
        "Create a /trust or /subprocessors section.",
        "List each vendor.",
        "Explain what each vendor is used for.",
        "Link this section from your Privacy Policy or footer."
      ],
      developerTask: "TL-103 Add subprocessor list to Trust Page",
      generatedCopy:
        "We use selected third-party providers to deliver hosting, payments, analytics, AI processing and support services. These providers are used only where needed to operate the product.",
      relatedTrustPageSection: "Third-Party Providers"
    });
  }

  if (usesAi(profile) && !profile.hasAiDataUsageNote) {
    findings.push({
      id: "missing-ai-data-usage",
      title: "Missing AI Data Usage Explanation",
      priority: "high",
      category: "ai-transparency",
      summary: "Your product appears to process prompts or AI-generated content, but it does not explain how AI data is handled.",
      whyItMatters:
        "AI products are often asked how prompts are processed, whether content is stored and whether customer data is used for model training.",
      customerQuestion: "How are prompts, uploaded files or generated outputs handled?",
      suggestedFix: [
        "Add an AI data usage section to your Trust Page.",
        "Explain what is sent to AI providers.",
        "Describe retention behavior in plain English.",
        "State whether customer inputs are used for training if you know that answer."
      ],
      developerTask: "TL-105 Add AI data usage explanation",
      generatedCopy:
        "AI features may process prompts and generated content to deliver product functionality. We aim to describe what data is sent to AI providers, how it is used and what customers can expect from the workflow.",
      relatedTrustPageSection: "AI Data Usage"
    });
  }

  if ((profile.usesPayments || profile.thirdParties.includes("Stripe")) && !profile.hasTerms) {
    findings.push({
      id: "missing-terms",
      title: "Missing Terms of Service",
      priority: "medium",
      category: "customer-readiness",
      summary: "Your product accepts or plans to accept payments, but customers do not have clear service terms.",
      whyItMatters:
        "Terms of Service help set expectations around usage, billing, refunds, support and account responsibilities.",
      customerQuestion: "What are the rules and expectations for using this paid product?",
      suggestedFix: [
        "Create a basic Terms of Service page.",
        "Explain billing and acceptable use at a high level.",
        "Link the terms from checkout, signup and footer locations."
      ],
      developerTask: "TL-108 Add Terms of Service page",
      generatedCopy:
        "Our Terms of Service describe the rules for using the product, account responsibilities, billing expectations and support boundaries.",
      relatedTrustPageSection: "Product Overview"
    });
  }

  if (profile.hasAdminRoles && !profile.hasAdminAuditLogs) {
    findings.push({
      id: "missing-admin-audit-logs",
      title: "Missing Admin Audit Logs",
      priority: "medium",
      category: "security",
      summary: "Admin actions are not clearly logged, which makes sensitive account or data changes harder to review.",
      whyItMatters:
        "Even a lightweight admin activity log can help you investigate support actions, permission changes and sensitive updates.",
      customerQuestion: "Can you review sensitive admin actions if something goes wrong?",
      suggestedFix: [
        "Log key admin actions such as role changes, account updates and data exports.",
        "Store actor, timestamp, target and action metadata.",
        "Start with simple server-side events before building a full audit UI."
      ],
      developerTask: "TL-107 Add admin activity logging",
      generatedCopy:
        "We are adding internal logging for sensitive admin actions so customer-impacting changes can be reviewed when needed.",
      relatedTrustPageSection: "Security Overview"
    });
  }

  if (!profile.hasSecurityContact) {
    findings.push({
      id: "missing-security-contact",
      title: "Missing Security Contact",
      priority: "medium",
      category: "customer-readiness",
      summary: "There is no clear public contact for reporting security or trust concerns.",
      whyItMatters:
        "A visible security contact gives users and researchers a responsible path to report issues before they become public support problems.",
      customerQuestion: "Where should we send security questions or vulnerability reports?",
      suggestedFix: [
        "Create security@yourdomain.com or a support route.",
        "Add the contact to your Trust Page and footer.",
        "Mention expected response behavior in plain language."
      ],
      developerTask: "TL-104 Add public security contact",
      generatedCopy:
        "Security questions or reports can be sent to our published contact channel. We review reports and prioritize customer-impacting issues.",
      relatedTrustPageSection: "Security Contact"
    });
  }

  if (
    !profile.hasBackupProcess &&
    (profile.stage === "first-paying-users" || profile.stage === "selling-to-b2b")
  ) {
    findings.push({
      id: "missing-backup-process",
      title: "Missing Backup Process",
      priority: "medium",
      category: "security",
      summary: "Your product is at a customer-facing stage, but backup or restore behavior is not documented.",
      whyItMatters:
        "Customers may ask how you recover from accidental deletion, platform incidents or operational mistakes.",
      customerQuestion: "How do you protect against data loss?",
      suggestedFix: [
        "Document the systems that store important data.",
        "Confirm backup behavior for your database and storage providers.",
        "Add a short backup note to the Trust Page."
      ],
      developerTask: "TL-106 Document backup process",
      generatedCopy:
        "We maintain a backup and recovery approach for important product data and review it as the product matures.",
      relatedTrustPageSection: "Security Overview"
    });
  }

  if (usesAnalytics(profile) && !profile.hasCookieNotice) {
    findings.push({
      id: "missing-cookie-notice",
      title: "Missing Cookie Notice",
      priority: "medium",
      category: "privacy",
      summary: "Analytics tools are used, but visitors do not have a clear notice about cookies or tracking.",
      whyItMatters:
        "A small cookie or analytics notice helps visitors understand what is measured before they sign up.",
      customerQuestion: "Do you use cookies or analytics tracking on the product or marketing site?",
      suggestedFix: [
        "Add a concise cookie or analytics notice.",
        "Name the analytics providers you use.",
        "Link to privacy settings or policy details where relevant."
      ],
      developerTask: "TL-109 Add cookie and analytics notice",
      generatedCopy:
        "We use analytics tools to understand product usage and improve the service. Where applicable, we explain these tools in our privacy materials.",
      relatedTrustPageSection: "Privacy & User Rights"
    });
  }

  if (!profile.hasIncidentResponseNote && (profile.stage === "public-beta" || profile.stage === "first-paying-users" || profile.stage === "selling-to-b2b")) {
    findings.push({
      id: "missing-incident-response-note",
      title: "Missing Incident Response Note",
      priority: "low",
      category: "security",
      summary: "Your public trust materials do not explain how you would handle a security incident.",
      whyItMatters:
        "A short incident response note can reassure early customers that you have a communication path if something serious happens.",
      customerQuestion: "How would you handle and communicate a security incident?",
      suggestedFix: [
        "Create a short incident response note for your Trust Page.",
        "Explain how reports are reviewed and how customers are contacted.",
        "Keep the language simple until your process matures."
      ],
      developerTask: "TL-110 Add incident response note",
      generatedCopy:
        "If we identify a security event that may affect customers, we investigate, prioritize containment and communicate relevant updates to impacted users.",
      relatedTrustPageSection: "Security Overview"
    });
  }

  return findings;
}

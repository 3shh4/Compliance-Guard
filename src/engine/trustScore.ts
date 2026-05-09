import type { TrustProfile, TrustScore } from "../models/trust";

function hasAnalytics(profile: TrustProfile) {
  return profile.thirdParties.includes("Google Analytics") || profile.thirdParties.includes("PostHog");
}

function hasAi(profile: TrustProfile) {
  return profile.usesAiPrompts || profile.thirdParties.includes("OpenAI") || profile.collectedData.includes("AI prompts/messages");
}

function weightedScore(checks: Array<{ passed: boolean; weight: number }>) {
  const possible = checks.reduce((sum, check) => sum + check.weight, 0);
  const achieved = checks.reduce((sum, check) => sum + (check.passed ? check.weight : 0), 0);
  return possible === 0 ? 80 : Math.round((achieved / possible) * 100);
}

function scoreLevel(total: number) {
  if (total <= 39) return "High trust gaps";
  if (total <= 59) return "Needs foundation";
  if (total <= 79) return "Almost customer-ready";
  return "Trust-ready basics";
}

export function calculateTrustScore(profile: TrustProfile): TrustScore {
  const aiRelevant = hasAi(profile);
  const analyticsRelevant = hasAnalytics(profile);

  const checks = [
    { passed: profile.hasPrivacyPolicy, weight: 15 },
    { passed: profile.hasTerms, weight: 8 },
    { passed: profile.hasSecurityContact, weight: 10 },
    { passed: profile.hasDataDeletionProcess, weight: 12 },
    { passed: profile.thirdParties.length === 0 || profile.hasSubprocessorList, weight: 12 },
    { passed: profile.hasBackupProcess, weight: 8 },
    { passed: !profile.hasAdminRoles || profile.hasAdminAuditLogs, weight: 8 },
    { passed: !analyticsRelevant || profile.hasCookieNotice, weight: 5 },
    { passed: profile.hasIncidentResponseNote, weight: 7 },
    { passed: !aiRelevant || profile.hasAiDataUsageNote, weight: aiRelevant ? 10 : 0 }
  ].filter((check) => check.weight > 0);

  const achieved = checks.reduce((sum, check) => sum + (check.passed ? check.weight : 0), 0);
  const possible = checks.reduce((sum, check) => sum + check.weight, 0);
  const total = Math.min(100, Math.max(0, Math.round(38 + (achieved / possible) * 62)));

  return {
    total,
    level: scoreLevel(total),
    categories: {
      privacyBasics: weightedScore([
        { passed: profile.hasPrivacyPolicy, weight: 15 },
        { passed: !analyticsRelevant || profile.hasCookieNotice, weight: analyticsRelevant ? 5 : 0 }
      ].filter((check) => check.weight > 0)),
      securitySignals: weightedScore([
        { passed: profile.hasSecurityContact, weight: 10 },
        { passed: profile.hasBackupProcess, weight: 8 },
        { passed: !profile.hasAdminRoles || profile.hasAdminAuditLogs, weight: profile.hasAdminRoles ? 8 : 0 },
        { passed: profile.hasIncidentResponseNote, weight: 7 }
      ].filter((check) => check.weight > 0)),
      dataHandling: weightedScore([
        { passed: profile.hasDataDeletionProcess, weight: 12 },
        { passed: profile.hasPrivacyPolicy, weight: 10 }
      ]),
      vendorTransparency: weightedScore([
        { passed: profile.thirdParties.length === 0 || profile.hasSubprocessorList, weight: profile.thirdParties.length > 0 ? 12 : 0 }
      ].filter((check) => check.weight > 0)),
      customerReadiness: weightedScore([
        { passed: profile.hasTerms, weight: 8 },
        { passed: profile.hasSecurityContact, weight: 10 },
        { passed: profile.hasPrivacyPolicy, weight: 10 }
      ]),
      ...(aiRelevant
        ? {
            aiTransparency: weightedScore([{ passed: profile.hasAiDataUsageNote, weight: 10 }])
          }
        : {})
    }
  };
}

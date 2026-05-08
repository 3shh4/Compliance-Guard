import type {
  AuditContext,
  AuditStatus,
  ComplianceRule,
  Finding,
  FindingTask,
  FindingStatus,
  RiskLevel,
  RuleCondition,
  WorkflowFinding
} from "../types";

export const severityPenalty: Record<RiskLevel, number> = {
  low: 5,
  medium: 10,
  high: 20,
  critical: 35
};

const processField = "process";

function getConditionValue(condition: RuleCondition, context: AuditContext) {
  if (condition.field.startsWith("answers.")) {
    const key = condition.field.replace("answers.", "") as keyof AuditContext["answers"];
    return context.answers[key];
  }

  if (condition.field === "process") {
    return context.process;
  }

  if (condition.field === "regulations") {
    return context.regulations;
  }

  return context.dataTypes;
}

export function evaluateCondition(condition: RuleCondition, context: AuditContext) {
  const fieldValue = getConditionValue(condition, context);

  if (condition.operator === "equals") {
    return fieldValue === condition.value;
  }

  if (condition.operator === "includes") {
    return Array.isArray(fieldValue) && fieldValue.includes(String(condition.value) as never);
  }

  if (condition.operator === "is_true") {
    return Boolean(fieldValue);
  }

  if (condition.operator === "is_false") {
    return !Boolean(fieldValue);
  }

  return false;
}

function isProcessRelevant(rule: ComplianceRule, context: AuditContext) {
  const processConditions = rule.appliesWhen.filter((condition) => condition.field === processField);
  return processConditions.length === 0 || processConditions.every((condition) => evaluateCondition(condition, context));
}

function isApplicable(rule: ComplianceRule, context: AuditContext) {
  return rule.appliesWhen.every((condition) => evaluateCondition(condition, context));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
}

function ownerForRisk(riskLevel: RiskLevel) {
  if (riskLevel === "critical") {
    return "Security Lead";
  }

  if (riskLevel === "high") {
    return "Dev Team Lead";
  }

  if (riskLevel === "medium") {
    return "Platform Owner";
  }

  return "Service Owner";
}

function dueDateForRisk(riskLevel: RiskLevel) {
  const days: Record<RiskLevel, number> = {
    critical: 7,
    high: 14,
    medium: 30,
    low: 45
  };

  return addDays(new Date(), days[riskLevel]);
}

function issuePrefix(riskLevel: RiskLevel) {
  if (riskLevel === "critical") {
    return "[SEC][CRITICAL]";
  }

  if (riskLevel === "high") {
    return "[SEC][HIGH]";
  }

  return "[COMPLIANCE]";
}

function createFindingTask(rule: ComplianceRule, status: FindingStatus, index: number): FindingTask {
  const taskId = status === "failed" ? `RG-${String(index + 1).padStart(3, "0")}` : "N/A";
  const issueTitle = `${issuePrefix(rule.riskLevel)} ${rule.title}`;
  const issueBody = [
    "## Wymóg",
    rule.legalReference,
    "",
    "## Problem",
    rule.description,
    "",
    "## Kontrola techniczna",
    rule.engineeringControl,
    "",
    "## Zadania",
    ...rule.remediationTasks.map((task) => `- [ ] ${task}`),
    "",
    "## Wymagany dowód",
    ...(rule.evidenceExamples ?? []).map((evidence) => `- ${evidence}`)
  ].join("\n");

  return {
    taskId,
    owner: status === "failed" ? ownerForRisk(rule.riskLevel) : "Compliance Owner",
    dueDate: dueDateForRisk(rule.riskLevel),
    workflowStatus: status === "failed" ? "open" : "done",
    evidenceRequired: rule.evidenceExamples ?? [],
    issueTitle,
    issueBody
  };
}

export function generateFindings(context: AuditContext, rules: ComplianceRule[]): WorkflowFinding[] {
  const selectedRules = rules.filter(
    (rule) => context.regulations.includes(rule.regulation) && isProcessRelevant(rule, context)
  );

  return selectedRules.map((rule, index) => {
    const applicable = isApplicable(rule, context);
    const projectAnswer = context.answers[rule.answerKey];
    const status: FindingStatus = !applicable
      ? "not_applicable"
      : projectAnswer === rule.failWhen
        ? "failed"
        : "passed";

    const finding: Finding = {
      id: `finding-${rule.id}`,
      ruleId: rule.id,
      title: rule.title,
      regulation: rule.regulation,
      legalReference: rule.legalReference,
      status,
      riskLevel: rule.riskLevel,
      question: rule.question,
      projectAnswer,
      problem: rule.description,
      riskExplanation: rule.riskExplanation,
      businessImpact: rule.businessImpact,
      engineeringControl: rule.engineeringControl,
      remediationTasks: rule.remediationTasks,
      evidenceExamples: rule.evidenceExamples ?? [],
      relatedRules: selectedRules
        .filter((candidate) => candidate.id !== rule.id && candidate.regulation === rule.regulation)
        .slice(0, 3)
        .map((candidate) => candidate.id)
    };

    return {
      ...finding,
      task: createFindingTask(rule, status, index)
    };
  });
}

export function calculateComplianceScore(findings: WorkflowFinding[]) {
  const penalty = findings
    .filter((finding) => finding.status === "failed")
    .reduce((total, finding) => total + severityPenalty[finding.riskLevel], 0);

  return Math.max(0, 100 - penalty);
}

export function getAuditStatus(score: number): AuditStatus {
  if (score >= 85) {
    return "low-risk";
  }

  if (score >= 70) {
    return "medium-risk";
  }

  if (score >= 50) {
    return "high-risk";
  }

  return "critical-risk";
}

export function createAuditResult(context: AuditContext, rules: ComplianceRule[], name = "Audyt techniczny") {
  const findings = generateFindings(context, rules);
  const score = calculateComplianceScore(findings);

  return {
    id: `audit-${Date.now()}`,
    name,
    context,
    findings,
    score,
    status: getAuditStatus(score),
    createdAt: new Date().toISOString()
  };
}

export function sortFindingsByPriority<T extends Finding>(findings: T[]) {
  const priority: Record<RiskLevel, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3
  };

  return [...findings].sort((a, b) => priority[a.riskLevel] - priority[b.riskLevel]);
}

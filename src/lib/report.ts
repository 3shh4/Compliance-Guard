import { sortFindingsByPriority } from "./rulesEngine";
import { auditStatusLabel, dataTypeLabel, findingStatusLabel, regulationLabel } from "./labels";
import type { AuditResult, RiskLevel, WorkflowFinding } from "../types";

const reportRiskLabel: Record<RiskLevel, string> = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
  critical: "CRITICAL"
};

function findingSection(finding: WorkflowFinding) {
  return `### [${reportRiskLabel[finding.riskLevel]}] ${finding.title}

Status: ${findingStatusLabel[finding.status]}
Regulacja: ${regulationLabel[finding.regulation]}
Podstawa: ${finding.legalReference}

Opis problemu:
${finding.problem}

Ryzyko:
${finding.riskExplanation}

Wpływ biznesowy:
${finding.businessImpact}

Kontrola techniczna:
${finding.engineeringControl}

Zadania:
Task ID: ${finding.task.taskId}
Owner: ${finding.task.owner}
Termin: ${finding.task.dueDate}
Status remediacji: ${finding.task.workflowStatus}

${finding.remediationTasks.map((task) => `- ${task}`).join("\n")}

Wymagany dowód:
${finding.evidenceExamples.map((evidence) => `- ${evidence}`).join("\n")}`;
}

export function generateMarkdownReport(audit: AuditResult) {
  const failed = sortFindingsByPriority(audit.findings.filter((finding) => finding.status === "failed"));
  const priorityRisks = failed.slice(0, 5);
  const plan = failed.flatMap((finding) =>
    finding.remediationTasks.slice(0, 2).map((task) => `${task} (${finding.ruleId})`)
  );

  return `# Raport pre-audytu compliance

## Podsumowanie

Projekt: ${audit.context.serviceName}
Proces: ${audit.name}
Regulacje: ${audit.context.regulations.map((regulation) => regulationLabel[regulation]).join(", ")}
Typy danych: ${audit.context.dataTypes.map((dataType) => dataTypeLabel[dataType]).join(", ")}
Wynik zgodności: ${audit.score}%
Status ryzyka: ${auditStatusLabel[audit.status]}
Data wygenerowania: ${new Date(audit.createdAt).toLocaleString("pl-PL")}

## Najważniejsze ryzyka

${
  priorityRisks.length > 0
    ? priorityRisks.map((finding, index) => `${index + 1}. ${finding.title} - ${finding.riskExplanation}`).join("\n")
    : "Brak niezgodnych findingów w ostatnim audycie."
}

## Findings

${audit.findings.length > 0 ? audit.findings.map(findingSection).join("\n\n") : "Brak findingów dla wybranego zakresu."}

## Rekomendacje na 30 dni

${
  plan.length > 0
    ? plan.slice(0, 10).map((task, index) => `${index + 1}. ${task}`).join("\n")
    : "1. Utrzymaj obecne kontrole i zaplanuj kolejny przegląd po zmianach w architekturze."
}

## Zastrzeżenie

Ten raport ma charakter edukacyjny i pre-audytowy. Nie stanowi porady prawnej.
`;
}

export async function copyMarkdown(contents: string) {
  await navigator.clipboard.writeText(contents);
}

export function downloadMarkdown(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

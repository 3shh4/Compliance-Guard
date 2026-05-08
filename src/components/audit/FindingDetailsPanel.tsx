import { X } from "lucide-react";
import { findingStatusLabel, regulationLabel, riskLabel, riskTone, workflowStatusLabel } from "../../lib/labels";
import type { WorkflowFinding } from "../../types";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

const implementationExample = `type ConsentEvent = {
  userId: string;
  purpose: "marketing" | "analytics" | "location";
  granted: boolean;
  policyVersion: string;
  collectedAt: string;
  source: "signup" | "settings" | "checkout";
};`;

export function FindingDetailsPanel({
  finding,
  onClose
}: {
  finding: WorkflowFinding | null;
  onClose: () => void;
}) {
  if (!finding) {
    return null;
  }

  return (
    <aside className="details-panel" aria-label="Szczegóły findingu">
      <div className="details-head">
        <div>
          <span className="eyebrow">Szczegóły findingu</span>
          <h2>{finding.title}</h2>
        </div>
        <Button variant="ghost" onClick={onClose} aria-label="Zamknij szczegóły">
          <X size={16} />
        </Button>
      </div>

      <div className="details-badges">
        <Badge tone={finding.status === "failed" ? "danger" : finding.status === "passed" ? "success" : "neutral"}>
          {findingStatusLabel[finding.status]}
        </Badge>
        <Badge tone={riskTone(finding.riskLevel)}>{riskLabel[finding.riskLevel]} ryzyko</Badge>
        <Badge tone="info">{regulationLabel[finding.regulation]}</Badge>
      </div>

      <dl className="details-list">
        <div>
          <dt>Status remediacji</dt>
          <dd>
            {workflowStatusLabel[finding.task.workflowStatus]} · {finding.task.taskId} · Owner: {finding.task.owner} · Termin:{" "}
            {finding.task.dueDate}
          </dd>
        </div>
        <div>
          <dt>Podstawa regulacyjna</dt>
          <dd>{finding.legalReference}</dd>
        </div>
        <div>
          <dt>Dlaczego to ważne</dt>
          <dd>{finding.riskExplanation}</dd>
        </div>
        <div>
          <dt>Wpływ biznesowy</dt>
          <dd>{finding.businessImpact}</dd>
        </div>
        <div>
          <dt>Kontrola techniczna</dt>
          <dd>{finding.engineeringControl}</dd>
        </div>
      </dl>

      <div className="details-section">
        <h3>Zadania wdrożeniowe</h3>
        <ul>
          {finding.remediationTasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>

      <div className="details-section">
        <h3>Wymagany dowód</h3>
        <ul>
          {finding.evidenceExamples.map((evidence) => (
            <li key={evidence}>{evidence}</li>
          ))}
        </ul>
      </div>

      <div className="details-section">
        <h3>Przykład implementacji</h3>
        <pre className="code-block">{implementationExample}</pre>
      </div>

      <div className="details-section">
        <h3>Automated Issue Template</h3>
        <Button
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(`${finding.task.issueTitle}\n\n${finding.task.issueBody}`)}
        >
          Kopiuj ticket do GitHub/Jira
        </Button>
        <pre className="code-block">{`${finding.task.issueTitle}\n\n${finding.task.issueBody}`}</pre>
      </div>

      <div className="details-section">
        <h3>Powiązane reguły</h3>
        <div className="related-rules">
          {finding.relatedRules.length > 0 ? finding.relatedRules.map((rule) => <Badge key={rule}>{rule}</Badge>) : <Badge>Brak</Badge>}
        </div>
      </div>
    </aside>
  );
}

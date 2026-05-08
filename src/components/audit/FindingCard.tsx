import { ArrowRight, CheckCircle2, CircleSlash, XCircle } from "lucide-react";
import { findingStatusLabel, regulationLabel, riskLabel, riskTone, workflowStatusLabel } from "../../lib/labels";
import type { WorkflowFinding } from "../../types";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export function FindingCard({ finding, onOpen }: { finding: WorkflowFinding; onOpen: (finding: WorkflowFinding) => void }) {
  const StatusIcon =
    finding.status === "passed" ? CheckCircle2 : finding.status === "not_applicable" ? CircleSlash : XCircle;

  return (
    <article className={`finding-card finding-${finding.status}`}>
      <div className="finding-card-head">
        <div>
          <div className="finding-title">
            <StatusIcon size={18} />
            <h3>{finding.title}</h3>
          </div>
          <div className="inline-badges">
            <Badge tone={riskTone(finding.riskLevel)}>{riskLabel[finding.riskLevel]} ryzyko</Badge>
            <Badge tone="info">{regulationLabel[finding.regulation]}</Badge>
            <Badge tone={finding.status === "failed" ? "danger" : finding.status === "passed" ? "success" : "neutral"}>
              {findingStatusLabel[finding.status]}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" onClick={() => onOpen(finding)}>
          Szczegóły
          <ArrowRight size={15} />
        </Button>
      </div>

      <div className="finding-content-grid">
        <div>
          <span>Problem</span>
          <p>{finding.problem}</p>
        </div>
        <div>
          <span>Ryzyko</span>
          <p>{finding.riskExplanation}</p>
        </div>
        <div>
          <span>Podstawa regulacyjna</span>
          <p>{finding.legalReference}</p>
        </div>
        <div>
          <span>Kontrola techniczna</span>
          <p>{finding.engineeringControl}</p>
        </div>
      </div>

      {finding.status === "failed" ? (
        <div className="developer-task-list">
          <span>
            Zadania dla developera · {finding.task.taskId} · {workflowStatusLabel[finding.task.workflowStatus]} · Owner:{" "}
            {finding.task.owner} · Termin: {finding.task.dueDate}
          </span>
          {finding.remediationTasks.slice(0, 3).map((task) => (
            <label key={task}>
              <input type="checkbox" />
              <span>{task}</span>
            </label>
          ))}
        </div>
      ) : null}
    </article>
  );
}

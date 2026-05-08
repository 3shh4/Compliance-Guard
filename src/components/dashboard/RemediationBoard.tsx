import { workflowStatusLabel, regulationLabel, riskLabel, riskTone } from "../../lib/labels";
import type { AuditResult } from "../../types";
import { Badge } from "../common/Badge";

export function RemediationBoard({ audit }: { audit: AuditResult }) {
  const openFindings = audit.findings.filter((finding) => finding.status === "failed").slice(0, 6);

  return (
    <section className="panel remediation-board">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Ścieżka remediacji</span>
          <h2>Open findings</h2>
        </div>
      </div>
      <div className="remediation-list">
        {openFindings.map((finding) => (
          <article key={finding.id} className="remediation-item">
            <div>
              <Badge tone={riskTone(finding.riskLevel)}>{riskLabel[finding.riskLevel]}</Badge>
              <Badge tone="info">{regulationLabel[finding.regulation]}</Badge>
            </div>
            <h3>{finding.title}</h3>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>{workflowStatusLabel[finding.task.workflowStatus]}</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{finding.task.owner}</dd>
              </div>
              <div>
                <dt>Task ID</dt>
                <dd>{finding.task.taskId}</dd>
              </div>
              <div>
                <dt>Termin</dt>
                <dd>{finding.task.dueDate}</dd>
              </div>
            </dl>
            <p>Dowód: {finding.task.evidenceRequired[0] ?? "Do uzupełnienia"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

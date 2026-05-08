import { auditStatusLabel, processLabel, riskTone } from "../../lib/labels";
import type { AuditResult, PersistedAuditRun } from "../../types";
import { Badge } from "../common/Badge";
import { EmptyState } from "../common/EmptyState";

export function AuditHistory({
  runs,
  currentAudit,
  cloudEnabled
}: {
  runs: PersistedAuditRun[];
  currentAudit: AuditResult;
  cloudEnabled: boolean;
}) {
  const visibleRuns = runs.length > 0 ? runs : [{ id: currentAudit.id, audit: currentAudit, createdAt: currentAudit.createdAt } as PersistedAuditRun];

  return (
    <section className="panel audit-history">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Historia audytów</span>
          <h2>Powtarzalny cykl pracy</h2>
        </div>
        <Badge tone={cloudEnabled ? "success" : "neutral"}>{cloudEnabled ? "Cloud sync" : "Demo memory"}</Badge>
      </div>
      {visibleRuns.length > 0 ? (
        <div className="history-list">
          {visibleRuns.slice(0, 5).map((run) => (
            <article key={run.id} className="history-item">
              <div>
                <strong>{run.audit.context.serviceName}</strong>
                <span>{processLabel[run.audit.context.process]}</span>
              </div>
              <strong>{run.audit.score}%</strong>
              <Badge tone={riskTone(run.audit.status)}>{auditStatusLabel[run.audit.status]}</Badge>
              <span>{new Date(run.createdAt).toLocaleDateString("pl-PL")}</span>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="Brak historii" text="Wykonaj audyt, aby zapisać pierwszy run." />
      )}
    </section>
  );
}

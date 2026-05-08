import { useMemo, useState } from "react";
import { auditStatusLabel, regulationLabel, riskLabel, riskTone } from "../../lib/labels";
import { sortFindingsByPriority } from "../../lib/rulesEngine";
import type { AuditResult, ReportMode } from "../../types";
import { Badge } from "../common/Badge";
import { MarkdownExport } from "./MarkdownExport";
import { ReportPreview } from "./ReportPreview";

const tabs: { id: ReportMode; label: string }[] = [
  { id: "executive", label: "Executive Summary" },
  { id: "dev", label: "Dev View" },
  { id: "auditor", label: "Auditor View" }
];

export function ReportsView({
  audit,
  markdown,
  onCopy,
  onDownload
}: {
  audit: AuditResult;
  markdown: string;
  onCopy: () => void;
  onDownload: () => void;
}) {
  const [mode, setMode] = useState<ReportMode>("executive");
  const failed = useMemo(() => sortFindingsByPriority(audit.findings.filter((finding) => finding.status === "failed")), [audit.findings]);

  return (
    <div className="view-stack">
      <section className="page-title">
        <div>
          <span className="eyebrow">Raporty</span>
          <h1>Raport z ostatniego audytu</h1>
          <p>Ten widok pokazuje ten sam wynik w trzech formatach: dla zarządu, zespołu technicznego i audytora.</p>
        </div>
        <MarkdownExport onCopy={onCopy} onDownload={onDownload} />
      </section>

      <div className="report-tabs">
        {tabs.map((tab) => (
          <button key={tab.id} className={mode === tab.id ? "report-tab active" : "report-tab"} onClick={() => setMode(tab.id)} type="button">
            {tab.label}
          </button>
        ))}
      </div>

      <div className="report-layout">
        <section className="panel report-readable">
          {mode === "executive" ? (
            <ExecutiveSummary audit={audit} failed={failed} />
          ) : mode === "dev" ? (
            <DevView failed={failed} />
          ) : (
            <AuditorView audit={audit} />
          )}
        </section>
        <ReportPreview markdown={markdown} />
      </div>
    </div>
  );
}

function ExecutiveSummary({ audit, failed }: { audit: AuditResult; failed: AuditResult["findings"] }) {
  return (
    <div className="report-section-stack">
      <div className="report-score">
        <span>Ogólny wynik zgodności</span>
        <strong>{audit.score}%</strong>
        <Badge tone={riskTone(audit.status)}>{auditStatusLabel[audit.status]}</Badge>
      </div>
      <ReportBlock title="Najważniejsze ryzyka">
        {failed.slice(0, 4).map((finding) => (
          <article key={finding.id} className="report-risk-item">
            <Badge tone={riskTone(finding.riskLevel)}>{riskLabel[finding.riskLevel]}</Badge>
            <strong>{finding.title}</strong>
            <p>{finding.businessImpact}</p>
          </article>
        ))}
      </ReportBlock>
      <ReportBlock title="Priorytety na najbliższe 30 dni">
        <ol>
          {failed
            .flatMap((finding) => finding.remediationTasks.slice(0, 1))
            .slice(0, 6)
            .map((task) => (
              <li key={task}>{task}</li>
            ))}
        </ol>
      </ReportBlock>
    </div>
  );
}

function DevView({ failed }: { failed: AuditResult["findings"] }) {
  return (
    <div className="report-section-stack">
      <ReportBlock title="Lista zadań wdrożeniowych">
        {failed.map((finding) => (
          <article key={finding.id} className="dev-task-block">
            <div>
              <Badge tone={riskTone(finding.riskLevel)}>{riskLabel[finding.riskLevel]}</Badge>
              <strong>{finding.title}</strong>
            </div>
            <ul>
              {finding.remediationTasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </article>
        ))}
      </ReportBlock>
    </div>
  );
}

function AuditorView({ audit }: { audit: AuditResult }) {
  return (
    <div className="report-section-stack">
      <ReportBlock title="Widok audytora">
        <div className="auditor-grid">
          {audit.findings.map((finding) => (
            <article key={finding.id} className="auditor-row">
              <div>
                <Badge tone="info">{regulationLabel[finding.regulation]}</Badge>
                <strong>{finding.legalReference}</strong>
              </div>
              <p>{finding.title}</p>
              <span>Status: {finding.status}</span>
              <span>Dowód: {finding.evidenceExamples[0] ?? "Do uzupełnienia"}</span>
            </article>
          ))}
        </div>
      </ReportBlock>
    </div>
  );
}

function ReportBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="report-block">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

import { FileText, LayoutTemplate, Lightbulb, Radar } from "lucide-react";
import type { TrustFinding, TrustReport } from "../../models/trust";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { DeveloperTasks } from "./DeveloperTasks";
import { FindingsList } from "./FindingsList";
import { ScoreCard } from "./ScoreCard";

type ResultsDashboardProps = {
  report: TrustReport;
  onSelectFinding: (finding: TrustFinding) => void;
  onOpenTrustPage: () => void;
  onOpenReport: () => void;
};

export function ResultsDashboard({ report, onSelectFinding, onOpenTrustPage, onOpenReport }: ResultsDashboardProps) {
  const topMissing = report.findings.slice(0, 5);

  return (
    <div className="results-page">
      <section className="results-hero">
        <div>
          <span className="eyebrow">Scan results</span>
          <h1>{report.profile.productName} trust readiness</h1>
          <p>What customers may ask, what is missing and what to ship first.</p>
        </div>
        <div className="results-actions">
          <button className="button button-secondary" onClick={onOpenTrustPage}>
            <LayoutTemplate size={18} />
            Generate Trust Page
          </button>
          <button className="button button-primary" onClick={onOpenReport}>
            <FileText size={18} />
            Export Report
          </button>
        </div>
      </section>

      <div className="results-grid">
        <ScoreCard score={report.score} />
        <section className="panel-card top-missing">
          <div className="panel-heading">
            <span className="eyebrow">Top missing items</span>
            <h2>Fix these first</h2>
          </div>
          <div className="missing-list">
            {topMissing.map((finding) => (
              <button key={finding.id} onClick={() => onSelectFinding(finding)}>
                <span className={`priority-badge ${finding.priority}`}>{finding.priority}</span>
                {finding.title}
              </button>
            ))}
          </div>
        </section>
      </div>

      <CategoryBreakdown score={report.score} />

      <section className="recommendation-card">
        <Lightbulb size={22} />
        <div>
          <span className="eyebrow">Recommended next step</span>
          <p>Create a basic public Trust Page and add the missing privacy/security signals customers are likely to ask about.</p>
        </div>
      </section>

      <section className="scan-summary-strip">
        <Radar size={20} />
        <span>{report.findings.length} trust gaps found</span>
        <span>{report.tasks.length} developer tasks generated</span>
        <span>{report.trustPageSections.length} trust page sections drafted</span>
      </section>

      <div className="dashboard-columns">
        <FindingsList findings={report.findings} onSelect={onSelectFinding} />
        <DeveloperTasks tasks={report.tasks} />
      </div>
    </div>
  );
}

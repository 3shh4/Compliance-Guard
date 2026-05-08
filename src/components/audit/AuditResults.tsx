import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { auditStatusLabel, dataTypeLabel, processLabel, regulationLabel, riskTone } from "../../lib/labels";
import { sortFindingsByPriority } from "../../lib/rulesEngine";
import type { AuditResult, Regulation, RiskLevel, WorkflowFinding } from "../../types";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import { FindingCard } from "./FindingCard";
import { FindingDetailsPanel } from "./FindingDetailsPanel";
import { SeverityFilter, type FindingFilter } from "./SeverityFilter";

const riskFilterValues: RiskLevel[] = ["critical", "high", "medium", "low"];
const regulationFilterValues: Regulation[] = ["GDPR", "PCI_DSS", "HIPAA", "CCPA", "SECURITY_BASELINE"];

export function AuditResults({
  audit,
  onOpenReports
}: {
  audit: AuditResult;
  onOpenReports: () => void;
}) {
  const [filter, setFilter] = useState<FindingFilter>("all");
  const [selectedFinding, setSelectedFinding] = useState<WorkflowFinding | null>(null);

  const counts = useMemo(
    () => ({
      passed: audit.findings.filter((finding) => finding.status === "passed").length,
      failed: audit.findings.filter((finding) => finding.status === "failed").length,
      notApplicable: audit.findings.filter((finding) => finding.status === "not_applicable").length,
      critical: audit.findings.filter((finding) => finding.status === "failed" && finding.riskLevel === "critical").length,
      high: audit.findings.filter((finding) => finding.status === "failed" && finding.riskLevel === "high").length,
      medium: audit.findings.filter((finding) => finding.status === "failed" && finding.riskLevel === "medium").length
    }),
    [audit.findings]
  );

  const filteredFindings = useMemo(() => {
    const sorted = sortFindingsByPriority(audit.findings);
    if (filter === "all") {
      return sorted;
    }
    if (filter === "failed") {
      return sorted.filter((finding) => finding.status === "failed");
    }
    if (riskFilterValues.includes(filter as RiskLevel)) {
      return sorted.filter((finding) => finding.riskLevel === filter);
    }
    if (regulationFilterValues.includes(filter as Regulation)) {
      return sorted.filter((finding) => finding.regulation === filter);
    }
    return sorted;
  }, [audit.findings, filter]);

  return (
    <section className="audit-results-layout">
      <div className="results-main">
        <div className="panel results-header">
          <div>
            <span className="eyebrow">Wygenerowana checklista</span>
            <h2>Audyt: {processLabel[audit.context.process]}</h2>
            <p>
              Regulacje: {audit.context.regulations.map((regulation) => regulationLabel[regulation]).join(", ")}
              {" · "}
              Typy danych: {audit.context.dataTypes.map((dataType) => dataTypeLabel[dataType]).join(", ")}
            </p>
          </div>
          <div className="score-summary">
            <strong>{audit.score}%</strong>
            <Badge tone={riskTone(audit.status)}>{auditStatusLabel[audit.status]}</Badge>
          </div>
        </div>

        <div className="summary-card-grid">
          <SummaryCard label="Zgodne" value={counts.passed} />
          <SummaryCard label="Niezgodne" value={counts.failed} />
          <SummaryCard label="Nie dotyczy" value={counts.notApplicable} />
          <SummaryCard label="Krytyczne" value={counts.critical} />
          <SummaryCard label="Wysokie" value={counts.high} />
          <SummaryCard label="Średnie" value={counts.medium} />
        </div>

        <div className="panel findings-panel">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">Lista findingów</span>
              <h2>Braki i kontrole techniczne</h2>
            </div>
            <Button variant="secondary" onClick={onOpenReports}>
              <FileText size={16} />
              Przejdź do raportu
            </Button>
          </div>
          <SeverityFilter value={filter} onChange={setFilter} />
          <div className="findings-list">
            {filteredFindings.length > 0 ? (
              filteredFindings.map((finding) => (
                <FindingCard key={finding.id} finding={finding} onOpen={setSelectedFinding} />
              ))
            ) : (
              <EmptyState title="Brak findingów dla filtra" text="Zmień filtr albo wygeneruj audyt z innym zakresem." />
            )}
          </div>
        </div>
      </div>

      <aside className="sticky-summary">
        <div className="panel">
          <span className="eyebrow">Podsumowanie</span>
          <h2>{audit.context.serviceName}</h2>
          <div className="score-meter">
            <div style={{ "--score": `${audit.score * 3.6}deg` } as React.CSSProperties}>
              <strong>{audit.score}%</strong>
            </div>
            <Badge tone={riskTone(audit.status)}>{auditStatusLabel[audit.status]}</Badge>
          </div>
          <p>
            Największy wpływ na wynik mają findingi krytyczne i wysokie. Priorytety w raporcie są sortowane według
            pilności działania.
          </p>
        </div>
      </aside>

      <FindingDetailsPanel finding={selectedFinding} onClose={() => setSelectedFinding(null)} />
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

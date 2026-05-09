import { AlertTriangle, ArrowRight } from "lucide-react";
import type { TrustFinding } from "../../models/trust";

type FindingsListProps = {
  findings: TrustFinding[];
  onSelect: (finding: TrustFinding) => void;
};

const priorityRank = {
  high: 0,
  medium: 1,
  low: 2
};

export function FindingsList({ findings, onSelect }: FindingsListProps) {
  const sorted = [...findings].sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);

  return (
    <section className="panel-card">
      <div className="panel-heading">
        <span className="eyebrow">Clickable trust gaps</span>
        <h2>Review what customers may notice first</h2>
      </div>
      <div className="findings-list">
        {sorted.map((finding) => (
          <button className="finding-row" key={finding.id} onClick={() => onSelect(finding)}>
            <span className={`priority-badge ${finding.priority}`}>{finding.priority}</span>
            <AlertTriangle size={18} />
            <span>
              <strong>{finding.title}</strong>
              <small>{finding.summary}</small>
            </span>
            <ArrowRight size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}

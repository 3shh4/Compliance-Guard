import { AlertTriangle, X } from "lucide-react";
import type { TrustFinding } from "../../models/trust";

type FindingDrawerProps = {
  finding: TrustFinding | null;
  onClose: () => void;
};

export function FindingDrawer({ finding, onClose }: FindingDrawerProps) {
  if (!finding) return null;

  return (
    <aside className="drawer-backdrop" aria-label="Finding detail">
      <div className="finding-drawer">
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Actionable trust fix</span>
            <h2>{finding.title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close finding drawer">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-badges">
          <AlertTriangle size={17} />
          <span className={`priority-badge ${finding.priority}`}>{finding.priority}</span>
          <span className="category-badge">{finding.category.replaceAll("-", " ")}</span>
        </div>

        <div className="drawer-section">
          <h3>Summary</h3>
          <p>{finding.summary}</p>
        </div>
        <div className="drawer-section">
          <h3>Why it matters</h3>
          <p>{finding.whyItMatters}</p>
        </div>
        <div className="drawer-section">
          <h3>Customer question it answers</h3>
          <p>{finding.customerQuestion}</p>
        </div>
        <div className="drawer-section">
          <h3>Suggested fix</h3>
          <ol>
            {finding.suggestedFix.map((fix) => (
              <li key={fix}>{fix}</li>
            ))}
          </ol>
        </div>
        <div className="drawer-section">
          <h3>Developer task</h3>
          <p className="mono">{finding.developerTask}</p>
        </div>
        {finding.generatedCopy ? (
          <div className="drawer-section">
            <h3>Generated copy snippet</h3>
            <p>{finding.generatedCopy}</p>
          </div>
        ) : null}
        {finding.relatedTrustPageSection ? (
          <div className="drawer-section">
            <h3>Related trust page section</h3>
            <p>{finding.relatedTrustPageSection}</p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

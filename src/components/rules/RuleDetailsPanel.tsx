import { X } from "lucide-react";
import { regulationLabel, riskLabel, riskTone } from "../../lib/labels";
import type { ComplianceRule } from "../../types";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export function RuleDetailsPanel({
  rule,
  onClose
}: {
  rule: ComplianceRule | null;
  onClose: () => void;
}) {
  if (!rule) {
    return null;
  }

  return (
    <aside className="details-panel" aria-label="Szczegóły reguły">
      <div className="details-head">
        <div>
          <span className="eyebrow">Reguła</span>
          <h2>{rule.title}</h2>
        </div>
        <Button variant="ghost" onClick={onClose} aria-label="Zamknij szczegóły">
          <X size={16} />
        </Button>
      </div>
      <div className="details-badges">
        <Badge tone="info">{regulationLabel[rule.regulation]}</Badge>
        <Badge tone={riskTone(rule.riskLevel)}>{riskLabel[rule.riskLevel]} ryzyko</Badge>
        <Badge>{rule.id}</Badge>
      </div>

      <dl className="details-list">
        <div>
          <dt>Opis reguły</dt>
          <dd>{rule.description}</dd>
        </div>
        <div>
          <dt>Kiedy ma zastosowanie</dt>
          <dd>{rule.appliesWhen.length > 0 ? rule.appliesWhen.map((condition) => `${condition.field} ${condition.operator} ${condition.value ?? ""}`).join(", ") : "Reguła bazowa dla wybranej regulacji."}</dd>
        </div>
        <div>
          <dt>Pytanie kontrolne</dt>
          <dd>{rule.question}</dd>
        </div>
        <div>
          <dt>Kontrola techniczna</dt>
          <dd>{rule.engineeringControl}</dd>
        </div>
        <div>
          <dt>Podstawa regulacyjna</dt>
          <dd>{rule.legalReference}</dd>
        </div>
      </dl>

      <div className="details-section">
        <h3>Rekomendowane zadania</h3>
        <ul>
          {rule.remediationTasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

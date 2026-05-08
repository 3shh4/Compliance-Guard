import { regulationOptions } from "../../data/mock";
import { regulationLabel } from "../../lib/labels";
import type { Regulation } from "../../types";
import { Badge } from "../common/Badge";

export function RegulationStep({
  values,
  onToggle
}: {
  values: Regulation[];
  onToggle: (value: Regulation) => void;
}) {
  return (
    <section className="wizard-step">
      <div className="wizard-step-heading">
        <span>2</span>
        <div>
          <h3>Jakie regulacje mają zastosowanie?</h3>
          <p>Możesz wybrać kilka standardów naraz.</p>
        </div>
      </div>
      <div className="selection-grid regulation-grid">
        {regulationOptions.map((option) => (
          <button
            key={option.value}
            className={values.includes(option.value) ? "selection-card selected" : "selection-card"}
            onClick={() => onToggle(option.value)}
            type="button"
          >
            <div className="selection-title-row">
              <strong>{option.label}</strong>
              <Badge tone="info">{regulationLabel[option.value]}</Badge>
            </div>
            <span>{option.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

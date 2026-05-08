import { processOptions } from "../../data/mock";
import type { BusinessProcess } from "../../types";

export function ProcessStep({
  value,
  onChange
}: {
  value: BusinessProcess;
  onChange: (value: BusinessProcess) => void;
}) {
  return (
    <section className="wizard-step">
      <div className="wizard-step-heading">
        <span>1</span>
        <div>
          <h3>Jaki proces chcesz sprawdzić?</h3>
          <p>Wybierz przepływ produktowy, który ma trafić do pre-audytu.</p>
        </div>
      </div>
      <div className="selection-grid process-grid">
        {processOptions.map((option) => (
          <button
            key={option.value}
            className={value === option.value ? "selection-card selected" : "selection-card"}
            onClick={() => onChange(option.value)}
            type="button"
          >
            <strong>{option.label}</strong>
            <span>{option.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

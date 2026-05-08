import { dataTypeOptions } from "../../data/mock";
import type { DataType } from "../../types";

export function DataTypesStep({
  values,
  onToggle
}: {
  values: DataType[];
  onToggle: (value: DataType) => void;
}) {
  return (
    <section className="wizard-step">
      <div className="wizard-step-heading">
        <span>3</span>
        <div>
          <h3>Jakie dane przetwarza ten proces?</h3>
          <p>Typy danych decydują, które reguły zostaną oznaczone jako mające zastosowanie.</p>
        </div>
      </div>
      <div className="pill-grid">
        {dataTypeOptions.map((option) => (
          <button
            key={option.value}
            className={values.includes(option.value) ? "pill-toggle active" : "pill-toggle"}
            onClick={() => onToggle(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

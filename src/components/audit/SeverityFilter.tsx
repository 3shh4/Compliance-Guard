import type { Regulation, RiskLevel } from "../../types";
import { regulationLabel, riskLabel } from "../../lib/labels";

export type FindingFilter = "all" | "failed" | RiskLevel | Regulation;

const filters: { id: FindingFilter; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "critical", label: "Krytyczne" },
  { id: "high", label: "Wysokie" },
  { id: "medium", label: "Średnie" },
  { id: "low", label: "Niskie" },
  { id: "failed", label: "Tylko niezgodne" },
  { id: "GDPR", label: `Tylko ${regulationLabel.GDPR}` },
  { id: "PCI_DSS", label: `Tylko ${regulationLabel.PCI_DSS}` }
];

export function SeverityFilter({
  value,
  onChange
}: {
  value: FindingFilter;
  onChange: (filter: FindingFilter) => void;
}) {
  return (
    <div className="filter-strip" aria-label="Filtry findingów">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={value === filter.id ? "filter-chip active" : "filter-chip"}
          onClick={() => onChange(filter.id)}
          type="button"
        >
          {riskLabel[filter.id as RiskLevel] ?? filter.label}
        </button>
      ))}
    </div>
  );
}

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { complianceRules } from "../../data/rules";
import { dataTypeLabel, processLabel, regulationLabel, riskLabel, riskTone } from "../../lib/labels";
import type { ComplianceRule, DataType, Regulation, BusinessProcess } from "../../types";
import { Badge } from "../common/Badge";
import { EmptyState } from "../common/EmptyState";
import { RuleDetailsPanel } from "./RuleDetailsPanel";
import { PatternLibrary } from "./PatternLibrary";

const regulationFilters: ("ALL" | Regulation)[] = ["ALL", "GDPR", "PCI_DSS", "HIPAA", "CCPA", "SECURITY_BASELINE"];

function extractConditionValue<T extends string>(rule: ComplianceRule, field: string) {
  return rule.appliesWhen
    .filter((condition) => condition.field === field)
    .map((condition) => condition.value as T)
    .filter(Boolean);
}

export function RulesLibrary() {
  const [query, setQuery] = useState("");
  const [regulation, setRegulation] = useState<"ALL" | Regulation>("ALL");
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(null);

  const filteredRules = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return complianceRules.filter((rule) => {
      const matchesRegulation = regulation === "ALL" || rule.regulation === regulation;
      const matchesQuery =
        normalized.length === 0 ||
        [rule.id, rule.title, rule.description, rule.legalReference].some((value) =>
          value.toLowerCase().includes(normalized)
        );
      return matchesRegulation && matchesQuery;
    });
  }, [query, regulation]);

  return (
    <div className="view-stack">
      <section className="page-title">
        <div>
          <span className="eyebrow">Biblioteka reguł</span>
          <h1>Aktywne reguły compliance</h1>
          <p>34 aktywne reguły, 5 pakietów regulacyjnych, proste obiekty TypeScript gotowe pod Pull Requesty.</p>
        </div>
      </section>

      <PatternLibrary />

      <section className="panel rules-toolbar">
        <label className="search-field rules-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj reguł..." />
        </label>
        <div className="filter-strip">
          {regulationFilters.map((item) => (
            <button
              key={item}
              className={regulation === item ? "filter-chip active" : "filter-chip"}
              onClick={() => setRegulation(item)}
              type="button"
            >
              {item === "ALL" ? "Wszystkie" : regulationLabel[item]}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="table-wrap">
          <table className="rules-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Regulacja</th>
                <th>Tytuł</th>
                <th>Proces</th>
                <th>Typ danych</th>
                <th>Poziom ryzyka</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => {
                const processes = extractConditionValue<BusinessProcess>(rule, "process");
                const dataTypes = extractConditionValue<DataType>(rule, "dataTypes");
                return (
                  <tr key={rule.id} onClick={() => setSelectedRule(rule)}>
                    <td className="mono">{rule.id}</td>
                    <td>
                      <Badge tone="info">{regulationLabel[rule.regulation]}</Badge>
                    </td>
                    <td>
                      <strong>{rule.title}</strong>
                      <span>{rule.legalReference}</span>
                    </td>
                    <td>{processes.length > 0 ? processes.map((process) => processLabel[process]).join(", ") : "Dowolny"}</td>
                    <td>{dataTypes.length > 0 ? dataTypes.map((type) => dataTypeLabel[type]).join(", ") : "Dowolny"}</td>
                    <td>
                      <Badge tone={riskTone(rule.riskLevel)}>{riskLabel[rule.riskLevel]}</Badge>
                    </td>
                    <td>
                      <Badge tone="success">Aktywna</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredRules.length === 0 ? (
            <EmptyState title="Brak reguł" text="Zmień filtr lub frazę wyszukiwania." />
          ) : null}
        </div>
      </section>

      <RuleDetailsPanel rule={selectedRule} onClose={() => setSelectedRule(null)} />
    </div>
  );
}

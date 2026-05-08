import { dataTypeLabel, processLabel, regulationLabel } from "../../lib/labels";
import { industryPatterns } from "../../data/patterns";
import { Badge } from "../common/Badge";

export function PatternLibrary() {
  return (
    <section className="panel pattern-library">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Template / Pattern Library</span>
          <h2>Konteksty branżowe</h2>
        </div>
      </div>
      <div className="pattern-grid">
        {industryPatterns.map((pattern) => (
          <article className="pattern-card" key={pattern.id}>
            <div>
              <span>{pattern.audience}</span>
              <h3>{pattern.name}</h3>
              <p>{pattern.description}</p>
            </div>
            <div className="inline-badges">
              {pattern.recommendedRegulations.map((regulation) => (
                <Badge key={regulation} tone="info">
                  {regulationLabel[regulation]}
                </Badge>
              ))}
            </div>
            <div className="pattern-meta">
              <strong>Procesy</strong>
              <p>{pattern.recommendedProcesses.map((process) => processLabel[process]).join(", ")}</p>
              <strong>Typy danych</strong>
              <p>{pattern.recommendedDataTypes.map((dataType) => dataTypeLabel[dataType]).join(", ")}</p>
              <strong>Fokus ryzyka</strong>
              <p>{pattern.riskFocus.join(", ")}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

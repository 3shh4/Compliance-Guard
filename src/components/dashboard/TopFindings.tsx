import { AlertTriangle } from "lucide-react";

export function TopFindings({ risks }: { risks: string[] }) {
  return (
    <section className="panel top-findings">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Najpilniejsze braki</span>
          <h2>Kolejka ryzyka</h2>
        </div>
      </div>
      <div className="top-risk-list">
        {risks.map((risk, index) => (
          <article key={risk} className="top-risk-item">
            <div>
              <AlertTriangle size={17} />
              <span>{index + 1}</span>
            </div>
            <p>{risk}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import type { TrustScore } from "../../models/trust";

type CategoryBreakdownProps = {
  score: TrustScore;
};

const labels = {
  privacyBasics: "Privacy Basics",
  securitySignals: "Security Signals",
  dataHandling: "Data Handling",
  vendorTransparency: "Vendor Transparency",
  customerReadiness: "Customer Readiness",
  aiTransparency: "AI Transparency"
};

export function CategoryBreakdown({ score }: CategoryBreakdownProps) {
  const entries = Object.entries(score.categories) as Array<[keyof typeof labels, number]>;

  return (
    <section className="panel-card">
      <div className="panel-heading">
        <span className="eyebrow">Category breakdown</span>
        <h2>Where trust signals are strong or thin</h2>
      </div>
      <div className="category-list">
        {entries.map(([key, value]) => (
          <div className="category-row" key={key}>
            <div>
              <strong>{labels[key]}</strong>
              <span>{value}%</span>
            </div>
            <div className="progress-track">
              <div style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

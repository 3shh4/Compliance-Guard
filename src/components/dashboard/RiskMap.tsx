import { regulationLabel, riskTone } from "../../lib/labels";
import type { Regulation } from "../../types";
import { Badge } from "../common/Badge";
import { ProgressBar } from "../common/ProgressBar";

export function RiskMap({ items }: { items: { regulation: Regulation; score: number }[] }) {
  return (
    <section className="panel risk-map">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Mapa ryzyka</span>
          <h2>Pokrycie regulacji</h2>
        </div>
      </div>
      <div className="risk-map-list">
        {items.map((item) => {
          const status = item.score >= 85 ? "low-risk" : item.score >= 70 ? "medium-risk" : item.score >= 50 ? "high-risk" : "critical-risk";
          return (
            <div className="risk-map-row" key={item.regulation}>
              <div>
                <strong>{regulationLabel[item.regulation]}</strong>
                <Badge tone={riskTone(status)}>{item.score}%</Badge>
              </div>
              <ProgressBar value={item.score} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

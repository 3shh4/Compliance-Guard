import type { CSSProperties } from "react";
import type { TrustScore } from "../../models/trust";

type ScoreCardProps = {
  score: TrustScore;
};

export function ScoreCard({ score }: ScoreCardProps) {
  const scoreTone = score.total < 60 ? "risk" : score.total < 80 ? "warning" : "ready";

  return (
    <section className={`score-card ${scoreTone}`}>
      <div className="score-ring" style={{ "--score-angle": `${score.total * 3.6}deg` } as CSSProperties}>
        <strong>{score.total}</strong>
        <span>/100</span>
      </div>
      <div>
        <span className="eyebrow">Trust readiness score</span>
        <h2>{score.level}</h2>
        <p>
          {score.total >= 80
            ? "Strong visible foundation. Keep the trust page accurate as the product changes."
            : "Fix the missing trust signals that serious users and first B2B customers are likely to ask about."}
        </p>
      </div>
    </section>
  );
}

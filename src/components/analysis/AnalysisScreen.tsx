import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TrustReport } from "../../models/trust";
import { AnalysisLog } from "./AnalysisLog";
import { AnalysisStage } from "./AnalysisStage";

type AnalysisScreenProps = {
  report: TrustReport;
  onViewResults: () => void;
};

const stages = [
  "Product profile",
  "Data exposure",
  "Vendor transparency",
  "Security basics",
  "Privacy readiness",
  "Trust page draft",
  "Developer tasks",
  "Final score"
];

const logLines = [
  "> scan.init product_profile",
  "> detecting collected data types...",
  "> mapping third-party providers...",
  "> checking privacy basics...",
  "> checking security transparency...",
  "> looking for missing customer-facing trust signals...",
  "> generating developer tasks...",
  "> drafting trust page sections...",
  "> preparing trust readiness report..."
];

export function AnalysisScreen({ report, onViewResults }: AnalysisScreenProps) {
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setVisibleLogs(0);
    setComplete(false);

    const timer = window.setInterval(() => {
      setVisibleLogs((current) => {
        if (current >= logLines.length) {
          window.clearInterval(timer);
          setComplete(true);
          return current;
        }

        return current + 1;
      });
    }, 520);

    return () => window.clearInterval(timer);
  }, [report.profile.productName]);

  const progress = useMemo(() => {
    if (complete) return 100;
    return Math.round((visibleLogs / logLines.length) * 100);
  }, [complete, visibleLogs]);

  return (
    <div className="analysis-page">
      <section className="analysis-hero">
        <div>
          <span className="eyebrow">ShipTrust scanner pipeline</span>
          <h1>{complete ? "Analysis complete." : "Running trust research..."}</h1>
          <p>
            ShipTrust is building a trust profile, checking customer-facing gaps and preparing developer tasks for{" "}
            {report.profile.productName}.
          </p>
        </div>
        <div className="analysis-meter">
          <strong>{progress}%</strong>
          <span>{complete ? "complete" : "running"}</span>
        </div>
      </section>

      <section className="analysis-grid">
        <div className="analysis-stages">
          {stages.map((stage, index) => {
            const state = complete || index < visibleLogs - 1 ? "complete" : index === visibleLogs - 1 ? "running" : "queued";
            return <AnalysisStage key={stage} label={stage} state={state} />;
          })}
        </div>

        <div className="terminal-panel">
          <div className="terminal-title">
            <Terminal size={18} />
            <span className="mono">shiptrust://scan/{report.profile.productName.toLowerCase().replaceAll(" ", "-")}</span>
            <span className={complete ? "terminal-pill complete" : "terminal-pill"}>{complete ? "complete" : "running"}</span>
          </div>
          <AnalysisLog logs={logLines.slice(0, visibleLogs)} />
          {complete ? (
            <div className="analysis-complete">
              <CheckCircle2 size={20} />
              <div>
                <strong>Analysis complete.</strong>
                <p>
                  We found {report.findings.length} trust gaps and {report.tasks.length} suggested tasks.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="analysis-actions">
        <button className="button button-primary" disabled={!complete} onClick={onViewResults}>
          View Results
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

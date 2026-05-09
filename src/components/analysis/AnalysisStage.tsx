import { CheckCircle2, Loader2 } from "lucide-react";

type AnalysisStageProps = {
  label: string;
  state: "queued" | "running" | "complete";
};

export function AnalysisStage({ label, state }: AnalysisStageProps) {
  return (
    <div className={`analysis-stage ${state}`}>
      {state === "complete" ? <CheckCircle2 size={18} /> : <Loader2 size={18} />}
      <span>{label}</span>
      <small>{state}</small>
    </div>
  );
}

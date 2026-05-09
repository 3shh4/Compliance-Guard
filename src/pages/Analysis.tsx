import { AnalysisScreen } from "../components/analysis/AnalysisScreen";
import type { TrustReport } from "../models/trust";

type AnalysisProps = {
  report: TrustReport;
  onViewResults: () => void;
};

export function Analysis({ report, onViewResults }: AnalysisProps) {
  return <AnalysisScreen report={report} onViewResults={onViewResults} />;
}

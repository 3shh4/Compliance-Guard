import { FindingDrawer } from "../components/results/FindingDrawer";
import { ResultsDashboard } from "../components/results/ResultsDashboard";
import type { TrustFinding, TrustReport } from "../models/trust";

type ResultsProps = {
  report: TrustReport;
  selectedFinding: TrustFinding | null;
  onSelectFinding: (finding: TrustFinding) => void;
  onCloseFinding: () => void;
  onOpenTrustPage: () => void;
  onOpenReport: () => void;
};

export function Results({
  report,
  selectedFinding,
  onSelectFinding,
  onCloseFinding,
  onOpenTrustPage,
  onOpenReport
}: ResultsProps) {
  return (
    <>
      <ResultsDashboard
        report={report}
        onSelectFinding={onSelectFinding}
        onOpenTrustPage={onOpenTrustPage}
        onOpenReport={onOpenReport}
      />
      <FindingDrawer finding={selectedFinding} onClose={onCloseFinding} />
    </>
  );
}

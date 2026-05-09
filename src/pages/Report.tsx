import { ReportExport } from "../components/report/ReportExport";
import type { TrustReport } from "../models/trust";

type ReportProps = {
  report: TrustReport;
  onBack: () => void;
};

export function Report({ report, onBack }: ReportProps) {
  return <ReportExport report={report} onBack={onBack} />;
}

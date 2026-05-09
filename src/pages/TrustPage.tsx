import { TrustPageGenerator } from "../components/trust-page/TrustPageGenerator";
import type { TrustReport } from "../models/trust";

type TrustPageProps = {
  report: TrustReport;
  onBack: () => void;
};

export function TrustPage({ report, onBack }: TrustPageProps) {
  return <TrustPageGenerator report={report} onBack={onBack} />;
}

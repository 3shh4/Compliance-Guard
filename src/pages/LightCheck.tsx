import { LightCheckWizard } from "../components/wizard/LightCheckWizard";
import type { TrustProfile } from "../models/trust";

type LightCheckProps = {
  onComplete: (profile: TrustProfile) => void;
  onCancel: () => void;
};

export function LightCheck({ onComplete, onCancel }: LightCheckProps) {
  return <LightCheckWizard onComplete={onComplete} onCancel={onCancel} />;
}

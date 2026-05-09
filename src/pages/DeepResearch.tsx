import { GuidedChat } from "../components/chat/GuidedChat";
import type { TrustProfile } from "../models/trust";

type DeepResearchProps = {
  initialDescription?: string;
  onComplete: (profile: TrustProfile) => void;
  onCancel: () => void;
};

export function DeepResearch({ initialDescription, onComplete, onCancel }: DeepResearchProps) {
  return <GuidedChat initialDescription={initialDescription} onComplete={onComplete} onCancel={onCancel} />;
}

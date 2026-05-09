import { stageLabels, productTypeLabels } from "../../data/trustOptions";
import type { TrustProfile } from "../../models/trust";

type ProfileSummaryProps = {
  profile: TrustProfile;
};

function chipList(items: string[]) {
  return items.length ? items.join(", ") : "Not listed yet";
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  const missingBasics = [
    !profile.hasPrivacyPolicy ? "Privacy Policy" : "",
    !profile.hasSecurityContact ? "Security contact" : "",
    !profile.hasDataDeletionProcess ? "Data deletion process" : "",
    profile.thirdParties.length > 0 && !profile.hasSubprocessorList ? "Subprocessor list" : "",
    profile.usesAiPrompts && !profile.hasAiDataUsageNote ? "AI data usage note" : ""
  ].filter(Boolean);

  return (
    <section className="profile-summary">
      <div>
        <span>Product type</span>
        <strong>{productTypeLabels[profile.productType]}</strong>
      </div>
      <div>
        <span>Stage</span>
        <strong>{stageLabels[profile.stage]}</strong>
      </div>
      <div>
        <span>Data collected</span>
        <strong>{chipList(profile.collectedData)}</strong>
      </div>
      <div>
        <span>Vendors</span>
        <strong>{chipList([...profile.infrastructure, ...profile.thirdParties])}</strong>
      </div>
      <div>
        <span>Missing trust basics</span>
        <strong>{missingBasics.length ? missingBasics.join(", ") : "No obvious missing basics"}</strong>
      </div>
    </section>
  );
}

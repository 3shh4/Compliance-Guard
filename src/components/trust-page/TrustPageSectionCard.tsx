import { Copy } from "lucide-react";
import { useState } from "react";
import { copyTextToClipboard } from "../../engine/trustReportGenerator";
import type { TrustPageSection } from "../../models/trust";

type TrustPageSectionCardProps = {
  section: TrustPageSection;
};

export function TrustPageSectionCard({ section }: TrustPageSectionCardProps) {
  const [copied, setCopied] = useState(false);

  async function copySection() {
    await copyTextToClipboard(`## ${section.title}\n\n${section.content}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <article className="trust-section-card">
      <div className="trust-section-head">
        <div>
          <span className={`section-status ${section.status}`}>{section.status.replace("-", " ")}</span>
          <h2>{section.title}</h2>
        </div>
        <button className="icon-button" onClick={copySection} aria-label={`Copy ${section.title}`}>
          <Copy size={18} />
        </button>
      </div>
      <p>{section.content}</p>
      {copied ? <small className="copied-note">Copied section</small> : null}
    </article>
  );
}

import { ArrowLeft, Copy, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { copyTextToClipboard, downloadMarkdown } from "../../engine/trustReportGenerator";
import type { TrustReport } from "../../models/trust";
import { TrustPageSectionCard } from "./TrustPageSectionCard";

type TrustPageGeneratorProps = {
  report: TrustReport;
  onBack: () => void;
};

export function TrustPageGenerator({ report, onBack }: TrustPageGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const trustPageMarkdown = useMemo(
    () =>
      `# ${report.profile.productName} Trust Page Draft\n\n${report.trustPageSections
        .map((section) => `## ${section.title}\n\n_Status: ${section.status}_\n\n${section.content}`)
        .join("\n\n")}`,
    [report]
  );

  async function copyMarkdown() {
    await copyTextToClipboard(trustPageMarkdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="trust-page">
      <section className="results-hero">
        <div>
          <span className="eyebrow">Trust Page Generator</span>
          <h1>Draft a customer-facing trust page</h1>
          <p>Generate a lightweight trust page draft from your current product profile.</p>
        </div>
        <div className="results-actions">
          <button className="button button-secondary" onClick={onBack}>
            <ArrowLeft size={18} />
            Results
          </button>
          <button className="button button-secondary" onClick={copyMarkdown}>
            <Copy size={18} />
            {copied ? "Copied" : "Copy Trust Page Markdown"}
          </button>
          <button
            className="button button-primary"
            onClick={() => downloadMarkdown(`${report.profile.productName.toLowerCase().replaceAll(" ", "-")}-trust-page.md`, trustPageMarkdown)}
          >
            <Download size={18} />
            Download .md
          </button>
        </div>
      </section>

      <div className="trust-page-layout">
        <aside className="trust-preview-card">
          <span className="eyebrow">Preview</span>
          <h2>{report.profile.productName} Trust Page Draft</h2>
          <p>
            This draft is meant for review before publishing. Copy sections into your docs, landing page or /trust route
            when the content matches the real product.
          </p>
          <div className="flow-steps">
            <span>Product overview</span>
            <span>Data we process</span>
            <span>Providers</span>
            <span>Current gaps</span>
          </div>
        </aside>
        <div className="trust-section-grid">
          {report.trustPageSections.map((section) => (
            <TrustPageSectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

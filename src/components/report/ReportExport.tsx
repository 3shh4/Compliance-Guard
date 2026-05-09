import { ArrowLeft, Copy, Download } from "lucide-react";
import { useState } from "react";
import { copyTextToClipboard, downloadMarkdown } from "../../engine/trustReportGenerator";
import type { TrustReport } from "../../models/trust";

type ReportExportProps = {
  report: TrustReport;
  onBack: () => void;
};

export function ReportExport({ report, onBack }: ReportExportProps) {
  const [copied, setCopied] = useState(false);

  async function copyMarkdown() {
    await copyTextToClipboard(report.markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="report-page">
      <section className="results-hero">
        <div>
          <span className="eyebrow">Markdown Report Export</span>
          <h1>ShipTrust Report - {report.profile.productName}</h1>
          <p>Copy or download the trust-readiness report for GitHub issues, docs, customer prep or internal planning.</p>
        </div>
        <div className="results-actions">
          <button className="button button-secondary" onClick={onBack}>
            <ArrowLeft size={18} />
            Results
          </button>
          <button className="button button-secondary" onClick={copyMarkdown}>
            <Copy size={18} />
            {copied ? "Copied" : "Copy Markdown"}
          </button>
          <button
            className="button button-primary"
            onClick={() =>
              downloadMarkdown(`${report.profile.productName.toLowerCase().replaceAll(" ", "-")}-shiptrust-report.md`, report.markdown)
            }
          >
            <Download size={18} />
            Download .md
          </button>
        </div>
      </section>

      <pre className="markdown-preview">{report.markdown}</pre>
    </div>
  );
}

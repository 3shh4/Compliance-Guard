import { Copy, Download, FileClock } from "lucide-react";
import { Button } from "../common/Button";

export function MarkdownExport({
  onCopy,
  onDownload
}: {
  onCopy: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="export-actions">
      <Button variant="secondary" onClick={onCopy}>
        <Copy size={16} />
        Kopiuj Markdown
      </Button>
      <Button variant="primary" onClick={onDownload}>
        <Download size={16} />
        Pobierz Markdown
      </Button>
      <button className="button button-disabled" disabled type="button">
        <FileClock size={16} />
        Eksport PDF - wkrótce
      </button>
    </div>
  );
}

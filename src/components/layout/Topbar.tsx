import { Download, Play, Search } from "lucide-react";
import { Button } from "../common/Button";

export function Topbar({
  onExport,
  onRunDemo
}: {
  onExport: () => void;
  onRunDemo: () => void;
}) {
  return (
    <header className="topbar">
      <div className="topbar-workspace">
        <span>Aktualny workspace</span>
        <strong>Demo Workspace</strong>
      </div>
      <label className="search-field">
        <Search size={16} />
        <input placeholder="Szukaj..." aria-label="Szukaj" />
      </label>
      <div className="topbar-actions">
        <span className="demo-status">Status: first-view demo</span>
        <span className="preaudit-badge">Pre-audit only</span>
        <Button variant="ghost" onClick={onExport}>
          <Download size={16} />
          Eksportuj
        </Button>
        <Button variant="primary" onClick={onRunDemo}>
          <Play size={16} />
          Uruchom przykładowy audyt
        </Button>
      </div>
    </header>
  );
}

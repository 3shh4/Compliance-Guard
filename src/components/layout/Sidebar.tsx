import {
  BarChart3,
  ClipboardCheck,
  FileText,
  FolderKanban,
  Library,
  Settings,
  ShieldCheck
} from "lucide-react";
import { viewLabel } from "../../lib/labels";
import type { AppView } from "../../types";

const navItems: { id: AppView; icon: typeof BarChart3 }[] = [
  { id: "dashboard", icon: BarChart3 },
  { id: "new-audit", icon: ClipboardCheck },
  { id: "projects", icon: FolderKanban },
  { id: "rules", icon: Library },
  { id: "reports", icon: FileText },
  { id: "settings", icon: Settings }
];

export function Sidebar({ activeView, onChange }: { activeView: AppView; onChange: (view: AppView) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <ShieldCheck size={22} />
        </div>
        <div>
          <strong>Regulato</strong>
          <span>Compliance pre-audit</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Nawigacja główna">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={activeView === item.id ? "nav-link active" : "nav-link"}
              onClick={() => onChange(item.id)}
              type="button"
            >
              <Icon size={18} />
              <span>{viewLabel[item.id]}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <span>Tryb demonstracyjny</span>
        <strong>v0.1.0</strong>
      </div>
    </aside>
  );
}

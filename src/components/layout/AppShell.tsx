import type { ReactNode } from "react";
import type { AppView } from "../../types";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({
  activeView,
  onChangeView,
  onExport,
  onRunDemo,
  children
}: {
  activeView: AppView;
  onChangeView: (view: AppView) => void;
  onExport: () => void;
  onRunDemo: () => void;
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onChange={onChangeView} />
      <main className="workspace">
        <Topbar onExport={onExport} onRunDemo={onRunDemo} />
        {children}
      </main>
    </div>
  );
}

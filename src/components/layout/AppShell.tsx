import type { ReactNode } from "react";
import type { AppScreen } from "../../models/trust";
import { Footer } from "./Footer";
import { Header } from "./Header";

type AppShellProps = {
  currentScreen: AppScreen;
  hasReport: boolean;
  onNavigate: (screen: AppScreen) => void;
  onStartLight: () => void;
  onStartDeep: () => void;
  onLoadDemo: () => void;
  children: ReactNode;
};

export function AppShell({
  currentScreen,
  hasReport,
  onNavigate,
  onStartLight,
  onStartDeep,
  onLoadDemo,
  children
}: AppShellProps) {
  return (
    <div className="app-shell">
      <Header
        currentScreen={currentScreen}
        hasReport={hasReport}
        onNavigate={onNavigate}
        onStartLight={onStartLight}
        onStartDeep={onStartDeep}
        onLoadDemo={onLoadDemo}
      />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

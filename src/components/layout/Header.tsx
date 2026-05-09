import { FileText, FlaskConical, Home, Play, SearchCheck, Sparkles } from "lucide-react";
import type { AppScreen } from "../../models/trust";

type HeaderProps = {
  currentScreen: AppScreen;
  hasReport: boolean;
  onNavigate: (screen: AppScreen) => void;
  onStartLight: () => void;
  onStartDeep: () => void;
  onLoadDemo: () => void;
};

export function Header({ currentScreen, hasReport, onNavigate, onStartLight, onStartDeep, onLoadDemo }: HeaderProps) {
  const scanActive = currentScreen === "analysis" || currentScreen === "results" || currentScreen === "trust-page";

  return (
    <header className="site-header">
      <button className="brand-button" onClick={() => onNavigate("home")} aria-label="Go to ShipTrust home">
        <span className="brand-mark">
          <SearchCheck size={22} />
        </span>
        <span>
          <strong>ShipTrust</strong>
          <small>
            <span className="status-dot" />
            guided scanner
          </small>
        </span>
      </button>

      <nav className="header-nav" aria-label="Primary navigation">
        <button className={currentScreen === "home" ? "nav-chip active" : "nav-chip"} onClick={() => onNavigate("home")}>
          <Home size={16} />
          Home
        </button>
        <button className={currentScreen === "light-check" ? "nav-chip active" : "nav-chip"} onClick={onStartLight}>
          <Play size={16} />
          Light Check
        </button>
        <button className={currentScreen === "deep-research" ? "nav-chip active" : "nav-chip"} onClick={onStartDeep}>
          <Sparkles size={16} />
          Deep Research
        </button>
        <button className={scanActive ? "nav-chip active" : "nav-chip"} onClick={onLoadDemo}>
          <FlaskConical size={16} />
          Demo
        </button>
        <button
          className={currentScreen === "report" ? "nav-chip active" : "nav-chip"}
          onClick={() => onNavigate("report")}
          disabled={!hasReport}
        >
          <FileText size={16} />
          Report
        </button>
      </nav>
    </header>
  );
}

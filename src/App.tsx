import { useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { promptPilotDemo } from "./data/demoScenarios";
import { buildTrustReport } from "./engine/trustEngine";
import type { AppScreen, TrustFinding, TrustProfile, TrustReport } from "./models/trust";
import { Analysis } from "./pages/Analysis";
import { DeepResearch } from "./pages/DeepResearch";
import { Home } from "./pages/Home";
import { LightCheck } from "./pages/LightCheck";
import { Report } from "./pages/Report";
import { Results } from "./pages/Results";
import { TrustPage } from "./pages/TrustPage";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");
  const [trustReport, setTrustReport] = useState<TrustReport | null>(null);
  const [selectedFinding, setSelectedFinding] = useState<TrustFinding | null>(null);
  const [starterDescription, setStarterDescription] = useState("");

  function navigate(screen: AppScreen) {
    if (!trustReport && ["analysis", "results", "trust-page", "report"].includes(screen)) {
      setCurrentScreen("home");
      return;
    }

    setSelectedFinding(null);
    setCurrentScreen(screen);
  }

  function startLightCheck() {
    setSelectedFinding(null);
    setCurrentScreen("light-check");
  }

  function startDeepResearch(description?: string) {
    if (description !== undefined) {
      setStarterDescription(description);
    }
    setSelectedFinding(null);
    setCurrentScreen("deep-research");
  }

  function runAnalysis(profile: TrustProfile) {
    const report = buildTrustReport(profile);
    setTrustReport(report);
    setSelectedFinding(null);
    setCurrentScreen("analysis");
  }

  function loadDemoScan() {
    runAnalysis(promptPilotDemo);
  }

  return (
    <AppShell
      currentScreen={currentScreen}
      hasReport={Boolean(trustReport)}
      onNavigate={navigate}
      onStartLight={startLightCheck}
      onStartDeep={startDeepResearch}
      onLoadDemo={loadDemoScan}
    >
      {currentScreen === "home" ? (
        <Home onStartLight={startLightCheck} onStartDeep={startDeepResearch} onLoadDemo={loadDemoScan} />
      ) : null}

      {currentScreen === "light-check" ? <LightCheck onComplete={runAnalysis} onCancel={() => navigate("home")} /> : null}
      {currentScreen === "deep-research" ? (
        <DeepResearch initialDescription={starterDescription} onComplete={runAnalysis} onCancel={() => navigate("home")} />
      ) : null}

      {currentScreen === "analysis" && trustReport ? (
        <Analysis report={trustReport} onViewResults={() => navigate("results")} />
      ) : null}

      {currentScreen === "results" && trustReport ? (
        <Results
          report={trustReport}
          selectedFinding={selectedFinding}
          onSelectFinding={setSelectedFinding}
          onCloseFinding={() => setSelectedFinding(null)}
          onOpenTrustPage={() => navigate("trust-page")}
          onOpenReport={() => navigate("report")}
        />
      ) : null}

      {currentScreen === "trust-page" && trustReport ? (
        <TrustPage report={trustReport} onBack={() => navigate("results")} />
      ) : null}

      {currentScreen === "report" && trustReport ? <Report report={trustReport} onBack={() => navigate("results")} /> : null}
    </AppShell>
  );
}

export default App;

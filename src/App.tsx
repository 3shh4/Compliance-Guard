import { useMemo, useState } from "react";
import { AuditResults } from "./components/audit/AuditResults";
import { AuditWizard } from "./components/audit/AuditWizard";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ProjectsView } from "./components/dashboard/ProjectsView";
import { AppShell } from "./components/layout/AppShell";
import { ReportsView } from "./components/reports/ReportsView";
import { RulesLibrary } from "./components/rules/RulesLibrary";
import { SettingsView } from "./components/settings/SettingsView";
import { defaultAnswers, demoAuditContext } from "./data/mock";
import { complianceRules } from "./data/rules";
import { processLabel } from "./lib/labels";
import { copyMarkdown, downloadMarkdown, generateMarkdownReport } from "./lib/report";
import { createAuditResult } from "./lib/rulesEngine";
import type {
  AnswerKey,
  AppView,
  ArchitectureAnswers,
  AuditContext,
  AuditResult,
  BusinessProcess,
  DataType,
  MockService,
  PersistedAuditRun,
  Regulation
} from "./types";

function servicePreset(service: MockService): AuditContext {
  if (service.id === "svc-checkout") {
    return {
      serviceName: service.name,
      process: "payment_processing",
      regulations: service.regulations,
      dataTypes: ["payment_data", "personal_data"],
      answers: {
        ...defaultAnswers,
        rawCardStorage: true,
        paymentTokenization: false,
        retentionPolicy: false,
        serviceAccountReview: false
      }
    };
  }

  if (service.id === "svc-newsletter") {
    return {
      serviceName: service.name,
      process: "newsletter_signup",
      regulations: service.regulations,
      dataTypes: ["personal_data", "marketing_consent_data"],
      answers: {
        ...defaultAnswers,
        consentLog: false,
        dataExport: false,
        thirdPartySharing: true
      }
    };
  }

  if (service.id === "svc-support") {
    return {
      serviceName: service.name,
      process: "customer_support",
      regulations: service.regulations,
      dataTypes: ["personal_data", "technical_logs"],
      answers: {
        ...defaultAnswers,
        roleBasedAccess: false,
        auditLogs: false,
        retentionPolicy: false
      }
    };
  }

  if (service.id === "svc-analytics") {
    return {
      serviceName: service.name,
      process: "analytics_tracking",
      regulations: service.regulations,
      dataTypes: ["personal_data", "technical_logs", "marketing_consent_data"],
      answers: {
        ...defaultAnswers,
        thirdPartySharing: true,
        dataExport: false,
        privacyNotice: false
      }
    };
  }

  return {
    serviceName: service.name,
    process: "user_registration",
    regulations: service.regulations,
    dataTypes: ["personal_data", "location_data", "authentication_data"],
    answers: defaultAnswers
  };
}

function auditRunFromResult(result: AuditResult): PersistedAuditRun {
  return {
    id: result.id,
    userId: "demo-user",
    audit: result,
    serviceName: result.context.serviceName,
    score: result.score,
    status: result.status,
    createdAt: result.createdAt
  };
}

function App() {
  const [activeView, setActiveView] = useState<AppView>("dashboard");
  const [serviceName, setServiceName] = useState(demoAuditContext.serviceName);
  const [process, setProcess] = useState<BusinessProcess>(demoAuditContext.process);
  const [regulations, setRegulations] = useState<Regulation[]>(demoAuditContext.regulations);
  const [dataTypes, setDataTypes] = useState<DataType[]>(demoAuditContext.dataTypes);
  const [answers, setAnswers] = useState<ArchitectureAnswers>(demoAuditContext.answers);
  const [audit, setAudit] = useState<AuditResult>(() =>
    createAuditResult(demoAuditContext, complianceRules, processLabel[demoAuditContext.process])
  );
  const [auditRuns, setAuditRuns] = useState<PersistedAuditRun[]>(() => [auditRunFromResult(audit)]);

  const markdown = useMemo(() => generateMarkdownReport(audit), [audit]);

  function setAuditContext(context: AuditContext) {
    setServiceName(context.serviceName);
    setProcess(context.process);
    setRegulations(context.regulations);
    setDataTypes(context.dataTypes);
    setAnswers(context.answers);
  }

  function generateAudit(context?: AuditContext) {
    const auditContext =
      context ??
      ({
        serviceName,
        process,
        regulations,
        dataTypes,
        answers
      } satisfies AuditContext);

    const result = createAuditResult(auditContext, complianceRules, processLabel[auditContext.process]);
    setAudit(result);
    setAuditRuns((current) => [auditRunFromResult(result), ...current].slice(0, 6));
    setActiveView("new-audit");
  }

  function runDemoAudit() {
    setAuditContext(demoAuditContext);
    generateAudit(demoAuditContext);
  }

  function auditService(service: MockService) {
    const preset = servicePreset(service);
    setAuditContext(preset);
    generateAudit(preset);
  }

  function toggleRegulation(regulation: Regulation) {
    setRegulations((current) => {
      if (current.includes(regulation)) {
        return current.length === 1 ? current : current.filter((item) => item !== regulation);
      }

      return [...current, regulation];
    });
  }

  function toggleDataType(dataType: DataType) {
    setDataTypes((current) =>
      current.includes(dataType) ? current.filter((item) => item !== dataType) : [...current, dataType]
    );
  }

  function toggleAnswer(key: AnswerKey) {
    setAnswers((current) => ({
      ...current,
      [key]: !current[key]
    }));
  }

  function changeService(service: MockService) {
    setAuditContext(servicePreset(service));
  }

  async function copyReport() {
    await copyMarkdown(markdown);
  }

  function downloadReport() {
    downloadMarkdown("regulato-raport-pre-audytu.md", markdown);
  }

  return (
    <AppShell activeView={activeView} onChangeView={setActiveView} onExport={downloadReport} onRunDemo={runDemoAudit}>
      {activeView === "dashboard" ? (
        <Dashboard
          onStartAudit={() => setActiveView("new-audit")}
          onAuditService={auditService}
          onOpenReports={() => setActiveView("reports")}
          audit={audit}
          auditRuns={auditRuns}
          cloudEnabled={false}
        />
      ) : null}

      {activeView === "new-audit" ? (
        <div className="audit-page-grid">
          <AuditWizard
            serviceName={serviceName}
            process={process}
            regulations={regulations}
            dataTypes={dataTypes}
            answers={answers}
            onServiceChange={changeService}
            onProcessChange={setProcess}
            onToggleRegulation={toggleRegulation}
            onToggleDataType={toggleDataType}
            onToggleAnswer={toggleAnswer}
            onGenerate={() => generateAudit()}
            onRunDemo={runDemoAudit}
          />
          <AuditResults audit={audit} onOpenReports={() => setActiveView("reports")} />
        </div>
      ) : null}

      {activeView === "projects" ? <ProjectsView onAuditService={auditService} /> : null}
      {activeView === "rules" ? <RulesLibrary /> : null}
      {activeView === "reports" ? (
        <ReportsView audit={audit} markdown={markdown} onCopy={copyReport} onDownload={downloadReport} />
      ) : null}
      {activeView === "settings" ? <SettingsView /> : null}
    </AppShell>
  );
}

export default App;

import { AlertTriangle, CalendarClock, ClipboardList, FileWarning, Gauge, ShieldCheck } from "lucide-react";
import { mockServices, riskMap, topRisks } from "../../data/mock";
import type { AuditResult, MockService, PersistedAuditRun } from "../../types";
import { Button } from "../common/Button";
import { AuditHistory } from "./AuditHistory";
import { KpiCard } from "./KpiCard";
import { RemediationBoard } from "./RemediationBoard";
import { RiskMap } from "./RiskMap";
import { ServiceTable } from "./ServiceTable";
import { TopFindings } from "./TopFindings";

export function Dashboard({
  onStartAudit,
  onAuditService,
  onOpenReports,
  audit,
  auditRuns,
  cloudEnabled
}: {
  onStartAudit: () => void;
  onAuditService: (service: MockService) => void;
  onOpenReports: () => void;
  audit: AuditResult;
  auditRuns: PersistedAuditRun[];
  cloudEnabled: boolean;
}) {
  return (
    <div className="view-stack">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Panel ryzyka</span>
          <h1>Techniczny pre-audyt compliance dla zespołów produktowych</h1>
          <p>
            Regulato pokazuje, które kontrole techniczne są brakujące przed formalnym audytem i zamienia
            wymagania regulacyjne w zadania dla developerów.
          </p>
        </div>
        <div className="hero-actions">
          <Button variant="primary" onClick={onStartAudit}>
            <ClipboardList size={17} />
            Rozpocznij audyt
          </Button>
          <Button variant="secondary" onClick={onOpenReports}>
            Eksportuj raport
          </Button>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard icon={Gauge} label="Ogólny wynik zgodności" value="78%" caption="Średnia z usług demo" tone="info" />
        <KpiCard icon={FileWarning} label="Krytyczne braki" value="4" caption="Wymagają decyzji ownera" tone="danger" />
        <KpiCard icon={ClipboardList} label="Otwarte działania" value="12" caption="Zadania dla zespołów" tone="warning" />
        <KpiCard icon={CalendarClock} label="Ostatni audyt" value="2 dni temu" caption="Checkout API" tone="success" />
        <KpiCard icon={ShieldCheck} label="Pokrycie reguł" value="34 reguły" caption="5 pakietów regulacyjnych" tone="info" />
      </section>

      <ServiceTable services={mockServices} onAuditService={onAuditService} />

      <div className="dashboard-secondary-grid">
        <TopFindings risks={topRisks} />
        <RiskMap items={riskMap} />
      </div>

      <div className="dashboard-secondary-grid">
        <AuditHistory runs={auditRuns} currentAudit={audit} cloudEnabled={cloudEnabled} />
        <RemediationBoard audit={audit} />
      </div>
    </div>
  );
}

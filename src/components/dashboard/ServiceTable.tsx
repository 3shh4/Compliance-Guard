import { ArrowRight } from "lucide-react";
import { auditStatusLabel, regulationLabel, riskTone } from "../../lib/labels";
import type { MockService } from "../../types";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { ProgressBar } from "../common/ProgressBar";

export function ServiceTable({
  services,
  onAuditService
}: {
  services: MockService[];
  onAuditService: (service: MockService) => void;
}) {
  return (
    <section className="panel">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Usługi i projekty</span>
          <h2>Zakres pre-audytu</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table className="service-table">
          <thead>
            <tr>
              <th>Usługa</th>
              <th>Obszar</th>
              <th>Regulacje</th>
              <th>Wynik</th>
              <th>Krytyczne braki</th>
              <th>Status</th>
              <th>Ostatni audyt</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <strong>{service.name}</strong>
                  <span>{service.owner}</span>
                </td>
                <td>{service.area}</td>
                <td>
                  <div className="inline-badges">
                    {service.regulations.map((regulation) => (
                      <Badge key={regulation} tone="info">
                        {regulationLabel[regulation]}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="table-score">
                    <ProgressBar value={service.score} />
                    <span>{service.score}%</span>
                  </div>
                </td>
                <td>{service.criticalFindings}</td>
                <td>
                  <Badge tone={riskTone(service.status)}>{auditStatusLabel[service.status]}</Badge>
                </td>
                <td>{service.lastAudit}</td>
                <td>
                  <Button variant="ghost" onClick={() => onAuditService(service)}>
                    Audyt
                    <ArrowRight size={15} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

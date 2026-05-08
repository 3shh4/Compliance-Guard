import { ServerCog } from "lucide-react";
import { mockServices } from "../../data/mock";
import type { MockService } from "../../types";
import { ServiceTable } from "./ServiceTable";

export function ProjectsView({ onAuditService }: { onAuditService: (service: MockService) => void }) {
  return (
    <div className="view-stack">
      <section className="page-title">
        <div>
          <span className="eyebrow">Projekty</span>
          <h1>Usługi objęte pre-audytem</h1>
          <p>Mockowe usługi pokazują, jak Regulato może wyglądać jako dashboard dla CTO, Security Lead i Compliance Officer.</p>
        </div>
        <ServerCog size={34} />
      </section>
      <ServiceTable services={mockServices} onAuditService={onAuditService} />
    </div>
  );
}

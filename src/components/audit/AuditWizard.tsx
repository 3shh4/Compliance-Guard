import { Gauge, Play } from "lucide-react";
import { mockServices } from "../../data/mock";
import type { AnswerKey, ArchitectureAnswers, BusinessProcess, DataType, MockService, Regulation } from "../../types";
import { Button } from "../common/Button";
import { ArchitectureStep } from "./ArchitectureStep";
import { DataTypesStep } from "./DataTypesStep";
import { ProcessStep } from "./ProcessStep";
import { RegulationStep } from "./RegulationStep";

export function AuditWizard({
  serviceName,
  process,
  regulations,
  dataTypes,
  answers,
  onServiceChange,
  onProcessChange,
  onToggleRegulation,
  onToggleDataType,
  onToggleAnswer,
  onGenerate,
  onRunDemo
}: {
  serviceName: string;
  process: BusinessProcess;
  regulations: Regulation[];
  dataTypes: DataType[];
  answers: ArchitectureAnswers;
  onServiceChange: (service: MockService) => void;
  onProcessChange: (process: BusinessProcess) => void;
  onToggleRegulation: (regulation: Regulation) => void;
  onToggleDataType: (dataType: DataType) => void;
  onToggleAnswer: (key: AnswerKey) => void;
  onGenerate: () => void;
  onRunDemo: () => void;
}) {
  return (
    <section className="panel wizard-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Nowy audyt</span>
          <h2>Konfiguracja pre-audytu</h2>
          <p>Wybierz usługę, proces, regulacje i architekturę. Regulato wygeneruje checklistę opartą na regułach.</p>
        </div>
      </div>

      <div className="service-picker">
        <span>Wybór projektu lub usługi</span>
        <div>
          {mockServices.map((service) => (
            <button
              key={service.id}
              className={service.name === serviceName ? "service-chip active" : "service-chip"}
              onClick={() => onServiceChange(service)}
              type="button"
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      <ProcessStep value={process} onChange={onProcessChange} />
      <RegulationStep values={regulations} onToggle={onToggleRegulation} />
      <DataTypesStep values={dataTypes} onToggle={onToggleDataType} />
      <ArchitectureStep answers={answers} onToggle={onToggleAnswer} />

      <div className="wizard-actions">
        <Button variant="ghost" onClick={onRunDemo}>
          <Play size={16} />
          Uruchom przykładowy audyt
        </Button>
        <Button variant="primary" onClick={onGenerate}>
          <Gauge size={16} />
          Wygeneruj checklistę audytu
        </Button>
      </div>
    </section>
  );
}

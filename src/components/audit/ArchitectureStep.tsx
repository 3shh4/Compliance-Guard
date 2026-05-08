import { architectureQuestions } from "../../data/mock";
import type { AnswerKey, ArchitectureAnswers } from "../../types";

export function ArchitectureStep({
  answers,
  onToggle
}: {
  answers: ArchitectureAnswers;
  onToggle: (key: AnswerKey) => void;
}) {
  return (
    <section className="wizard-step">
      <div className="wizard-step-heading">
        <span>4</span>
        <div>
          <h3>Jak działa obecna implementacja?</h3>
          <p>Odpowiedzi tak/nie wpływają na status findingów i wynik zgodności.</p>
        </div>
      </div>
      <div className="architecture-grid">
        {architectureQuestions.map((question) => (
          <button
            key={question.key}
            className={answers[question.key] ? "answer-toggle yes" : "answer-toggle no"}
            onClick={() => onToggle(question.key as AnswerKey)}
            type="button"
          >
            <span>{question.label}</span>
            <strong>{answers[question.key] ? "Tak" : "Nie"}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

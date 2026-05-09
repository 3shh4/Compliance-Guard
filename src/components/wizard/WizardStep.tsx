import type { ReactNode } from "react";

type WizardStepProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function WizardStep({ eyebrow, title, description, children }: WizardStepProps) {
  return (
    <section className="wizard-step">
      <div className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

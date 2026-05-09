import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useMemo, useState } from "react";
import {
  createEmptyProfile,
  dataOptions,
  infrastructureOptions,
  productTypeOptions,
  stageOptions,
  thirdPartyOptions,
  trustBasics,
  type TrustBasicKey
} from "../../data/trustOptions";
import type { ProductStage, ProductType, TrustProfile } from "../../models/trust";
import { OptionCard } from "./OptionCard";
import { ToggleQuestion } from "./ToggleQuestion";
import { WizardStep } from "./WizardStep";

type LightCheckWizardProps = {
  onComplete: (profile: TrustProfile) => void;
  onCancel: () => void;
};

const steps = ["Product snapshot", "Data collected", "Stack & vendors", "Trust basics"];

export function LightCheckWizard({ onComplete, onCancel }: LightCheckWizardProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<TrustProfile>(() => createEmptyProfile());

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function setField<K extends keyof TrustProfile>(key: K, value: TrustProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function toggleList(key: "collectedData" | "infrastructure" | "thirdParties", value: string) {
    setProfile((current) => {
      const values = current[key];
      return {
        ...current,
        [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
      };
    });
  }

  function toggleBoolean(key: TrustBasicKey | "hasUserAccounts" | "hasUploadedFiles" | "usesAiPrompts" | "usesPayments" | "hasAdminRoles") {
    setProfile((current) => ({ ...current, [key]: !current[key] }));
  }

  function next() {
    if (step === steps.length - 1) {
      onComplete(profile);
      return;
    }

    setStep((current) => current + 1);
  }

  return (
    <div className="flow-page">
      <div className="wizard-card">
        <div className="wizard-top">
          <button className="button button-ghost" onClick={onCancel}>
            <ArrowLeft size={18} />
            Home
          </button>
          <div className="wizard-progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
            <span>{steps[step]}</span>
            <div className="progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {step === 0 ? (
          <WizardStep
            eyebrow="Light Check"
            title="Product snapshot"
            description="Start with the basics so ShipTrust can judge what customers are likely to ask about."
          >
            <div className="form-grid two">
              <label className="field">
                <span>Product name</span>
                <input
                  value={profile.productName}
                  onChange={(event) => setField("productName", event.target.value)}
                  placeholder="AcmeFlow"
                />
              </label>
              <label className="field">
                <span>Target customers</span>
                <input
                  value={profile.targetCustomers}
                  onChange={(event) => setField("targetCustomers", event.target.value)}
                  placeholder="Indie teams, agencies, B2B buyers..."
                />
              </label>
            </div>
            <label className="field">
              <span>One-line description</span>
              <textarea
                value={profile.description}
                onChange={(event) => setField("description", event.target.value)}
                placeholder="A short description of what the product does."
              />
            </label>
            <div className="choice-block">
              <h2>Product type</h2>
              <div className="option-grid">
                {productTypeOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={profile.productType === option.value}
                    onClick={() => setField("productType", option.value as ProductType)}
                  />
                ))}
              </div>
            </div>
            <div className="choice-block">
              <h2>Stage</h2>
              <div className="option-grid">
                {stageOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={profile.stage === option.value}
                    onClick={() => setField("stage", option.value as ProductStage)}
                  />
                ))}
              </div>
            </div>
          </WizardStep>
        ) : null}

        {step === 1 ? (
          <WizardStep
            eyebrow="Data collected"
            title="What data does the product touch?"
            description="Select the data categories a reasonable customer may expect you to explain."
          >
            <div className="checkbox-grid">
              {dataOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={profile.collectedData.includes(option)}
                  onClick={() => toggleList("collectedData", option)}
                />
              ))}
            </div>
            <div className="toggle-grid">
              <ToggleQuestion label="Users create accounts" checked={profile.hasUserAccounts} onChange={() => toggleBoolean("hasUserAccounts")} />
              <ToggleQuestion label="Users upload files" checked={profile.hasUploadedFiles} onChange={() => toggleBoolean("hasUploadedFiles")} />
              <ToggleQuestion label="Users enter AI prompts" checked={profile.usesAiPrompts} onChange={() => toggleBoolean("usesAiPrompts")} />
              <ToggleQuestion label="Product uses payments" checked={profile.usesPayments} onChange={() => toggleBoolean("usesPayments")} />
              <ToggleQuestion label="Internal admin roles exist" checked={profile.hasAdminRoles} onChange={() => toggleBoolean("hasAdminRoles")} />
            </div>
          </WizardStep>
        ) : null}

        {step === 2 ? (
          <WizardStep
            eyebrow="Stack & vendors"
            title="Which providers support the product?"
            description="Customers often ask what services host, process, analyze or support their data."
          >
            <div className="choice-block">
              <h2>Infrastructure</h2>
              <div className="checkbox-grid compact">
                {infrastructureOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={profile.infrastructure.includes(option)}
                    onClick={() => toggleList("infrastructure", option)}
                  />
                ))}
              </div>
            </div>
            <div className="choice-block">
              <h2>Third-party providers</h2>
              <div className="checkbox-grid compact">
                {thirdPartyOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={profile.thirdParties.includes(option)}
                    onClick={() => toggleList("thirdParties", option)}
                  />
                ))}
              </div>
            </div>
          </WizardStep>
        ) : null}

        {step === 3 ? (
          <WizardStep
            eyebrow="Trust basics"
            title="What visible trust signals already exist?"
            description="Answer honestly. Missing items become practical fixes, not scary labels."
          >
            <div className="toggle-grid">
              {trustBasics.map((item) => (
                <ToggleQuestion
                  key={item.key}
                  label={item.label}
                  description={item.description}
                  checked={Boolean(profile[item.key])}
                  onChange={() => toggleBoolean(item.key)}
                />
              ))}
            </div>
          </WizardStep>
        ) : null}

        <div className="wizard-actions">
          <button className="button button-secondary" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
            <ArrowLeft size={18} />
            Back
          </button>
          <button className="button button-primary" onClick={next}>
            {step === steps.length - 1 ? (
              <>
                <Play size={18} />
                Run Analysis
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft, CheckCircle2, MessageSquareText, Play, Radar } from "lucide-react";
import { FormEvent, useState } from "react";
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
import { OptionCard } from "../wizard/OptionCard";
import { ToggleQuestion } from "../wizard/ToggleQuestion";
import { ChatMessage } from "./ChatMessage";
import { ChatOptions } from "./ChatOptions";
import { ProfileSummary } from "./ProfileSummary";

type GuidedChatProps = {
  initialDescription?: string;
  onComplete: (profile: TrustProfile) => void;
  onCancel: () => void;
};

type ChatLine = {
  role: "bot" | "user";
  text: string;
};

type DetectedProfile = {
  productType?: ProductType;
  stage?: ProductStage;
  data: string[];
  vendors: string[];
  flags: Array<"usesAiPrompts" | "usesPayments" | "hasUploadedFiles" | "hasUserAccounts" | "hasAdminRoles">;
  notes: string[];
};

function addOnce<T>(items: T[], item: T) {
  return items.includes(item) ? items : [...items, item];
}

function inferFromDescription(description: string): DetectedProfile {
  const text = description.toLowerCase();
  const detected: DetectedProfile = {
    data: [],
    vendors: [],
    flags: ["hasUserAccounts", "hasAdminRoles"],
    notes: []
  };

  if (/(ai|prompt|llm|gpt|assistant|generated content)/.test(text)) {
    detected.productType = "ai-tool";
    detected.data = addOnce(detected.data, "AI prompts/messages");
    detected.data = addOnce(detected.data, "Generated content");
    detected.flags = addOnce(detected.flags, "usesAiPrompts");
    detected.vendors = addOnce(detected.vendors, "OpenAI");
    detected.notes.push("Detected AI workflow from your description.");
  }

  if (/(payment|paid|billing|checkout|stripe|subscription)/.test(text)) {
    detected.data = addOnce(detected.data, "Payment metadata");
    detected.flags = addOnce(detected.flags, "usesPayments");
    detected.vendors = addOnce(detected.vendors, "Stripe");
    detected.notes.push("Payment or billing language detected.");
  }

  if (/(upload|file|document|image|attachment)/.test(text)) {
    detected.data = addOnce(detected.data, "Uploaded files");
    detected.flags = addOnce(detected.flags, "hasUploadedFiles");
    detected.notes.push("File upload surface detected.");
  }

  if (/(marketplace|seller|buyer|provider)/.test(text)) {
    detected.productType = "marketplace";
    detected.notes.push("Marketplace pattern detected.");
  }

  if (/(crm|dashboard|saas|tool|workspace|team)/.test(text) && !detected.productType) {
    detected.productType = "saas";
    detected.notes.push("SaaS/product workspace pattern detected.");
  }

  if (/(b2b|customer|client|paying|sales)/.test(text)) {
    detected.stage = "first-paying-users";
    detected.notes.push("Customer-readiness signals detected.");
  }

  if (detected.data.length === 0) {
    detected.data = ["Email", "Name", "Analytics events"];
    detected.notes.push("Suggested starter data profile for an early SaaS.");
  }

  return detected;
}

export function GuidedChat({ initialDescription = "", onComplete, onCancel }: GuidedChatProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<TrustProfile>(() => ({
    ...createEmptyProfile(),
    description: initialDescription
  }));
  const [detected, setDetected] = useState<DetectedProfile | null>(null);
  const [messages, setMessages] = useState<ChatLine[]>([
    {
      role: "bot",
      text: initialDescription
        ? "I brought over your product description from Home. Confirm it, then I'll detect the trust profile."
        : "Tell me what you're building. I'll use your description as the base profile."
    }
  ]);

  function addMessage(role: "bot" | "user", text: string) {
    setMessages((current) => [...current, { role, text }]);
  }

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

  function submitIntro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const description = profile.description || "I'm building an early-stage SaaS product.";
    const detectedProfile = inferFromDescription(description);
    setDetected(detectedProfile);
    setProfile((current) => ({
      ...current,
      productType: detectedProfile.productType ?? current.productType,
      stage: detectedProfile.stage ?? current.stage,
      collectedData: Array.from(new Set([...current.collectedData, ...detectedProfile.data])),
      thirdParties: Array.from(new Set([...current.thirdParties, ...detectedProfile.vendors])),
      hasUserAccounts: detectedProfile.flags.includes("hasUserAccounts") || current.hasUserAccounts,
      hasAdminRoles: detectedProfile.flags.includes("hasAdminRoles") || current.hasAdminRoles,
      hasUploadedFiles: detectedProfile.flags.includes("hasUploadedFiles") || current.hasUploadedFiles,
      usesAiPrompts: detectedProfile.flags.includes("usesAiPrompts") || current.usesAiPrompts,
      usesPayments: detectedProfile.flags.includes("usesPayments") || current.usesPayments
    }));
    addMessage("user", description);
    addMessage(
      "bot",
      "Got it. I'll use your description as the base profile. Confirm or adjust the detected details below before I run the scan."
    );
    setStep(1);
  }

  function continueFromBasics() {
    addMessage("user", `${profile.productName || "My product"} is at the ${profile.stage.replaceAll("-", " ")} stage.`);
    addMessage("bot", "Great. Next I need to confirm the product surface area: accounts, payments, AI prompts and admin access.");
    setStep(2);
  }

  function continueFromSurface() {
    const notes = [
      profile.hasUserAccounts ? "users create accounts" : "no user accounts",
      profile.usesPayments ? "uses payments" : "no payments",
      profile.usesAiPrompts ? "uses AI prompts" : "no AI prompts",
      profile.hasAdminRoles ? "has admin roles" : "no admin roles"
    ];
    addMessage("user", notes.join(", "));
    addMessage("bot", "Thanks. Now confirm the data types a customer may expect you to explain.");
    setStep(3);
  }

  function continueFromData() {
    addMessage("user", profile.collectedData.length ? profile.collectedData.join(", ") : "No customer data listed yet.");
    addMessage("bot", "Now confirm the stack and providers that support the product.");
    setStep(4);
  }

  function continueFromVendors() {
    const vendors = [...profile.infrastructure, ...profile.thirdParties];
    addMessage("user", vendors.length ? vendors.join(", ") : "No providers selected.");

    if (profile.thirdParties.includes("OpenAI") || profile.usesAiPrompts) {
      addMessage(
        "bot",
        "I noticed your product uses AI prompts. Customers may ask how prompts are processed, stored and whether they are used for model training. I'll include AI transparency in the review."
      );
    }

    if (profile.thirdParties.includes("Stripe") || profile.usesPayments) {
      addMessage(
        "bot",
        "Since you use Stripe, I'll treat payment processing as delegated to a specialized provider. You should still explain that Stripe processes payments and list it as a third-party provider."
      );
    }

    addMessage("bot", "Last pass: which public trust basics already exist?");
    setStep(5);
  }

  function buildSummary() {
    if (profile.collectedData.length > 0 && !profile.hasPrivacyPolicy) {
      addMessage(
        "bot",
        "You collect user data but don't have a Privacy Policy yet. That will be marked as a high-priority trust gap."
      );
    }

    if (profile.thirdParties.length > 0 && !profile.hasSubprocessorList) {
      addMessage(
        "bot",
        "You use third-party providers, but customers may not know who processes their data. I'll flag a missing subprocessor list."
      );
    }

    addMessage("bot", "Here's what I understood. Confirm the profile before running the scan.");
    setStep(6);
  }

  return (
    <div className="flow-page chat-page">
      <div className="chat-layout">
        <aside className="chat-side">
          <button className="button button-ghost" onClick={onCancel}>
            <ArrowLeft size={18} />
            Home
          </button>
          <div>
            <span className="eyebrow">Deep Research</span>
            <h1>Guided trust assistant</h1>
            <p>Describe the product once. ShipTrust turns that into a detected profile you can adjust before scanning.</p>
          </div>
          {detected ? (
            <div className="detected-panel">
              <Radar size={18} />
              <strong>Detected from your answer</strong>
              {detected.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          ) : null}
        </aside>

        <section className="chat-panel" aria-label="Deep research guided chat">
          <div className="chat-transcript">
            {messages.map((message, index) => (
              <ChatMessage key={`${message.role}-${index}`} role={message.role}>
                {message.text}
              </ChatMessage>
            ))}
            {step < 6 ? (
              <div className="typing-row">
                <span />
                <span />
                <span />
              </div>
            ) : null}
          </div>

          <div className="chat-input-panel">
            {step === 0 ? (
              <form className="chat-form" onSubmit={submitIntro}>
                <label className="field">
                  <span>Product name</span>
                  <input
                    value={profile.productName}
                    onChange={(event) => setField("productName", event.target.value)}
                    placeholder="PromptPilot"
                  />
                </label>
                <label className="field">
                  <span>Tell me what you're building</span>
                  <textarea
                    value={profile.description}
                    onChange={(event) => setField("description", event.target.value)}
                    placeholder="An AI writing assistant for freelancers and small teams."
                  />
                </label>
                <button className="button button-primary" type="submit">
                  <MessageSquareText size={18} />
                  Detect profile
                </button>
              </form>
            ) : null}

            {step === 1 ? (
              <ChatOptions>
                <div className="profile-hint">
                  <strong>Confirm detected profile</strong>
                  <span>I used your description as the base profile. Adjust anything that looks wrong.</span>
                </div>
                <div className="choice-block">
                  <h2>Product type</h2>
                  <div className="option-grid">
                    {productTypeOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        label={option.label}
                        description={option.description}
                        badge={detected?.productType === option.value ? "suggested" : undefined}
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
                        badge={detected?.stage === option.value ? "suggested" : undefined}
                        selected={profile.stage === option.value}
                        onClick={() => setField("stage", option.value as ProductStage)}
                      />
                    ))}
                  </div>
                </div>
                <button className="button button-primary" onClick={continueFromBasics}>
                  Confirm profile
                </button>
              </ChatOptions>
            ) : null}

            {step === 2 ? (
              <ChatOptions>
                <div className="profile-hint">
                  <strong>Confirm product surface</strong>
                  <span>These choices affect AI transparency, payment signals and admin logging tasks.</span>
                </div>
                <div className="toggle-grid">
                  <ToggleQuestion label="Users create accounts" checked={profile.hasUserAccounts} onChange={() => toggleBoolean("hasUserAccounts")} />
                  <ToggleQuestion label="Users upload files" checked={profile.hasUploadedFiles} onChange={() => toggleBoolean("hasUploadedFiles")} />
                  <ToggleQuestion label="Users enter AI prompts" checked={profile.usesAiPrompts} onChange={() => toggleBoolean("usesAiPrompts")} />
                  <ToggleQuestion label="Product uses payments" checked={profile.usesPayments} onChange={() => toggleBoolean("usesPayments")} />
                  <ToggleQuestion label="Internal admin roles exist" checked={profile.hasAdminRoles} onChange={() => toggleBoolean("hasAdminRoles")} />
                </div>
                <button className="button button-primary" onClick={continueFromSurface}>
                  Confirm surface
                </button>
              </ChatOptions>
            ) : null}

            {step === 3 ? (
              <ChatOptions>
                <div className="profile-hint">
                  <strong>Confirm data customers may ask about</strong>
                  <span>Suggested items are detected from your product description.</span>
                </div>
                <div className="checkbox-grid">
                  {dataOptions.map((option) => (
                    <OptionCard
                      key={option}
                      label={option}
                      badge={detected?.data.includes(option) ? "suggested" : undefined}
                      selected={profile.collectedData.includes(option)}
                      onClick={() => toggleList("collectedData", option)}
                    />
                  ))}
                </div>
                <button className="button button-primary" onClick={continueFromData}>
                  Confirm data
                </button>
              </ChatOptions>
            ) : null}

            {step === 4 ? (
              <ChatOptions>
                <div className="profile-hint">
                  <strong>Confirm providers</strong>
                  <span>Customers may ask who hosts, processes, monitors or analyzes their data.</span>
                </div>
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
                  <h2>Third parties</h2>
                  <div className="checkbox-grid compact">
                    {thirdPartyOptions.map((option) => (
                      <OptionCard
                        key={option}
                        label={option}
                        badge={detected?.vendors.includes(option) ? "suggested" : undefined}
                        selected={profile.thirdParties.includes(option)}
                        onClick={() => toggleList("thirdParties", option)}
                      />
                    ))}
                  </div>
                </div>
                <button className="button button-primary" onClick={continueFromVendors}>
                  Confirm providers
                </button>
              </ChatOptions>
            ) : null}

            {step === 5 ? (
              <ChatOptions>
                <div className="profile-hint">
                  <strong>Confirm visible trust basics</strong>
                  <span>Missing items become trust gaps and suggested developer tasks.</span>
                </div>
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
                <button className="button button-primary" onClick={buildSummary}>
                  Build summary
                </button>
              </ChatOptions>
            ) : null}

            {step === 6 ? (
              <ChatOptions>
                <ProfileSummary profile={profile} />
                <div className="wizard-actions">
                  <button className="button button-secondary" onClick={() => setStep(0)}>
                    Edit profile
                  </button>
                  <button className="button button-primary" onClick={() => onComplete(profile)}>
                    <CheckCircle2 size={18} />
                    Looks good
                    <Play size={18} />
                  </button>
                </div>
              </ChatOptions>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

import {
  ArrowRight,
  Bot,
  ClipboardList,
  FileCode2,
  FileText,
  Play,
  ScanLine,
  ShieldAlert,
  Sparkles,
  Wrench
} from "lucide-react";
import { useState } from "react";

type HeroProps = {
  onStartLight: () => void;
  onStartDeep: (description?: string) => void;
  onLoadDemo: () => void;
};

const examplePrompts = [
  {
    label: "AI writing assistant",
    prompt: "An AI writing assistant for freelancers that stores prompts and uses Stripe."
  },
  {
    label: "B2B SaaS dashboard",
    prompt: "A B2B SaaS dashboard for small teams with user accounts and analytics."
  },
  {
    label: "Marketplace MVP",
    prompt: "A marketplace MVP where providers upload files and customers pay online."
  }
];

export function Hero({ onStartLight, onStartDeep, onLoadDemo }: HeroProps) {
  const [description, setDescription] = useState("");

  function startGuidedCheck() {
    onStartDeep(description.trim());
  }

  return (
    <section className="home-command-section">
      <div className="hero-scanline" aria-hidden="true" />

      <div className="home-command-panel">
        <div className="home-intro">
          <span className="hero-kicker">
            <Bot size={16} />
            ShipTrust / guided trust scanner
          </span>
          <h1>Your product works. Now make it feel trustworthy.</h1>
          <p>
            ShipTrust turns a simple product profile into customer-facing trust gaps, developer-ready tasks and a
            lightweight trust page draft.
          </p>
        </div>

        <div className="assistant-console" aria-label="Start with a product description">
          <div className="assistant-console-head">
            <span>
              <ScanLine size={16} />
              Start with a product description
            </span>
            <small>guided scan</small>
          </div>
          <label className="assistant-input">
            <span>Tell ShipTrust what you're building</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="An AI writing assistant for freelancers that stores prompts and uses Stripe..."
            />
          </label>
          <div className="example-chips" aria-label="Example product descriptions">
            {examplePrompts.map((example) => (
              <button key={example.label} type="button" onClick={() => setDescription(example.prompt)}>
                {example.label}
              </button>
            ))}
          </div>
          <div className="assistant-actions">
            <button className="button button-primary" onClick={startGuidedCheck}>
              <Play size={18} />
              Start guided check
            </button>
            <button className="button button-secondary" onClick={onLoadDemo}>
              <Sparkles size={18} />
              Run demo scan
            </button>
            <button className="button button-ghost" onClick={() => onStartDeep(description.trim())}>
              Deep research
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="assistant-note">Turn trust gaps into shippable fixes before your first serious customer asks.</p>
        </div>

        <div className="home-flow" aria-label="ShipTrust flow">
          <span>Profile</span>
          <span>Scan</span>
          <span>Trust gaps</span>
          <span>Tasks</span>
          <span>Trust page</span>
        </div>
      </div>

      <section className="home-output-preview" aria-label="What ShipTrust gives you">
        <div className="preview-heading">
          <span className="eyebrow">What ShipTrust gives you</span>
          <p>Concrete output before you talk to your first serious customer.</p>
        </div>

        <article className="output-card score-output">
          <ClipboardList size={20} />
          <span>Trust score</span>
          <strong>48/100 - Needs foundation</strong>
          <p>See whether visible trust basics are ready enough for users to sign up or pay.</p>
        </article>

        <article className="output-card">
          <ShieldAlert size={20} />
          <span>Trust gaps</span>
          <strong>Missing AI data usage explanation</strong>
          <p>Users may not know how prompts are processed, stored or used.</p>
        </article>

        <article className="output-card">
          <Wrench size={20} />
          <span>Developer tasks</span>
          <strong>TL-102 Add public data deletion note</strong>
          <p>Owner: Engineering / Effort: low</p>
        </article>

        <article className="output-card">
          <FileCode2 size={20} />
          <span>Trust page draft</span>
          <strong>Security overview / Vendors / AI usage</strong>
          <p>Generate a first trust page draft from your answers.</p>
        </article>

        <article className="output-card wide">
          <FileText size={20} />
          <span>Markdown report</span>
          <strong>Copy a lightweight trust-readiness report</strong>
          <p>Use it in your README, docs, customer prep or internal planning.</p>
        </article>
      </section>
    </section>
  );
}

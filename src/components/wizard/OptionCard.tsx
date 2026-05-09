import { Check } from "lucide-react";

type OptionCardProps = {
  label: string;
  description?: string;
  badge?: string;
  selected: boolean;
  onClick: () => void;
};

export function OptionCard({ label, description, badge, selected, onClick }: OptionCardProps) {
  return (
    <button className={selected ? "option-card selected" : "option-card"} onClick={onClick} type="button">
      <span className="option-check">{selected ? <Check size={16} /> : null}</span>
      {badge ? <span className="option-badge">{badge}</span> : null}
      <strong>{label}</strong>
      {description ? <small>{description}</small> : null}
    </button>
  );
}

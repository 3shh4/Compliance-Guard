import type { LucideIcon } from "lucide-react";

export function KpiCard({
  icon: Icon,
  label,
  value,
  caption,
  tone = "info"
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  caption?: string;
  tone?: "info" | "success" | "warning" | "danger";
}) {
  return (
    <article className={`kpi-card kpi-${tone}`}>
      <Icon size={20} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {caption ? <p>{caption}</p> : null}
      </div>
    </article>
  );
}

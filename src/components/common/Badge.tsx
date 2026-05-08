import type { ReactNode } from "react";

type BadgeTone = "low" | "medium" | "high" | "critical" | "neutral" | "info" | "success" | "danger";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

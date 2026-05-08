import type { ReactNode } from "react";

export function EmptyState({ title, text, icon }: { title: string; text: string; icon?: ReactNode }) {
  return (
    <div className="empty-state">
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

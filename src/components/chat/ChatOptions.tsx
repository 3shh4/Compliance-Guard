import type { ReactNode } from "react";

type ChatOptionsProps = {
  children: ReactNode;
};

export function ChatOptions({ children }: ChatOptionsProps) {
  return <div className="chat-options">{children}</div>;
}

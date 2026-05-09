type ChatMessageProps = {
  role: "bot" | "user";
  children: string;
};

export function ChatMessage({ role, children }: ChatMessageProps) {
  return (
    <div className={role === "bot" ? "chat-message bot" : "chat-message user"}>
      <span>{role === "bot" ? "ShipTrust" : "You"}</span>
      <p>{children}</p>
    </div>
  );
}

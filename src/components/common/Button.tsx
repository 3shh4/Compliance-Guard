import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  full?: boolean;
};

export function Button({ children, variant = "secondary", full = false, className = "", ...props }: ButtonProps) {
  return (
    <button className={`button button-${variant}${full ? " button-full" : ""} ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}

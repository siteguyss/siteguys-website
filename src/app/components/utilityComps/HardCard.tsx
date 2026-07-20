import type { ReactNode, ElementType } from "react";

type HardCardProps = {
  children: ReactNode;
  as?: ElementType;
  size?: "default" | "small";
  className?: string;
  style?: React.CSSProperties;
};

export function HardCard({ children, as: Tag = "div", size = "default", className = "", style }: HardCardProps) {
  const shadowClass = size === "small" ? "hard-card-small" : "hard-card";
  return (
    <Tag className={`${shadowClass} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

import type { ReactNode } from "react";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small" | "label" | "span";
  className?: string;
  children: ReactNode;
  id?: string;
}

const Typography = ({
  variant = "p",
  className = "",
  children,
  id,
}: TypographyProps) => {
  const variants = {
    h1: "text-3xl font-bold text-white tracking-tight",
    h2: "text-2xl font-bold text-white tracking-tight",
    h3: "text-xl font-bold text-white tracking-tight",
    h4: "text-lg font-bold text-white tracking-tight",
    p: "text-slate-400 leading-relaxed",
    small: "text-xs font-medium text-slate-500 uppercase tracking-widest",
    label: "text-sm font-medium text-slate-400 ml-1",
    span: "text-inherit",
  };

  const Component = (
    variant === "label"
      ? "label"
      : variant === "span"
        ? "span"
        : variant.startsWith("h")
          ? variant
          : variant === "small"
            ? "small"
            : "p"
  ) as "h1" | "h2" | "h3" | "h4" | "p" | "small" | "label" | "span";

  return (
    <Component id={id} className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;

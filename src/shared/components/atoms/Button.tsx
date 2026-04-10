import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "primary" | "secondary" | "danger";
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = ({
  text,
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  isLoading,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 border border-slate-700",
    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-500/20",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || props.disabled}
      className={`
        rounded-lg font-medium text-white transition-all 
        duration-200 active:scale-95 shadow-lg 
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        text || children
      )}
    </button>
  );
};

export default Button;

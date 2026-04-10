import type { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Tr = ({ children, className = "", onClick, hover = true }: TableRowProps) => {
  return (
    <tr 
      onClick={onClick}
      className={`
        border-b border-slate-700/50 
        ${hover ? "hover:bg-indigo-500/5 transition-colors" : ""} 
        ${onClick ? "cursor-pointer" : ""} 
        ${className}
      `}
    >
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  isHeader?: boolean;
  colSpan?: number;
}

export const Td = ({ children, className = "", align = "left", isHeader = false, colSpan }: TableCellProps) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Component = isHeader ? "th" : "td";
  
  const baseClasses = isHeader 
    ? "p-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
    : "p-4 text-sm text-slate-300";

  return (
    <Component colSpan={colSpan} className={`${baseClasses} ${alignClasses[align]} ${className}`}>
      {children}
    </Component>
  );
};

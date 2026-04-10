interface BadgeProps {
  text: string;
  variant?: "blue" | "rose" | "indigo" | "emerald";
  className?: string;
}

const Badge = ({ text, variant = "blue", className = "" }: BadgeProps) => {
  const variants = {
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    rose: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    indigo: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${variants[variant]} ${className}`}>
      {text}
    </span>
  );
};

export default Badge;

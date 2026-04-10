import type { LucideIcon } from "lucide-react";
import Typography from "../../../shared/components/atoms/Typography";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

const StatCard = ({ label, value, change, icon: Icon }: StatCardProps) => {
  return (
    <div className="glass-dark p-6 rounded-3xl border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-600/10 text-indigo-400 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
          {change}
        </span>
      </div>
      <div>
        <Typography variant="small">{label}</Typography>
        <Typography variant="h2" className="mt-1">{value}</Typography>
      </div>
    </div>
  );
};

export default StatCard;

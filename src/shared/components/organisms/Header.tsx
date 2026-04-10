import { User } from "lucide-react";
import Typography from "../atoms/Typography";

const Header = () => {
  return (
    <header className="h-16 glass-dark border-b border-slate-800/50 flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-gradient flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            U
          </div>
          <Typography variant="h3" className="mb-0">AdminPanel</Typography>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <Typography variant="h3" className="text-sm">Admin User</Typography>
            <Typography variant="p" className="text-xs">Super Admin</Typography>
          </div>
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 border border-white/10 overflow-hidden">
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

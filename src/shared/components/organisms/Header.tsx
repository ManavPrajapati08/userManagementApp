import { User, Menu } from "lucide-react";
import Typography from "../atoms/Typography";
import { useAuthStatus } from "../../hooks/useAuthStatus";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useAuthStatus();

  return (
    <header className="h-20 glass-dark border-b border-slate-800/50 flex items-center justify-between px-4 md:px-8 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <Typography
              variant="h3"
              className="text-sm font-semibold truncate max-w-[120px] sm:max-w-none"
            >
              {user?.displayName || "Admin User"}
            </Typography>
            <Typography variant="p" className="text-[10px] sm:text-xs">
              {user?.email || "Super Admin"}
            </Typography>
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

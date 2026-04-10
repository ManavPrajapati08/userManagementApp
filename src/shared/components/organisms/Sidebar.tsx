import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, X } from "lucide-react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import Typography from "../atoms/Typography";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Users", path: "/users" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <div 
      className={`
        fixed inset-y-0 left-0 w-64 lg:static lg:block h-full glass-dark border-r border-slate-800 flex flex-col z-[50] transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 font-bold">
            U
          </div>
          <Typography variant="h4" className="mb-0 text-lg">
            UserPanel
          </Typography>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-slate-800 rounded-lg text-slate-500"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`
                }
              >
                <item.icon
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />
                <Typography
                  variant="h3"
                  className="text-sm font-medium mb-0 text-inherit"
                >
                  {item.label}
                </Typography>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all group border border-transparent hover:border-rose-500/20"
        >
          <LogOut
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
          <Typography
            variant="h3"
            className="text-sm font-medium mb-0 text-inherit"
          >
            Logout
          </Typography>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import Typography from "../atoms/Typography";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Users", path: "/users" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="w-64 h-full glass-dark border-r border-slate-800 flex flex-col">
      <nav className="flex-1 px-4 py-8">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
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

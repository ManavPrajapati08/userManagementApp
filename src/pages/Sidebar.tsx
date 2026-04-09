import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-60 h-full bg-gray-800 text-white p-4">
      <ul className="space-y-2">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700 text-gray-300"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
        </li>

        {/* Users */}
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700 text-gray-300"
              }`
            }
          >
            <Users size={18} />
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

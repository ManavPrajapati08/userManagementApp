import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Sidebar from "../pages/Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black text-white">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

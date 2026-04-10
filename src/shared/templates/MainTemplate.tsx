import { useState } from "react";
import type { ReactNode } from "react";
import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-bg-dark font-inter overflow-hidden relative">
      {/* Sidebar - Desktop is fixed, Mobile is absolute/hidden */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden w-full">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[40] lg:hidden animate-in fade-in duration-300" 
            onClick={closeSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default MainTemplate;

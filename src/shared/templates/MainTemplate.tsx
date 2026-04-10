import type { ReactNode } from "react";
import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <div className="flex h-screen bg-bg-dark font-inter overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainTemplate;

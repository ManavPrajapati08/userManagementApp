import type { ReactNode } from "react";
import Typography from "../../../shared/components/atoms/Typography";

interface AuthTemplateProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  isLogin: boolean;
  toggleText: string;
  toggleActionText: string;
  onToggle: () => void;
}

const AuthTemplate = ({
  children,
  title,
  subtitle,
  toggleText,
  toggleActionText,
  onToggle,
}: AuthTemplateProps) => {
  // --- Render Functions ---

  const renderBackgroundGradients = () => (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
    </>
  );

  const renderHeader = () => (
    <div className="text-center mb-8">
      <Typography variant="h2" className="mb-2">
        {title}
      </Typography>
      <Typography variant="p" className="text-sm">
        {subtitle}
      </Typography>
    </div>
  );

  const renderDivider = () => (
    <div className="flex items-center my-8">
      <div className="flex-1 h-px bg-slate-800" />
      <span className="px-4 text-slate-500 text-xs font-semibold uppercase tracking-widest">
        OR
      </span>
      <div className="flex-1 h-px bg-slate-800" />
    </div>
  );

  const renderFooterToggle = () => (
    <p className="text-center">
      <span className="text-slate-500 text-sm">{toggleText}</span>
      <button
        className="ml-2 text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors"
        onClick={onToggle}
      >
        {toggleActionText}
      </button>
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark relative overflow-hidden px-4 font-inter">
      {renderBackgroundGradients()}

      <div className="glass-dark w-full max-w-md p-8 rounded-3xl shadow-2xl border border-slate-700/50 relative z-10">
        {renderHeader()}
        {children}
        {renderDivider()}
        {renderFooterToggle()}
      </div>
    </div>
  );
};

export default AuthTemplate;

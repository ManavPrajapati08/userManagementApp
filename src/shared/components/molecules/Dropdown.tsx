import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown = ({ label, value, options, onChange, placeholder = "Select option" }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-1.5 relative">
      {label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-slate-800/50 text-white px-4 py-2.5 rounded-xl border border-slate-700 
          flex items-center justify-between transition-all outline-none
          ${isOpen ? 'ring-2 ring-indigo-500/50 border-indigo-500 bg-slate-800' : 'hover:bg-slate-800/80'}
        `}
      >
        <span className={value ? "capitalize" : "text-slate-500"}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full glass-dark border border-slate-700/50 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:bg-indigo-600/10 hover:text-indigo-400 transition-colors capitalize"
            >
              {option}
              {value === option && <Check size={14} className="text-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

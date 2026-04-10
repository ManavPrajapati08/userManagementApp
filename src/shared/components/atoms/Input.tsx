import Typography from "./Typography";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <Typography variant="label">{label}</Typography>}
      <input
        className={`
          w-full bg-slate-800/50 text-white px-4 py-2.5 rounded-xl border 
          ${error ? "border-rose-500 ring-1 ring-rose-500/20" : "border-slate-700"}
          focus:outline-none focus:ring-2 
          ${error ? "focus:ring-rose-500/50 focus:border-rose-500" : "focus:ring-indigo-500/50 focus:border-indigo-500"}
          placeholder-slate-500 transition-all duration-200 outline-none
          ${className}
        `}
        {...props}
      />
      {error && (
        <Typography variant="small" className="text-rose-500 font-medium lowercase ml-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Input;

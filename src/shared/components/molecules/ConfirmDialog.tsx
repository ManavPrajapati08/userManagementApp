import { AlertTriangle } from "lucide-react";
import Button from "../atoms/Button";
import Typography from "../atoms/Typography";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onCancel}
      ></div>

      {/* Dialog Card */}
      <div className="glass-dark w-full max-w-sm rounded-[32px] border border-slate-700/50 shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
              variant === "danger" ? "bg-rose-500/10 text-rose-500" : "bg-indigo-500/10 text-indigo-500"
            }`}>
              <AlertTriangle size={32} />
            </div>
            
            <Typography variant="h2">{title}</Typography>
            <Typography variant="p" className="mt-2 text-sm">
              {message}
            </Typography>
          </div>

          <div className="flex gap-3 mt-10">
            <Button
              text={cancelText}
              variant="secondary"
              onClick={onCancel}
              className="flex-1"
            />
            <Button
              text={confirmText}
              variant={variant === "danger" ? "danger" : "primary"}
              onClick={onConfirm}
              className="flex-1 shadow-rose-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

/**
 * ToasterService Interface
 * Following Dependency Inversion: We define WHAT a toaster can do,
 * but let the implementation decide HOW (sonner, react-hot-toast, etc).
 */

export type ToasterConfig = {
  defaultDuration: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
};

export interface ToasterService {
  showSuccess(message: string, duration?: number): void;
  showError(message: string, duration?: number): void;
  showInfo(message: string, duration?: number): void;
  showWarning(message: string, duration?: number): void;
}

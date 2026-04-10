import { toast } from "sonner";
import type {
  ToasterConfig,
  ToasterService,
} from "../interfaces/ToasterService";

export const defaultToasterConfig: ToasterConfig = {
  defaultDuration: 3000,
  position: "top-center",
};

export class SonnerToasterService implements ToasterService {
  public readonly notificationConfig: ToasterConfig;

  constructor(config?: ToasterConfig) {
    this.notificationConfig = config ?? defaultToasterConfig;
  }

  private createToastOptions(duration?: number): {
    duration?: number;
    position?: ToasterConfig["position"];
  } {
    return {
      duration: duration ?? this.notificationConfig.defaultDuration,
      position: this.notificationConfig.position,
    };
  }

  showSuccess(message: string, duration?: number): void {
    toast.success(message, this.createToastOptions(duration));
  }

  showError(message: string, duration?: number): void {
    toast.error(message, this.createToastOptions(duration));
  }

  showInfo(message: string, duration?: number): void {
    toast.info(message, this.createToastOptions(duration));
  }

  showWarning(message: string, duration?: number): void {
    toast.warning(message, this.createToastOptions(duration));
  }
}

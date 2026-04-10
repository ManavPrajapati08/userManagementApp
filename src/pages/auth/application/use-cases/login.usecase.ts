import type { IAuthService } from "../../interfaces/authService.interface";
import type { ToasterService } from "../../../../shared/interfaces/ToasterService";
import { AuthErrorMapper } from "../../utils/AuthErrorMapper";

export class LoginUseCase {
  private readonly authService: IAuthService;
  private readonly toasterService: ToasterService;

  constructor(authService: IAuthService, toasterService: ToasterService) {
    this.authService = authService;
    this.toasterService = toasterService;
  }

  async execute(email: string, password: string): Promise<void> {
    try {
      await this.authService.login(email, password);
      this.toasterService.showSuccess("Login Successful ✅");
    } catch (error: any) {
      const errorMessage = error.code 
        ? AuthErrorMapper.map(error.code) 
        : (error instanceof Error ? error.message : "Login failed");

      this.toasterService.showError(errorMessage);
      throw error;
    }
  }
}

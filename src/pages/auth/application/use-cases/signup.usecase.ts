import type { IAuthService } from "../../interfaces/authService.interface";
import type { ToasterService } from "../../../../shared/interfaces/ToasterService";
import { AuthErrorMapper } from "../../utils/AuthErrorMapper";

export class SignupUseCase {
  private readonly authService: IAuthService;
  private readonly toasterService: ToasterService;

  constructor(authService: IAuthService, toasterService: ToasterService) {
    this.authService = authService;
    this.toasterService = toasterService;
  }

  async execute(email: string, password: string, name: string): Promise<void> {
    try {
      await this.authService.signup(email, password, name);
      this.toasterService.showSuccess(
        "Signup Successful ✅ Please Login to continue."
      );
    } catch (error: any) {
      // Use the mapper to get a friendly error message from the Firebase code
      const errorMessage = error.code 
        ? AuthErrorMapper.map(error.code) 
        : (error instanceof Error ? error.message : "Signup failed");
        
      this.toasterService.showError(errorMessage);
      throw error;
    }
  }
}

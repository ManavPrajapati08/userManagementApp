import type { IUserRepository } from "../../interfaces/userRepository.interface";
import type { UserType } from "../../types/UserType";
import type { ToasterService } from "../../../../shared/interfaces/ToasterService";

/**
 * UpdateUserUseCase
 * Logic for updating an existing user.
 */
export class UpdateUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly toasterService: ToasterService;

  constructor(
    userRepository: IUserRepository,
    toasterService: ToasterService,
  ) {
    this.userRepository = userRepository;
    this.toasterService = toasterService;
  }

  async execute(id: string, userFormValues: Partial<UserType>): Promise<void> {
    try {
      // 1. Check for uniqueness (excluding current user ID)
      if (userFormValues.email) {
        const isEmailTaken = await this.userRepository.isEmailTaken(userFormValues.email, id);
        if (isEmailTaken) throw new Error("Email is already registered with another user");
      }

      if (userFormValues.mobile) {
        const isMobileTaken = await this.userRepository.isMobileTaken(userFormValues.mobile, id);
        if (isMobileTaken) throw new Error("Mobile number is already registered");
      }

      await this.userRepository.updateUser(id, userFormValues);
      this.toasterService.showSuccess("User updated successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "User update failed";
      this.toasterService.showError(errorMessage);
      throw error;
    }
  }
}

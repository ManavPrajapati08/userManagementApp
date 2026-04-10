import type { IUserRepository } from "../../interfaces/userRepository.interface";
import type { UserType } from "../../types/UserType";
import type { ToasterService } from "../../../../shared/interfaces/ToasterService";

/**
 * CreateUserUseCase
 * Encapsulates the logic for creating a user. 
 * It depends on abstractions (Interfaces), not concrete implementations (Dependency Inversion).
 */
export class CreateUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly toasterService: ToasterService;

  constructor(
    userRepository: IUserRepository,
    toasterService: ToasterService,
  ) {
    this.userRepository = userRepository;
    this.toasterService = toasterService;
  }

  async execute(userFormValues: Omit<UserType, "id">): Promise<void> {
    try {
      // 1. Check for uniqueness
      const isEmailTaken = await this.userRepository.isEmailTaken(userFormValues.email);
      if (isEmailTaken) throw new Error("Email is already registered with another user");

      const isMobileTaken = await this.userRepository.isMobileTaken(userFormValues.mobile);
      if (isMobileTaken) throw new Error("Mobile number is already registered");

      await this.userRepository.createUser(userFormValues);
      this.toasterService.showSuccess("User created successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "User creation failed";
      this.toasterService.showError(errorMessage);
      throw error;
    }
  }
}

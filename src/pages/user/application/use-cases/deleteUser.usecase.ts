import type { IUserRepository } from "../../interfaces/userRepository.interface";
import type { ToasterService } from "../../../../shared/interfaces/ToasterService";
import { HttpError } from "../../../../shared/errors/HttpError";

/**
 * DeleteUserUseCase
 * Logic for deleting a user.
 */
export class DeleteUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly toasterService: ToasterService;

  constructor(
    userRepository: IUserRepository,
    toasterService: ToasterService,
  ) {
    this.userRepository = userRepository;
    this.toasterService = toasterService;
  }

  async execute(id: string): Promise<void> {
    try {
      await this.userRepository.deleteUser(id);
      this.toasterService.showSuccess("User deleted successfully");
    } catch (error) {
      const errorMessage =
        error instanceof HttpError ? error.message : "User deletion failed";
      this.toasterService.showError(errorMessage);
      throw error;
    }
  }
}

import type { UserType } from "../types/UserType";

export interface IUserRepository {
  createUser(user: Omit<UserType, "id">): Promise<void>;
  updateUser(id: string, user: Partial<UserType>): Promise<void>;
  deleteUser(id: string): Promise<void>;
  isEmailTaken(email: string, excludeId?: string): Promise<boolean>;
  isMobileTaken(mobile: string, excludeId?: string): Promise<boolean>;
}

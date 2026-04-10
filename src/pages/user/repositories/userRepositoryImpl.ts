import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
import type { UserType } from "../types/UserType";
import type { IUserRepository } from "../interfaces/userRepository.interface";

export class UserRepositoryImpl implements IUserRepository {
  private readonly collectionName = "users";

  async createUser(user: Omit<UserType, "id">): Promise<void> {
    try {
      await addDoc(collection(db, this.collectionName), user);
    } catch (error) {
      console.error("UserRepository: Failed to create user", error);
      throw error;
    }
  }

  async updateUser(id: string, user: Partial<UserType>): Promise<void> {
    try {
      const userRef = doc(db, this.collectionName, id);
      const { id: _, ...data } = user;
      await updateDoc(userRef, data);
    } catch (error) {
      console.error("UserRepository: Failed to update user", error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error) {
      console.error("UserRepository: Failed to delete user", error);
      throw error;
    }
  }

  async isEmailTaken(email: string, excludeId?: string): Promise<boolean> {
    const q = query(
      collection(db, this.collectionName),
      where("email", "==", email.trim()),
    );
    const snapshot = await getDocs(q);

    if (excludeId) {
      return snapshot.docs.some((doc) => doc.id !== excludeId);
    }
    return !snapshot.empty;
  }

  async isMobileTaken(mobile: string, excludeId?: string): Promise<boolean> {
    const q = query(
      collection(db, this.collectionName),
      where("mobile", "==", mobile.trim()),
    );
    const snapshot = await getDocs(q);

    if (excludeId) {
      return snapshot.docs.some((doc) => doc.id !== excludeId);
    }
    return !snapshot.empty;
  }
}

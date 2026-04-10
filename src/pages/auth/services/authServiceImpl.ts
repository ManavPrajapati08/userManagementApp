import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase";
import type { IAuthService } from "../interfaces/authService.interface";

export class AuthServiceImpl implements IAuthService {
  async login(email: string, password: string): Promise<any> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("AuthService: Login failed", error);
      throw error;
    }
  }

  async signup(email: string, password: string, name: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await signOut(auth);

      return userCredential;
    } catch (error) {
      console.error("AuthService: Signup failed", error);
      throw error;
    }
  }
}

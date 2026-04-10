/**
 * AuthErrorMapper
 * Maps Firebase Auth error codes to user-friendly messages.
 */
export class AuthErrorMapper {
  static map(errorCode: string): string {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please try logging in.";
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/weak-password":
        return "The password is too weak.";
      case "auth/operation-not-allowed":
        return "Authentication is currently disabled.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }
}

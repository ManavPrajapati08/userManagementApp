import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Architecture Layer Imports
import { AuthServiceImpl } from "../services/authServiceImpl";
import { SonnerToasterService } from "../../../shared/services/SonnerToasterService";
import { LoginUseCase } from "../application/use-cases/login.usecase";
import { SignupUseCase } from "../application/use-cases/signup.usecase";
import {
  signupSchema,
  loginSchema,
  type SignupFormData,
  type LoginFormData,
} from "../types/auth.schema";

/**
 * useAuth Hook
 * Refactored to use React Hook Form and Zod validation.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // 2. Initialize Dependencies
  const services = useMemo(() => {
    const authService = new AuthServiceImpl();
    const toasterService = new SonnerToasterService();

    return {
      login: new LoginUseCase(authService, toasterService),
      signup: new SignupUseCase(authService, toasterService),
    };
  }, []);

  // 3. React Hook Form setup
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    loginForm.reset();
    signupForm.reset();
  };

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      await services.login.execute(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignupSubmit = async (data: SignupFormData) => {
    try {
      await services.signup.execute(data.email, data.password, data.name);
      setIsLogin(true);
      signupForm.reset();
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return {
    isLogin,
    toggleAuthMode,
    loginForm,
    signupForm,
    handleLoginSubmit,
    handleSignupSubmit,
  };
};

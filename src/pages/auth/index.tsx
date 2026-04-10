import Input from "../../shared/components/atoms/Input";
import Button from "../../shared/components/atoms/Button";
import AuthTemplate from "./templates/AuthTemplate";
import { useAuth } from "./hooks/useAuth";

const Auth = () => {
  const {
    isLogin,
    toggleAuthMode,
    loginForm,
    signupForm,
    handleLoginSubmit,
    handleSignupSubmit,
  } = useAuth();

  const {
    register: loginRegister,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors, isSubmitting: isLoggingIn },
  } = loginForm;

  const {
    register: signupRegister,
    handleSubmit: handleSignup,
    formState: { errors: signupErrors, isSubmitting: isSigningUp },
  } = signupForm;

  // --- Render Functions ---

  const renderSignupFields = () => (
    <>
      <Input
        label="FullName"
        placeholder="John Doe"
        error={signupErrors.name?.message}
        {...signupRegister("name")}
      />
    </>
  );

  const renderLoginForm = () => (
    <>
      <Input
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        error={loginErrors.email?.message}
        {...loginRegister("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={loginErrors.password?.message}
        {...loginRegister("password")}
      />

      <Button
        text="Sign In"
        onClick={handleLogin(handleLoginSubmit)}
        className="w-full py-3 mt-2 text-base font-semibold"
        isLoading={isLoggingIn}
      />
    </>
  );

  const renderSignupForm = () => (
    <>
      {renderSignupFields()}
      <Input
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        error={signupErrors.email?.message}
        {...signupRegister("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={signupErrors.password?.message}
        {...signupRegister("password")}
      />

      <Button
        text="Create Account"
        onClick={handleSignup(handleSignupSubmit)}
        className="w-full py-3 mt-2 text-base font-semibold"
        isLoading={isSigningUp}
      />
    </>
  );

  return (
    <AuthTemplate
      title={isLogin ? "Welcome Back" : "Join the Community"}
      subtitle={
        isLogin ? "Sign in to your account" : "Start your journey today"
      }
      isLogin={isLogin}
      toggleText={
        isLogin ? "Don't have an account?" : "Already have an account?"
      }
      toggleActionText={isLogin ? "Sign Up" : "Sign In"}
      onToggle={toggleAuthMode}
    >
      <div className="flex flex-col gap-5">
        {isLogin ? renderLoginForm() : renderSignupForm()}
      </div>
    </AuthTemplate>
  );
};

export default Auth;

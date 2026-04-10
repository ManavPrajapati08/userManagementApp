import { useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Input from "../../shared/components/atoms/Input";
import Button from "../../shared/components/atoms/Button";
import AuthTemplate from "./templates/AuthTemplate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormDataType = {
  name: string;
  email: string;
  password: string;
  age: string;
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );

        toast.success("Login Successful ✅");
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );
        toast.success("Signup Successful ✅");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <AuthTemplate
      title={isLogin ? "Welcome Back" : "Join the Community"}
      subtitle={isLogin ? "Please enter your details to sign in" : "Start your journey with us today"}
      isLogin={isLogin}
      toggleText={isLogin ? "Don't have an account?" : "Already have an account?"}
      toggleActionText={isLogin ? "Sign Up" : "Sign In"}
      onToggle={() => setIsLogin(!isLogin)}
    >
      <div className="flex flex-col gap-5">
        {!isLogin && (
          <>
            <Input
              label="FullName"
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
            />
            <Input
              label="Age"
              type="number"
              name="age"
              placeholder="25"
              onChange={handleChange}
            />
          </>
        )}

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="name@company.com"
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={handleChange}
        />

        <Button
          text={isLogin ? "Sign In" : "Create Account"}
          onClick={handleSubmit}
          className="w-full py-3 mt-2 text-base font-semibold"
        />
      </div>
    </AuthTemplate>
  );
};

export default Auth;

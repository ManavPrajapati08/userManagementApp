import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormDataType = {
  name: string;
  email: string;
  password: string;
  age: string;
  dob: string;
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    age: "",
    dob: "",
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
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800">
        {/* Title */}
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Signup fields */}
          {!isLogin && (
            <>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <Input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
              />
              <Input type="date" name="dob" onChange={handleChange} />
            </>
          )}

          {/* Common */}
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <Button
            text={isLogin ? "Login" : "Create Account"}
            onClick={handleSubmit}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Toggle */}
        <p
          className="text-gray-400 text-sm text-center cursor-pointer hover:text-white transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;

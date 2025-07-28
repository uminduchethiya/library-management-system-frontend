import React, { useState } from "react";
import hide from "../assets/Hide.png";
import emailIcon from "../assets/Email.png";


export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string[]>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tempErrors: Partial<Record<keyof LoginFormData, string[]>> = {};

    if (!formData.email) tempErrors.email = ["Email is required"];
    if (!formData.password) tempErrors.password = ["Password is required"];

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <form className="p-4 sm:p-6 md:p-8" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full p-3 sm:p-3.5 md:p-4 mb-3 sm:mb-4 bg-gray-800 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      {errors.email && (
        <p className="text-red-500 text-xs sm:text-sm mb-2 px-1">{errors.email[0]}</p>
      )}

      <div className="relative mb-3 sm:mb-4">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 sm:p-3.5 md:p-4 pr-12 bg-gray-800 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <span className="absolute inset-y-0 right-3 sm:right-4 flex items-center text-gray-400">
          <img src={hide} alt="Hide" className="w-4 h-4 sm:w-5 sm:h-5" />
        </span>
      </div>
      {errors.password && (
        <p className="text-red-500 text-xs sm:text-sm mb-2 px-1">{errors.password[0]}</p>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center p-3 sm:p-3.5 md:p-4 mt-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base font-medium"
      >
        <img src={emailIcon} alt="email" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
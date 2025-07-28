import React, { useState } from "react";
import hide from "../assets/Hide.png";
import emailIcon from "../assets/Email.png";

export interface RegisterFormData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  password_confirmation: string;
}

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
  loading: boolean;
  errors: Partial<Record<keyof RegisterFormData | "server", string[]>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading,
  errors,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="p-4 sm:p-6 md:p-8" onSubmit={handleFormSubmit}>
      {errors.server && (
        <p className="text-red-500 text-xs sm:text-sm mb-3 px-1">{errors.server[0]}</p>
      )}

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

     
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-3 sm:mb-4">
        <div className="flex-1 mb-3 sm:mb-0">
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 sm:p-3.5 md:p-4 bg-gray-800 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs sm:text-sm mt-1 px-1">{errors.firstname[0]}</p>
          )}
        </div>
        
        <div className="flex-1">
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-3 sm:p-3.5 md:p-4 bg-gray-800 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs sm:text-sm mt-1 px-1">{errors.lastname[0]}</p>
          )}
        </div>
      </div>

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

      <input
        type="password"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="w-full p-3 sm:p-3.5 md:p-4 mb-3 sm:mb-4 bg-gray-800 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      {errors.password_confirmation && (
        <p className="text-red-500 text-xs sm:text-sm mb-2 px-1">
          {errors.password_confirmation[0]}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center p-3 sm:p-3.5 md:p-4 mt-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
      >
        <img src={emailIcon} alt="email" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
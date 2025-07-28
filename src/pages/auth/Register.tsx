import React, { useState } from "react";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm"
import type { RegisterFormData } from "../../components/RegisterForm";
;
import api from "../../api/axios";
import { showErrorAlert, showSuccessAlert } from "../../utils/alert";


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData | "server", string[]>>
  >({});

  const handleRegister = async (formData: RegisterFormData) => {
    const tempErrors: typeof errors = {};

    if (!formData.email) tempErrors.email = ["Email is required"];
    if (!formData.firstname) tempErrors.firstname = ["First name is required"];
    if (!formData.lastname) tempErrors.lastname = ["Last name is required"];
    if (!formData.password) tempErrors.password = ["Password is required"];
    if (formData.password !== formData.password_confirmation) {
      tempErrors.password_confirmation = ["Passwords do not match"];
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = {
        email: formData.email,
        firstName: formData.firstname,
        lastName: formData.lastname,
        password: formData.password,
      };

      await api.post("/auth/register", payload);

      await showSuccessAlert("Registration successful");
      navigate("/login");
    } catch (error: unknown) {
      let message = "Registration failed. Try again.";

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }

      showErrorAlert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black bg-opacity-80 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <div className="flex flex-col items-center pt-6 px-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-32 sm:w-40 md:w-48 mb-4" 
          />
          <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-6 text-center px-2">
            REGISTER TO EXPERNETIC LIBRARY
          </h2>
        </div>
        <RegisterForm onSubmit={handleRegister} loading={loading} errors={errors} />
      </div>

      <div className="text-center text-gray-400 text-xs sm:text-sm mt-4 px-4">
        Already have an account?{" "}
        <Link to="/login" className="text-textblue hover:underline font-bold">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
import React from "react";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/logo.png";
import LoginForm from "../../components/LoginForm";
import type { LoginFormData } from "../../components/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import api from "../../api/axios";
import { showErrorAlert, showSuccessAlert } from "../../utils/alert";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await api.post("/auth/login", formData);
      const { token, user } = response.data;

      // Store token for future auth (you might want to add interceptor for API calls)
      localStorage.setItem("token", token);

      // Dispatch user info to redux store
      dispatch(login(user));
      await showSuccessAlert("Login Successful");

      // Redirect user after successful login
      if (user.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/landingpage");
      }

    } 
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
        showErrorAlert(message);

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
            SIGN IN TO EXPERNETIC LIBRARY
          </h2>
        </div>
        <LoginForm onSubmit={handleLogin} />
      </div>

      <div className="text-center text-gray-400 text-xs sm:text-sm mt-4 px-4">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-textblue hover:underline font-bold"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
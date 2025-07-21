import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ⬅️ Import useNavigate
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate(); // ⬅️ Initialize navigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/login`, {
        email,
        password,
      },
    {
      withCredentials: true
    });

      toast.success("Login successful");

      // Optional: Save token (if your backend sends it, else remove this line)
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        if (res.data.isAdmin) {
          navigate("/admin"); // Admin route
        } else {
          navigate("/"); // Normal user route
        }
      }, 1500); // Delay to show toast
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 p-4">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-3xl px-10 py-12 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-2">Login</h2>
        <p className="text-center text-gray-500 mb-6">Access your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-purple-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-purple-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-full transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-600 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form, {
        withCredentials: true, // ✅ Needed if using cookies
      });
      toast.success("Signup successful!");
      setTimeout(() => {
        navigate("/login"); // ✅ Redirect to profile
      }, 1500); // Give the toast a moment to show
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 p-4">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-3xl px-10 py-12 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-2">Sign Up</h2>
        <p className="text-center text-gray-500 mb-6">Create your free account</p>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-purple-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-purple-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.email}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-full transition duration-300 shadow-md"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
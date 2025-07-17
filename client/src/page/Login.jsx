import React from 'react';
import { FiLock, FiMail } from 'react-icons/fi';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Welcome Back</h2>

                <form className="space-y-6">
                    <div className="relative">
                        <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-600" />
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-600" />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                        />
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-purple-600" />
                            Remember Me
                        </label>
                        <a href="/forgot-password" className="text-purple-700 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-700">
                    Don’t have an account?
                    <a href="/register" className="text-purple-700 font-semibold hover:underline ml-1">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
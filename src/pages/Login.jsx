import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Check if user is fired
      const { data: userData } = await axiosPublic.get(
        `/employees/${form.email}`
      );
      if (userData.isFired) {
        return Swal.fire({
          icon: "error",
          title: "Account Disabled",
          text: "Please contact the administrator.",
        });
      }
      // Firebase login
      const result = await logIn(form.email, form.password);
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-500 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Member Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="peer h-12 w-full border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
                className="peer h-12 w-full border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-indigo-500"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">or</span>
            
          </div>

          <div className="text-center">
            <GoogleLogin className="w-full" />
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

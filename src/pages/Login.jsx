import React, { useContext, useState } from "react";
import axios from "../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import GoogleLogin from "./GoogleLogin";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for error message
  const { logIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
  
    try {
      // Check if the user is fired
      const userResponse = await axiosPublic.get(`/employees/${form.email}`);
      console.log(userResponse.data);
      const userData = userResponse.data;
  
      if (userData.isFired) {
        Swal.fire({
          icon: "error",
          title: "Account Disabled",
          text: "Your account has been disabled. Please contact the admin.",
        });
        return;
      }
  
      // Proceed with Firebase login
      const result = await logIn(form.email, form.password);
      console.log("Logged in user:", result.user);
  
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      });
  
      navigate(from);
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  };
  

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
      </form>
      <p>
        <small>
          New Here? <Link to="/register">Create an account</Link>
        </small>
      </p>
      <GoogleLogin />
    </div>
  );
};

export default Login;

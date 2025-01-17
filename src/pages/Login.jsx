import React, { useContext, useState } from "react";
import axios from "../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { Result } from "postcss";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  console.log("in login page", location);
  const [form, setForm] = useState({ email: "", password: "" });
  const { logIn } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    logIn(form.email, form.password).then((result) => {
      const user = result.user;
      console.log(user);
      navigate(from);
    });
    // console.log(form.password);
    // try {
    //   await axios.post("/auth/login", form, { withCredentials: true });
    //   navigate("/dashboard");
    // } catch (error) {
    //   alert(error.response?.data?.message || "Login failed");
    // }
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
      </form>
      <p>
        <small>
          New Here? <Link to="/register">Create an account</Link>
        </small>
      </p>
      <GoogleLogin></GoogleLogin>
    </div>
  );
};

export default Login;

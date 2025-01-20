import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const axiosPublic = useAxiosPublic();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
    bank_account_no: "",
    salary: "",
    designation: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleNavigate = () => {
    navigate(from);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!validatePassword(form.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 6 characters, include a capital letter, and a special character.",
      }));
      setLoading(false);
      return;
    }

    try {
      // Upload photo to imgbb
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", form.photo);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        imgbbFormData
      );

      const photoURL = imgbbResponse.data.data.display_url;

      // Create user in Firebase
      const result = await createUser(form.email, form.password);
      const loggedUser = result.user;

      // Update Firebase user profile
      await updateUserProfile(form.name, photoURL);

      // Save user info to the database
      const userInfo = {
        name: form.name,
        email: form.email,
        role: form.role,
        bank_account_no: form.bank_account_no,
        salary: form.salary,
        designation: form.designation,
        photo: photoURL,
      };

      await axiosPublic.post("/users", userInfo);

      alert("Registration successful!");
      handleNavigate(); // Navigate after successful registration
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors((prev) => ({
        ...prev,
        api: "Something went wrong during registration.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
          required
        />
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
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <input
          type="text"
          placeholder="Bank Account Number"
          value={form.bank_account_no}
          onChange={(e) =>
            setForm({ ...form, bank_account_no: e.target.value })
          }
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2"
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2"
          required
        >
          <option value="employee">Employee</option>
          <option value="HR">HR</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {errors.api && <p className="text-red-500">{errors.api}</p>}
      </form>
      <p>
        <small>
          Already have an account? <Link to="/login">Log In</Link>
        </small>
      </p>
      <GoogleLogin />
    </div>
  );
};

export default Register;

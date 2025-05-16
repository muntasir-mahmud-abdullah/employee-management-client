import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    bank_account_no: "",
    salary: "",
    designation: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePassword = (pw) =>
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{6,}$/.test(pw);

  const handleFileChange = (e) =>
    setForm({ ...form, photo: e.target.files[0] });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validatePassword(form.password)) {
      setErrors({ password: "At least 6 chars, 1 uppercase & special char" });
      return;
    }
    setLoading(true);
    try {
      // 1) Upload to imgbb
      const imgData = new FormData();
      imgData.append("image", form.photo);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imgData
      );
      const photoURL = data.data.display_url;

      // 2) Firebase auth
      const res = await createUser(form.email, form.password);
      await updateUserProfile(form.name, photoURL);

      // 3) Save to our DB
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

      // 4) Success alert
      await Swal.fire({
        icon: "success",
        title: "Registered!",
        text: "Your account has been created.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-5">
            {[
              { id: "name", label: "Full Name", type: "text", value: form.name },
              { id: "email", label: "Email", type: "email", value: form.email },
              { id: "password", label: "Password", type: "password", value: form.password },
              {
                id: "bank",
                label: "Bank Account Number",
                type: "text",
                value: form.bank_account_no,
              },
              {
                id: "salary",
                label: "Salary",
                type: "text",
                value: form.salary,
              },
              {
                id: "designation",
                label: "Designation",
                type: "text",
                value: form.designation,
              },
            ].map(({ id, label, type, value }) => (
              <div key={id} className="relative">
                <input
                  id={id}
                  type={type}
                  value={value}
                  onChange={(e) =>
                    setForm({ ...form, [id === "bank" ? "bank_account_no" : id]: e.target.value })
                  }
                  required
                  className="peer w-full h-12 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-green-500"
                  placeholder={label}
                />
                <label
                  htmlFor={id}
                  className="absolute left-2 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-green-500"
                >
                  {label}
                </label>
                {id === "password" && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            ))}

            <div className="relative">
              <input
                id="photo"
                type="file"
                onChange={handleFileChange}
                required
                className="block w-full text-gray-800 dark:text-gray-100"
              />
              <label
                htmlFor="role"
                className="block text-gray-600 dark:text-gray-400 mt-2 mb-1"
              >
                Role
              </label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full h-10 border rounded px-3 bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="employee">Employee</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-500 dark:text-gray-400">or sign up with</span>
            <div className="mt-4">
              <GoogleLogin />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [existingUser, setExistingUser] = useState(null); // State for storing employee data
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Theme State

  // Fetch employee data when the user is logged in
  useEffect(() => {
    const fetchEmployees = async () => {
      if (user?.email) {
        try {
          const response = await axiosPublic.get(`/employees/${user.email}`);
          setExistingUser(response.data);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }
    };
    fetchEmployees();
  }, [user?.email, axiosPublic]);

  // Handle Theme Toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark"); // For Tailwind dark mode support
  };

  // Apply theme on page load
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Handle user logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        setExistingUser(null); // Clear existing user data on logout
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <nav className="md:navbar bg-gray-600 text-white">
      <div className="flex flex-col md:flex-row w-full text-xl  mx-auto justify-around md:justify-between items-center py-4 md:px-4">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl hidden md:flex md:text-3xl font-bold">
          Employee Management
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex flex-col md:flex-row items-center gap-4">
          <Link to="/contact-us" className="hover:underline">
            Contact Us
          </Link>
          <Link to="/about-us" className="hover:underline">
            About Us
          </Link>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          {/* {user && (
  <Link to="/dashboard/employee" className="hover:underline">
    Profile
  </Link>
)} */}

          {user ? (
            <>
              {/* Conditionally render Admin Dashboard link */}
              {existingUser?.role === "admin" && (
                <Link to="/dashboard/admin" className="hover:underline">
                  Admin Dashboard
                </Link>
              )}
              {existingUser?.role === "HR" && (
                <Link to="/dashboard/hr" className="hover:underline">
                  HR Dashboard
                </Link>
              )}
              {existingUser?.role === "employee" && (
                <Link to="/dashboard/employee" className="hover:underline">
                  Employee Dashboard
                </Link>
              )}
              {/* Theme Toggle Button */}
              <button
                onClick={handleThemeToggle}
                className="border-2 border-white px-4 py-2 rounded"
              >
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
              {/* Log Out Button */}
              <button
                onClick={handleLogOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>

        {/* // Mobile menu  */}
        <div className="flex justify-around items-center md:hidden relative">
         <Link to="/" className="text-2xl mr-24 font-bold">
          Employee Management
        </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#3b82f5] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden px-4 pb-4">
                    <Link to="/contact-us" className="hover:underline block">
            Contact Us
          </Link>
          <Link to="/about-us" className="hover:underline block">
            About Us
          </Link>
          <Link to="/services" className="hover:underline block">
            Services
          </Link>
          {/* {user && (
  <Link to="/dashboard/employee" className="hover:underline">
    Profile
  </Link>
)} */}

          {user ? (
            <>
              {/* Conditionally render Admin Dashboard link */}
              {existingUser?.role === "admin" && (
                <Link to="/dashboard/admin" className="hover:underline block">
                  Admin Dashboard
                </Link>
              )}
              {existingUser?.role === "HR" && (
                <Link to="/dashboard/hr" className="hover:underline block">
                  HR Dashboard
                </Link>
              )}
              {existingUser?.role === "employee" && (
                <Link to="/dashboard/employee" className="hover:underline block">
                  Employee Dashboard
                </Link>
              )}
              {/* Theme Toggle Button */}
              <button
                onClick={handleThemeToggle}
                className="border-2 border-white px-4 py-2 rounded block"
              >
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
              {/* Log Out Button */}
              <button
                onClick={handleLogOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 block"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline block">
                Login
              </Link>
              <Link to="/register" className="hover:underline block">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

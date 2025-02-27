import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [existingUser, setExistingUser] = useState(null); // State for storing employee data

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

  // Handle user logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        setExistingUser(null); // Clear existing user data on logout
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <nav className="bg-gray-800 px-4 text-white">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold">
          Employee Management
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link to="/contact-us" className="hover:underline">
            Contact Us
          </Link>

          {user ? (
            <>
              {/* Conditionally render Admin Dashboard link */}
              {existingUser?.role === "admin" && (
                <Link to="/dashboard/admin" className="hover:underline">
                  Admin Dashboard
                </Link>
              )}

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
      </div>
    </nav>
  );
};

export default Navbar;

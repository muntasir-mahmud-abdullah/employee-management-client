import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleLogIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogIn = async () => {
    try {
      const result = await googleLogIn();
      console.log("Google user:", result.user);

      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "Employee", // Default role for Google login
      };

      // Check if the user is fired
      const response = await axiosPublic.get(`/employees/${userInfo.email}`);
      const existingUser = response.data;

      if (existingUser.isFired) {
        alert("Your account has been disabled. Please contact the admin.");
        return;
      }

      // Add user to the database if not already present
      await axiosPublic.post("/users", userInfo);

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Error logging in with Google. Please try again.");
    }
  };

  return (
    <div>
      <div className="p-8">
        <div className="divider"></div>
        <button onClick={handleGoogleLogIn} className="btn">
          <FaGoogle className="mr-2" />
          Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;

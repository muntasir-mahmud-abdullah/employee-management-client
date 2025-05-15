import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

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
      // // console.log(userInfo)

      // // Check if the user is fired



      // Add user to the database if not already present
      await axiosPublic.post("/users", userInfo);

      // SweetAlert2 for successful login
      Swal.fire({
        title: "Success!",
        text: "Logged in successfully with Google!",
        icon: "success",
        confirmButtonText: "OK",
      });

      const response = await axiosPublic.get(`/employees/${userInfo?.email}`);
      console.log(response.data);
      const existingUser = response.data;
            if (existingUser?.isFired) {
        // SweetAlert2 for fired account
        Swal.fire({
          title: "Account Disabled",
          text: "Your account has been disabled. Please contact the admin.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }


      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error);

      // Toastify error message
      toast.error("Error logging in with Google. Please try again.");
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

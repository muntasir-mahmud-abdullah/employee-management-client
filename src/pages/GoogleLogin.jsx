import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import GoogleLoginButton from "./GoogleLoginBtn";

const GoogleLogin = () => {
  const { googleLogIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogIn = async () => {
    try {
      const result = await googleLogIn();
      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
        role: "Employee",
      };
      await axiosPublic.post("/users", userInfo);
      Swal.fire({ icon: "success", title: "Logged in with Google!" });
    } catch (err) {
      console.error(err);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <GoogleLoginButton onClick={handleGoogleLogIn} />
    </div>
  );
};

export default GoogleLogin;

import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleLogIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleLogIn = () => {
    googleLogIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div>
      <div className="p-8">
        <div className="divider"></div>
        <button onClick={handleGoogleLogIn} className="btn">
          <FaGoogle className="mr-2"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;

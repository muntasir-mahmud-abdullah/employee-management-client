import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
  const handleLogOut =()=>{
    logOut()
    .then(()=>{})
    .catch(error=>console.log(error.message))
  }
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold">
          Employee Management
        </Link>
        <div>
        
          <Link to="/register">Register</Link>

          {
            user ? <>
            <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
            </>: <>
            <Link to="/login" className="mr-4">
            Login
          </Link>
            </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

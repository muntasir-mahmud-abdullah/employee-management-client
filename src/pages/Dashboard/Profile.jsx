import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/employees/${user.email}`)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>User data not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div className="flex flex-col items-center">
        <img src={userData.photo || "https://via.placeholder.com/150"} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
        <h3 className="text-lg font-semibold">{userData.name}</h3>
        <p className="text-gray-600">{userData.email}</p>
      </div>
      <div className="mt-4 space-y-2">
        <p><strong>Phone:</strong> {userData.phone || "Not Provided"}</p>
        <p><strong>Address:</strong> {userData.address || "Not Provided"}</p>
        <p><strong>Bank Account:</strong> {userData.bank_account_no}</p>
        <p><strong>Designation:</strong> {userData.designation}</p>
        <p><strong>Salary:</strong> ${userData.salary}</p>
      </div>
    </div>
  );
};

export default Profile;

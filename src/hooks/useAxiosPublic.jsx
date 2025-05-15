import axios from "axios";
import React from "react";
const axiosPublic = axios.create({
  baseURL: "https://employee-management-server-nu.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
// https://employee-management-server-nu.vercel.app
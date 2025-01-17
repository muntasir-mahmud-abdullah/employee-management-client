import React, { useState, useEffect } from "react";
import axios from "../../utils/api";
import useTask from "../../hooks/useTask";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return(
    <Outlet></Outlet>
  )
};

export default EmployeeDashboard;

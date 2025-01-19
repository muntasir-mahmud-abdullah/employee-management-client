import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard";
import HRDashboard from "../pages/Dashboard/HRDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import WorkSheet from "../pages/Dashboard/WorkSheet";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import EmployeeList from "../pages/Dashboard/EmployeeList";
import EmployeeDetails from "../pages/Dashboard/EmployeeDetails";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Progress from "../pages/Dashboard/Progress";
import AllEmployeeList from "../pages/Dashboard/AllEmployeeList";
import Payroll from "../pages/Dashboard/Payroll";
import ContactUs from "../pages/Dashboard/ContactUs";
import AdminMessages from "../pages/Dashboard/AdminMessages";
// const axiosSecure = useAxiosSecure();
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard/employee",
        element: (
          <PrivateRoute>
            <EmployeeDashboard></EmployeeDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            // index:true,
            path: "work-sheet",
            element: <WorkSheet></WorkSheet>,
          },
          {
            // index:true,
            path: "payment-history",
            element: <PaymentHistory></PaymentHistory>,
          },
          {
            // index:true,
            path: "contact-us",
            element: <ContactUs></ContactUs>,
          },
        ],
      },
      {
        path: "/dashboard/hr",
        element: (
          <PrivateRoute>
            <HRDashboard></HRDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="employee-list" replace />, // Redirect to default route
          },
          {
            path: "employee-list",
            element: <EmployeeList></EmployeeList>,
          },
          {
            path: "details/:email",
            element: <EmployeeDetails></EmployeeDetails>,
          },
          {
            path: "progress",
            element: <Progress></Progress>,
          },
        ],
      },
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="all-employee-list" replace />, // Redirect to default route
          },
          {
            path: "all-employee-list",
            element: <AllEmployeeList></AllEmployeeList>,
          },
          {
            path: "payroll",
            element: <Payroll></Payroll>,
          },
          {
            path: "admin-messages",
            element: <AdminMessages></AdminMessages>,
          },
        ],
      },
    ],
  },
]);

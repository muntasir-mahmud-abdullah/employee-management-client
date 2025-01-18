import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "../../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EmployeeDetails = () => {
  const { email } = useParams(); // Extract email from the URL
//   console.log(email);
  const [employee, setEmployee] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axiosSecure.get(`/employees/${email}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      alert("Error fetching employee details.");
    }
  };

  const fetchPaymentHistory = async () => {
    // try {
      const response = await axiosSecure.get(`/payments/${email}`);
      console.log(response.data);
      setPayments(response.data);
      setLoading(false);

    // } catch (error) {
    // //   console.error("Error fetching payment history:", error);
    //   alert("No payment history found");
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchEmployeeDetails();
    fetchPaymentHistory();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold mb-4">Employee Details</h2>

      {/* Employee Details */}
      <div className="mb-4">
        <img
          src={employee.photo || "https://via.placeholder.com/150"}
          alt={employee.name}
          className="w-32 h-32 rounded-full mb-2"
        />
        <h3 className="text-lg font-bold">{employee.name}</h3>
        <p>{employee.designation}</p>
      </div>

      {/* Salary vs. Month/Year Bar Chart */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Salary vs. Month/Year</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={payments}>
            <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom" }} />
            <YAxis label={{ value: "Salary", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeDetails;

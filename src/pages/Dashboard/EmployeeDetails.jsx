import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    try {
      const response = await axiosSecure.get(`/payments/${email}`);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      alert("No payment history found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
    fetchPaymentHistory();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold mb-4">Employee Details</h2>

      {/* Employee Details */}
      <div className="mb-4">
        <h3 className="text-lg font-bold">{employee.name}</h3>
        <p>{employee.designation}</p>
      </div>

      {/* Salary vs. Month/Year Bar Chart */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Salary vs. Month/Year</h3>
        {payments.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payments}>
              <XAxis
                dataKey="month"
                label={{ value: "Month", position: "insideBottom" }}
              />
              <YAxis
                label={{ value: "Salary", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center border border-gray-300 p-4 rounded-md bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-600">
              No Payment History Found
            </h4>
            <p className="text-sm text-gray-500 mt-2">
              This employee has no recorded salary payments yet.
            </p>
            <p className="text-sm text-gray-500">
              Please check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;

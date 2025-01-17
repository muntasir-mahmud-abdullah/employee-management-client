import React, { useEffect, useState } from "react";
import axios from "../../utils/api";

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      alert("Error fetching employees");
    }
  };

  const toggleVerify = async (id, isVerified) => {
    try {
      await axios.patch(`/employees/${id}`, { isVerified: !isVerified });
      fetchEmployees();
    } catch (error) {
      alert("Error toggling verification");
    }
  };

  const payEmployee = async (id, salary) => {
    try {
      const month = prompt("Enter month (e.g., January):");
      const year = prompt("Enter year (e.g., 2025):");

      if (!month || !year) return;

      await axios.post("/payments", { employeeId: id, salary, month, year });
      alert("Payment successful");
    } catch (error) {
      alert("Error processing payment");
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">HR Dashboard</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Verified</th>
            <th className="border p-2">Bank Account</th>
            <th className="border p-2">Salary</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">
                <button
                  className={`px-2 py-1 rounded ${
                    employee.isVerified ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                  onClick={() => toggleVerify(employee._id, employee.isVerified)}
                >
                  {employee.isVerified ? "Verified" : "Not Verified"}
                </button>
              </td>
              <td className="border p-2">{employee.bankAccount}</td>
              <td className="border p-2">{employee.salary}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => payEmployee(employee._id, employee.salary)}
                  disabled={!employee.isVerified}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRDashboard;

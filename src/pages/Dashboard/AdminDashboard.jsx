import React, { useEffect, useState } from "react";
import axios from "../../utils/api";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/admin/employees");
      setEmployees(response.data);
    } catch (error) {
      alert("Error fetching employees");
    }
  };

  const makeHR = async (id) => {
    try {
      await axios.patch(`/admin/employees/${id}`, { role: "HR" });
      fetchEmployees();
    } catch (error) {
      alert("Error assigning HR role");
    }
  };

  const fireEmployee = async (id) => {
    try {
      await axios.delete(`/admin/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      alert("Error firing employee");
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.role}</td>
              <td className="border p-2">
                {employee.role === "Employee" && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => makeHR(employee._id)}
                  >
                    Make HR
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => fireEmployee(employee._id)}
                >
                  Fire
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

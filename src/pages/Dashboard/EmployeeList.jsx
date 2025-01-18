import React, { useState, useEffect } from "react";
import axios from "../../utils/api";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For the pay modal
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axiosSecure.get("/employees");
      //   console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees.");
    }
  };

  // Toggle verification status
  const toggleVerification = async (id, currentStatus) => {
    try {
      await axiosSecure.put(`/employees/${id}/verify`, {
        isVerified: !currentStatus,
      });
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error toggling verification:", error);
      alert("Error toggling verification.");
    }
  };

  // Submit payment request
  const submitPaymentRequest = async (e) => {
    e.preventDefault();

    try {
      const { email, salary } = selectedEmployee;
      const { month, year } = e.target.elements;

      await axiosSecure.post("/payroll", {
        email,
        amount: salary,
        month: month.value,
        year: year.value,
      });

      alert("Payment request submitted successfully.");
      setSelectedEmployee(null); // Close modal
    } catch (error) {
      console.error("Error creating payment request:", error);
      alert("Error creating payment request.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank Account</th>
              <th>Salary</th>
              <th>Pay</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    onClick={() =>
                      toggleVerification(employee._id, employee.isVerified)
                    }
                    className={`px-2 py-1 ${
                      employee.isVerified ? "bg-green-500" : "bg-red-200"
                    } text-white`}
                  >
                    {employee.isVerified ? "✅" : "❌"}
                  </button>
                </td>
                <td>{employee.bank_account_no}</td>
                <td>${employee.salary}</td>
                <td>
                  <button
                    onClick={() => setSelectedEmployee(employee)}
                    disabled={!employee.isVerified}
                    className={`px-2 py-1 ${
                      employee.isVerified ? "bg-blue-500" : "bg-gray-500"
                    } text-white`}
                  >
                    Pay
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/hr/details/${employee.email}`}>
                    <button className="bg-yellow-500 text-white px-2 py-1">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pay Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={submitPaymentRequest}
            className="bg-white p-4 rounded shadow-lg"
          >
            <h3 className="text-lg font-bold mb-2">
              Pay {selectedEmployee.name}
            </h3>
            <p>Salary: ${selectedEmployee.salary}</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                name="month"
                placeholder="Month"
                className="border p-2"
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                className="border p-2"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setSelectedEmployee(null)}
                className="bg-gray-500 text-white px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

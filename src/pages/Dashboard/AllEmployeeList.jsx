import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllEmployeeList = () => {
  const [employees, setEmployees] = useState([]); // State for employee data
  const [loading, setLoading] = useState(true); // Loading state
  const [viewMode, setViewMode] = useState("table"); // State to toggle view mode
  const axiosSecure = useAxiosSecure();

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axiosSecure.get("/verified-employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Error fetching employees.");
    } finally {
      setLoading(false);
    }
  };

  // Promote an employee to HR
  const handleMakeHR = async (id) => {
    try {
      await axiosSecure.patch(`/employees/${id}/make-hr`);
      Swal.fire("Success!", "Employee promoted to HR successfully.", "success");
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error promoting employee to HR:", error);
      toast.error("Error promoting employee to HR.");
    }
  };

  // Fire an employee
  const handleFireEmployee = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to fire this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, fire!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/employees/${id}/fire`);
          Swal.fire("Fired!", "Employee has been fired.", "success");
          fetchEmployees(); // Refresh the list
        } catch (error) {
          console.error("Error firing employee:", error);
          toast.error("Error firing employee.");
        }
      }
    });
  };

  // Adjust an employee's salary
  const handleAdjustSalary = async (id, currentSalary) => {
    Swal.fire({
      title: "Adjust Salary",
      input: "number",
      inputLabel: "Enter new salary",
      inputValue: currentSalary,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || isNaN(value) || parseFloat(value) <= parseFloat(currentSalary)) {
          return "Please enter a valid salary greater than the current salary.";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/employees/${id}/salary`, { salary: result.value });
          Swal.fire("Updated!", "Salary updated successfully.", "success");
          fetchEmployees(); // Refresh the list
        } catch (error) {
          console.error("Error updating salary:", error);
          toast.error("Error updating salary.");
        }
      }
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold mb-4">All Verified Employees</h2>

      {/* Toggle Button */}
      <button
        onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Switch to {viewMode === "table" ? "Grid View" : "Table View"}
      </button>

      {/* Render Table View */}
      {viewMode === "table" && (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Make HR</th>
              <th>Fire</th>
              <th>Adjust Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>
                  {employee.role !== "HR" && (
                    <button
                      onClick={() => handleMakeHR(employee._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Make HR
                    </button>
                  )}
                </td>
                <td>
                  {employee.isFired ? (
                    <span className="text-red-500">Fired</span>
                  ) : (
                    <button
                      onClick={() => handleFireEmployee(employee._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Fire
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleAdjustSalary(employee._id, employee.salary)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Adjust Salary
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render Card Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="border p-4 rounded shadow flex flex-col items-center"
            >
              <h3 className="font-bold text-lg mb-2">{employee.name}</h3>
              <p className="text-sm mb-2">Designation: {employee.designation}</p>
              <p className="text-sm mb-2">Salary: ${employee.salary}</p>
              <p className="text-sm mb-2">
                Verified: {employee.isVerified ? "✅" : "❌"}
              </p>
              <div className="mt-4 flex gap-2">
                {employee.role !== "HR" && (
                  <button
                    onClick={() => handleMakeHR(employee._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Make HR
                  </button>
                )}
                {employee.isFired ? (
                  <span className="text-red-500">Fired</span>
                ) : (
                  <button
                    onClick={() => handleFireEmployee(employee._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Fire
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;

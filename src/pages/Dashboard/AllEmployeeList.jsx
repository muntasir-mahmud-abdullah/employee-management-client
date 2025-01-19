import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const axoisSecure = useAxiosSecure();

  const fetchEmployees = async () => {
    try {
      const response = await axoisSecure.get("/verified-employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeHR = async (id) => {
    try {
      await axoisSecure.patch(`/employees/${id}/make-hr`);
      alert("Employee promoted to HR successfully");
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error promoting employee to HR:", error);
      alert("Error promoting employee to HR.");
    }
  };

  const handleFireEmployee = async (id) => {
    if (window.confirm("Are you sure you want to fire this employee?")) {
      try {
        await axoisSecure.patch(`/employees/${id}/fire`);
        alert("Employee fired successfully");
        fetchEmployees(); // Refresh the list
      } catch (error) {
        console.error("Error firing employee:", error);
        alert("Error firing employee.");
      }
    }
  };

  const handleAdjustSalary = async (id, newSalary) => {
    try {
      await axoisSecure.patch(`/employees/${id}/salary`, { salary: newSalary });
      alert("Salary updated successfully");
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error updating salary:", error);
      alert("Error updating salary.");
    }
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
                  onClick={() => {
                    const newSalary = prompt(
                      `Enter new salary for ${employee.name}:`,
                      employee.salary
                    );
                    if (newSalary) {
                      handleAdjustSalary(employee._id, newSalary);
                    }
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Adjust Salary
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployeeList;

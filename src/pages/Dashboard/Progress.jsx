import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Progress = () => {
  const [tasks, setTasks] = useState([]); // All tasks
  const [employees, setEmployees] = useState([]); // List of employees for the dropdown
  const [selectedName, setSelectedName] = useState(""); // Selected employee name
  const [selectedMonth, setSelectedMonth] = useState(""); // Selected month
  const [loading, setLoading] = useState(false); // Loading state
  const axiosSecure = useAxiosSecure();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (selectedName) queryParams.append("name", selectedName);
      if (selectedMonth) queryParams.append("month", selectedMonth);

      const response = await axiosSecure.get(
        `/progress?${queryParams.toString()}`
      );
      setTasks(response.data);
      Swal.fire("Success", "Tasks loaded successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Error fetching tasks.", "error");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all employees for the dropdown
  const fetchEmployees = async () => {
    try {
      const response = await axiosSecure.get("/employees"); // Adjust endpoint as needed
      setEmployees(response.data);
    } catch (error) {
      Swal.fire("Error", "Error fetching employees.", "error");
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch tasks and employees on component mount
  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, [selectedName, selectedMonth]);

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold mb-4">Progress Records</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="border p-2"
        >
          <option value="">All Employees</option>
          {employees.map((employee) => (
            <option key={employee.email} value={employee.name}>
              {employee.name}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2"
        >
          <option value="">All Months</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Tasks Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.task}</td>
                <td>{task.hours}</td>
                <td>{task.date}</td>
                <td>{task.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Progress;

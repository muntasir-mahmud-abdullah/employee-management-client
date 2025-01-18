import React, { useState, useEffect } from "react";
import axios from "../../utils/api";

const Progress = () => {
  const [workRecords, setWorkRecords] = useState([]); // All work records
  const [employees, setEmployees] = useState([]); // List of employees for the dropdown
  const [selectedName, setSelectedName] = useState(""); // Selected employee name
  const [selectedMonth, setSelectedMonth] = useState(""); // Selected month
  const [loading, setLoading] = useState(false);

  // Fetch all work records
  const fetchWorkRecords = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
        console.log(queryParams);
      if (selectedName) queryParams.append("name", selectedName);
      if (selectedMonth) queryParams.append("month", selectedMonth);

      const response = await axios.get(`/progress?${queryParams.toString()}`);
      setWorkRecords(response.data);
    } catch (error) {
      console.error("Error fetching progress records:", error);
      alert("Error fetching progress records.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all employees for the dropdown
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees"); // Adjust endpoint as needed
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchEmployees();
    fetchWorkRecords();
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

      {/* Work Records Table */}
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
            {workRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.task}</td>
                <td>{record.hours}</td>
                <td>{record.date}</td>
                <td>{record.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Progress;

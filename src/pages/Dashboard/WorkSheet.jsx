import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const WorkSheet = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]); // State for tasks
  const [form, setForm] = useState({ task: "Sales", hours: "", date: "" }); // State for the form
  const [editingTask, setEditingTask] = useState(null); // To track the task being edited
  const [loading, setLoading] = useState(false); // Loading state// Replace with your backend base URL

  // Notify with react-toastify
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get(`/user-tasks?email=${user.email}`);
      setTasks(response.data);
    } catch (error) {
      notifyError("Error fetching tasks: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Include the user's email in the task data
      const taskData = {
        ...form,
        email: user.email, // Add the logged-in user's email
      };

      const response = await axiosPublic.post("/tasks", taskData);

      setTasks([response.data, ...tasks]); // Update the task list in the state
      notifySuccess("Task added successfully!");
      setForm({ task: "Sales", hours: "", date: "" }); // Reset the form
    } catch (error) {
      notifyError("Error adding task: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.put(`/tasks/${editingTask._id}`, form);
      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? response.data : task
        )
      );
      notifySuccess("Task updated successfully!");
      setEditingTask(null); // Exit editing mode
      setForm({ task: "Sales", hours: "", date: "" }); // Reset form
    } catch (error) {
      notifyError("Error updating task: " + error.message);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axiosPublic.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      notifySuccess("Task deleted successfully!");
    } catch (error) {
      notifyError("Error deleting task: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-xl font-bold">Work Sheet</h2>

      {/* Task Form */}
      <form
        onSubmit={editingTask ? updateTask : addTask}
        className="flex flex-wrap gap-4 mb-4"
      >
        <select
          value={form.task}
          onChange={(e) => setForm({ ...form, task: e.target.value })}
          className="border p-2"
          required
        >
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
        </select>
        <input
          type="number"
          placeholder="Hours Worked"
          value={form.hours}
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className={`bg-${
            editingTask ? "yellow" : "blue"
          }-500 text-white px-4 py-2`}
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setForm({ task: "Sales", hours: "", date: "" });
            }}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Task Table */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, inx) => (
              <tr key={inx}>
                <td>{task.task}</td>
                <td>{task.hours}</td>
                <td>{task.date}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setForm({
                        task: task.task,
                        hours: task.hours,
                        date: task.date,
                      });
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default WorkSheet;

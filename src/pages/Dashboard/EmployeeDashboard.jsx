import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: "Work Sheet", path: "/dashboard/employee/work-sheet" },
    { name: "Payment History", path: "/dashboard/employee/payment-history" },
  ];

  return (
    <div className="flex h-screen pt-6">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          {isSidebarOpen ? "Employee Dashboard" : "ED"}
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-400 hover:text-white"
                    }`
                  }
                  title={isSidebarOpen ? "" : item.name} // Tooltip for compact mode
                >
                  {isSidebarOpen ? item.name : item.name[0]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={toggleSidebar}
          className="bg-blue-500 text-white m-4 px-2 py-1 rounded"
        >
          {isSidebarOpen ? "Collapse" : "Expand"}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeDashboard;

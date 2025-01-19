import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const menuItems = [
    { name: "All Employees", path: "/dashboard/admin/all-employee-list" },
    { name: "Payroll", path: "/dashboard/admin/payroll" },
    { name: "Contact Messages", path: "/dashboard/admin/admin-messages" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Dashboard
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
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

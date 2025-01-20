<nav className="bg-gray-800 px-4 text-white">
  <div className="container mx-auto flex flex-wrap items-center justify-between py-4">
    {/* Brand Logo */}
    <Link to="/" className="text-2xl font-bold">
      Employee Management
    </Link>

    {/* Navigation Links */}
    <div className="flex items-center gap-4 md:flex-row flex-col w-full md:w-auto">
      <Link to="/contact-us" className="hover:underline">
        Contact Us
      </Link>

      {user ? (
        <>
          {/* Conditionally render Admin Dashboard link */}
          {existingUser?.role === "admin" && (
            <Link to="/dashboard/admin" className="hover:underline">
              Admin Dashboard
            </Link>
          )}

          {existingUser?.role === "HR" && (
            <Link to="/dashboard/hr" className="hover:underline">
              HR Dashboard
            </Link>
          )}
          {existingUser?.role === "employee" && (
            <Link to="/dashboard/employee" className="hover:underline">
              Employee Dashboard
            </Link>
          )}

          {/* Log Out Button */}
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </>
      )}
    </div>
  </div>
</nav>

import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); // Capture the error

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-xl mt-4">Something went wrong.</p>

      {error && (
        <p className="text-red-500 mt-2">
          <i>{error.statusText || error.message}</i>
        </p>
      )}

      <img
        src="https://i.ibb.co.com/XDWZXxn/warning-8908707-1280.png"
        alt="404 Error"
        className="w-80 h-auto mt-4"
      />

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

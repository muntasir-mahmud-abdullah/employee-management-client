import React from "react";

const GoogleLoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Sign in with Google"
    className="
      flex items-center justify-center
      bg-white hover:bg-gray-100
      border border-gray-300
      text-gray-700
      rounded-md
      px-4 py-2
      transition-shadow duration-200
      shadow-sm hover:shadow-md
      focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700
    "
  >
    <svg
      className="w-5 h-5 mr-3"
      viewBox="0 0 533.5 544.3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-36.3-4.4-53.6H272v101.5h146.9c-6.3 34-25.1 62.9-53.6 82.1v68.1h86.6c50.5-46.5 78.6-115.1 78.6-198.1z"/>
      <path fill="#34A853" d="M272 544.3c72.4 0 133.2-24 177.6-65.3l-86.6-68.1c-24.1 16.1-55.1 25.6-91 25.6-69.9 0-129.2-47.3-150.4-111.1H33.6v69.7c44.8 88.5 136 149.2 238.4 149.2z"/>
      <path fill="#FBBC05" d="M121.6 324.4c-10.5-31.4-10.5-65.4 0-96.8V158c-44.8 88.5-44.8 189.8 0 278.3v-112z"/>
      <path fill="#EA4335" d="M272 107.6c39.1-.6 76.9 14.2 105.7 40.8l79.1-79.1C396.3 24.4 333.8 0 272 0 169.7 0 78.5 60.7 33.6 149.2l87.9 69.4C142.8 154.9 202.1 107.6 272 107.6z"/>
    </svg>
    <span className="font-medium">Sign in with Google</span>
  </button>
);

export default GoogleLoginButton;

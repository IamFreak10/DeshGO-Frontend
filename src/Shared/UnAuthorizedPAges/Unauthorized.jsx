import React from 'react';
import { Link } from 'react-router'; // fixed incorrect import
import { FaLock } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="text-red-500 text-5xl mb-4 flex justify-center">
          <FaLock />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You are not authorized to view this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;

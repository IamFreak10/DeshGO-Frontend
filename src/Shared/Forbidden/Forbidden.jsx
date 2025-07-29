import React from 'react';
import { motion } from 'framer-motion';
import { FaBan } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md text-center">
        <div className="flex justify-center mb-4 text-red-600 dark:text-red-400 text-6xl">
          <FaBan />
        </div>
        <h1 className="text-3xl font-bold mb-3">Access Forbidden</h1>
        <p className="text-lg mb-4">
          Your Firebase token has{' '}
          <span className="font-semibold text-red-600 dark:text-red-400">
            expired
          </span>{' '}
          or is{' '}
          <span className="font-semibold text-red-600 dark:text-red-400">
            missing
          </span>
          .
        </p>
        <p className="text-md mb-6">
          Please <span className="font-semibold">refresh</span> the page or{' '}
          <span className="font-semibold">log in</span> again to continue.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
          >
            Refresh
          </button>
          <Link
            to="/login"
            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/"
            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg transition duration-200"
          >
            Go Home and Continue
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Forbidden;

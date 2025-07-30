import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import useTheme from './theme'; // your custom hook to consume ThemeContext

const DarkModeBtn = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
      className="btn btn-sm btn-circle btn-ghost"
    >
      {darkMode ? <FaMoon className="h-6 w-6 text-yellow-400" /> : <FaSun className="h-6 w-6 text-yellow-400" />}
    </button>
  );
};

export default DarkModeBtn;


import { useEffect, useState } from 'react';

import { ThemeProvider } from './theme';
import DarkModeBtn from './DarkModeBtn';

function DarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const isDark = localStorage.getItem('darkMode');
    return isDark === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());

    const bodyEl = document.body;
    if (bodyEl) {
      if (darkMode) {
        bodyEl.classList.add('dark');
      } else {
        bodyEl.classList.remove('dark');
      }
    }
  }, [darkMode]);

  return (
    <ThemeProvider value={{ darkMode, toggleDarkMode }}>
      <div className=" opacity-80 hover:opacity-110      ">
        <DarkModeBtn/>
      </div>
    </ThemeProvider>
  );
}

export default DarkMode;

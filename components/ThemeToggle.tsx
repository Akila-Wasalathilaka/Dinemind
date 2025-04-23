import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Check system preference or localStorage
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <button 
      onClick={toggleDarkMode}
      className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors"
    >
      <span>Theme</span>
      <div className="bg-red-800 rounded-full p-1">
        {darkMode ? <FaMoon className="text-yellow-300" /> : <FaSun className="text-yellow-300" />}
      </div>
    </button>
  );
}
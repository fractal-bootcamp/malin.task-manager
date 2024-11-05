'use client'
import "./globals.css";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);

  // Handle theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <html lang="en">
      <body className="antialiased bg-slate-400 text-black dark:bg-gray-900 dark:text-white">
        <nav className="border-b px-4 py-3 dark:border-gray-700">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="font-bold text-xl">Task Manager</h1>
            <div className="flex gap-4">
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button className="px-4 py-2 rounded-md hover:bg-gray-100">
                Sign In
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Create
              </button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

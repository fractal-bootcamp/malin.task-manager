'use client'
import "./globals.css";
import { useState, useEffect } from "react";
import { useTaskStore } from "./store/TaskStore";
import { CreateNewTaskModal } from "@/components/ui/CreateNewTaskModal"
import { ChatWindow } from '@/components/ui/ChatWindow'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);

  const setCreateModalOpen = useTaskStore(state => state.setCreateModalOpen)

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
      <body className="antialiased">
        <nav className="border-b px-4 py-3 dark:border-gray-700 bg-lime-50">
          <div className="w-full flex items-center justify-between text-black dark:bg-gray-900 dark:text-white">
            <h1 className="font-mono text-3xl">Manage Them Tasks</h1>
            <div>
              <button
                className="px-4 py-2 bg-red-300 text-white rounded-md hover:bg-pink-600 border-4 border-red-400"
                onClick={() => setCreateModalOpen(true)}>
                Plan With AI
              </button>
            </div>
            <div className="flex gap-4 ">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setCreateModalOpen(true)}>
                Create Task
              </button>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </nav>
        {children}
        <div className="fixed bottom-4 right-4 max-w-[18rem] h-[87vh] bg-white rounded-lg shadow-lg">
          <ChatWindow />
        </div>
        <CreateNewTaskModal />
      </body>
    </html>
  );
}

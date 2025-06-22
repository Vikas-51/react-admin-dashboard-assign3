import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const SparkleWand = () => {
  const [sparkles, setSparkles] = useState([]);

  const generateSparkles = () => {
    const newSparkles = Array(15).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }));
    setSparkles(newSparkles);

    const timer = setTimeout(() => {
      setSparkles([]);
      setTimeout(generateSparkles, 200);
    }, 4000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    generateSparkles();
  }, []);

  return (
    <div className="sparkle-wand-container flex items-center justify-between mb-2 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
      <div className="flex items-center gap-1">
        <div className="sparkle-wand relative w-16 h-16 flex justify-center items-center">
          <div className="wand-core w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex justify-center items-center shadow-lg animate-pulse">
            <span className="material-icons text-2xl text-white">auto_awesome</span>
          </div>
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="sparkle absolute rounded-full"
              style={{
                width: "8px",
                height: "8px",
                background: "radial-gradient(circle, #fff, transparent 70%)",
                left: "50%",
                top: "50%",
                transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${sparkle.duration}s`,
                opacity: 0,
                filter: "drop-shadow(0 0 3px #fff)",
                animation: "float 4s infinite ease-in-out",
              }}
            />
          ))}
        </div>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sparkle</span>
      </div>
      <span className="material-icons text-gray-500 dark:text-gray-400">chevron_right</span>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: "dashboard" },
    { id: "tables", name: "Tables", icon: "table_chart" },
    { id: "charts", name: "Charts", icon: "insert_chart" },
    { id: "calendar", name: "Calendar", icon: "calendar_month" },
    { id: "kanban", name: "Kanban", icon: "view_kanban" },
    { id: "messaging", name: "Messaging", icon: "message" },
  ];

  return (
         <nav className="bg-gradient-to-r from-orange-400 to-red-400
 rounded-lg p-4 flex flex-col gap-1 shadow-lg text-gray-800 dark:text-gray-200">
      {/* Sparkle Wand Component with Name */}
      <SparkleWand />

      {navItems.map(({ id, name, icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition ${
            activeTab === id
              ? "bg-gradient-to-r from-purple-600 via-teal-500 to-blue-500 text-white shadow-lg"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-current={activeTab === id ? "page" : undefined}
          type="button"
        >
          <span className="material-icons">{icon}</span>
          <span>{name}</span>
        </button>
      ))}

      {/* Dark Mode Toggle Button */}
      <button
  onClick={toggleTheme}
  className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition hover:bg-gray-100 dark:hover:bg-gray-700"
  type="button"
>
  <span className="material-icons">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
</button>

    </nav>
  );
};

export default Sidebar;

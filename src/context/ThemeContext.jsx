import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; // Initialize with local storage value
  });

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || 'blue'; // Initialize with local storage value
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save to local storage
      return newTheme;
    });
  };

  const changeThemeColor = (color) => {
    setThemeColor(color);
    localStorage.setItem('themeColor', color); // Save to local storage
    document.documentElement.style.setProperty('--theme-color', color);
  };

  useEffect(() => {
  document.body.className = theme; // This applies the theme class to the body
  document.documentElement.style.setProperty('--theme-color', themeColor); 
}, [theme, themeColor]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColor, changeThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

import React from "react";


const Header = () => {
  return (
    <header className="h-15 flex items-center justify-between px-4 py-4 bg-gradient-to-r from-red-500 to-orange-300 text-white shadow-md">

     
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
         
          <img width="48" height="48" src="https://img.icons8.com/fluency/48/3d-builder.png" alt="3d-builder"/>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight select-none">Sparkle-Dashboard</h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Home button */}
        <button 
          className="p-2 rounded-md hover:bg-white-700 transition-colors"
          aria-label="Home"
          onClick={() => alert("Navigating to Home")} 
        >
          <img width="30" height="30" src="https://img.icons8.com/sf-ultralight/50/home-page.png" alt="home-page"/>
        </button>

        {/* About button */}
        <button 
          className="p-2 rounded-md hover:bg-white-700 transition-colors"
          aria-label="About"
          onClick={() => alert("Navigating to About")}
        >
          <img width="30" height="30" src="https://img.icons8.com/isometric-line/50/about.png" alt="about"/>
        </button>

        {/* Help button */}
        <button 
          className="p-2 rounded-md hover:bg-white-700 transition-colors"
          aria-label="Help"
          onClick={() => alert("Opening Help")} // Placeholder functionality
        >
          <img width="30" height="30" src="https://img.icons8.com/isometric-line/50/help.png" alt="help"/>
        </button>
      </div>
    </header>
  );
};

export default Header;

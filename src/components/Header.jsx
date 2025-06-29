import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const closeModal = () => {
    setModalContent(null);
    setConfirmAction(null);
  };

 const goToHome = () => {
    navigate("/");
    closeModal();
  }
const openModal = (type) => {
  if (type === "about") {
    setModalContent({
      title: "About Us",
      body: (
        <>
          <p className="mb-3">
            <strong>Sparkle-Dashboard</strong> is a powerful and responsive admin dashboard built with <strong>React</strong> and <strong>Tailwind CSS</strong>.
          </p>
          <ul className="list-disc list-inside mb-3">
            <li>📊 Real-time Analytics</li>
            <li>📅 Calendar & Scheduling</li>
            <li>💬 Messaging System</li>
            <li>🌙 Dark/Light Mode Support</li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400">Version: 1.2.0 | Last Updated: June 2025</p>
        </>
      ),
    });
  } else if (type === "help") {
    setModalContent({
      title: "Help & Support",
      body: (
        <>
          <p className="mb-3">If you're having trouble, try the following:</p>
          <ul className="list-disc list-inside mb-3">
            <li>📧 Email: <a href="mailto:support@sparkledashboard.com" className="text-blue-600 underline">support@sparkledashboard.com</a></li>
            <li>📚 Documentation: <a href="https://docs.sparkledashboard.com" target="_blank" className="text-blue-600 underline">docs.sparkledashboard.com</a></li>
            <li>⌨️ Keyboard Shortcuts: Press <kbd>?</kbd> anytime to view help.</li>
          </ul>
        </>
      ),
    });
  } else if (type === "home") {
    setModalContent({
      title: "Go to Home",
      body: (
        <>
          <p className="mb-3">You're about to navigate to the home dashboard.</p>
          <p className="mb-3">Here's a quick overview:</p>
          <ul className="list-disc list-inside mb-3">
            <li>🧭 Navigation Menu with quick access</li>
            <li>📊 Today's analytics snapshot</li>
            <li>📅 Your upcoming tasks & meetings</li>
          </ul>
          <p>Would you like to proceed?</p>
        </>
      ),
    });
    setConfirmAction(() => goToHome);
  }
};

  return (
    <>
      <header className="h-15 flex items-center justify-between px-4 py-4 bg-gradient-to-r from-blue-950 to-indigo-800 text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/3d-builder.png" alt="3d-builder" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight select-none text-white animate-pulse drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
            Sparkle-Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <button
            className="p-2 rounded-md  hover:bg-white/30 transition-colors"
            aria-label="Home"
            onClick={() => openModal("home")}
          >
            <img width="30" height="30" src="https://img.icons8.com/sf-ultralight/50/home-page.png" alt="home-page" />
          </button>

          <button
            className="p-2 rounded-md  hover:bg-white/30 transition-colors"
            aria-label="About"
            onClick={() => openModal("about")}
          >
            <img width="30" height="30" src="https://img.icons8.com/isometric-line/50/about.png" alt="about" />
          </button>

          <button
            className="p-2 rounded-md  hover:bg-white/30 transition-colors"
            aria-label="Help"
            onClick={() => openModal("help")}
          >
            <img width="30" height="30" src="https://img.icons8.com/isometric-line/50/help.png" alt="help" />
          </button>
        </div>
      </header>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_#141A2E,_#1A1230,_#000000)] flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-800 text-black dark:text-white w-1/2 h-1/2 p-6 rounded-lg shadow-lg relative overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-600"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
            <div className="mb-6">{modalContent.body}</div>

{confirmAction ? (
  <div className="flex justify-end space-x-4">
    <button
      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      onClick={closeModal}
    >
      Cancel
    </button>
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={confirmAction}
    >
      Go Home
    </button>
  </div>
) : (
  <div className="flex justify-end">
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={closeModal}
    >
      Close
    </button>
  </div>
)}

          </div>
        </div>
      )}
    </>
  );
};

export default Header;

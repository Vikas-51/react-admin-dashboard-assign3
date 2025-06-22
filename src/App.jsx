import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Tables from "./components/Tables";
import Charts from "./components/Charts";
import Calendar from "./components/Calendar";
import Kanban from "./components/Kanban";
import MessagingApp from "./components/Messaging/MessagingApp";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", phone: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", phone: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Sample system messages
  const systemMessages = [
    "👋System update completed successfully.",
    "👨🏼‍💻New user registered: John.",
    "🖨️Sales report generated for Q1.",
    "💼Server maintenance scheduled for tonight.",
    "⚫️New feature added: Dark mode.",
    "🧾User  feedback received: Great app!",
    "✅Data backup completed.",
    "💻New message from support team.",
    "📩New Mail Received.",
  ];

  // On app load, check if user data exists
  useEffect(() => {
    const storedUser  = localStorage.getItem("userProfile");
    if (storedUser ) {
      setUserProfile(JSON.parse(storedUser ));
      setIsLoggedIn(true);
    }
  }, []);

  // Generate notifications every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
      setNotifications((prev) => [...prev, randomMessage]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleSignup = () => {
    if (!signupData.name.trim() || !signupData.email.trim() || !signupData.phone.trim() || !signupData.password.trim()) {
      setErrorMessage("Please fill all fields.");
      return;
    }
    localStorage.setItem("userProfile", JSON.stringify(signupData));
    setShowSignup(false);
    setShowLogin(true);
    setSignupData({ name: "", email: "", phone: "", password: "" });
    setErrorMessage("");
  };

  const handleLogin = () => {
    const storedUser  = localStorage.getItem("userProfile");
    if (storedUser ) {
      const user = JSON.parse(storedUser );
      if (
        user.email === loginData.email &&
        user.phone === loginData.phone &&
        user.password === loginData.password
      ) {
        setUserProfile(user);
        setIsLoggedIn(true);
        setShowLogin(false);
        setLoginData({ email: "", phone: "", password: "" });
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid email, phone, or password.");
      }
    } else {
      setErrorMessage("No user found. Please sign up first.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    setUserProfile(null);
    setIsLoggedIn(false);
    setActiveTab("dashboard");
    setSearchTerm("");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  // Sample data with images for search
  const exampleData = [
    { title: "Dashboard Overview", img: "dashboard.png" },
    { title: "User Statistics", img: "UserStatistics.png" },
    { title: "Sales Data", img: "SalesData.png" },
    { title: "Recent Activities", img: "RecentActivities.png" },
    { title: "Charts and Graphs", img: "Charts&Graphs.png" },
    { title: "Calendar Events", img: "CalendarEvents.png" },
    { title: "Kanban Tasks", img: "KanbanTasks.png" },
    { title: "Messaging History", img: "MessagingHistory.png" },
  ];

  const filteredData = exampleData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Magical placeholder content when not logged in
  const magicalPlaceholder = (
    <div className="flex items-center justify-center h-full flex-col gap-6 p-10 text-center text-gray-400 dark:text-gray-600">
      <div className="text-6xl animate-pulse">✨</div>
      <p className="text-xl font-semibold">Please sign up or login to access this content.</p>
      <p>Enjoy seamless data insights, charts, calendar, kanban board, and messaging features.</p>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-[320px_1fr_280px] gap-4 h-screen p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="overflow-auto rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 flex flex-col">
          <header className="mb-4">
            {activeTab === "dashboard" && isLoggedIn && (
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full min-w-[50rem] p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Search"
                />
                <div className="mt-3 space-y-1">
                  <p className="text-2xl font-extrabold text-black-600 dark:text-teal-400">{getGreeting()}</p>
                  <p className="text-3xl font-extrabold text-red-600 dark:text-teal-400">Welcome to the Admin Dashboard</p>
                </div>
              </>
            )}
            {activeTab === "dashboard" && !isLoggedIn && (
              <p className="text-center text-red-600 dark:text-red-400 font-semibold">
                Please sign up or login to see the content.
              </p>
            )}
          </header>

          {isLoggedIn ? (
            <>
              {activeTab === "dashboard" ? (
                filteredData.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData.map((item, index) => (
                      <li key={index} className="flex flex-col items-center p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer bg-white dark:bg-gray-800">
                        <div className="w-full h-40 overflow-hidden rounded-t-lg">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" />
                        </div>
                        <span className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center mt-2 bg-white dark:bg-gray-800 p-2 rounded-b-lg shadow-md">
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No results found for "{searchTerm}"</p>
                )
              ) : activeTab === "tables" ? (
                <Tables />
              ) : activeTab === "charts" ? (
                <Charts />
              ) : activeTab === "calendar" ? (
                <Calendar />
              ) : activeTab === "kanban" ? (
                <Kanban />
              ) : activeTab === "messaging" ? (
                <MessagingApp />
              ) : null}
            </>
          ) : (
            magicalPlaceholder
          )}

        </main>

        <aside className="overflow-auto rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 hidden xl:flex flex-col">
          {isLoggedIn ? (
            <>
              <div className="flex items-center mb-4">
                <img src={userProfile?.image || "vi5.jpg"} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{userProfile?.name}</h2>
                  <p className="text-gray-600">{userProfile?.email}</p>
                  <p className="text-gray-600">{userProfile?.phone}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 bg-red-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-700"
              >
                Logout
              </button>

              {/* Notification Board */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                <ul className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-orange-100">
                  {notifications.map((notification, index) => (
                    <li key={index} className="text-gray-800 dark:text-gray-200 mb-1">
                      {notification}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-4 font-semibold text-red-600 dark:text-red-400">
                Please sign up or login to see your profile and settings.
              </p>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </aside>

        {/* Signup Modal */}
        {/* Signup Modal */}
{showSignup && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="absolute inset-0 flex">
    <div className="w-1/2 bg-white"></div>
    <div className="w-1/2 bg-red-600"></div>
  </div>
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-10 relative">
      <button
        onClick={() => setShowSignup(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <h2 className="text-3xl font-bold text-center text-red-600 mb-2">Create Account</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Join us and manage everything in one place.
      </p>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="👤 Name"
          value={signupData.name}
          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          placeholder="📧 Email"
          value={signupData.email}
          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          placeholder="📞 Phone"
          value={signupData.phone}
          onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={signupData.password}
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        />
      </div>
      {errorMessage && <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>}
      <button
        onClick={handleSignup}
        className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-lg font-semibold"
      >
        Sign Up
      </button>
      <p className="text-center text-sm mt-4 text-gray-500">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        >
          Log In
        </span>
      </p>
    </div>
  </div>
)}

{/* Login Modal */}
{showLogin && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="absolute inset-0 flex">
    <div className="w-1/2 bg-red-600"></div>
    <div className="w-1/2 bg-white"></div>
  </div>
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-10 relative">
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <h2 className="text-3xl font-bold text-center text-red-600 mb-2">Welcome Back</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Log in to continue to your dashboard.
      </p>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="📧 Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          placeholder="📞 Phone"
          value={loginData.phone}
          onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        />
      </div>
      {errorMessage && <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>}
      <button
        onClick={handleLogin}
        className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-lg font-semibold"
      >
        Log In
      </button>
      <p className="text-center text-sm mt-4 text-gray-500">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        >
          Sign Up
        </span>
      </p>
    </div>
  </div>
)}

      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <AppContent />
    </ThemeProvider>
  );
}
export { AppContent };

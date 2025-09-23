import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const hide =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-white text-zinc-900 dark:bg-black dark:text-gray-100 min-h-screen flex flex-col font-domine">
      {/* Header */}
      {!hide && (
        <div>
          <Header handleLogout={handleLogout} />
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow pt-10 pb-10 mx-auto w-full px-4">
        <Outlet />
      </main>

      {/* Footer */}
      {!hide && (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
}

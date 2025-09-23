import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="w-full bg-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          <img src="/tailor-mate-logo.png" alt="logo" className="h-20" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-10">
          <Link
            to="/"
            className="text-zinc-400 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/measure"
            className="text-zinc-400 hover:text-blue-600 font-medium"
          >
            Measurements
          </Link>
          <Link
            to="/about"
            className="text-zinc-400 hover:text-blue-600 font-medium"
          >
            About
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-3">
          <button
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-2xl transition"
            onClick={handleProfileClick}
          >
            Profile
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-2xl transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-zinc-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-4">
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-400 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/measure"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-400 hover:text-blue-600 font-medium"
            >
              Measurements
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-400 hover:text-blue-600 font-medium"
            >
              About
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <button
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-2xl transition"
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-2xl transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

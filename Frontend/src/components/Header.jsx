import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Habico
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/home"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

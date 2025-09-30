import { useAuth } from "../context/AuthContext";
import React from "react";
import HeroSection from "../components/HeroSection";
export default function UserHome() {
  const { logout } = useAuth();

  return (
    <>
  <HeroSetion />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, User 🙌</h1>
        <p className="text-gray-600 mb-6">Enjoy exploring your dashboard.</p>
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
    </>
  );
}

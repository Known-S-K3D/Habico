// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; // ✅ use your configured axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user and token from storage on startup
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login with token handling
  const login = async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      const { user, token } = response.data;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token); // ✅ Save token for auth requests

      return { ok: true, user };
    } catch (error) {
      return {
        ok: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ Register with token handling
  const register = async (userData) => {
    try {
      const response = await api.post("/register", userData);
      const { user, token } = response.data;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { ok: true, user };
    } catch (error) {
      return {
        ok: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // ✅ Logout and clear all storage
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      console.warn("Logout request failed:", e.message);
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

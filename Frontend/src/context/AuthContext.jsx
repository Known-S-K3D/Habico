import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔁 Load saved user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  // ✅ Email/password login
  const login = async (credentials) => {
    try {
      const res = await api.post("/login", credentials);
      const { user, token } = res.data;
      persistUser(user, token);
      return { ok: true, user };
    } catch (err) {
      return {
        ok: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ Register
  const register = async (data) => {
    try {
      const res = await api.post("/register", data);
      const { user, token } = res.data;
      persistUser(user, token);
      return { ok: true, user };
    } catch (err) {
      return {
        ok: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // ✅ Google Login
  const googleLogin = async (credential) => {
    try {
      const decoded = jwtDecode(credential);
      console.log("Google decoded:", decoded);

      // Optionally send token to Laravel for verification:
      // const res = await api.post("/auth/google/callback", { credential });
      // const { user, token } = res.data;

      const fakeUser = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        role: "user",
      };

      persistUser(fakeUser, credential); // using credential as token
      return { ok: true, user: fakeUser };
    } catch (err) {
      console.error("Google Login Error:", err);
      return { ok: false, error: "Google login failed" };
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await api.post("/logout");
    // eslint-disable-next-line no-empty
    } catch {}
    clearUser();
  };

  // Helpers
  const persistUser = (user, token) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

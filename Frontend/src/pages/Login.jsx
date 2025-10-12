import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/Login.css";

const Login = () => {
  const { login, googleLogin, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // 🔔 Detect logout success message (from navigation state)
  useEffect(() => {
    if (location.state?.message) {
      setFeedback(location.state.message);
      setTimeout(() => setFeedback(null), 2500);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // 🔐 Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);

    try {
      const res = await login({ email, password });
      setBusy(false);

      if (res.ok && res.user) {
        setUser(res.user);
        setFeedback("✅ Login successful!");
        setTimeout(() => {
          setFeedback(null);
          navigate("/", { replace: true });
        }, 1500);
      } else {
        setErr(res.error || "Login failed.");
      }
    } catch {
      setBusy(false);
      setErr("Something went wrong. Please try again.");
    }
  };

  // 🌐 Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await googleLogin(credentialResponse.credential);
      if (res.ok && res.user) {
        setUser(res.user);
        setFeedback("✅ Google login successful!");
        setTimeout(() => {
          setFeedback(null);
          navigate("/", { replace: true });
        }, 1500);
      } else {
        setErr(res.error || "Google login failed.");
      }
    } catch {
      setErr("Google login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back 👋</h2>
      <p className="login-subtitle">Sign in to continue your journey</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Email
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="login-label">
          Password
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {err && <div className="login-error">{err}</div>}

        <button type="submit" disabled={busy} className="login-btn">
          {busy ? "Logging in…" : "Login"}
        </button>
      </form>

      <div className="google-login-section">
        <p className="google-text">Or sign in with Google</p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setErr("Google login failed")}
        />
      </div>

      <p className="login-footer">
        Don’t have an account?{" "}
        <Link to="/register" className="login-link">
          Register here
        </Link>
      </p>

      {feedback && <div className="login-feedback">{feedback}</div>}
    </div>
  );
};

export default Login;

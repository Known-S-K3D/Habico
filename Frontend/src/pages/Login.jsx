import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);

    try {
      const res = await login({ email, password });
      setBusy(false);

      if (res.ok && res.user) {
        setUser(res.user);

        // Redirect based on role
        if (res.user.role === "admin") {
          navigate("/admin/home", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        setErr(res.error || "Login failed");
      }
    } catch (error) {
      setBusy(false);
      setErr("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: 16 }}>
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {err && <div className="mb-4 text-red-600">{err}</div>}

        <button
          type="submit"
          disabled={busy}
          className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          {busy ? "Logging in…" : "Login"}
        </button>

        <div className="mt-4 text-sm text-center">
          No account? <Link to="/register" className="text-blue-600 underline">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
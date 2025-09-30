import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);

    try {
      const res = await register({ name, email, password });
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
        setErr(res.error || "Registration failed");
      }
    } catch (error) {
      setBusy(false);
      setErr("Something went wrong. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: 16 }}>
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

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
            minLength={6}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {err && <div className="mb-4 text-red-600">{err}</div>}

        <button
          type="submit"
          disabled={busy}
          className="w-full py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
        >
          {busy ? "Creating account…" : "Register"}
        </button>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
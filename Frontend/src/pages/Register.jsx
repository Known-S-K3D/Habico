import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const { register, googleRegister, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setErr("You must agree to the Terms and Conditions.");
      return;
    }

    setErr(null);
    setBusy(true);

    try {
      const res = await register({ name, email, password });
      setBusy(false);

      if (res.ok && res.user) {
        setUser(res.user);
        navigate("/", { replace: true });
      } else {
        setErr(res.error || "Registration failed");
      }
    } catch (error) {
      setBusy(false);
      setErr("Something went wrong. Please try again.");
      console.error("Registration error:", error);
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const res = await googleRegister(credentialResponse.credential);
      if (res.ok && res.user) {
        setUser(res.user);
        navigate("/", { replace: true });
      } else {
        setErr(res.error || "Google registration failed");
      }
    } catch  {
      setErr("Google sign-in failed. Try again.");
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

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">
            I agree to the{" "}
            <Link to="/terms" className="text-blue-600 underline">
              Terms & Conditions
            </Link>
          </span>
        </label>

        {err && <div className="mb-4 text-red-600">{err}</div>}

        <button
          type="submit"
          disabled={busy}
          className="w-full py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
        >
          {busy ? "Creating account…" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2 text-sm">Or register with your Google account:</p>
        <GoogleLogin onSuccess={handleGoogleRegister} onError={() => setErr("Google login failed")} />
      </div>

      <div className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;

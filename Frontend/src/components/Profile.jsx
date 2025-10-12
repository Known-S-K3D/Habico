import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile as updateProfileAPI } from "../api/user";
import "../styles/global.css";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
      });
    } else {
      // Optional: auto-fetch if not available
      getProfile()
        .then((data) => setForm(data))
        .catch(() => setErr("Failed to load profile."));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    const res = await updateProfileAPI(form);
    if (res.ok) {
      setUser(res.user);
      setMsg("✅ Profile updated successfully!");
      setEditing(false);
    } else {
      setErr(res.error);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            style={{ background: "#f3f4f6" }}
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        {msg && <div className="profile-success">{msg}</div>}
        {err && <div className="profile-error">{err}</div>}

        <div className="profile-actions">
          {editing ? (
            <>
              <button type="submit" className="profile-btn save">
                Save Changes
              </button>
              <button
                type="button"
                className="profile-btn cancel"
                onClick={() => {
                  setEditing(false);
                  setMsg("");
                  setErr("");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="profile-btn edit"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;

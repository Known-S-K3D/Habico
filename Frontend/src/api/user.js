import api from "./axios";

// Get user profile
export const getProfile = async () => {
  try {
    const res = await api.get("/profile");
    return res.data;
  } catch (error) {
    console.error("❌ Failed to fetch profile:", error);
    throw error.response?.data || { message: "Failed to load profile" };
  }
};

// Update user profile (supports FormData for avatar/image updates)
export const updateProfile = async (profileData) => {
  try {
    const isFormData = profileData instanceof FormData;
    const res = await api.post("/profile?_method=PUT", profileData, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Failed to update profile:", error);
    throw error.response?.data || { message: "Failed to update profile" };
  }
};
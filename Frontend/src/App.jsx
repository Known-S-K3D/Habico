import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import FeaturedProduct from "./components/FeaturedProduct";
import DonationForm from "./components/DonationForm";
import Shop from "./components/Shop";
import Cart from "./pages/Cart";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Story from "./pages/Story";
import Terms from "./components/TermCondition";
import Profile from "./components/Profile";
import IkatStory from "./components/Story/IkatStory";
import InabelStory from "./components/Story/InabelStory";
import KalingaStory from "./components/Story/KalingaStory";

function RoleRoute({ children, role }) {
  const { user } = useAuth();
  if (!user || user.role !== role) {
    return (
      <h1 className="mt-10 text-center text-xl text-red-600">Access Denied</h1>
    );
  }
  return children;
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturedProduct />
                <DonationForm />
                <Footer />
              </>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<Story />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/story/ikat" element={<IkatStory />} />
          <Route path="/story/inabel" element={<InabelStory />} />
          <Route path="/story/kalinga" element={<KalingaStory />} />

          {/* Protected routes */}
          <Route
            path="/user/home"
            element={
              <RoleRoute role="user">
                <UserHome />
                <DonationForm />
                <Profile />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/home"
            element={
              <RoleRoute role="admin">
                <AdminHome />
              </RoleRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

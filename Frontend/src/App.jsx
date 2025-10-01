import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Landing from './pages/Landing';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './components/Shop';
import HeroSection from "./components/HeroSection";
import FeaturedProduct from "./components/FeaturedProduct";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import DonationForm from './components/DonationForm';
import Profile from "./components/Profile"
import Story from './pages/Story';
import { useAuth } from './context/AuthContext';

function RoleRoute({ children, role }) {
  const { user } = useAuth();
  if (!user || user.role !== role) {
    return <h1 className="mt-10 text-center">Access Denied</h1>;
  }
  return children;
}

export default function App() {
  return (
    <>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/story" element={<Story />} />
        <Route path="/cart" element={<Cart />} /> {/* <-- Add this line for Cart page */}

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
    </>
  );
}
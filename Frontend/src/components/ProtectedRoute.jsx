import { Navigate } from "react-router-dom";
import { useAuth } from "@/context"; // or "../context/AuthContext" if no alias

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <div className="mt-10 text-center text-xl text-red-600">
        Access Denied: You do not have permission to view this page.
      </div>
    );
  }

  return children;
}

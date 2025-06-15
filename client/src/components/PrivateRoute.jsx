import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    console.log("user", user);
    if (loading) return null; // or a spinner

    return user ? children : <Navigate to="/login" />;
}

// components/Navbar.jsx
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link
                        to="/"
                        className="text-lg font-semibold hover:underline"
                    >
                        Home
                    </Link>
                    {user && (
                        <Link to="/create" className="hover:underline">
                            New Post
                        </Link>
                    )}
                </div>
                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <span className="text-sm hidden sm:inline">
                                Welcome,{" "}
                                <span className="font-medium">
                                    {user.username}
                                </span>
                            </span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

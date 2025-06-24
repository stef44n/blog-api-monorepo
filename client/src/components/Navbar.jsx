import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left: Logo/Home + Hamburger */}
                <div className="flex items-center justify-between w-full sm:w-auto">
                    <Link
                        to="/"
                        className="text-lg font-semibold hover:underline"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="sm:hidden text-white"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Nav */}
                <div className="hidden sm:flex sm:items-center sm:gap-4">
                    {user && (
                        <>
                            <Link to="/create" className="hover:underline">
                                New Post
                            </Link>
                            {!user.isAdmin && (
                                <Link
                                    to="/become-admin"
                                    className="hover:underline"
                                >
                                    Become Admin
                                </Link>
                            )}
                        </>
                    )}
                    {!user && (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                    {user && (
                        <>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="hidden sm:inline">
                                    Welcome,
                                </span>
                                <span className="font-medium">
                                    {user.username}
                                </span>
                                {user.isAdmin && (
                                    <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-md font-semibold">
                                        Admin
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="sm:hidden px-4 pb-4">
                    <div className="flex flex-col gap-3 mt-2 border-t border-gray-700 pt-3">
                        {user && (
                            <>
                                <Link
                                    to="/create"
                                    onClick={closeMenu}
                                    className="hover:underline"
                                >
                                    New Post
                                </Link>
                                {!user.isAdmin && (
                                    <Link
                                        to="/become-admin"
                                        onClick={closeMenu}
                                        className="hover:underline"
                                    >
                                        Become Admin
                                    </Link>
                                )}
                            </>
                        )}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="hover:underline"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="hover:underline"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        {user && (
                            <>
                                <div className="flex items-center gap-2 text-sm">
                                    <span>Welcome,</span>
                                    <span className="font-medium">
                                        {user.username}
                                    </span>
                                    {user.isAdmin && (
                                        <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-md font-semibold">
                                            Admin
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

// components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginAPI(form.username, form.password);
        if (res.error) {
            setError(res.error);
        } else {
            login(res.token);
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
            />
            <br />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}

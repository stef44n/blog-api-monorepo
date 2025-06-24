// src/pages/BecomeAdmin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { becomeAdmin } from "../api";

export default function BecomeAdmin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { token, updateUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await becomeAdmin(password, token);
            updateUser(updatedUser); // refresh local user data
            navigate("/");
        } catch (err) {
            setError("Incorrect admin password.");
            console.log("error", err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-xl font-semibold mb-4">Become an Admin</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-3 py-2 border rounded"
                    required
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

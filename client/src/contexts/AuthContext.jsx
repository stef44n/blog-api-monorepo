import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const payload = jwtDecode(token);
                setUser({
                    id: payload.id,
                    username: payload.username,
                    isAdmin: payload.isAdmin,
                });
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.removeItem("token");
                setUser(null);
                setToken("");
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    };

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, loading, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

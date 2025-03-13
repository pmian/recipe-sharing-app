import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

// Helper to get initial user from token
const getInitialUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return { id: decoded.id, name: decoded.name, email: decoded.email || "unknown" };
        } catch (err) {
            console.error("Invalid token on load:", err);
            localStorage.removeItem("token");
            return null;
        }
    }
    return null;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialUser); // Set initial user
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            try {
                const decoded = jwtDecode(token);
                setUser({ id: decoded.id, name: decoded.name, email: decoded.email || "unknown" });
            } catch (err) {
                console.error("Invalid token:", err);
                setToken(null);
                setUser(null);
            }
        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error("Login failed");
            const data = await res.json();
            setToken(data.token);
        } catch (err) {
            throw err;
        }
    };

    const register = async (email, password, name) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });
            if (!res.ok) throw new Error("Registration failed");
            const data = await res.json();
            setToken(data.token);
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch recipes");
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };
        if (token) fetchRecipes();
    }, [token]);

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    if (!context) throw new Error("useRecipeContext must be used within a RecipeProvider");
    return context;
};
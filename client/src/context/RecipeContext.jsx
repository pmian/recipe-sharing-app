import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const { token } = useAuth();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch(`${API_URL}/api/recipes`, {
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

    // Function to delete a recipe
    const deleteRecipe = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/recipes/${id}/delete`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete recipe");
            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
        } catch (err) {
            console.error("Error deleting recipe:", err);
        }
    };

    // Function to edit a recipe
    const editRecipe = async (id, updatedRecipe) => {
        try {
            const res = await fetch(`${API_URL}/api/recipes/${id}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedRecipe),
            });
            if (!res.ok) throw new Error("Failed to update recipe");
            const updatedData = await res.json();
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) => (recipe._id === id ? updatedData : recipe))
            );
        } catch (err) {
            console.error("Error updating recipe:", err);
        }
    };

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes, deleteRecipe, editRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    if (!context) throw new Error("useRecipeContext must be used within a RecipeProvider");
    return context;
};

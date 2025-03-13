import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";

const RecipeForm = () => {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const { setRecipes } = useRecipeContext();
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = { title, ingredients: ingredients.split("\n"), instructions };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newRecipe),
            });
            if (!res.ok) throw new Error("Failed to add recipe");
            const data = await res.json();
            setRecipes((prev) => [...prev, data]);
            setTitle("");
            setIngredients("");
            setInstructions("");
        } catch (err) {
            console.error("Frontend error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Add a Recipe</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Ingredients (one per line)</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Instructions</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Add Recipe
            </button>
        </form>
    );
};

export default RecipeForm;
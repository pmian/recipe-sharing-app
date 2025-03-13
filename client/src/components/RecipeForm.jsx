import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

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
        <motion.form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.h2
                className="text-3xl font-bold text-center text-gray-800 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Add a New Recipe
            </motion.h2>

            <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter recipe title"
                    required
                />
            </div>

            <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                    Ingredients (one per line)
                </label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="4"
                    placeholder="List ingredients, one per line"
                    required
                />
            </div>

            <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                    Instructions
                </label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows="4"
                    placeholder="Provide step-by-step instructions"
                    required
                />
            </div>

            <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Add Recipe
            </motion.button>
        </motion.form>
    );
};

export default RecipeForm;

import { useRecipeContext } from "../context/RecipeContext";
import { motion } from "framer-motion";
import { useState } from "react";

const RecipeList = () => {
    const { recipes, editRecipe, deleteRecipe } = useRecipeContext();
    const [editMode, setEditMode] = useState(null);
    const [updatedRecipe, setUpdatedRecipe] = useState({ title: "", ingredients: "", instructions: "" });

    const handleEditClick = (recipe) => {
        setEditMode(recipe._id);
        setUpdatedRecipe({ title: recipe.title, ingredients: recipe.ingredients.join(", "), instructions: recipe.instructions });
    };

    const handleSaveEdit = (recipeId) => {
        editRecipe(recipeId, {
            title: updatedRecipe.title,
            ingredients: updatedRecipe.ingredients.split(",").map((ing) => ing.trim()),
            instructions: updatedRecipe.instructions,
        });
        setEditMode(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <motion.h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
                Recipes List
            </motion.h1>

            {recipes.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No recipes yet. Add one!</p>
            ) : (
                <div className="max-w-5xl mx-auto grid gap-6">
                    {recipes.map((recipe) => (
                        <motion.div
                            key={recipe._id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                        >
                            {editMode === recipe._id ? (
                                <div>
                                    <input
                                        className="w-full border p-2 mb-2"
                                        value={updatedRecipe.title}
                                        onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })}
                                    />
                                    <input
                                        className="w-full border p-2 mb-2"
                                        value={updatedRecipe.ingredients}
                                        onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })}
                                    />
                                    <textarea
                                        className="w-full border p-2"
                                        value={updatedRecipe.instructions}
                                        onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, instructions: e.target.value })}
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleSaveEdit(recipe._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditMode(null)}
                                            className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-3 py-1 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-900">{recipe.title}</h3>
                                    <p className="text-gray-600 text-sm"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                                    <p className="text-gray-600 text-sm mt-2"><strong>Instructions:</strong> {recipe.instructions}</p>

                                    {/* Edit & Delete Buttons */}
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => handleEditClick(recipe)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteRecipe(recipe._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion"; // Animation Library

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [commentText, setCommentText] = useState({});
    const { token } = useAuth();

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/all-recipes`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch recipes");
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching all recipes:", err);
            }
        };
        fetchAllRecipes();
    }, [token]);

    const handleLike = async (recipeId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}/like`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to like recipe");
            const updatedRecipe = await res.json();
            setRecipes((prev) =>
                prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
            );
        } catch (err) {
            console.error("Error liking recipe:", err);
        }
    };

    const handleComment = async (recipeId) => {
        try {
            const text = commentText[recipeId] || "";
            if (!text) return;

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text }),
            });
            if (!res.ok) throw new Error("Failed to add comment");
            const updatedRecipe = await res.json();
            setRecipes((prev) =>
                prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
            );
            setCommentText((prev) => ({ ...prev, [recipeId]: "" }));
        } catch (err) {
            console.error("Error commenting on recipe:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <motion.h1
                className="text-4xl font-extrabold text-center mb-8 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                All Recipes
            </motion.h1>

            {recipes.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No recipes yet.</p>
            ) : (
                <div className="max-w-5xl mx-auto grid gap-6">
                    {recipes.map((recipe, index) => (
                        <motion.div
                            key={recipe._id}
                            className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-[1.02] border border-gray-200"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                            <p className="text-gray-500 mb-2">
                                Posted by: {recipe.userId ? recipe.userId.name : "Unknown User"}
                            </p>

                            <h4 className="font-semibold text-lg text-gray-800">Ingredients:</h4>
                            <ul className="list-disc pl-5 mb-3 text-gray-700">
                                {recipe.ingredients.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>

                            <h4 className="font-semibold text-lg text-gray-800">Instructions:</h4>
                            <p className="mb-4 text-gray-700">{recipe.instructions}</p>

                            <div className="flex items-center space-x-4 mb-4">
                                <motion.button
                                    onClick={() => handleLike(recipe._id)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-4 py-2 rounded-full font-semibold transition ${recipe.likes.includes(token ? jwtDecode(token).id : "")
                                            ? "bg-red-500 text-white hover:bg-red-600"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                >
                                    {recipe.likes.includes(token ? jwtDecode(token).id : "") ? "Unlike" : "Like"} (
                                    {recipe.likes.length})
                                </motion.button>
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg text-gray-800 mb-2">Comments:</h4>
                                {recipe.comments.length === 0 ? (
                                    <p className="text-gray-500">No comments yet.</p>
                                ) : (
                                    <motion.ul
                                        className="space-y-3 bg-gray-50 p-3 rounded-lg shadow-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {recipe.comments.map((comment, idx) => (
                                            <li key={idx} className="border-b pb-2">
                                                <p className="text-gray-700">{comment.text}</p>
                                                <p className="text-sm text-gray-500">
                                                    By {comment.userId?.name || "Unknown"} -{" "}
                                                    {new Date(comment.createdAt).toLocaleString()}
                                                </p>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}

                                <div className="mt-4">
                                    <textarea
                                        value={commentText[recipe._id] || ""}
                                        onChange={(e) =>
                                            setCommentText((prev) => ({ ...prev, [recipe._id]: e.target.value }))
                                        }
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                                        placeholder="Add a comment..."
                                    />
                                    <motion.button
                                        onClick={() => handleComment(recipe._id)}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Comment
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllRecipes;

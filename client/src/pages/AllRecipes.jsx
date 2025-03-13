import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

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
                console.log("Fetched recipes:", data); // Debug log
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
            <h1 className="text-4xl font-bold text-center mb-8">All Recipes</h1>
            {recipes.length === 0 ? (
                <p className="text-gray-500 text-center">No recipes yet.</p>
            ) : (
                <div className="max-w-4xl mx-auto grid gap-6">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                            <p className="text-gray-600 mb-2">
                                Posted by: {recipe.userId ? recipe.userId.name : "Unknown User"}
                            </p>
                            <h4 className="font-semibold">Ingredients:</h4>
                            <ul className="list-disc pl-5 mb-2">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <h4 className="font-semibold">Instructions:</h4>
                            <p className="mb-4">{recipe.instructions}</p>
                            <div className="flex items-center space-x-4 mb-4">
                                <button
                                    onClick={() => handleLike(recipe._id)}
                                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                >
                                    {recipe.likes.includes(token ? jwtDecode(token).id : "") ? "Unlike" : "Like"} (
                                    {recipe.likes.length})
                                </button>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Comments:</h4>
                                {recipe.comments.length === 0 ? (
                                    <p className="text-gray-500">No comments yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {recipe.comments.map((comment, index) => (
                                            <li key={index} className="border-t pt-2">
                                                <p>{comment.text}</p>
                                                <p className="text-sm text-gray-500">
                                                    By {comment.userId && comment.userId.name ? comment.userId.name : "Unknown"} -{" "}
                                                    {new Date(comment.createdAt).toLocaleString()}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="mt-4">
                                    <textarea
                                        value={commentText[recipe._id] || ""}
                                        onChange={(e) =>
                                            setCommentText((prev) => ({ ...prev, [recipe._id]: e.target.value }))
                                        }
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder="Add a comment..."
                                    />
                                    <button
                                        onClick={() => handleComment(recipe._id)}
                                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllRecipes;
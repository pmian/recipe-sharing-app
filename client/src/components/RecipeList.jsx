import { useRecipeContext } from "../context/RecipeContext";
import { motion } from "framer-motion";

const RecipeList = () => {
    const { recipes } = useRecipeContext();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <motion.h1
                className="text-4xl font-extrabold text-center mb-8 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Recipes List
            </motion.h1>

            {recipes.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">
                    No recipes yet. Add one!
                </p>
            ) : (
                <div className="max-w-5xl mx-auto grid gap-6">
                    {recipes.map((recipe, index) => (
                        <motion.div
                            key={recipe._id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {recipe.title}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Ingredients:
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        {recipe.ingredients.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Instructions:
                                    </h4>
                                    <p className="text-gray-600 whitespace-pre-line">
                                        {recipe.instructions}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;

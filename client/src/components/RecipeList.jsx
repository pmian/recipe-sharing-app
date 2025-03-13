import { useRecipeContext } from "../context/RecipeContext";

const RecipeList = () => {
    const { recipes } = useRecipeContext();

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Recipes</h2>
            {recipes.length === 0 ? (
                <p className="text-gray-500">No recipes yet. Add one!</p>
            ) : (
                <div className="grid gap-6">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                            <h4 className="font-semibold">Ingredients:</h4>
                            <ul className="list-disc pl-5 mb-2">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <h4 className="font-semibold">Instructions:</h4>
                            <p>{recipe.instructions}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;
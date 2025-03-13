import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="bg-blue-500 text-white py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Recipe App</h1>
                    <p className="text-xl mb-6">
                        {user ? `Welcome back, ${user.name}!` : "Share your favorite recipes with the world or discover new ones from others!"}
                    </p>
                    {!user ? (
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-yellow-400 text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link
                                to="/recipes"
                                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600"
                            >
                                Go to Your Recipes
                            </Link>
                            <Link
                                to="/all-recipes"
                                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600"
                            >
                                See All Recipes
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-8">Why Join Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Share Recipes</h3>
                            <p>Post your culinary creations for others to enjoy.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Discover New Dishes</h3>
                            <p>Explore a growing collection of recipes.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Connect</h3>
                            <p>Join a community of food lovers like you!</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
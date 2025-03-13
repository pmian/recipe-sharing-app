import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl font-bold mb-4">Welcome to Recipe App</h1>
                    <p className="text-xl mb-6">
                        {user ? `Welcome back, ${user.name}!` : "Share your favorite recipes with the world or discover new ones from others!"}
                    </p>
                    {!user ? (
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all shadow-md"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-yellow-400 text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all shadow-md"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link
                                to="/recipes"
                                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-all shadow-md"
                            >
                                Go to Your Recipes
                            </Link>
                            <Link
                                to="/all-recipes"
                                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all shadow-md"
                            >
                                See All Recipes
                            </Link>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <h2 className="text-3xl font-semibold mb-8">Why Join Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-xl font-bold mb-2">Share Recipes</h3>
                            <p>Post your culinary creations for others to enjoy.</p>
                        </motion.div>
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-xl font-bold mb-2">Discover New Dishes</h3>
                            <p>Explore a growing collection of recipes.</p>
                        </motion.div>
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-xl font-bold mb-2">Connect</h3>
                            <p>Join a community of food lovers like you!</p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;

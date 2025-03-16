import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <motion.nav
            className="bg-blue-600/90 backdrop-blur-md p-4 text-white shadow-lg sticky top-0 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight hover:text-yellow-300 transition-colors"
                >
                    Recipe Sharing App
                </Link>

                {/* Navigation Links */}
                <div className="space-x-6 flex items-center">
                    <Link to="/" className="hover:text-yellow-300 transition-colors">
                        Home
                    </Link>
                    {user ? (
                        <>
                            <Link to="/recipes" className="hover:text-yellow-300 transition-colors">
                                My Recipes
                            </Link>
                            <Link to="/all-recipes" className="hover:text-yellow-300 transition-colors">
                                All Recipes
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition-all shadow-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition-all shadow-md"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-yellow-400 text-blue-700 px-4 py-1 rounded-full font-semibold hover:bg-yellow-500 transition-all shadow-md"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

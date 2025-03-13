import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight hover:text-yellow-300 transition-colors">
                    Recipe App
                </Link>
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
                                className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-yellow-400 text-blue-600 px-4 py-1 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
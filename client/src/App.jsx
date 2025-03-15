import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // New import
import Home from "./pages/Home";
import AllRecipes from "./pages/AllRecipes";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import Login from "./components/Login";
import Register from "./components/Register";
import { RecipeProvider } from "./context/RecipeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { motion } from "framer-motion";

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <div className="flex flex-col min-h-screen"> {/* Flex container */}
            <Navbar />
            <main className="flex-grow"> {/* Main content grows to push footer down */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<PrivateRoute><RecipePage /></PrivateRoute>} />
                <Route path="/all-recipes" element={<PrivateRoute><AllRecipes /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer /> {/* Footer at bottom */}
          </div>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
}

function RecipePage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-10 px-6 sm:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <motion.h1
          className="text-4xl font-bold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Your Recipes
        </motion.h1>

        {/* Form Section */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <RecipeForm />
        </motion.div>

        {/* Recipe List Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <RecipeList />
        </motion.div>
      </div>
    </motion.div>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default App;
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Your Recipes</h1>
      <RecipeForm />
      <RecipeList />
    </div>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  console.log("PrivateRoute - User on render:", user);
  return user ? children : <Navigate to="/login" />;
}

export default App;
import express from "express";
import Recipe from "../models/Recipe.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get User's Recipes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Recipe
router.post("/", authMiddleware, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      userId: req.user.id,
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Recipes
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("userId", "name email")
      .populate("comments.userId", "name");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a Recipe
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    const userId = req.user.id;
    if (recipe.likes.includes(userId)) {
      recipe.likes = recipe.likes.filter((id) => id.toString() !== userId);
    } else {
      recipe.likes.push(userId);
    }
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment on a Recipe
router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text is required" });

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    recipe.comments.push({ userId: req.user.id, text });
    await recipe.save();

    const populatedRecipe = await Recipe.findById(req.params.id).populate("comments.userId", "name");
    res.json(populatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit Recipe (PUT /api/recipes/:id/edit)
router.put("/:id/edit", authMiddleware, async (req, res) => {
  try {
      const { title, ingredients, instructions } = req.body;
      const updatedRecipe = await Recipe.findByIdAndUpdate(
          req.params.id,
          { title, ingredients, instructions },
          { new: true }
      );
      if (!updatedRecipe) return res.status(404).json({ error: "Recipe not found" });

      res.json(updatedRecipe);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Delete Recipe (DELETE /api/recipes/:id/delete)
router.delete("/:id/delete", authMiddleware, async (req, res) => {
  try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) return res.status(404).json({ error: "Recipe not found" });

      res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

export default router;

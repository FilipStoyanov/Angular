const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user.controller.js");
const RecipeController = require("../controllers/recipe.controller.js");

router.get('/users', UsersController);
router.get('/users/:id', UsersController);
router.post('/users', UsersController);
router.put('/users/:id', UsersController);
router.delete('/users/:id', UsersController);

router.get('/users/:userId/recipes', RecipeController)
router.get('/users/:userId/recipes/:recipeId', RecipeController)
router.post('/users/:userId/recipes', RecipeController);
router.put('/users/:userId/recipes/:recipeId', RecipeController);
router.delete('/users/:userId/recipes/:recipeId', RecipeController);

module.exports = router;

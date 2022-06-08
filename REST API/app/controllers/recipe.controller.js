const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.model.js");
const indicative = require('indicative');

router.param('recipeId', function(req,res,next, recipeId){
  const modified = recipeId;
  req.recipeId = modified;
  next();
})

router.param('userId', function(req,res,next, userId){
    const modified = userId;
    req.userId = modified;
    next();
  })


router.get('/Users/:userId/Recipes', async (req,res) => {
  try{
    const recipes = await Recipe.find({userId: req.params.userId});
    res.status(201).json(recipes);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})
router.get('/Users/:userId/Recipes/:recipeId', async (req,res) => {
  try{
      let recipe = await Recipe.findById(req.params.recipeId);
      res.status(201).json(recipe);
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

router.post('/Users/:userId/Recipes', async (req,res) => {
  const recipe = new Recipe ({
     name: req.body.name,
     description: req.body.description,
     timeExecuted: req.body.timeExecuted,
     userProducts: req.body.userProducts,
     image: req.body.image,
     longDescription: req.body.description,
     tags: req.body.tags,
  });
  recipe.userId = req.params.userId;
  try{
      await indicative.validator.validate(recipe, {
        name: 'required|string|max:80',
        description: 'required|string|max:256',
        longDescription: 'required|string|max:2048'
      })
      const newRecipe = await recipe.save();
      res.status(201).location(`/api/users/${req.params.userId}/recipes/${newRecipe._id}`).json(newRecipe);
  }catch(err){
    res.status(400).json({message: err.message, msg: 'Recipe is not saved to the database'});
  }
})
router.put('/Users/:userId/Recipes/:recipeId', async (req,res) => {
  try{
    const newRecipe = req.body;
    newRecipe.modificationDate = Date.now();
    await indicative.validator.validate(newRecipe, {
      name: 'required|string|max:80',
      description: 'required|string|max:256',
      longDescription: 'required|string|max:2048' 
    })
    newRecipe.userId = req.params.userId;
    await Recipe.updateOne({_id: req.params.recipeId}, newRecipe);
    res.status(201);
  }catch(error){
    res.status(500).json({message: error.message});
  }
})


router.delete('/Users/:userId/Recipes/:recipeId', async (req,res) => {
  try{
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.status(200).json();
  }catch(err){
    res.status(400).json({message: err.message});
  }
});



module.exports = router;

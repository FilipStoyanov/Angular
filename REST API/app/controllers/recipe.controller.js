const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.model.js");

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
    const recipes = await Recipe.find();
    res.status(201).json(recipes);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})
router.get('/Users/:userId/Recipes/:recipeId', async (req,res) => {
  try{
      let recipe = await Recipe.findById(req.params.recipeId);
      res.status(201).json(recipe);
      // res.send(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

router.post('/Users/:userId/Recipes', async (req,res) => {
  const recipe = new Recipe ({
     userId: req.body.userId,
     name: req.body.name,
     description: req.body.description,
     timeExecuted: req.body.timeExecuted,
     userProducts: req.body.userProducts,
     image: req.body.image,
     longDescription: req.body.description,
     tags: req.body.tags,
  });
  try{
      const newRecipe = await recipe.save();
      res.send({Headers: recipe._id});
      res.status(201).location(`/api/users/${newRecipe._id}`).json(newRecipe);
  }catch(err){
    res.status(400).json({message: err.message, msg: 'User is not saved to the database'});
  }
})
router.put('/Users/:userId/Recipes/:recipeId', async (req,res) => {
  try{
    const updateRecipe = await Recipe.findOne({_id: req.params.recipeId});
    await Recipe.updateOne({_id: req.params.recipeId}, {modificationDate: Date.now()});
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

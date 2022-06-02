const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
   userId: {
       required: true,
       type: mongoose.Schema.ObjectId,
   },
   name: {
       required: true,
       maxLength: 80,
       type: String,
   },
   description: {
       required: false,
       maxLength:256,
       type: String,
   },
   timeExecuted: {
       required: false,
       type: Number,
   },
   userProducts: {
       required: true,
       type: Array,
   },
   image: {
       required: true,
       type: String,
   },
   longDescription: {
       required: false,
       type: String,
       maxLength: 2048,
   },
   tags: {
       required: false,
       type: Array,
   },
   createdDate: {
       required: true,
       type: Date,
       default: Date.now,
   },
   modificationDate: {
       required: true,
       type: Date,
       default: Date.now,
   },
});

module.exports = mongoose.model('Recipe', recipeSchema, "Recipes");
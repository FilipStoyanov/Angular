const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   name: {
       required: false,
       type: String,
   },
   username: {
       required: false,
       maxLength: 15,
       type: String,
   },
   password: {
       required: false,
       minlength: 8,
       type: String,
   },
   sex: {
       required: false,
       type: String,
       enum: ['M', 'F'],
   },
   role: {
       required: true,
       type: String,
       enum: ['user', 'admin'],
   },
   image: {
       required: true,
       type: String,
   },
   description: {
       required: false,
       type: String,
       maxLength: 512,
   },
   status: {
       required: false,
       type: String,
       enum: ['active', 'suspended', 'deactivated'],
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
   }
});

module.exports = mongoose.model('User', userSchema, "Users");
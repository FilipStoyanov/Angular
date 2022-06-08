const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const indicative = require('indicative');

router.param('id', function(req,res,next, id){
  const modified = id;
  req.id = modified;
  next();
})

router.get('/Users', async (req,res) => {
  try{
    const users = await User.find();
    res.status(201).json(users);
    //res.send({data: users});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})
router.get('/Users/:id', async (req,res) => {
  try{
      let user = await User.findById(req.params.id);
      res.status(201).json(user);
      // res.send(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

router.post('/Users', async (req,res) => {
  const user = new User ({
     name: req.body.name,
     username: req.body.username,
     password: req.body.password,
     sex: req.body.sex,
     role: req.body.role,
     image: req.body.image,
     description: req.body.description,
     status: req.body.status,
  });
  try{
    await indicative.validator.validate(user, {
      username: 'required|string|max:15',
      password: 'required|min:8',
      description: 'required|string|max:512',
      role: 'in:user,admin',
      status: 'in:active,suspended,deactivated'
    });
    const validPassword = (/^(?=.{8,}$)(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/).test(user.password);
    if(validPassword){
      const newUser = await user.save()
      res.status(201).location(`/api/users/${newUser._id}`).json(newUser);
    }else{
      res.status(400).json({message: 'Invalid user password. User is not saved to the database.'});
    }
  }catch(err){
    res.status(400).json({message: err.message, msg: 'Invalid user. User is not saved to the database.'});
  }
})
router.put('/Users/:id', async (req,res) => {
  const newUser = req.body;
  newUser.modificationDate = Date.now();
  try{
    await indicative.validator.validate(newUser, {
      username: 'required|string|max:15',
      password: 'required|min:8',
      description: 'required|string|max:512',
      role: 'in:user,admin',
      status: 'in:active,suspended,deactivated'
    });
    const validPassword = (/^(?=.{8,}$)(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/).test(newUser.password);
    if(validPassword) {   
      await User.updateOne({_id: req.params.id}, newUser);
      res.status(201);
    }else{
      res.status(400).json({message: 'Invalid user password. User is not saved to the database.'});
    }
  }catch(error){
    res.status(500).json({message: error.message, msg: "Invalid user data"});
  }
})


router.delete('/Users/:id', async (req,res) => {
  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json();
  }catch(err){
    res.status(400).json({message: err.message});
  }
});



module.exports = router;

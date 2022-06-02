const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");

router.param('email', function(req, res, next, email) {
    const modified = email;
    req.email = modified;
    next();
});
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
      const newUser = await user.save()
      res.status(201).location(`/api/users/${newUser._id}`).json(newUser);
  }catch(err){
    res.status(400).json({message: err.message, msg: 'User is not saved to the database'});
  }
})
router.put('/Users/:id', async (req,res) => {
  try{
    const updateUser = await User.findOne({_id: req.params.id});
    await User.updateOne({_id: req.params.id}, {modificationDate: Date.now()});
    res.status(201);
  }catch(error){
    res.status(500).json({message: error.message});
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

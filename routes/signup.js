const express = require('express');
const bycrypt = require('bcryptjs')
const User = require('../models/users')
const router = express.Router();

router.get("/" , (req,res)=>{
  res.render("signup")
})

router.post("/",async (req,res)=>{
  try{

  const username = req.body.username;
  let password = req.body.password;

  const userFound = await User.findOne({username : username})
  if(userFound){
    res.json({message : "Username Taken"})
    return;
  }
  const salt = await bycrypt.genSalt(10);
  password = await bycrypt.hash(password,salt);
  const user = new User({
    username : username,
    password : password,
    given : [],
    received : [],
    pendingApproval : [],
    requestApproval : []
  })
  user.save();
  res.redirect("/login")
}
catch(e){
  res.send(e.message);
}
})



module.exports = router

const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/users")
const upload = require("./handlers/multer.js");
const cookie = require('cookie-parser');
const bycrypt = require('bcryptjs');
const app = express();

mongoose.connect("mongodb+srv://Nishant:nishant1234@cluster0.m0yjk.mongodb.net/bookShare?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true, useFindAndModify : false})
app.set('view engine', 'ejs')
app.use(cookie());
app.use(express.urlencoded({limit:'5mb',extended: false}));
app.use(express.static("public"));
app.use("/", require("./routes/login"))
app.use("/dashboard",require("./routes/dashboard"));
app.use("/addBook",require("./routes/addBook"));
app.use("/logout",require("./routes/logout"));
app.use("/home",require("./routes/home"));
app.use("/hold",require("./routes/hold"));
app.use("/dashboardR",require("./routes/dashboardR"));
app.use("/dashboardG",require("./routes/dashboardG"));
app.use("/dashboardRe",require("./routes/dashboardRe"));
app.use("/search",require("./routes/search"));


app.get("/register",async (req,res)=>{
  try{

  // const username = "user1";
  // let password = "user";
  // const salt = await bycrypt.genSalt(10);
  // password = await bycrypt.hash(password,salt);
  //
  // const user = new User({
  //   username : username,
  //   password : password,
  //   given : [],
  //   received : [],
  //   pendingApproval : [],
  //   requestApproval : []
  // })

  const username = "user1";
  let password = "user";
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
  res.redirect("/")
}
catch(e){
  res.send(e.message);
}
})

app.get("/reset",async(req,res)=>{
  await User.findOneAndUpdate({username : 'user1'},{pendingApproval : []});
  await User.findOneAndUpdate({username : 'user2'},{requestApproval : []});
})

let port = process.env.PORT || 3000

app.listen(port,()=>{
  console.log("Server is running on "+port);
})

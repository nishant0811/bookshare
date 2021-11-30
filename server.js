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
app.use("/login", require("./routes/login"))
app.use("/dashboard",require("./routes/dashboard"));
app.use("/addBook",require("./routes/addBook"));
app.use("/logout",require("./routes/logout"));
app.use("/home",require("./routes/home"));
app.use("/hold",require("./routes/hold"));
app.use("/dashboardR",require("./routes/dashboardR"));
app.use("/dashboardG",require("./routes/dashboardG"));
app.use("/dashboardRe",require("./routes/dashboardRe"));
app.use("/search",require("./routes/search"));
app.use("/signup" , require("./routes/signup"))


app.get("/" , (req,res)=>{
  res.render("landingPage")
})


app.get("/reset",async(req,res)=>{
  await User.findOneAndUpdate({username : 'user1'},{pendingApproval : []});
  await User.findOneAndUpdate({username : 'user2'},{requestApproval : []});
})

let port = process.env.PORT || 3000

app.listen(port,()=>{
  console.log("Server is running on "+port);
})

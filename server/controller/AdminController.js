const Post = require("../models/Post");
const User = require("../models/User");
const adminLayout = "../views/layouts/admin";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc admin  get login page
exports.getLoginPage = async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      descreption: "Simple Blog app with Express mongodb ejs",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
};

// //@desc admin post login checkLogin
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1)check if username is exist in db
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials", // i don't tell him what is wrong because he might be a haker
      });
    }

    // 2)check if password is correct

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    //3)create a token for logged user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    //4)save logged user in cookie
    res.cookie("token", token, { httpOnly: true });

    //5)after login
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};
exports.autheMiddlware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthroized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
exports.getAdminDashboard = async (req, res) => {
  try {
    const locals = {
      title :'Admin Dashboard',
      descreption: "Simple Blog app with Express mongodb ejs",
    }
    const posts =  await Post.find()
    
    res.render("admin/dashboard",{
      locals,
      posts
    });


  } catch (err) {}

};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hasedPassword });
      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      if (err.code === 11000) {
        res.status(409).json({ message: "User in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    console.log(err);
  }
};

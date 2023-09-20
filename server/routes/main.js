const express = require("express");
const {getAllPosts,getPost,searchForPosts} = require('../controller/HomeContorller')
const router = express.Router();


router.get("/", getAllPosts);

router.get("/post/:id", getPost);
router.post("/search", searchForPosts);


router.get("/about", (req, res) => {
  res.render("about");
});



module.exports = router;

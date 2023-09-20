const express = require("express");
const router = express.Router();
const {
  getLoginPage,
  login,
  register,
  getAdminDashboard,
  autheMiddlware,
  getAddPostPage,
  addPost,
  getEditPostPage,
  editPost,
  deletePost,
  logout,
} = require("../controller/AdminController");

router.route("/admin").get(getLoginPage).post(login);
router.get("/dashboard", autheMiddlware, getAdminDashboard);
router.route("/add-post").get(autheMiddlware, getAddPostPage).post(addPost);
router
  .route("/edit-post/:postId")
  .get(autheMiddlware, getEditPostPage)
  .put(editPost);
router.route("/delete-post/:postId").delete(autheMiddlware, deletePost);
router.post("/register", register);
router.get('/logout',logout)



module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getLoginPage,
  login,
  register,
  getAdminDashboard,
  autheMiddlware,
} = require("../controller/AdminController");

router.route("/admin").get(getLoginPage).post(login);
router.get("/dashboard", autheMiddlware, getAdminDashboard);
router.post("/register", register);

module.exports = router;

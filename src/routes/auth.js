const express = require("express");
const {
  signup,
  verify,
  signin,
  refresh,
  logout,
  user,
} = require("../controllers/auth");
const Token = require("../models/Token");

const router = express.Router();

// Routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify/:id/:token", verify);
router.post("/refresh", refresh);
router.delete("/logout", logout);
router.post("/user", user);

module.exports = router;

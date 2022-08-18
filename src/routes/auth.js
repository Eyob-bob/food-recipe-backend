const express = require("express");
const { signup, verify, signin } = require("../controllers/auth");

const router = express.Router();

// Routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify/:id/:token", verify);

module.exports = router;

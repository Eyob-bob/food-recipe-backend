const express = require("express");
const multer = require("multer");
const { v4 } = require("uuid");
const path = require("path");
const { default: axios } = require("axios");
const router = express.Router();
const {
  addRecipe,
  getAllRecipe,
  getOneRecipe,
} = require("../controllers/recipe");
const authenticate = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpge", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.post("/add", authenticate, upload.single("photo"), addRecipe);
router.get("/getAll", getAllRecipe);
router.get("/getOne/:id", getOneRecipe);

module.exports = router;

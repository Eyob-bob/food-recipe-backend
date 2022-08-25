const express = require("express");
const multer = require("multer");
const { v4 } = require("uuid");
const path = require("path");
const { default: axios } = require("axios");
const router = express.Router();
const { addRecipe } = require("../controllers/recipe");

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

router.post("/add", upload.single("photo"), addRecipe);

module.exports = router;

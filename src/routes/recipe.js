const express = require("express");
const multer = require("multer");
const { v4 } = require("uuid");
const path = require("path");
const router = express.Router();
const {
  addRecipe,
  getAllRecipe,
  getOneRecipe,
  myRecipes,
  getAuthenticatedOneRecipe,
  favorite,
  bookmark,
  comment,
  getFavorite,
  getBookmark,
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
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter, limits: 2048 });

router.post("/add", authenticate, upload.single("photo"), addRecipe);
router.get("/getAll", getAllRecipe);
router.get("/getOne/:id", getOneRecipe);
router.get("/getAuthenticatedOne/:id", authenticate, getAuthenticatedOneRecipe);
router.get("/myRecipes", authenticate, myRecipes);
router.post("/favorite", authenticate, favorite);
router.post("/bookmark", authenticate, bookmark);
router.post("/comment", authenticate, comment);
router.get("/favorite", authenticate, getFavorite);
router.get("/bookmark", authenticate, getBookmark);

module.exports = router;

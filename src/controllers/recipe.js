const imgbbUploader = require("imgbb-uploader");
const Recipe = require("../models/Recipe");
const Ingrident = require("../models/Ingrident");
const Step = require("../models/Step");
const fs = require("fs");
const Favorite = require("../models/Favorite");
const Bookmark = require("../models/Bookmark");

exports.addRecipe = async (req, res) => {
  try {
    const { name, time, calories, numOfPersons } = req.body;
    const photo = req.file.path;
    if (!name) return res.status(404).send("name is required");
    if (!time) return res.status(404).send("time is required");
    if (!calories) return res.status(404).send("calories is required");
    if (!numOfPersons) return res.status(404).send("numOfPersons is required");
    if (!photo) return res.status(404).send("photo is required");

    const ingridents = req.body.ingridents.split(",");
    const steps = req.body.steps.split(",");

    const { url } = await imgbbUploader(process.env.IMGBB_KEY, photo);
    const recipe = new Recipe({
      postUserId: req.user.userId,
      name,
      calories,
      numOfPersons,
      photo: url,
      timeInMin: time,
    });

    const savedRecipe = await recipe.save();

    fs.unlink(`${photo}`, (err) => console.log(err));

    const ingrident = new Ingrident({
      recipeId: savedRecipe._id,
      name: ingridents,
    });

    const savedIng = await ingrident.save();

    const step = new Step({
      recipeId: savedRecipe._id,
      name: steps,
    });

    const savedStep = await step.save();

    const fav = await Favorite({
      userId: req.user.userId,
      recipeId: savedRecipe._id,
      isFav: false,
    });

    const savedFav = await fav.save();

    const book = await Bookmark({
      userId: req.user.userId,
      recipeId: savedRecipe._id,
      isBook: false,
    });

    const savedBook = await book.save();

    res.json({
      savedRecipe,
      savedIng,
      savedStep,
      savedFav,
      savedBook,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};
exports.getAllRecipe = async (req, res) => {
  const allRecipe = await Recipe.find();
  const allIngrident = await Ingrident.find();
  const allStep = await Step.find();

  res.json({
    allIngrident,
    allRecipe,
    allStep,
  });
};
exports.getOneRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const ingrident = await Ingrident.findOne({ recipeId: recipe._id });
  const step = await Step.findOne({ recipeId: recipe._id });
  res.json({
    recipe,
    ingrident,
    step,
  });
};
exports.getAuthenticatedOneRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const userId = req.user.userId;
  const fav = await Favorite.findOne({ userId, recipeId: recipe._id });
  const book = await Bookmark.findOne({ userId, recipeId: recipe._id });
  const ingrident = await Ingrident.findOne({ recipeId: recipe._id });
  const step = await Step.findOne({ recipeId: recipe._id });
  res.json({
    recipe,
    ingrident,
    step,
    fav,
    book,
  });
};

exports.myRecipes = async (req, res) => {
  const recipe = await Recipe.find({ postUserId: req.user.userId });
  res.json({
    recipe,
  });
};

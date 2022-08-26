const imgbbUploader = require("imgbb-uploader");
const Recipe = require("../models/Recipe");
const Ingrident = require("../models/Ingrident");
const Step = require("../models/Step");

exports.addRecipe = async (req, res) => {
  const { name, time, calories, numOfPersons } = req.body;
  const photo = req.file.path;

  const ingridents = req.body.ingridents;
  const steps = req.body.steps;

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

  res.json({
    savedRecipe,
    savedIng,
    savedStep,
  });
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

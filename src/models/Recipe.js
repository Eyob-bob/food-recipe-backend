const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  postUserId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  favUserId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    // required: true,
  },
  bookUserId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  timeInMin: {
    type: Number,
    required: true,
  },
  numOfPersons: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Recipe = model("recipes", recipeSchema);

module.exports = Recipe;

const { Schema, model } = require("mongoose");

const stepSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "recipes",
    required: true,
  },
  name: {
    type: [String],
    required: true,
  },
});

const Step = model("steps", stepSchema);

module.exports = Step;

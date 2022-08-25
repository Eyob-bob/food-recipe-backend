const { Schema, model } = require("mongoose");

const ingridentSchema = new Schema({
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

const Ingrident = model("ingridents", ingridentSchema);

module.exports = Ingrident;

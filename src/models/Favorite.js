const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "recipes",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isFav: {
    type: Boolean,
    required: true,
  },
});

const Favorite = model("favorites", favoriteSchema);

module.exports = Favorite;

const { Schema, model } = require("mongoose");

const bookmarkSchema = new Schema({
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
  isBook: {
    type: Boolean,
    required: true,
  },
});

const Bookmark = model("bookmarks", bookmarkSchema);

module.exports = Bookmark;

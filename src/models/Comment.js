const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
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
  comment: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Comment = model("comments", commentSchema);

module.exports = Comment;

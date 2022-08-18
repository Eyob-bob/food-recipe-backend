const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
});

const Token = model("token", tokenSchema);

module.exports = Token;

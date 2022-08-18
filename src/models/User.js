const { model, Schema } = require("mongoose");
const Joi = require("joi");
const validator = require("validator");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = model("users", UserSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = { User: UserModel, validate };

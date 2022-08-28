const express = require("express");
require("dotenv/config");
const authRouter = require("./routes/auth");
const recipeRouter = require("./routes/recipe");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://food-recipe-theta.vercel.app",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(express.json());

// Import Routes
app.use("/auth", authRouter);

app.use("/recipe", recipeRouter);

// Connect DB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("connected db");
});

// Run server
app.listen(process.env.PORT || 8080, () => {
  console.log("running");
});

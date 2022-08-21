const express = require("express");
require("dotenv/config");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Import Routes
app.use("/auth", authRouter);

// Connect DB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("connected db");
});

// Run server
app.listen(process.env.PORT || 8080, () => {
  console.log("running");
});

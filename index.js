require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.port || 2027;
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("db connected successfully !");
  })
  .catch((err) => {
    console.log(err.message, "db connection error");
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("server up and running on port", PORT);
});

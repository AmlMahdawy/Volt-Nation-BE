const express = require("express");
const app = express();
const PORT = process.env.PORT || 2024;

const cors = require("cors");

const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/Ecommerce";
mongoose.connect(DB_URL, { autoIndex: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const ProductRoutes = require("./Routes/ProductRoutes");

app.use("/products", ProductRoutes);

app.get(["/", "/*"], (req, res, next) => {
  res.send({ message: "not found" });
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

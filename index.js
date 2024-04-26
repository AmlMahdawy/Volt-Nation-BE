require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 2024;

const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://voltnation44:IhD9lsUXr91Cg0qq@cluster0.fauifky.mongodb.net/", { autoIndex: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const ProductRoutes = require("./Routes/ProductRoutes");
const UserRoutes = require("./Routes/UserRoutes");

app.use("/products", ProductRoutes);
app.use("/user", UserRoutes);





app.get(["/", "/*"], (req, res, next) => {
  res.json({ message: "hello from volt nation , your requested page is not found" });
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

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
const CartRoutes = require("./Routes/CartRoutes");
const DashboardRoutes = require("./Routes/DashboardRoutes");
const OrdersRoutes = require("./Routes/OrdersRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");


app.use("/products", ProductRoutes);
app.use("/user", UserRoutes);
app.use("/cart", CartRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/orders", OrdersRoutes);
app.use("/category", CategoryRoutes);






app.get(["/", "/*"], (req, res, next) => {
  res.json({ message: "hello from volt nation , your requested page is not found" });
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

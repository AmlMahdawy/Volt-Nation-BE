const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");

router.get("/", ProductController.GetAllProducts);


module.exports = router;

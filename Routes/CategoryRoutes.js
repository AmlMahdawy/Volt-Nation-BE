const express = require("express");
const router = express.Router();
const CategoryController = require("../Controllers/CategoryController");


router.get("/all", CategoryController.AllCategories);
router.post("/add", CategoryController.CreateCategory);
router.patch("/update", CategoryController.UpdateCategory);
router.delete("/delete/:catId", CategoryController.DeleteCategory);




module.exports = router;

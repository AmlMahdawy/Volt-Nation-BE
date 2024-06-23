const express = require("express");
const router = express.Router();
const CategoryController = require("../Controllers/CategoryController");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/categories');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage })

router.get("/all", CategoryController.AllCategories);
router.post("/add", upload.array('imgs', 5), CategoryController.CreateCategory);
router.patch("/update/:catId", CategoryController.UpdateCategory);
router.delete("/delete/:catId", CategoryController.DeleteCategory);




module.exports = router;

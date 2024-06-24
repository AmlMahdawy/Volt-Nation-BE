const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");

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
router.get("/", ProductController.GetAllProducts);
router.post("/add", upload.array('imgs', 5), ProductController.AddProduct);
router.post("/delete/:id", ProductController.DeleteProduct);




module.exports = router;

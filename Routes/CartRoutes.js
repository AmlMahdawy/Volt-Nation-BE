const express = require("express");
const router = express.Router();
const CartController = require("../Controllers/CartController");


router.get("", CartController.GetCart)
router.post("/add/:productId", CartController.AddToCart)
router.patch("/decrease/:productId", CartController.Decrement)
router.delete("/remove/:productId", CartController.RemoveItemFromCart)
router.post("/check-out", CartController.CheckOut)






module.exports = router;

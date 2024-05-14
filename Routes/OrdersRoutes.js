const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");


router.get("", OrderController.GetOrders);
router.delete("/delete/:orderId", OrderController.DeleteOrder);
router.patch("/:orderId/:status", OrderController.UpdateOrderStatus);
router.get("/user", OrderController.GetOrderByUserId);




module.exports = router;

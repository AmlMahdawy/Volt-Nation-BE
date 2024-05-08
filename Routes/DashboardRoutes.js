const express = require("express");
const router = express.Router();
const DashboardController = require("../Controllers/DashboardController");

router.get("/statistics", DashboardController.GetStatistics);
router.get("/orders", DashboardController.GetOrders);



module.exports = router;

const express = require("express");
const router = express.Router();
const DashboardController = require("../Controllers/DashboardController");

router.get("/statistics", DashboardController.GetStatistics);





module.exports = router;

const express = require("express");
const router = express.Router();
const DashboardController = require("../Controllers/DashboardController");

router.get("/statistics", DashboardController.GetStatistics);
router.patch("/role/:id", DashboardController.alterRole);
router.delete("/delete-user/:id", DashboardController.removeUser);







module.exports = router;

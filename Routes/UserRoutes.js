const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post("/reset-password-mail", UserController.ResetPasswordMail);
router.post("/update-password", UserController.updateUserPassword);



module.exports = router;

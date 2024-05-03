const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const ProfileController = require("../Controllers/ProfileController");


//Auth Routes
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post("/reset-password-mail", UserController.ResetPasswordMail);
router.post("/update-password", UserController.updateUserPassword);

//Profile Routes

//basic info
router.get("/profile", ProfileController.GetUserData);
router.patch("/details/edit", ProfileController.UpdateUserData);
//address
router.post("/address/add", ProfileController.CreateAddress);
router.get("/address/all", ProfileController.GetAllAdrresses);
router.post("/address/edit", ProfileController.EditAddress);
router.delete("/address/delete/:id", ProfileController.DeleteAddress);






module.exports = router;

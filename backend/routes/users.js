const express = require('express');
const app = require('../app');
const router = express.Router();
const userController = require("../controllers/create-user");
const {verifyToken} = require("../utils/verifyToken");

router.post("/userRegistration", userController.createUser);
router.post("/userLogin", userController.userLogin);
router.get("/getAllUsers", verifyToken, userController.getAllUser);
module.exports = router;

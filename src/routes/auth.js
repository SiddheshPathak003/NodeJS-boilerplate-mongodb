var express = require("express");
const authController = require("../controller/authController");
var router = express.Router();

router.route("/signup").post(authController.signupController);
router.route("/login").post(authController.loginController);

module.exports = router;

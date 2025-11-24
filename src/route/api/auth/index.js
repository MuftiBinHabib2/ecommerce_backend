const express = require("express")
const { signupController, verifyOtpController, loginController, alluserController, verifyUserController } = require("../../../controller/authController");
const { authMiddleware, TokenCheckMiddleware, adminCheck } = require("../../../utils/authMiddleware");
const router = express.Router()
// http://localhost:3000/api/v1/auth/signup
router.post("/signup" , signupController);
router.post("/verify-otp", verifyOtpController)
router.post("/login", loginController)
router.get("/allusers",TokenCheckMiddleware, adminCheck, alluserController)

router.get("/verifyuser", verifyUserController)
module.exports = router
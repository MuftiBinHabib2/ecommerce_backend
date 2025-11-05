const express = require("express")
const { createCouponController, applyCouponController } = require("../../../controller/couponController")
const router = express.Router()
router.post("/create", createCouponController)
router.post("/apply", applyCouponController)

module.exports = router
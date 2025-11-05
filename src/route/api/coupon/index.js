const express = require("express")
const { createCouponController } = require("../../../controller/couponController")
const router = express.Router()
router.post("/create", createCouponController)

module.exports = router
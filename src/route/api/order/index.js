const express = require('express')
const { createOrderController, allorderListController, successOrderController } = require('../../../controller/orderController')

const router = express.Router()

router.post("/createorder", createOrderController)
router.get("/allorders", allorderListController)

// localhost:3000/api/v1/order/success
router.post("/success/:id", successOrderController)

module.exports = router
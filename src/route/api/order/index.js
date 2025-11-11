const express = require('express')
const { createOrderController, allorderListController } = require('../../../controller/orderController')

const router = express.Router()

router.post("/createorder", createOrderController)
router.get("/allorders", allorderListController)

module.exports = router
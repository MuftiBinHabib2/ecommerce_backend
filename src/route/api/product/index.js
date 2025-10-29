const express = require('express')
const { createProductController } = require('../../../controller/productController')
const upload = require('../../../utils/upload')

const router = express.Router()

router.post("/create" ,upload.array("product"), createProductController)


module.exports = router
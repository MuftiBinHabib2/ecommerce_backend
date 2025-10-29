const express = require("express")
const router = express.Router()
const auth = require('./auth')
const banner = require("./banner")
const category = require("./category")
const subcategory = require("./subcategory")
const product = require("./product")
// http://localhost:3000/api/v1/auth
router.use('/auth' ,auth)

router.use("/banner" , banner)

router.use("/category", category)

router.use("/subcategory", subcategory )

router.use("/product", product)

module.exports = router;
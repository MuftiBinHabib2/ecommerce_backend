const express = require("express")
const router = express.Router()
const auth = require('./auth')
const banner = require("./banner")
const category = require("./category")
const subcategory = require("./subcategory")
// http://localhost:3000/api/v1/auth
router.use('/auth' ,auth)

router.use("/banner" , banner)

router.use("/category", category)

router.use("/subcategory", subcategory )

module.exports = router;
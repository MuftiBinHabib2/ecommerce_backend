const express = require('express')
const { createProductController, createVariantController, allProductController, latestProductController, deleteProductController, singleProductController } = require('../../../controller/productController')
const upload = require('../../../utils/upload')

const router = express.Router()

router.post("/create" ,upload.array("product"), createProductController)
router.get("/products" , allProductController)
router.get("/latestproduct", latestProductController)

router.delete("/deleteproduct/:id", deleteProductController)

router.get("/products/:slug", singleProductController )

// variant route 
router.post("/addvariant", createVariantController)


module.exports = router
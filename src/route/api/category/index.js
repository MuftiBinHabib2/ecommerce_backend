const express = require("express");
const { addCategoryController } = require("../../../controller/addCategory");
const router = express.Router()

//add category
router.post("/addcategory", addCategoryController)
module.exports = router; 
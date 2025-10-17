const express = require("express");
const { addSubCategoryController } = require("../../../controller/subcategoryController");

const router = express.Router()

router.post("/addsubcategory", addSubCategoryController)

module.exports = router; 
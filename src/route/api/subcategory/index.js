const express = require("express");
const { addSubCategoryController, deleteSubCategoryController, updatesubcategoryController } = require("../../../controller/subcategoryController");

const router = express.Router()

router.post("/addsubcategory", addSubCategoryController)
router.delete("/deletesubcategory/:id", deleteSubCategoryController)
router.patch("/updatesubcategory/:id",  updatesubcategoryController)


module.exports = router; 
const express = require("express");
const { addCategoryController, deleteCategoryController, updateCategoryController, allCategoryController } = require("../../../controller/categoryController");
const upload = require("../../../utils/upload");
const router = express.Router()

//add category
router.post("/addcategory", upload.single("category"),addCategoryController)
router.delete("/deletecategory/:id", deleteCategoryController)
router.put("/categoryupdate/:id",upload.single("category") , updateCategoryController)

router.get("/allcategory", allCategoryController)
module.exports = router; 
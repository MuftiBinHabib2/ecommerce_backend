const express = require("express");
const { addBannerController, deleteBannerController, updateBannerController, allBannersController } = require("../../../controller/bannerController");

const router = express.Router()

const path = require('path');
const { TokenCheckMiddleware, adminCheck } = require("../../../utils/authMiddleware");
const upload = require("../../../utils/upload");



// http://localhost:3000/api/v1/auth/signup
router.post("/addbanner", upload.single("banner"),addBannerController);
router.delete("/deletebanner/:id",deleteBannerController)
// router.delete("/deletebanner/:id",TokenCheckMiddleware,adminCheck,deleteBannerController)


router.patch("/updatebanner/:id",upload.single("banner") , updateBannerController)

router.get("/allbanners", allBannersController)

module.exports = router; 
const express = require("express")
const { addtocartController, getAllCartListController, singleusercartController } = require("../../../controller/cartController")

const router = express.Router()
router.post("/addtocart", addtocartController)
router.get("/getallcarts", getAllCartListController)
router.get("/singleusercart/:id", singleusercartController)


module.exports = router
const cartModel = require("../model/cart.model")
const orderModel = require("../model/order.model")

const createOrderController = async(req, res)=>{
    try {
        let{
            user,
            orderstatus,
            discount,
            paymentmethod,
            city,
            address,
            phone,
        } = req.body
        
        let cartlist = await cartModel.find({user})

        if(cartlist.length == 0){
            return res.status(404).json({success:false, message:"cart is empty"})
        } else{
            
            let totalprice= cartlist.reduce((prev , cur) => {
                return prev + cur.totalprice 
            },0)
    
    
            let order = new orderModel({
                 user,
                orderstatus,
                discount,
                paymentmethod,
                city,
                address,
                phone,
                items: cartlist,
                totalprice
            })
    
    
            await order.save()

            let deletecart = cartModel.deleteMany({user})

            return res.status(201).json({success:true, message:"order placed successful", data:order})
        }


    } catch (error) {
         return res
      .status(500)
      .json({ success: false, message: error.message || error });
    }

}

const allorderListController = async (req,res) =>{
    try {
        
        let orderlist = await orderModel.find({}).populate({
            path:"user",
            select:"name email"
        }).populate({
            path: "items.product",
            select: "title price discountprice image quantity "
        })
        .populate({
            path:"items.variant",
            select: "size stock"
        })

        return res.status(200).json({success:true , message:"order fetched successful", data:orderlist}) 
    } catch (error) {
         return res
      .status(500)
      .json({ success: false, message: error.message || error });
    }
}

module.exports = {
    createOrderController, allorderListController
}
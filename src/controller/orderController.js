const cartModel = require("../model/cart.model")
const orderModel = require("../model/order.model")
// setup sslcommerz
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.SSL_STORE;
const store_passwd = process.env.SSL_PASSWORD
const is_live = false //true for live, false for sandbox

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
            if(paymentmethod == "cod"){
                
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
            } else{
                // online payment

                
                                let totalprice= cartlist.reduce((prev , cur) => {
                                    return prev + cur.totalprice 
                                },0)
                                let tran_id=`TRNX${Date.now()}` 
                                 let order = new orderModel({
                                     user,
                                    orderstatus,
                                    discount,
                                    paymentmethod,
                                    city,
                                    address,
                                    phone,
                                    items: cartlist,
                                    totalprice,
                                    trnd_id:tran_id
                                })
                        
                        
                                await order.save()
                    
                                let deletecart = cartModel.deleteMany({user})
 
                                
                 const data = {
        total_amount: totalprice,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3000/api/v1/order/success/${tran_id}`,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });

            }
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

const successOrderController = async (req, res) =>{
    let (id) = req.params;

    let order = await orderModel.findOneAndUpdate({trnd_id:id},{paid: "paid"},{new: true})
    res.status(200).json({success:true, message:"payment success", data:order})
}
module.exports = {
    createOrderController, allorderListController, successOrderController
}
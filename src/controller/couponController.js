const createCouponController = (req,res)=>{
    try {
        
    } catch (error) {
         return res
      .status(500)
      .json({ success: false, message: error.message || error });
    }

}

module.exports = {createCouponController}
const { default: mongoose } = require("mongoose");
const bcrypt =require('bcrypt');
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "image is required"],     
    },
    minPrice:{
        type: Number,
        required: true,
    },
    amount:{
        type:Number,
        required: true,
    }

}, {timestamps:true})





module.exports = mongoose.model("Coupon" , couponSchema)
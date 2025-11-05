const { default: mongoose } = require("mongoose");
const bcrypt =require('bcrypt');
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "image is required"],
        
    }
}, {timestamps:true})





module.exports = mongoose.model("Category" , couponSchema)
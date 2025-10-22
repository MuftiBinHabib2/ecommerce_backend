const { default: mongoose } = require("mongoose");
const bcrypt =require('bcrypt');
const variantSchema = new mongoose.Schema({
    
     size: {
        type: String,
        unique:true
    },
    stock:{
        type:Number
    }
   
}, {timestamps:true})





module.exports = mongoose.model("Variant" , variantSchema)


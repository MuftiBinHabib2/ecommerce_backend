const { default: mongoose } = require("mongoose");
const bcrypt =require('bcrypt');
const categorySchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "image is required"],
        
    },
     name: {
        type: String,
        required: [true, "name is required"],
        
    },
}, {timestamps:true})





module.exports = mongoose.model("Category" , categorySchema)
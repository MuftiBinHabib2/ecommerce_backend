const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    deliverycharge: {
        type:String,
        enum: ["outsidedhaka" , "insidedhaka"],
        default:"outsidedhaka"
    },
    paymentmethod: {
        type:String,
        enum:["cod","online"]
    },
    items:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:"Product"

            },
            variant:{
                 type:mongoose.Types.ObjectId,
                ref:"Variant"

            },
            quantity:{
                type:Number,
            }
        }
    ],
    totalprice:{
        type:Number,
        required: true,
    },
    discount:{
        type:Number,
        required: true,
    },
    orderstatus:{
        type:String,
        enum:["pending", "cancelled", "delivered"]
    },
    trnd_id:{
        type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

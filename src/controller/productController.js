const productModel = require("../model/product.model");

const createProductController= async(req,res)=>{

    try {
        let {title,description,variantType,reviews,discountprice,price,stock,category} = req.body; 

        let slug = slugify(title, {
              replacement: "-",
              remove: undefined,
              lower: true,
              trim: true,
            });

        let imagefile = req.files.map((item) =>{
            return `${process.env.SERVER_URL}/${item.filename}`
        })
        let product = new productModel({
            title,description,variantType,reviews,discountprice,price,stock,category,slug,image: imagefile
        })

        await product.save()

        return res.status(201).json({success:true, message:"product created", data:product})

    } catch (error) {
        return res
      .status(500)
      .json({ success: false, message: error.message || error });
    }
     

    
}

module.exports = {createProductController}
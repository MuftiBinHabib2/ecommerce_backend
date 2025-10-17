let slugify = require("slugify");
const subcategoryModel = require("../model/subcategory.model");
const categoryModel = require("../model/category.model");
let addSubCategoryController = async(req,res) =>{
    try {

        let{name, category} = req.body ;
        let slug = slugify(name,{
            replacement: '-',
            remove: undefined,
            lower: true,
            trim: true
        })

        let addsubcategory = new subcategoryModel({
            name , 
            slug,
            category
        })
// update category
        let updateCategory= await categoryModel.findOneAndUpdate({_id:category}, { $push:{subcategory :addsubcategory._id} } )

        await updateCategory.save()



        await addsubcategory.save()
        return res.status(201).json({success: true, message:"subcategory created successful", data:addsubcategory})
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || error})
    }
}



module.exports = { addSubCategoryController }
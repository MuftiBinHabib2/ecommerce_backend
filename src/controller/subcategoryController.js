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

let deleteSubCategoryController = async (req,res) =>{

    try {

        let {id} = req.params;

        await subcategoryModel.findByIdAndDelete(id)

        await categoryModel.findOneAndUpdate({subcategory:id }, {$pull:({subcategory:id})})

        return res.status(200).json({success:true, message:"sub category deleted successfully"})
        
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message || error})
    }
}

let updatesubcategoryController = async (req,res)=>{

    try {

        let {id} = req.params;
        let {name} = req.body;
        let slug = slugify(name,{
            replacement: '-',
            remove: undefined,
            lower: true,
            trim: true
        })
        await subcategoryModel.findByIdAndUpdate(id, {name, slug})

        return res.status(200).json({success:"true", message:"subcategor updated"})
       
        
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message || error})
    }
}
module.exports = { addSubCategoryController , deleteSubCategoryController, updatesubcategoryController }
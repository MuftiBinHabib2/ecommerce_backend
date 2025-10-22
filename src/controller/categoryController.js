let slugify = require("slugify");
const categoryModel = require("../model/category.model");
const fs = require("fs");
const path = require("path");
let addCategoryController = async (req, res) => {
  try {
    let { name } = req.body;
    let { filename } = req.file;

    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let addcategory = new categoryModel({
      name,
      slug,
      image: `${process.env.SERVER_URL}/${filename}`,
    });

    await addcategory.save();

    return res.status(201).json({
      success: true,
      message: "category created successful",
      data: addcategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

let deleteCategoryController = async (req, res) => {
  try {
    let { id } = req.params;

    let category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: error.message || error });
    } else {
      let imageurl = category.image.split("/");

      let imagepath = imageurl[imageurl.length - 1];
      let uploadfolder = path.join(__dirname, "../../uploads");

      fs.unlink(uploadfolder + "/" + imagepath, (err) => {
        if (err) return res.status(500).json({ success: false, message: err });
      });

      return res
        .status(200)
        .json({ success: true, message: "category deleted successful" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

let updateCategoryController = async (req, res) => {
  try {
    let { id } = req.params;
    let { filename } = req.file;
    let { name } = req.body;

    if (!name && !filename) {
      return res.status(404).json({
        success: false,
        message: "category name and image are required",
      });
    } else {
      let category = await categoryModel.findById(id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: error.message || error });
      } else {
        // delete old image path
        let imageurl = category.image.split("/");

        let imagepath = imageurl[imageurl.length - 1];
        let uploadfolder = path.join(__dirname, "../../uploads");

        fs.unlink(uploadfolder + "/" + imagepath, (err) => {
          if (err)
            return res.status(500).json({ success: false, message: err });
        });
        // delete old image path

        // update image and category name
        let slug = slugify(name, {
          replacement: "-",
          remove: undefined,
          lower: true,
          trim: true,
        });

        category.image = `${process.env.SERVER_URL}/${filename}`,
        category.name = name;
        category.slug = slug

        await category.save();

        return res
          .status(200)
          .json({ success: true, message: "category updated successful" });
        // update image and category name
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

let allCategoryController = async(req,res)=>{

    try {

        let allcategory = await categoryModel.find({}).populate({
          path : "subcategory",
          select: "name slug"
        })

        return res.status(200).json({success:true, message: "category fetch successful", data: allcategory})
        
    } catch (error) {
        return res.status(500).json({success: false, message: error.message || error })
    }
}



module.exports = {
  addCategoryController,
  deleteCategoryController,
  updateCategoryController,
  allCategoryController,
};

const productModel = require("../model/product.model");
const variantModel = require("../model/variant.model");
const path = require("path");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    let {
      title,
      description,
      variantType,
      reviews,
      discountprice,
      price,
      stock,
      category,
    } = req.body;

    let slug = slugify(title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let imagefile = req.files.map((item) => {
      return `${process.env.SERVER_URL}/${item.filename}`;
    });
    let product = new productModel({
      title,
      description,
      variantType,
      reviews,
      discountprice,
      price,
      stock,
      category,
      slug,
      image: imagefile,
    });

    await product.save();

    return res
      .status(201)
      .json({ success: true, message: "product created", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    let { id } = req.params;

    let findproduct = await productModel.findById(id);

    findproduct.image.forEach((url) => {
      let imageurl = url.split("/");

      let imagepath = imageurl[imageurl.length - 1];
      let uploadfolder = path.join(__dirname, "../../uploads");

      fs.unlink(uploadfolder + "/" + imagepath, (err) => {
        if (err) return res.status(500).json({ success: false, message: err });
      });
    });

    await productModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "true", message: "product delete successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const allProductController = async (req, res) => {
  try {
    let products = (
      await productModel
        .find({})
        .populate({ path: "variants", select: "size stock -_id" })
    ).sort({ createdAt: -1 });

    return res
      .status(200)
      .json({
        success: true,
        message: "products fetch successsful",
        data: products,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const latestProductController = async (req, res) => {
  try {
    let products = (
      await productModel
        .find({})
        .populate({ path: "variants", select: "size stock -_id" })
    )
      .sort({ createdAt: -1 })
      .limit(5);

    return res
      .status(200)
      .json({
        success: true,
        message: "products fetch successsful",
        data: products,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const createVariantController = async (req, res) => {
  try {
    let { size, stock, product } = req.body;

    let variant = new variantModel({
      size,
      stock,
      product,
    });

    await variant.save();

    await productModel.findOneAndUpdate(
      { _id: product },
      { $push: { variants: variant._id } }
    );
    return res.status(201).json({
      success: true,
      message: "variant created successful",
      data: variant,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const singleProductController = async (req, res) => {
  try {
    let {slug} = req.params;
    let products = (
      await productModel
        .findOne({})
        .populate({ path: "variants", select: "size stock -_id" })
    ).sort({ createdAt: -1 });

    return res
      .status(200)
      .json({
        success: true,
        message: "products fetch successsful",
        data: products,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
module.exports = {
  createProductController,
  createVariantController,
  allProductController,
  latestProductController,
  deleteProductController,
  singleProductController
};

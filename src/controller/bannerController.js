const bannerModel = require("../model/banner.model");
const fs = require("fs");
const path = require("path");
let addBannerController = async (req, res) => {
  let { link } = req.body;
  let { filename } = req.file;
  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link,
    });
    await banner.save();

    return res.status(201).json({
      success: true,
      message: "banner created successful",
      data: banner,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
// banner delete
let deleteBannerController = async (req, res) => {
  try {
    let { id } = req.params;
    let deletebanner = await bannerModel.findOneAndDelete({ _id: id });
    let imageurl = deletebanner.image.split("/");
    let filepath = path.join(__dirname, "../../uploads");

    fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
      if (err) {
        console.log(err, "error");
      }
    });
    return res.send(deletebanner);
    //  const banner = await bannerModel.findById(id); // banner is defined before delete

    //       await bannerModel.findByIdAndDelete(id)

    //       if (!banner) {
    //   return res.status(404).json({ success: false, message: "Banner ID not found" });
    // }

    //       return res.status(200).json({success: true, message:"banner deleted successful"})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
// update banner

let updateBannerController = async (req, res) => {
  try {
    let { id } = req.params;
    let {filename} = req.file


    let findBanner = await bannerModel.findOne({ _id: id });
    res.send(findBanner);

    if (findBanner) {
      // old image path delete
      let imageurl = findBanner.image.split("/");
      let filepath = path.join(__dirname, "../../uploads");

      fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
        if (err) {
          console.log(err, "error");
        }
      });
      //old image path delete
      // findBanner.image = `${process.env.SERVER_URL}/${filename}`

      // await findBanner.save()
      let update= await bannerModel.findOneAndUpdate({_id:id}, {image: `${process.env.SERVER_URL}/${filename}`}, {new:true})
      await update.save()
      return res.status(200).json({success: true, message: "banner update successful", data:update})
    } else {
      return res
        .status(404)
        .json({ success: false, message: "banner not found" });
    }
    res.send(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

//get all banners
let allBannersController = async(req,res) =>{
  try {
    let allbanners = await bannerModel.find({})

    if(allbanners.length == 0){
      return res.status(404).json({success:false, message:"banner not found" })
    } else {
      return res.status(200).json({success: true, message: "banner fetch successful" , data: allbanners})

    }

  } catch (error) {
     return res
      .status(500)
      .json({ success: false, message: error.message || error })
  }
}

module.exports = {
  addBannerController,
  deleteBannerController,
  updateBannerController,
  allBannersController
};

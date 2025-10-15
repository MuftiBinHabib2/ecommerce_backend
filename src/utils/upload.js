const multer  = require('multer')
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    let fileextension = file.originalname.split(".")
    let extension = fileextension[fileextension.length-1]
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  }
})


function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (jpeg, jpg, png, gif)');
  }
}

const upload = multer({ storage: storage, fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
 })

 module.exports = upload
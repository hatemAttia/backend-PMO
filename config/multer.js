var multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    console.log(file.filename);
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + file.originalname);
  },
});

const uploadimages = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

const uploadFile = multer({
  storage: storage,
});

function checkImageType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }

}
module.exports = { uploadimages ,uploadFile};

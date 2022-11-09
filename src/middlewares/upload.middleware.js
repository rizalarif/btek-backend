const multer = require("multer");
const path = require("path");
const storageCloudinary = require("./cloudinary.middleware");

const extGenerator = (mimetype) => {
  const mime = ["image/jpeg", "image/png", "image/webp"];
  const sortedExt = ["jpg", "png", "webp"];
  return sortedExt[mime.indexOf(mimetype)];
};

// eslint-disable-next-line no-unused-vars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("assets", "uploads"));
  },
  filename: async(req, file, cb) => {
    const ext = extGenerator(file.mimetype);
    const { customAlphabet } = await import("nanoid");
    const nanoid = customAlphabet("0123456789", 10);
    
    cb(null, nanoid().concat(`.${ext}`));
  }
});

const fileFilter = (req, file, cb) => {
  if(extGenerator(file.mimetype)){
    cb(null, true);
  }else{
    cb(new Error("File extension not supported"), false);
  }
};

const mult = multer({
  storage:
  storageCloudinary,
  fileFilter,
  limits: {
    fileSize: 1 * 1000 * 1000
  }
});

const upload = (field) => {
  const up = mult.single(field);
  return (req, res, next) => {
    up(req, res, (err)=>{
      if(err){
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }else{
        next();
      }
    });
  }; 
};

module.exports = upload;

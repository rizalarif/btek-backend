const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { randomString } = require("../utils");

const extGenerator = (mimetype) => {
  const mime = ["image/jpeg", "image/png", "image/webp"];
  const exts = ["jpg", "png", "webp"];
  return exts[mime.indexOf(mimetype)];
};

cloudinary.config({
  cloud_name: "dranuuxv4",
  api_key: "421116746575329",
  api_secret: "IuUfT6mE9tJGesbxVGW_TPZj53c"
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = extGenerator(file.mimetype);
    const randString = await randomString(6);
    return {
      folder: "public",
      format: ext,
      public_id: randString,
    };
  },
});

module.exports = storage;

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { randomString } = require("../../utils");

const extGenerator = (mimetype) => {
  const mime = ["image/jpeg", "image/png", "image/webp"];
  const exts = ["jpg", "png", "webp"];
  return exts[mime.indexOf(mimetype)];
};

cloudinary.config({
  cloud_name: "dy6kothls",
  api_key: "683746525321814",
  api_secret: "XGZt9yZi7roCd__qcILIJzb-HPE"
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

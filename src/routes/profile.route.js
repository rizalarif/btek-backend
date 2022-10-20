const profile = require("express").Router();

profile.get("/", require("../controllers/profile.controller").readProfileById);
profile.get("/:id", require("../controllers/profile.controller").readProfileById);
profile.put("/", require("../controllers/profile.controller").updateProfile);


module.exports = profile;

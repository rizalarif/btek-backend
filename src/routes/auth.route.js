const auth = require("express").Router();

const {validEmail, check} = require("../middlewares/validator.middleware");

auth.post("/login",validEmail,check, require("../controllers/auth.controller").login);
auth.post("/register", require("../controllers/auth.controller").register);

module.exports = auth;

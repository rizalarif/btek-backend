const auth = require("express").Router();

const {validEmail, check} = require("../middlewares/validator.middleware");

auth.post("/login",validEmail,check, require("../controllers/auth.controller").login);
auth.post("/register", require("../controllers/auth.controller").register);
auth.post("/forgot-password", require("../controllers/auth.controller").forgotPassword);
auth.post("/reset-password", require("../controllers/auth.controller").resetPassword);


module.exports = auth;

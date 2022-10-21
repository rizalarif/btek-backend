const auth = require("express").Router();

const {validEmail, check, passwordConfirmation} = require("../middlewares/validator.middleware");

auth.post("/login",validEmail,check, require("../controllers/auth.controller").login);
auth.post("/register", require("../controllers/auth.controller").register);
auth.post("/forgot-password", validEmail, check, require("../controllers/auth.controller").forgotPassword);
auth.post("/reset-password", validEmail, passwordConfirmation, check, require("../controllers/auth.controller").resetPassword);


//auth.post("/forgot-password") body = email => data baru di tabel resetPassword => column generic, code, email, userId
//auth.post("/reset-password") body = code/random code, email, newPassword, confirmPassword

module.exports = auth;

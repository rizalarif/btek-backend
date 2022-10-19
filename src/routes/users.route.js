const users =  require("express").Router();

const userController = require("../controllers/users.controller");

const {check, paramUUID, basicUserCreds,paging} = require("../middlewares/validator.middleware");


users.get("/",paging,check, userController.readAllUsers);
users.get("/:id", paramUUID, check, userController.readUserById);
users.post("/", basicUserCreds, check,userController.createUsers);
users.put("/:id", paramUUID, basicUserCreds, check, userController.updateUserById);
users.delete("/:id",userController.deleteUserById);



module.exports = users;

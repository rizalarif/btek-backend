const users =  require("express").Router();

const userController = require("../controllers/users.controller");




users.get("/", userController.readAllUsers);
users.get("/:id", userController.readUserById);
users.post("/", userController.createUsers);
users.put("/:id", userController.updateUserById);
users.delete("/:id", userController.deleteUserById);



module.exports = users;

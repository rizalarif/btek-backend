const routes = require("express").Router();

routes.use("/users", require("./users.route"));

module.exports = routes;

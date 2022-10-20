const argon = require("argon2");
const userModel =  require("../models/users.model");

exports.createUsers = async(req, res) => {
  req.body.password = await argon.hash(req.body.password);
  try {
    const insert = await userModel.insertUser(req.body);
    const user = insert.rows[0];
    return res.json({
      success: true,
      message: "Create user successfully",
      results: user
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};

exports.readAllUsers = async(req, res) => {
  req.query.offset = (req.query.page - 1 )* req.query.limit;
  try {
    const users = await userModel.selectAllUsers(req.query);
    const {rowCount} = await userModel.selectAll(req.query);
    const pageInfo = {
      page: req.query.page,
      limit: req.query.limit
    };
    pageInfo.totalPage = Math.ceil(rowCount / req.query.limit);
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1 : null;
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1 : null;
    pageInfo.totalData = rowCount;

    return res.json({
      success: true,
      message: "List all users",
      pageInfo,
      results: users.rows
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};

exports.readUserById = async(req, res) => {
  try {
    const user = await userModel.selectUserById(req.params.id);
    return res.json({
      success: true,
      message: "Detail user",
      results: user.rows[0]
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};


exports.updateUserById = async(req, res) => {
  try {
    req.body.password = await argon.hash(req.body.password);
    const update = await userModel.updateUserById(req.params.id, req.body);
    const user = update.rows[0];
    return res.json({
      success: true,
      message: "Update user successfully",
      results: user
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};

exports.deleteUserById = async(req, res) => {
  try {
    const user = await userModel.deleteUserById(req.params.id);
    return res.json({
      success: true,
      message: "Succesfully user deleted",
      results: user.rows[0]
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};



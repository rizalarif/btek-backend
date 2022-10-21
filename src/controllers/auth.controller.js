const userModel = require("../models/users.model");
const profileModel = require("../models/profile.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try{
    const user = await userModel.selectUserByEmail(req.body.email);
    if(user.rowCount){
      const selectedUser = user.rows[0];
      const valid = await argon.verify(user.rows[0].password, req.body.password);
      if(valid){
        const {id} = selectedUser;
        const payload = {id}; // {id: "dgsg-sdgsdg-gsdgs"}
        const token = jwt.sign(payload, process.env.APP_SECRET || "default-key");
        return res.json({
          succes: true,
          message: "Login Success",
          results:{
            token
          }
        });
      }
    }
    return res.status(401).json({
      succes: false,
      message: "Wrong Email or Password"
    });
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};

exports.register = async (req, res) => {
  try{
    req.body.password = await argon.hash(req.body.password);
    const user = await userModel.insertUser(req.body);
    if(user.rowCount){
      const createdUser = user.rows[0];
      req.body.userId = createdUser.id;
      const profile = await profileModel.insertProfile(req.body);
      if(profile.rowCount){
        return res.json({
          success: true,
          message: "Register Succesfully"
        });
      }
    }
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};

exports.forgotPassword = async(req, res) => {
  try {
    const find = await userModel.findEmail(req.body);
    if(!find.rows[0]){
      throw new Error("Email not Found!");
    }
    const insert = await userModel.insertEmail(req.body);
    return res.json({
      success: true,
      message: "Email sent",
      results: insert.rows[0]
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Error: "+err.message
    });
  }
};

exports.resetPassword = async(req, res) => {
  try {
    req.body.newPassword = await argon.hash(req.body.newPassword);
    req.body.confirmPassword = await argon.hash(req.body.confirmPassword);
    const find = await userModel.findsecretCode(req.body);
    if(!find.rows[0]){
      throw new Error("Code not Match or not Found!");
    }
    const insert = await userModel.insertPassword(req.body);
    return res.json({
      success: true,
      message: "New password sent",
      results: insert.rows[0]
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Error: "+err.message
    });
  }
};

const userModel = require("../models/users.model");
const profileModel = require("../models/profile.model");
const forgotPasswordModel = require("../models/forgotPassword.model");
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
          message: "Register Succesfully",
          result: createdUser
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

exports.forgotPassword = async (req, res) => {
  try{
    const { customAlphabet } = await import("nanoid");
    const nanoid = customAlphabet("0123456789", 6);
    req.body.code = nanoid();

    const user = await userModel.selectUserByEmail(req.body.email);
    if(user.rowCount){
      const selectedUser = user.rows[0];
      req.body.userId = selectedUser.id;

      const forgot = await forgotPasswordModel.insertForgotPassword(req.body);

      // email message send (node-mailer)

      if(forgot.rowCount){
        return res.json({
          succes : true,
          message : "Forgot password request has been sent!",
          results: forgot.rows[0]
        });
      }
    }else{
      return res.status(400).json({
        succes : false,
        message : "Email not Found!"
      });
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};
  
exports.resetPassword = async (req, res) => {
  try{
    const user = await forgotPasswordModel.selectForgotPassword(req.body);
    if(user.rowCount){
      const selectedUser = user.rows[0];
      req.body.password = await argon.hash(req.body.newPassword);
      const updatePassword = await userModel.updateUserById(selectedUser.userId, req.body);
      if(updatePassword.rowCount){
        return res.json({
          succes : true,
          message : "Reset password Success!"
        });
      }
      return res.status(500).json({
        succes : true,
        message : "Unexpected error on updating data!"
      });
    }else{
      return res.status(400).json({
        succes : false,
        message : "Email or code cannot be indetified!"
      });
    }
  }catch(err){
    return res.status(500).json({
      success: false,
      message: "Error : "+err.message
    });
  }
};

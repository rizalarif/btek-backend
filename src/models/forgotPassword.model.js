const db = require("../helpers/db");
const table = "forgotPassword";

exports.insertForgotPassword = (data) => {
  const sql = `INSERT INTO "${table}" ("code", "email", "userId") VALUES ($1, $2, $3) RETURNING *`;
  const params = [data.code, data.email, data.userId];
  return db.query(sql, params);
};

exports.selectForgotPassword = (data) => {
  const sql = `SELECT * FROM "${table}" WHERE code=$1 AND email=$2`;
  const params = [data.code, data.email];
  return db.query(sql, params);
}; 

const db = require("../helpers/db");

const table = "users";

exports.insertUser = (data) => {
  const sql = `INSERT INTO ${table} ("email", "password") VALUES ($1, $2) RETURNING *`;
  const params = [data.email, data.password];
  return db.query(sql, params);
};

exports.selectAllUsers = () => {
  const sql = `SELECT * FROM ${table}`;
  return db.query(sql);
};

exports.selectUserById = (id) => {
  const sql = `SELECT * FROM ${table} WHERE id = $1`;
  const params = [id];
  return db.query(sql, params);
};

// update user berdasarkan id
exports.updateUserById = (id, data) => {
  const sql = `UPDATE ${table} SET email=$2, password=$3 WHERE id = $1 RETURNING *`;
  const params = [id, data.email, data.password];
  return db.query(sql, params);
};

// delete user berdasarkan id
exports.deleteUserById = (id) => {
  const sql = `DELETE FROM ${table} WHERE id = $1`;
  const params = [id];
  return db.query(sql, params);
};

const db = require("../helpers/db");

const table = "profile";

exports.insertProfile = (data) => {
  const sql = `INSERT INTO "${table}"("fullName", "picture", "birthDate", "userId") VALUES ($1, $3, $2, $4) RETURNING *`;
  const params = [data.fullName, data.birtDate, data.picture, data.userId];
  return db.query(sql, params);
};


exports.selectProfileByUserId = (id) => {
  const sql = `SELECT * FROM "${table}" WHERE "userId"=$1`;
  const params = [id];
  return db.query(sql, params);
};

exports.updateProfileByUserId = (id,data) => {
  const sql = `UPDATE "${table}" SET "fullName"=$2, "picture"=$3, "birthDate"=$4 WHERE "userId"=$1 RETURNING *`;
  const params = [id, data.fullName, data.picture, data.birthDate];
  return db.query(sql, params);
};

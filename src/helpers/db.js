const {Pool} = require("pg");

const db = new Pool({
  connectionString: "postgresql://postgres:1@localhost:5432/postgres?schema=public"
});

module.exports = db;

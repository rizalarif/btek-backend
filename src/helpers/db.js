const {Pool} = require("pg");

const db = new Pool({
  connectionString: "postgresql://postgres:RizalArif_2001@db.dsvmzobpguwbpfmjdwxw.supabase.co:5432/postgres?schema=public"
});

module.exports = db;

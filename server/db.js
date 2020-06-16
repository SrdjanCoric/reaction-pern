const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "simitin",
  host: "localhost",
  port: 5432,
  database: "reaction"
})

module.exports = pool;
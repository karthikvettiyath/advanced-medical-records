const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "iJuQYTarMMhwsXtGPihfzhWzbTsFGlzF",
  database: "railway"
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});
module.exports = connection;
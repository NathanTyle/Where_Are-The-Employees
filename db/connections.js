const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "landmineLeutenantRX7-82",
  database: "employees"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
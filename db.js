var mysql = require("mysql");

var devDatabase = {
  connectionLimit: 20,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_DEV,
  multipleStatements: true
};

var prodDatabase = {
  connectionLimit: 20,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_PROD,
  multipleStatements: true
};

var dbConnection = mysql.createPool(devDatabase);

module.exports = dbConnection;
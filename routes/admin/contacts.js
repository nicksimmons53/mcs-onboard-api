var express = require("express");
var router = express.Router( );
var mysql = require("mysql");

var db = require("../../db");

router.get("/", (req, res) => {
  let sql = "select * from contacts where clientId=?;";

  db.query(sql, [ req.param.clientId ], (err, data) => {
    if (err) throw err;

    res.json({ contacts: data });
  });
});

module.exports = router;
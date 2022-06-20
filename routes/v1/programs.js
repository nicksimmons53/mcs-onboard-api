var express = require("express");
var router = express.Router( );
var mysql = require("mysql");

var db = require("../../db");

router.put("/", (req, res) => {
  let sql = "update programs set ? where clientId=?;";

  db(req.baseUrl)(sql, [ req.body, req.query.clientId ], (err, data) => {
    if (err) throw err;

    res.json({ message: "Client Program Selections Updated Successfully." });
  });
});

router.get("/", (req, res) => {
  let sql = "select * from programs where clientId=?;";

  db(req.baseUrl)(sql, [ req.query.clientId ], (err, data) => {
    if (err) throw err;

    res.json({ programs: data[0] });
  });
});

router.get("/info", (req, res) => {
  let program = mysql.raw(req.query.programName);
  let sql = `select * from program_details_? where clientId=?;`;

  db(req.baseUrl)(sql, [ program, req.query.clientId ], (err, data) => {
    if (err) throw err;

    res.json({ program: data[0] });
  });
});

router.post("/info", (req, res) => {
  let program = mysql.raw(req.query.programName);
  let sql = `insert into program_details_? set ? on duplicate key update ?;`;

  db(req.baseUrl)(sql, [ program, req.body, req.body ], (err, data) => {
    if (err) throw err;

    res.json({ message: "Client Program Specs. Update Successfully." });
  });
});

module.exports = router;

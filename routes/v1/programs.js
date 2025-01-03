const express = require("express");
const router = express.Router( );
const mysql = require("mysql");

const db = require("../../db");
const logger = require("../common/Logging/logger");

router.put("/", (req, res) => {
  let sql = "update programs set ? where clientId=?;";

  db(req.baseUrl).query(sql, [ req.body, req.query.clientId ], (err, data) => {
    if (err) {
      logger.log({
        level: "error",
        message: err,
        protocol: req.protocol,
        route: req.originalUrl,
        timestamp: new Date()
      });
      throw err;
    };

    res.json({ message: "Client Program Selections Updated Successfully." });
  });
});

router.get("/", (req, res) => {
  let sql = "select * from programs where clientId=?;";

  db(req.baseUrl).query(sql, [ req.query.clientId ], (err, data) => {
    if (err) {
      logger.log({
        level: "error",
        message: err,
        protocol: req.protocol,
        route: req.originalUrl,
        timestamp: new Date()
      });
      throw err;
    };

    res.json({ programs: data[0] });
  });
});

router.get("/info", (req, res) => {
  let program = mysql.raw(req.query.programName);
  let sql = `select * from ?_program_details where clientId=?;`;

  db(req.baseUrl).query(sql, [ program, req.query.clientId ], (err, data) => {
    if (err) {
      logger.log({
        level: "error",
        message: err,
        protocol: req.protocol,
        route: req.originalUrl,
        timestamp: new Date()
      });
      throw err;
    };

    res.json({ program: data[0] });
  });
});

router.delete("/info", (req, res) => {
  let program = mysql.raw(req.query.programName);
  let sql = `delete from ?_program_details where clientId=?;`;

  db(req.baseUrl).query(sql, [ program, req.query.clientId ], (err, data) => {
    if (err) {
      logger.log({
        level: "error",
        message: err,
        protocol: req.protocol,
        route: req.originalUrl,
        timestamp: new Date()
      });
      throw err;
    };

    res.json({ message: "Program Details Successfully Deleted." });
  });
});

router.post("/info", (req, res) => {
  let program = mysql.raw(req.query.programName);
  let sql = `insert into ?_program_details set ? on duplicate key update ?;`;

  db(req.baseUrl).query(sql, [ program, req.body, req.body ], (err, data) => {
    if (err) {
      logger.log({
        level: "error",
        message: err,
        protocol: req.protocol,
        route: req.originalUrl,
        timestamp: new Date()
      });
      throw err;
    };

    res.json({ message: "Client Program Specs. Update Successfully." });
  });
});

module.exports = router;

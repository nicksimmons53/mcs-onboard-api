const express = require("express");
const router = express.Router({ mergeParams: true });

const db = require("../../db");
const logger = require("../common/Logging/logger");

router.post("/", (req, res) => {
  let sql = "insert into addresses set ?;";

  db(req.baseUrl).query(sql, [ req.body ], (err, data) => {
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

    res.json({ message: "Address Successfully Created." });
  });
});

router.get("/", (req, res) => {
  let sql = "select * from addresses where clientId=?;";

  db(req.baseUrl).query(sql, [ req.params.clientId ], (err, data) => {
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

    res.json({ addresses: data });
  });
});

router.get("/:id", (req, res) => {
  let sql = "select * from addresses where id=?;";

  db(req.baseUrl).query(sql, [ req.params.id ], (err, data) => {
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

    res.json({ address: data[0] });
  });
});

router.put("/:id", (req, res) => {
  let sql = "insert into addresses set ? on duplicate key update ?;";

  db(req.baseUrl).query(sql, [ req.body, req.body ], (err, data) => {
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

    res.json({ message: "Address Successfully Updated." });
  });
});

router.delete("/:id", (req, res) => {
  let sql = "delete from addresses where id=?;";

  db(req.baseUrl).query(sql, [ req.params.id ], (err, data) => {
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

    res.json({ message: "Address Successfully Deleted." });
  });
});

module.exports = router;

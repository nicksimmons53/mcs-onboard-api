const express = require("express");
const router = express.Router({ mergeParams: true });

const db = require("../../db");

router.put("/", (req, res) => {
  let sql = "update approvals set ? where clientId=?;";

  db(req.baseUrl).query(sql, [ req.body, req.params.clientId ], (err, data) => {
    if (err) throw err;

    res.json({ message: "Approval Submitted." });
  });
});

router.get("/", (req, res) => {
  let sql = "select * from approvals where clientId=?;";

  db(req.baseUrl).query(sql, [ req.params.clientId ], (err, data) => {
    if (err) throw err;

    res.json({ approvals: data[0] });
  });
});

module.exports = router;

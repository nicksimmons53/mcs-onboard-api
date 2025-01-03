const express = require("express");
const router = express.Router( );

const db = require("../../db");

router.get("/", (req, res) => {
  let sql = "select * from files where clientId=?;";

  db(req.baseUrl).query(sql, [ req.query.userId ], (err, data) => {
    if (err) throw err;

    res.json({ files: data });
  });
});

router.post("/", (req, res) => {
  let sql = "insert into files set ?;";

  db(req.baseUrl).query(sql, [ req.body ], (err, data) => {
    if (err) throw err;

    res.json({ message: "File Successfully Added." });
  });
})

router.delete("/:id", (req, res) => {
  let sql = "delete * from files where id=?;";

  db(req.baseUrl).query(sql, [ req.params.id ], (err, data) => {
    if (err) throw err;

    res.json({ message: "File Successfully Deleted." });
  })
});

module.exports = router;

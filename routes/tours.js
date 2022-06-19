const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  let companySql = `SELECT * FROM companies`;

  conn.query(companySql, (err, rows) => {
    if (err) throw err;
    res.render("tours/tours", {
      tours: rows,
    });
  });
});

router.get("/company/:id", (req, res) => {
  let company_id = req.params.id;
  let companyQuery = `SELECT id, company_nm FROM companies WHERE id=${company_id} `;
  let programmeQuery = `SELECT * FROM programmes`;
  conn.query(companyQuery, (err, compRows) => {
    if (err) throw err;
    conn.query(programmeQuery, (err, proRows) => {
      if (err) throw err;
      res.render("programmes/programmes", {
        programmes: proRows,
        company: compRows[0],
      });
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  let companyQuery = `SELECT * FROM companies`;
  conn.query(companyQuery, (err, tourRows) => {
    if (err) throw err;
    res.render("tours/tourtable", {
      layout: "layouts/admin-layout",
      tours: tourRows,
    });
  });
});

router.get("/form", (req, res) => {
  res.render("tours/tour-add", {
    layout: "layouts/admin-layout",
  });
});

router.post("/form/add", (req, res) => {
  let companyData = {
    company_nm: req.body.company_nm,
    contact_info: req.body.contact_info,
    company_des: req.body.company_des,
    company_img: req.body.company_img,
  };

  let companyAddQuery = `INSERT INTO companies SET ?`;

  conn.query(companyAddQuery, companyData, (err, rows) => {
    if (err) throw err;
    res.redirect("/tourtable");
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  let editQuery = `SELECT * FROM companies WHERE id = ${id}`;
  conn.query(editQuery, (err, rows) => {
    if (err) throw err;
    res.render("tours/tour-edit", {
      tour: rows[0],
      layout: "layouts/admin-layout",
    });
  });
});

router.post("/update", (req, res) => {
  let updateSql = `update companies SET company_nm='${req.body.company_nm}', contact_info='${req.body.contact_info}', company_des='${req.body.company_des}', company_img='${req.body.company_img}' where id =${req.body.id}`;

  conn.query(updateSql, (err, rows) => {
    if (err) throw err;
    res.redirect("/tourtable");
  });
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  let editQuery = `DELETE from companies where id = ${id}`;
  conn.query(editQuery, (err, rows) => {
    if (err) throw err;
    res.redirect("/tourtable");
  });
});

module.exports = router;

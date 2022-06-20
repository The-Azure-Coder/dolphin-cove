const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  let programQuery = `SELECT * FROM programmes`;
  conn.query(programQuery, (err, rows) => {
    if (err) throw err;
    res.render("programmes/programTable", {
      layout: "layouts/admin-layout",
      programmes: rows,
    });
  });
});

router.get("/form", (req, res) => {
  res.render("programmes/program-add", {
    layout: "layouts/admin-layout",
  });
});

router.post("/form/add", (req, res) => {
  let file = req.files.image;
  let filepath = "/images/" + file.name;
  file.mv("./images/" + file.name);
  let programData = {
    pro_nm: req.body.pro_nm,
    pro_price: req.body.pro_price,
    pro_desc: req.body.pro_desc,
    image: filepath,
  };

  let programQuery = `INSERT INTO programmes SET ?`;

  conn.query(programQuery, programData, (err, rows) => {
    if (err) throw err;
    res.redirect("/programTable");
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  let editQuery = `SELECT * FROM programmes WHERE id = ${id}`;
  conn.query(editQuery, (err, rows) => {
    if (err) throw err;
    res.render("programmes/program-edit", {
      program: rows[0],
      layout: "layouts/admin-layout",
    });
  });
});

router.post("/update", (req, res) => {
  let updateSql = `update programmes SET pro_nm='${req.body.pro_nm}',  pro_price='${req.body.pro_price}', pro_desc='${req.body.pro_desc}', image='${req.body.image}' where id =${req.body.id}`;

  conn.query(updateSql, (err, rows) => {
    if (err) throw err;
    res.redirect("/programTable");
  });
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  let editQuery = `DELETE from programmes where id = ${id}`;
  conn.query(editQuery, (err, rows) => {
    if (err) throw err;
    res.redirect("/programTable");
  });
});

module.exports = router;

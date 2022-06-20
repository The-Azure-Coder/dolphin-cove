const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  let tourUsers = `SELECT 
    ut.id AS userID,
    ut.user_fname,
    ut.user_lname,
    ut.company_id,
    ct.company_nm,
    lt.email,
    lt.id
  FROM
    cove.users ut,
    cove.login lt,
    cove.companies ct
  WHERE
    lt.id = ut.login_id
  AND
  ct.id = ut.company_id
  AND 
   ct.id != 1`;
  conn.query(tourUsers, (err, userRows) => {
    if (err) throw err;
    res.render("tours/tour-users", {
      layout: "layouts/admin-layout",
      users: userRows,
    });
  });
});

router.get("/form", (req, res) => {
  let toursQuery = `SELECT * FROM companies`;
  conn.query(toursQuery, (err, tourRows) => {
    if (err) throw err;
    res.render("tours/user-add", {
      layout: "layouts/admin-layout",
      tours: tourRows,
    });
    console.log(tourRows);
  });
});

router.post("/add", (req, res) => {
  let loginData = {
    email: req.body.email_address,
    password: req.body.password,
  };
  let loginQuery = `INSERT INTO login SET ?`;

  conn.query(loginQuery, loginData, (err, logRows) => {
    if (err) throw err;
    let userData = {
      login_id: logRows.insertId,
      company_id: req.body.company_id,
      user_fname: req.body.user_fname,
      user_lname: req.body.user_lname,
    };
    let userQuery = `INSERT INTO users SET ?`;
    conn.query(userQuery, userData, (err, userRows) => {
      if (err) throw err;
      res.redirect("/tourUsers");
    });
  });
});

router.get("/edit/:id", (req, res) => {
  let userQuery = `SELECT 
  ut.id AS userID,
  ut.user_fname,
  ut.user_lname,
  ut.company_id,
  ct.company_nm,
  lt.id,
  lt.role_id,
  lt.email,
  lt.password
FROM
  cove.users ut,
  cove.login lt,
  cove.companies ct
WHERE
  lt.id = ut.login_id
AND
ct.id = ut.company_id

AND
 lt.id = ${req.params.id}
`;

  conn.query(userQuery, (err, userRows) => {
    if (err) throw err;
    let tourQuery = `SELECT * FROM companies`;
    conn.query(tourQuery, (err, tourRows) => {
      if (err) throw err;
      res.render("tours/user-edit", {
        user: userRows[0],
        tours: tourRows,
        layout: "layouts/admin-layout",
      });
    });
  });
});

router.post("/update", (req, res) => {
  let logUpdateSql = `update login SET email='${req.body.email_address}', password='${req.body.password}' where id =${req.body.id}`;
  conn.query(logUpdateSql, (err, logRows) => {
    if (err) throw err;
    let userUpdateSql = `update users SET user_fname='${req.body.user_fname}', user_lname='${req.body.user_lname}', company_id='${req.body.company_id}' where id =${req.body.userID}`;
    if (err) throw err;
    conn.query(userUpdateSql, (err, userRows) => {
      if (err) throw err;
      res.redirect("/tourUsers");
    });
  });
});

router.get("/delete/:id", (req, res) => {
  let deleteQuery = `DELETE FROM login WHERE id=${req.params.id}`;
  conn.query(deleteQuery, (err, rows) => {
    if (err) throw err;
    res.redirect("/tourUsers");
  });
});

module.exports = router;

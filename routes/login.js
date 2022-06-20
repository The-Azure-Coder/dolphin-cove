const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  res.render("login", {
    layout: "layouts/noNav-layout",
  });
});

router.post("/auth", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);

  conn.query(
    `SELECT  ut.company_id, ut.id AS userID, lt.email, lt.password, lt.role_id FROM cove.users ut, cove.login lt WHERE lt.id = ut.login_id AND email='${email}' AND BINARY password='${password}'`,
    (err, rows) => {
      if (err) throw err;
      if (!err) {
        if (rows.length > 0) {
          req.session.loggedin = true;
          req.session.user_id = rows[0].id;
          req.session.company_id = rows[0].company_id;
          req.session.role_id = rows[0].role_id;
          console.log(rows[0].role_id);
          console.log(rows[0].company_id);

          if (rows[0].role_id == 1) {
            res.redirect("/appointTable");
          } else if (rows[0].role_id == 2) {
            res.redirect("/tourDash");
          } else if (rows[0].role_id == 3) {
            res.redirect("/staff");
          } else {
            res.redirect("/");
          }
        } else {
          req.session.loggedin = false;
          res.redirect("/login");
        }
      }
    }
  );
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/login");
});
module.exports = router;

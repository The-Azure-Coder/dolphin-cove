const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/payments", (req, res) => {
  let payQuery = `SELECT 
  bt.guest_fn, 
  bt.guest_ln,
  gp.guest_num,
  pt.payment_date,
  pt.total_payment,
  py.payment_type
FROM
  cove.bookings bt,
  cove.guest_programmes gp,
  cove.payments pt,
  cove.payment_types py

where
  bt.id = pt.booking_id
  
AND
  py.id = pt.paytype_id
AND 
  bt.id = gp.booking_id
`;
  conn.query(payQuery, (err, rows) => {
    if (err) throw err;
    res.render("tables/paymentTable", {
      layout: "layouts/admin-layout",
      payments: rows,
    });
  });
});

router.get("/guests", (req, res) => {
  let companyQuery = `SELECT 
  bt.guest_fn, 
  bt.guest_ln,
  pr.pro_nm
FROM
  cove.programmes pr,
  cove.bookings bt,
  cove.guest_programmes gp,
  cove.payments pt,
  cove.payment_types py

where
bt.id = pt.booking_id
  
AND
  py.id = pt.paytype_id
AND 
  bt.id = gp.booking_id
  
  AND
  pr.id = gp.program_id
`;
  conn.query(companyQuery, (err, rows) => {
    if (err) throw err;
    res.render("tables/guestTable", {
      layout: "layouts/admin-layout",
      guests: rows,
    });
  });
});

router.get("/tourguests", (req, res) => {
  let companyQuery = `SELECT 
  ct.company_nm, 
  ct.id,
  bt.guest_fn,
  bt.guest_ln, pr.pro_nm
FROM
  cove.programmes pr,
  cove.companies ct,
  cove.bookings bt,
  cove.guest_programmes gp,
  cove.payments pt,
  cove.payment_types py
WHERE
  bt.id = pt.booking_id
      AND py.id = pt.paytype_id
      AND bt.id = gp.booking_id
      AND pr.id = gp.program_id
      AND ct.id = bt.company_id
  AND
  ct.id = ${req.session.company_id}

`;
  conn.query(companyQuery, (err, rows) => {
    if (err) throw err;
    res.render("tables/tourGuestTable", {
      layout: "layouts/tour-layout",
      guests: rows,
    });
  });
});

module.exports = router;

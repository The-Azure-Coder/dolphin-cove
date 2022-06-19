const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  if (req.session.role_id == 2) {
    let tableQuery = `SELECT 
  bt.voucher_num,
  bt.guest_fn, 
  bt.guest_ln,
  bt.id AS book_id,
  bt.booking_date,
  gp.guest_num,
  gp.excur_date,
  pt.payment_date,
  pt.total_payment,
  ct.company_nm,
  pr.pro_nm,
  pr.pro_price,
  py.payment_type,
  ht.hotel
FROM
  cove.bookings bt,
  cove.guest_programmes gp,
  cove.payments pt,
  cove.companies ct,
  cove.programmes pr,
  cove.payment_types py,
  cove.hotels ht
where
bt.id = pt.booking_id
AND
  ct.id = bt.company_id
AND
  ht.id = bt.hotel_id

AND
  pr.id = gp.program_id
  
AND
  py.id = pt.paytype_id
AND 
  bt.id = gp.booking_id

AND company_id =${req.session.company_id}`;
    conn.query(tableQuery, (err, rows) => {
      if (err) throw err;
      res.render("tours/tourAppointment", {
        appointments: rows,
        layout: "layouts/tour-layout",
      });
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/edit/:book_id", (req, res) => {
  let book_id = req.params.book_id;
  let editQuery = `SELECT 
    bt.voucher_num,
    bt.guest_fn, 
    bt.guest_ln,
    bt.id AS book_id,
    bt.booking_date,
    gp.guest_num,
    gp.excur_date,
    gp.program_id AS pro_id,
    gp.booking_id,
    gp.id AS guest_id,
    pt.id AS pay_id,
    pt.payment_date,
    pt.total_payment,
    ct.company_nm,
    ct.id AS comp_id,
    pr.id AS pro_id,
    pr.pro_nm,
    pr.pro_price,
    py.payment_type,
    py.id AS ptype_id,
    ht.id AS hot_id,
    ht.hotel
  FROM
    cove.bookings bt,
    cove.guest_programmes gp,
    cove.payments pt,
    cove.companies ct,
    cove.programmes pr,
    cove.payment_types py,
    cove.hotels ht
  where
  bt.id = pt.booking_id
  AND
    ct.id = bt.company_id
  AND
    ht.id = bt.hotel_id
  
  AND
    pr.id = gp.program_id
    
  AND
    py.id = pt.paytype_id
  AND 
    bt.id = gp.booking_id
   AND
     bt.id = ${book_id}
  `;

  let hotelQuery = `SELECT * FROM hotels`;
  let programQuery = `SELECT * FROM programmes`;
  let protypeQuery = `SELECT * FROM payment_types`;

  conn.query(editQuery, (err, editRows) => {
    if (err) throw err;
    conn.query(hotelQuery, (err, hotelRows) => {
      if (err) throw err;
      conn.query(protypeQuery, (err, typeRows) => {
        if (err) throw err;
        conn.query(programQuery, (err, proRows) => {
          if (err) throw err;
          res.render("reservations/booking-edit", {
            appoint: editRows[0],
            programmes: proRows,
            hotels: hotelRows,
            paymentTypes: typeRows,
            layout: "layouts/admin-layout",
          });
        });
      });
    });
  });
});

router.post("/update", (req, res) => {
  let updatePay = `update payments SET paytype_id='${req.body.paytype_id}',  total_payment='${req.body.total_payment}' where id =${req.body.pay_id}`;
  conn.query(updatePay, (err, payRows) => {
    if (err) throw err;
    let bookingSql = `update bookings SET payment_id='${req.body.pay_id}',  company_id='${req.body.comp_id}',  hotel_id='${req.body.hot_id}',  guest_fn='${req.body.guest_fn}', guest_ln='${req.body.guest_ln}' where id =${req.body.book_id}`;
    conn.query(bookingSql, (err, bookRows) => {
      if (err) throw err;
      let guest_pro = `update guest_programmes SET program_id='${req.body.pro_id}',  booking_id='${req.body.book_id}',  excur_date='${req.body.excur_date}', guest_num='${req.body.guest_num}' where id =${req.body.guest_id}`;
      conn.query(guest_pro, (err, guestRows) => {
        if (err) throw err;
        res.redirect("/tourdash");
      });
    });
  });
});

router.get("/delete/:book_id", (req, res) => {
  let deleteQuery = `DELETE from bookings where id = ${req.params.book_id}`;
  conn.query(deleteQuery, (err, rows) => {
    if (err) throw err;
    res.redirect("/tourdash");
  });
});

module.exports = router;

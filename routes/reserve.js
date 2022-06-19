const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
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
  ct.id,
  pr.pro_nm,
  pr.image,
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
`;

  conn.query(tableQuery, (err, rows) => {
    if (err) throw err;
    res.render("reservations/reserve", {
      appointments: rows,
    });
  });
});

router.get("/:comp_id", (req, res) => {
  let comp_id = req.params.comp_id;
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
  ct.id,
  pr.pro_nm,
  pr.image,
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
AND 
  ct.id =${comp_id}
`;
  let programInfo = `SELECT id AS pro_id, pro_nm, pro_price FROM programmes `;
  let tourInfo = `SELECT id AS comp_id,company_nm FROM companies`;
  let paymentType = `SELECT id AS type_id, payment_type FROM payment_types`;
  let hotelType = `SELECT id AS hot_id,hotel FROM hotels`;
  conn.query(programInfo, (err, prorows) => {
    if (err) throw err;

    conn.query(tourInfo, (err, tourows) => {
      if (err) throw err;
      conn.query(tableQuery, (err, tablerows) => {
        if (err) throw err;
        conn.query(paymentType, (err, paymentrows) => {
          if (err) throw err;
          conn.query(hotelType, (err, hotelrows) => {
            if (err) throw err;
            res.render("reservations/another-book", {
              programmes: prorows,
              tourInfo: tourows,
              paymentTypes: paymentrows,
              hotels: hotelrows,
              company: tablerows[0],
            });
          });
        });
      });
    });
  });
});

module.exports = router;

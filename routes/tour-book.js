const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  var date = new Date().toLocaleDateString();
  var dateArray = date.split("/");
  var newDate = `${dateArray[2]}` + `${dateArray[1]}` + `${dateArray[0]}`;
  var time = new Date().toLocaleTimeString();
  var timeArray = time.split(":");
  var lastRemainderArray = timeArray[2].split(" ");
  var lastRemainder = lastRemainderArray[0];
  var newTime = `${timeArray[0]}` + `${timeArray[1]}` + `${lastRemainder}`;
  var randomNumber = Math.floor(Math.random() * 10);
  var token = `${newDate}` + `${newTime}` + `${randomNumber}`;
  let programInfo = `SELECT image, id As pro_id, pro_nm, pro_price FROM programmes`;
  //   let tourInfo = `SELECT id,company_nm FROM companies`;
  let tourInfo = `SELECT id,company_nm FROM companies WHERE id =${req.session.company_id}`;
  let paymentType = `SELECT id AS type_id, payment_type FROM payment_types`;
  let hotelType = `SELECT id AS hot_id,hotel FROM hotels`;
  conn.query(programInfo, (err, prorows) => {
    if (err) throw err;
    conn.query(tourInfo, (err, tourows) => {
      if (err) throw err;
      conn.query(paymentType, (err, paymentrows) => {
        if (err) throw err;
        conn.query(hotelType, (err, hotelrows) => {
          if (err) throw err;
          res.render("tours/tourbookform", {
            programmes: prorows,
            tourInfo: tourows,
            paymentTypes: paymentrows,
            hotels: hotelrows,
            voucher_num: token,
            layout: "layouts/tour-layout",
          });
        });
      });
    });
  });
});

router.post("/add", (req, res) => {
  let paytype_id = req.body.type_id;
  let hotel_id = req.body.hot_id;
  let hotelQuery = `SELECT * FROM hotels WHERE id =${hotel_id}`;
  conn.query(hotelQuery, (err, hotelRows) => {
    if (err) throw err;
    let bookingData = {
      company_id: req.body.comp_id,
      hotel_id: hotelRows[0].id,
      voucher_num: req.body.voucher_num,
      guest_fn: req.body.guest_fn,
      guest_ln: req.body.guest_ln,
      booking_date: new Date(Date.now()),
    };

    let bookingQuery = `INSERT INTO bookings SET ?`;
    conn.query(bookingQuery, bookingData, (err, bookRows) => {
      if (err) throw err;
      let guessProgarmData = {
        program_id: req.body.pro_id,
        booking_id: bookRows.insertId,
        guest_num: req.body.guest_num,
        excur_date: req.body.excur_date,
      };
      let guestProgramQuery = `INSERT INTO guest_programmes SET ?`;

      conn.query(guestProgramQuery, guessProgarmData, (err, gproRows) => {
        if (err) throw err;
        let payTypeQuery = `SELECT * FROM payment_types WHERE id =${paytype_id}`;
        conn.query(payTypeQuery, (err, typeRows) => {
          if (err) throw err;
          let paymentData = {
            booking_id: bookRows.insertId,
            payment_date: new Date(Date.now()),
            paytype_id: typeRows[0].id,
            total_payment: req.body.total_payment,
          };

          let paymentQuery = `INSERT INTO payments SET ?`;
          conn.query(paymentQuery, paymentData, (err, payRows) => {
            if (err) throw err;
            res.redirect("/tourdash");
          });
        });
      });
    });
  });
});

module.exports = router;

"use strict";
const router = require("express").Router();
const nodemailer = require("nodemailer");
require('../../secrets.js')
module.exports = router;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


router.post('/', (req, res, next) => {
  let helperOptions = {
    from: "'Raincheck store' <raincheckproject@gmail.com",
    to: req.body.email,
    subject: 'Thank you for your purchase!',
    text: `Thank you for your purchase. Your total was $${req.body.amount}`
  };

  transporter.sendMail(helperOptions, (error, info) => {
    if (error){
      return console.log(error)
    } else {
      console.log("Message sent!")
      console.log(info)
    }
  })


})
